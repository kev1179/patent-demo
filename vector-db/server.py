import os
from dotenv import load_dotenv

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import chromadb
import chromadb.utils.embedding_functions as embedding_functions

dbPath = './data/Patent-DB'

if os.getenv('NODE_ENV') != "PRODUCTION":
    load_dotenv()
    dbPath = 'Patent-DB'

OPENAI_KEY = os.getenv('OPENAI_KEY')
openai_ef = embedding_functions.OpenAIEmbeddingFunction(
                api_key=OPENAI_KEY,
                model_name="text-embedding-3-small"
            )

app = FastAPI()

client = chromadb.PersistentClient(path=dbPath)
collection = client.get_or_create_collection(name="my_collection", embedding_function=openai_ef)

class QueryRequest(BaseModel):
    query: str
    n_results: int = 5

@app.post("/query")
async def query_db(request: QueryRequest):
    try:
        results = collection.query(
            query_texts=[request.query],
            n_results=request.n_results
        )

        return {"results": results['ids']}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))