import { Box, Button, TextField } from '@material-ui/core';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { CryptoState } from '../../CryptoContext';
import { auth } from '../../firebase';
    
    const Signup = ({handleClose}) => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [confirmPassword, setConfirmPassword] = useState("");

      const { setAlert } = CryptoState();

      const handleSubmit = async () => {
        if(password!==confirmPassword){
            setAlert({
                open: true,
                message: "Password do not match",
                type: "error"
            });
            return;
        }
      
        try {
            const result = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
    
                console.log(result);
    
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
    
    }
      
        return (
            <Box 
            p={3}
            style={{ display: "flex", flexDirection: "column", gap: "20px", backgroundColor: "#221E2D" }}
            >
                <TextField
                    varient="outlined"
                    type="email"
                    label="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value) }
                    fullWidth
                />
                <TextField
                    varient="outlined"
                    type="password"
                    label="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value) }
                    fullWidth
                />
                <TextField
                    varient="outlined"
                    type="password"
                    label="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value) }
                    fullWidth
                />
                <Button
                    varient="contained"
                    size="large"
                    style={{ backgroundColor: "#00AFF0", color: "white" }}
                    onClick={handleSubmit}
                >
                    Sign Up
                </Button>
            </Box>
        )
    }
    
    export default Signup