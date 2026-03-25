import { useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const Forgotpassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // generate a reset token
    const resetToken = Math.random().toString(36).substring(2, 15);
    const resetLink = `http://localhost:3000/resetpassword/${resetToken}`;

    try {
      await emailjs.send(
        'YOUR_SERVICE_ID',      // ← replace with your Service ID
        'YOUR_TEMPLATE_ID',     // ← replace with your Template ID
        {
          to_name: email,
          to_email: email,
          reset_link: resetLink,
        },
        'YOUR_PUBLIC_KEY'       // ← replace with your Public Key
      );

      setSuccess('Password reset link sent! Check your email.');
      setLoading(false);

    } catch (err) {
      setError('Failed to send email. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="signin-wrapper">
      <div className="signin-box">

        {loading && <h5 style={{ color: '#00b8d9', marginBottom: '1rem' }}>⟳ Sending email...</h5>}
        {success && <h5 style={{ color: '#2ed573', marginBottom: '1rem' }}>✓ {success}</h5>}
        {error   && <h5 style={{ color: '#ff4757', marginBottom: '1rem' }}>✗ {error}</h5>}

        <h1 className="signin-title">Forgot Password</h1>
        <p className="signin-subtitle">// enter your email to reset</p>

        <form onSubmit={handleSubmit}>
          <label className="signin-label">Email Address</label>
          <input
            type="email"
            className="signin-input"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="signin-btn">
            → Send Reset Link
          </button>
        </form>

        <p className="signin-link" style={{ marginTop: '1rem' }}>
          Remember your password? <Link to="/signin">Sign In →</Link>
        </p>

      </div>
    </div>
  );
};

export default Forgotpassword;