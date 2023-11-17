import * as React from 'react';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../../Stylings/LoginScreen.css';



// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function LoginScreen() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
<div className="theme-provider" style={{ height: '100vh' }}>
  <div className="background">
    {/* Background Image */}
  </div>
  
  <div className="login-container">
    <div className="login-box">
    <h1>Fantasy Stars</h1>
      <h2>Log dich ein!</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
            required
            autoFocus
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>
        <div className="remember-me">
          <input type="checkbox" id="remember" name="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>
        <div className="submit-container">
          <button type="submit">Sign In</button>
        </div>
        <div className="links-container">
          <a href="#" className="forgot-password-link">Forgot password?</a>
          <a href="#" className="signup-link">Don't have an account? Sign Up</a>
        </div>
      </form>
    </div>
  </div>
</div>

  );
}