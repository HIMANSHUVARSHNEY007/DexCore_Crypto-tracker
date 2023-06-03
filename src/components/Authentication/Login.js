import { Box, Button, TextField } from '@material-ui/core';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { CryptoState } from '../../CryptoContext';
import { auth } from '../../firebase';

const Login = ({handleClose}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAlert } = CryptoState();

  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please fill all the Fields",
        type: "error",
      });
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setAlert({
        open: true,
        message: `Sign Up Successful. Welcome ${result.user.email}`,
        type: "success",
      });

      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
      return;
    }
  };

  return (
    <Box 
            p={3}
            style={{ display: "flex", flexDirection: "column", gap: "20px", backgroundColor: "#221E2D" }}
            >
                <TextField
                    varient="outlined"
                    type="email"
                    style={{}}
                    label="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value) }
                    fullWidth
                />
                <TextField
                    varient="outlined"
                    type="password"
                    style={{textColor: "white"}}
                    label="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value) }
                    fullWidth
                />
                
                <Button
                    varient="contained"
                    size="large"
                    style={{ backgroundColor: "#00AFF0", color: "white" }}
                    onClick={handleSubmit}
                >
                    Login
                </Button>
            </Box>
  )
}

export default Login