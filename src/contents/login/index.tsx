import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const validate = () => {
    const tempErrors: { email?: string; password?: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      tempErrors.email = "Email is required";
    } else if (
      !emailRegex.test(email) ||
      email !== process.env.REACT_APP_APP_EMAIL
    ) {
      tempErrors.email = "Enter a valid email address";
    }
    if (!password || password !== process.env.REACT_APP_APP_PASSWORD)
      tempErrors.password = "Invalid password";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleLogin = async () => {
    if (validate()) {
        const pass = process.env.REACT_APP_MAIL_PASSWORD;
      const res = await axios.post(
        `https://api.escuelajs.co/api/v1/auth/login`,
        {
          email,
          password: pass,
        }
      );
      localStorage.setItem("token", res.data.access_token);
      navigate("/");
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper
        elevation={3}
        sx={{ padding: 4, marginTop: 8, textAlign: "center" }}
      >
        <Typography variant="h5" gutterBottom>
          Sign In
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
            onClick={handleLogin}
          >
            Sign In
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
