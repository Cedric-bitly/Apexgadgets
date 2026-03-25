import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  // if not logged in redirect to signin
  if (!user) {
    navigate('/signin');
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/signin');
  };

  return (
    <div className="signin-wrapper">
      <div className="signin-box" style={{ maxWidth: '480px' }}>

        {/* Avatar */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #00d4aa, #00b8d9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 0.75rem',
            fontSize: '2rem',
            fontFamily: 'Orbitron, sans-serif',
            fontWeight: '900',
            color: '#050a0f'
          }}>
            {user.username ? user.username[0].toUpperCase() : '?'}
          </div>
          <h1 className="signin-title" style={{ color: '#00d4aa' }}>
            {user.username}
          </h1>
          <p className="signin-subtitle">// apex member</p>
        </div>

        {/* User details */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '8px',
          padding: '1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <div>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#7a9bb5', marginBottom: '0.3rem' }}>
              Username
            </p>
            <p style={{ fontSize: '0.9rem', color: '#e8f4f8' }}>{user.username}</p>
          </div>

          <div>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#7a9bb5', marginBottom: '0.3rem' }}>
              Email
            </p>
            <p style={{ fontSize: '0.9rem', color: '#e8f4f8' }}>{user.email}</p>
          </div>

          <div>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#7a9bb5', marginBottom: '0.3rem' }}>
              Phone
            </p>
            <p style={{ fontSize: '0.9rem', color: '#e8f4f8' }}>{user.phone}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            padding: '0.85rem',
            background: 'transparent',
            border: '1px solid #ff4757',
            borderRadius: '6px',
            color: '#ff4757',
            fontFamily: 'Orbitron, sans-serif',
            fontWeight: '700',
            fontSize: '0.72rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => e.target.style.background = 'rgba(255,71,87,0.1)'}
          onMouseOut={(e) => e.target.style.background = 'transparent'}
        >
          → Logout
        </button>

      </div>
    </div>
  );
};

export default Profile;