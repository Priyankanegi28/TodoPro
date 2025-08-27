import { faCheckCircle, faEnvelope, faEye, faEyeSlash, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({
    width: '0%',
    color: '#dc3545',
    text: 'Password strength: weak'
  });
  const { signup, authLoading } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!name.trim()) {
      setError('Please enter your full name');
      return;
    }
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      await signup(email, password);
      navigate('/todos');
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    
    // Length
    if (password.length > 7) strength += 25;
    if (password.length > 11) strength += 25;
    
    // Complexity
    if (/[A-Z]/.test(password)) strength += 15;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;
    
    // Update UI
    let color = '#dc3545';
    let text = 'Password strength: weak';
    
    if (strength > 60) {
      color = '#ffc107';
      text = 'Password strength: good';
    }
    if (strength > 80) {
      color = '#28a745';
      text = 'Password strength: strong';
    }
    
    setPasswordStrength({
      width: strength + '%',
      color,
      text
    });
  };

  return (
    <main className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Create Your Account</h1>
          <p>Join thousands of productive people using TodoPro</p>
        </div>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <div className="input-with-icon">
              <FontAwesomeIcon icon={faUser} />
              <input 
                type="text" 
                id="name" 
                placeholder="Enter your full name" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-with-icon">
              <FontAwesomeIcon icon={faEnvelope} />
              <input 
                type="email" 
                id="email" 
                placeholder="Enter your email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-with-icon">
              <FontAwesomeIcon icon={faLock} />
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                placeholder="Create a password" 
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  calculatePasswordStrength(e.target.value);
                }}
              />
              <button 
                type="button" 
                className="show-password" 
                aria-label="Show password"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
            <div className="password-strength">
              <div 
                className="strength-meter" 
                style={{ 
                  width: passwordStrength.width,
                  backgroundColor: passwordStrength.color
                }}
              ></div>
              <span className="strength-text">{passwordStrength.text}</span>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="input-with-icon">
              <FontAwesomeIcon icon={faLock} />
              <input 
                type="password" 
                id="confirm-password" 
                placeholder="Confirm your password" 
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          
          <div className="form-group terms">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></label>
          </div>
          
          <button type="submit" className="btn btn-block" disabled={authLoading}>
            {authLoading ? 'Creating Account...' : 'Create Account'}
          </button>
          
          <div className="auth-footer">
            <p>Already have an account? <Link to="/login">Log in</Link></p>
          </div>
        </form>
      </div>
      
      <div className="auth-benefits">
        <h3>Why join TodoPro?</h3>
        <ul className="benefits-list">
          <li><FontAwesomeIcon icon={faCheckCircle} /> Unlimited tasks and projects</li>
          <li><FontAwesomeIcon icon={faCheckCircle} /> Cross-device synchronization</li>
          <li><FontAwesomeIcon icon={faCheckCircle} /> Smart reminders and notifications</li>
          <li><FontAwesomeIcon icon={faCheckCircle} /> Productivity analytics</li>
          <li><FontAwesomeIcon icon={faCheckCircle} /> 24/7 customer support</li>
        </ul>
      </div>
    </main>
  );
};

export default Signup;