import { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';

const WaitList = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleEmailChange = (event:any) => {
    setEmail(event.target.value);
  };

  const handleSubmit = () => {

    const saveEmail = async () =>
    {
        try
        {
            const response = await axios.post("/api/email/joinWaitlist",
                {"email": email}
            );
            console.log(response.data);
        }

        catch(error)
        {
            console.log(error)
        }
    }
    
    saveEmail();
    setSubmitted(true);
    
    // Reset status after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
    }, 3000);
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Enter your email to join the waitlist"
      value={email}
      onChange={handleEmailChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={handleSubmit}
              edge="end"
              color={submitted ? "success" : "default"}
            >
              {submitted ? <CheckCircleIcon /> : <SendIcon color='primary'/>}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
};

export default WaitList;

