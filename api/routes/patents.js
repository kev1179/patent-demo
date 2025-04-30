const express = require("express");
const axios = require("axios");
const cheerio = require('cheerio');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const { OpenAI } = require("openai");
const { requireAuth } = require('@clerk/express');

const router = express.Router();

// Load environment variables
if(process.env.NODE_ENV !== 'production')
    dotenv.config();
const OPENAI_API_KEY = process.env.OPENAI_KEY;
// const PATENTSVIEW_API_KEY = process.env.PATENTSVIEW_KEY;

const pool = mysql.createPool
({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

// Initialize OpenAI client
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

function optimizeSummary(summary) 
{
    if (!summary) 
        return "";

    // 1. Convert to lowercase (unless case matters)
    summary = summary.toLowerCase();

    // 2. Remove stopwords (basic example)
    const stopwords = new Set(["the", "is", "and", "of", "to", "for", "by", "this", "that", "a", "an"]);
    summary = summary.split(" ").filter(word => !stopwords.has(word)).join(" ");

    // 3. Remove punctuation & extra spaces
    summary = summary.replace(/[.,!?]/g, "").replace(/\s+/g, " ").trim();

    // 4. Replace long words with abbreviations/synonyms
    const replacements = {
        "artificial intelligence": "AI",
        "electric vehicle": "EV",
        "battery life": "🔋 life",
        "optimization": "opt.",
        "improving": "boosting"
    };
    Object.keys(replacements).forEach(key => {
        summary = summary.replace(new RegExp(`\\b${key}\\b`, "gi"), replacements[key]);
    });

    // 5. Extract key information (Example: Keep first 20 words)
    summary = summary.split(" ").slice(0, 1000).join(" ");

    return summary;
}

function getClaimNumber(claimString)
{
    return Number(claimString.substring(0, 4));
}

function getClaimID(claimNumber)
{
    let prefix = 'CLM-';
    let body = String(claimNumber).padStart(5, '0');


    return prefix + body;
}

function getClaimID2(claimNumber)
{
    let prefix = 'clm-';
    let body = String(claimNumber).padStart(4, '0');


    return prefix + body;
}

function getParentClaim(claimText)
{
    let claimTokens = claimText.split(" ");
    let parent = "0";

    for(let i = 0; i < claimTokens.length; i++)
    {
        if(claimTokens[i] === 'claim' && i != claimTokens - 1)
        {
            const currentToken = claimTokens[i + 1];
            const punctuationRemoved = currentToken.replace(/\D/g, "");
            parent = punctuationRemoved;
        }

        else if(claimTokens[i] === 'claims' && i != claimTokens - 1)
        {
            const currentToken = claimTokens[i + 1];
            const punctuationRemoved = currentToken.replace(/[^0-9-]/g, '');
            const match = punctuationRemoved.match(/^(\d+)-\d+$/);

            if (match) 
            {
                parent = match[1];
            }

        }
    }

    return parent;
}

router.get("/getSummary", requireAuth(), async (req, res) => {
    try {
        const patentId = req.query.patent_id;
        if (!patentId) {
            return res.status(400).json({ error: "Missing patent_id parameter" });
        }

        // Make a request to PatentsView API
        const patentsViewUrl = "https://search.patentsview.org/api/v1/g_brf_sum_text/";
        const documentViewUrl = "https://search.patentsview.org/api/v1/pg_brf_sum_text/";

        const patentQuery = { q: JSON.stringify({ _eq: { patent_id: patentId } }) };
        const documentQuery = { q: JSON.stringify({ _eq: { document_number: patentId } }) };

        const patentsViewResponse = await axios.get(patentsViewUrl, {
            headers: { "X-Api-Key": PATENTSVIEW_API_KEY, "Content-Type": "application/json"},
            params: patentQuery
        });

        const documentViewResponse = await axios.get(documentViewUrl, {
            headers: { "X-Api-Key": PATENTSVIEW_API_KEY, "Content-Type": "application/json"},
            params: documentQuery
        });

        let summary = "";

        console.log(patentsViewResponse.data)
        if(documentViewResponse.data.g_brf_sum_texts == [])
            summary = patentsViewResponse.data.g_brf_sum_texts[0].summary_text || [];
        else
            summary = documentViewResponse.data.pg_brf_sum_texts[0].summary_text || [];
        
        if (summary.length === 0) {
            return res.status(404).json({ error: "No summary found for this patent ID" });
        }

        optimizedSummary = optimizeSummary(summary);

        // Send the summary to OpenAI API for processing
        const aiResponse = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "system", content: "Summarize this patent in simple terms:" },
                       { role: "user", content: optimizedSummary }],
            max_tokens: 1000
        });

        const aiSummary = aiResponse.choices[0].message.content;

        res.json({ patent_id: patentId, summary: aiSummary });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/getDefinitions/:patentId', requireAuth(), async (req, res) => {
    const { patentId } = req.params;
    const url = `https://patents.google.com/patent/${patentId}`;
    
    try {
        const response = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        const $ = cheerio.load(response.data);

        let description = $('.claims').text().trim();
        if (!description) {
            description = $('section.abstract').text().trim(); // Fallback to abstract if no description found
        }
        
        if (!description) {
            return res.status(404).json({ error: 'Patent description not found' });
        }

        optimizedSummary = optimizeSummary(description);

        // Send the summary to OpenAI API for processing
        const aiResponse = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "system", content: "Give definitions for the most technical terms in the following text:" },
                       { role: "user", content: optimizedSummary }],
            max_tokens: 1000
        });
        
        const aiSummary = aiResponse.choices[0].message.content;

        res.json({ definitions: aiSummary });

    } catch (error) {
        console.error('Error fetching patent:', error.message);
        res.status(500).json({ error: 'Failed to fetch patent data' });
    }
});

router.get('/getSummary/:patentId', requireAuth(), async (req, res) => {
    const { patentId } = req.params;
    const url = `https://patents.google.com/patent/${patentId}`;
    
    try {
        const response = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        const $ = cheerio.load(response.data);

        let description = $('.claims').text().trim();
        if (!description) {
            description = $('section.abstract').text().trim(); // Fallback to abstract if no description found
        }
        
        if (!description) {
            return res.status(404).json({ error: 'Patent description not found' });
        }

        optimizedSummary = optimizeSummary(description);

        // Send the summary to OpenAI API for processing
        const aiResponse = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "system", content: "Summarize this patent in technical terms based off of its claims:" },
                       { role: "user", content: optimizedSummary }],
            max_tokens: 1000
        });
        
        const aiSummary = aiResponse.choices[0].message.content;

        res.json({ patent_id: patentId, summary: aiSummary });

    } catch (error) {
        console.error('Error fetching patent:', error.message);
        res.status(500).json({ error: 'Failed to fetch patent data' });
    }
});

router.get('/getClaimGraph/:patentId', requireAuth(), async (req, res) => {
    const { patentId } = req.params;
    const url = `https://patents.google.com/patent/${patentId}`;
    
    try {
        const response = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        const $ = cheerio.load(response.data);

        let rootColor = {border: '#4CAF50', background: '#1E5631', highlight: {border: '#4CAF50', background: '#3A8E3A'}};
        let independentColor = {border: '#E24A4A', background: '#8B2F3E', highlight: {border: '#E24A4A', background: '#B34343'}};
        let dependentColor = {border: '#4A90E2', background: '#1B3A57', highlight: {border: '#4A90E2', background: '#295E8F'}};

        let claimNumber = 1;
        let edgeList = [];
        claimList = [];
        claimList.push({id: 0, label: patentId, info: "Patent ID", color: rootColor});

        while(claimNumber < 100)
        {
            let claimID = getClaimID(claimNumber);

            let text;
            if($('#' + claimID).length > 0)
                text = $('#' + claimID).text().trim();
            else
            {   
                claimID = getClaimID2(claimNumber);
                text = $('#' + claimID.toLowerCase()).text().trim();
            }

            if(!text)
            {
                claimNumber++;
                continue;
            }
            
            let parent = getParentClaim(text);

            if(parent == 0)
            {
                claimList.push({id: claimNumber, label: String(claimNumber), info: text, color: independentColor});
            }
            else
                claimList.push({id: claimNumber, label: String(claimNumber), info: text, color: dependentColor});

            edgeList.push({from: parent, to: String(claimNumber)});

            claimNumber++;
        }

        res.json({claimList: claimList, edgeList: edgeList});

    } catch (error) {
        console.error('Error fetching patent:', error.message);
        res.status(500).json({ error: 'Failed to fetch patent data' });
    }
});

router.post('/saveResult', requireAuth(), async (req, res) => {
  try {

    let userid = req.auth.userId;
    const timestamp = new Date().getTime();
    let response = req.body.response;
    let patentid = req.body.patentid;

    const [rows] = await pool.query('INSERT INTO searches (userid, timestamp, response, patentid) VALUES (?, ?, ?, ?)', [
    userid,
    timestamp,
    response,
    patentid
    ]);

    res.json({message: "Success!"})
  }

  catch(error)
  {
      res.json({errorMessage: error});
  }
});

router.get('/getRecentSearches', requireAuth(), async (req, res) => {
  try {

    let userid = req.auth.userId;

    const [rows] = await pool.query('select patentid, timestamp from searches where userid = ? order by timestamp desc', [
      userid
    ]);

    res.json({recentSearches: rows})
  }

  catch(error)
  {
      res.json({errorMessage: error});
  }
});

router.get('/getSearch/:timestamp', requireAuth(), async (req, res) => {
  try {

    let userid = req.auth.userId;
    let { timestamp } = req.params;
    
    const [rows] = await pool.query('select response from searches where userid = ? and timestamp = ?', [
      userid,
      timestamp
    ]);

    // Will return {response: "blah blah blah"}
    res.json({searchResult: rows[0]})
  }

  catch(error)
  {
      res.json({errorMessage: error});
  }
});

module.exports = router;