import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Resetpassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      // call your backend to update the password
      await axios.post('https://cedric22a.alwaysdata.net/api/reset_password', {
        password: password
      });

      setSuccess('Password reset successfully!');
      setTimeout(() => navigate('/signin'), 2000);

    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="signin-wrapper">
      <div className="signin-box">

        {success && <h5 style={{ color: '#2ed573', marginBottom: '1rem' }}>✓ {success}</h5>}
        {error   && <h5 style={{ color: '#ff4757', marginBottom: '1rem' }}>✗ {error}</h5>}

        <h1 className="signin-title">Reset Password</h1>
        <p className="signin-subtitle">// enter your new password</p>

        <form onSubmit={handleSubmit}>
          <label className="signin-label">New Password</label>
          <input
            type="password"
            className="signin-input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label className="signin-label">Confirm Password</label>
          <input
            type="password"
            className="signin-input"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" className="signin-btn">
            → Reset Password
          </button>
        </form>

      </div>
    </div>
  );
};

export default Resetpassword;