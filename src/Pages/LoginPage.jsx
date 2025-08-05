import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { logout, signInWithGoogle } from "../firebase";

const LoginPage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userImage, setUserImage] = useState(null);

  const [manualName, setManualName] = useState("");
  const [manualEmail, setManualEmail] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("User");
    const email = localStorage.getItem("EmailId");
    const image = localStorage.getItem("UserPic");

    if (name && email) {
      setUserName(name);
      setUserEmail(email);
      setUserImage(image);
    }
  }, []);

  const handleContinue = () => {
    navigate("/dashboard");
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualName && manualEmail) {
      localStorage.setItem("User", manualName);
      localStorage.setItem("EmailId", manualEmail);
      setUserName(manualName);
      setUserEmail(manualEmail);
      setUserImage(null);
    }
  };

  return (
    <div style={styles.page} className="login-page">
      <div style={styles.backgroundGradient}>
        <div style={styles.card} className="login-card">
          <div style={styles.logoContainer}>
            <img src="/logo.png" alt="logo" width={80} style={styles.logo} />
          </div>
          <h2 style={styles.heading} className="login-heading">Welcome to Journal App</h2>
          {/* <p style={styles.subtitle} className="login-subtitle">Your personal space for reflection and growth</p> */}

          <button style={styles.googleBtn} className="google-btn" onClick={async () => {
            await signInWithGoogle();
            setUserName(localStorage.getItem("User"));
            setUserEmail(localStorage.getItem("EmailId"));
            setUserImage(localStorage.getItem("UserPic"));
          }}>
            <svg style={styles.googleIcon} viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign in with Google
          </button>

          <div style={styles.divider}>
            <span style={styles.dividerLine}></span>
            <span style={styles.dividerText}>or</span>
            <span style={styles.dividerLine}></span>
          </div>

          <form onSubmit={handleManualSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <input
                type="text"
                placeholder="Your Name"
                value={manualName}
                onChange={(e) => setManualName(e.target.value)}
                required
                style={styles.input}
                className="login-input"
              />
            </div>
            <div style={styles.inputGroup}>
              <input
                type="email"
                placeholder="Your Email"
                value={manualEmail}
                onChange={(e) => setManualEmail(e.target.value)}
                required
                style={styles.input}
                className="login-input"
              />
            </div>
            <button type="submit" style={styles.submitBtn} className="submit-btn">
              Continue
            </button>
          </form>

          {userName && (
            <div style={styles.userDetails}>
              <div style={styles.userCard} className="user-card">
                {userImage && <img src={userImage} alt="User" style={styles.avatar} />}
                <h3 style={styles.userName} className="user-name">{userName}</h3>
                <p style={styles.userEmail} className="user-email">{userEmail}</p>
                <div style={styles.actionBtns} className="action-btns">
                  <button onClick={() => {
                    logout();
                    setUserName(null);
                    setUserEmail(null);
                    setUserImage(null);
                    localStorage.clear();
                  }} style={styles.logoutBtn} className="logout-btn">
                    Logout
                  </button>
                  <button onClick={handleContinue} style={styles.continueBtn} className="continue-btn">
                    Continue to Dashboard
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
  },
  backgroundGradient: {
    position: 'relative',
    width: '100%',
    maxWidth: '450px',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.95)',
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
    textAlign: 'center',
    backdropFilter: 'blur(10px)',
    position: 'relative',
    overflow: 'hidden',
  },
  logoContainer: {
    marginBottom: '20px',
  },
  logo: {
    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
  },
  heading: {
    fontSize: '2.2rem',
    fontWeight: '700',
    marginBottom: '10px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    letterSpacing: '-0.5px',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '30px',
    fontStyle: 'italic',
  },
  googleBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    width: '100%',
    padding: '15px 20px',
    backgroundColor: '#fff',
    color: '#333',
    border: '2px solid #e1e5e9',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    marginBottom: '25px',
  },
  googleIcon: {
    width: '20px',
    height: '20px',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    margin: '25px 0',
    gap: '15px',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    background: 'linear-gradient(90deg, transparent, #ccc, transparent)',
  },
  dividerText: {
    fontSize: '14px',
    color: '#888',
    fontWeight: '500',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  inputGroup: {
    position: 'relative',
  },
  input: {
    width: '100%',
    padding: '15px 20px',
    border: '2px solid #e1e5e9',
    borderRadius: '12px',
    fontSize: '1rem',
    backgroundColor: '#f8f9fa',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    fontWeight: '500',
  },
  submitBtn: {
    width: '100%',
    padding: '15px 20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
    position: 'relative',
    overflow: 'hidden',
  },
  userDetails: {
    marginTop: '30px',
  },
  userCard: {
    background: 'rgba(255, 255, 255, 0.8)',
    padding: '25px',
    borderRadius: '15px',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    marginBottom: '15px',
    border: '3px solid #fff',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  },
  userName: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '5px',
  },
  userEmail: {
    fontSize: '0.95rem',
    color: '#7f8c8d',
    marginBottom: '20px',
  },
  actionBtns: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
  },
  logoutBtn: {
    padding: '10px 20px',
    background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)',
  },
  continueBtn: {
    padding: '10px 20px',
    background: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(46, 204, 113, 0.3)',
  },
};

// Add hover effects
const addHoverEffects = () => {
  const style = document.createElement('style');
  style.textContent = `
    .google-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
      border-color: #667eea;
    }
    
    .input:focus {
      outline: none;
      border-color: #667eea;
      background: white;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      transform: translateY(-2px);
    }
    
    .submit-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
    }
    
    .logout-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
    }
    
    .continue-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(46, 204, 113, 0.4);
    }

    /* Responsive Styles for LoginPage */
    @media (max-width: 768px) {
      .login-page {
        padding: 15px;
      }
      
      .login-card {
        padding: 30px 25px;
        max-width: 400px;
      }
      
      .login-heading {
        font-size: 1.8rem;
      }
      
      .login-subtitle {
        font-size: 0.95rem;
        margin-bottom: 25px;
      }
      
      .google-btn {
        padding: 12px 16px;
        font-size: 0.95rem;
      }
      
      .login-input {
        padding: 12px 16px;
        font-size: 0.95rem;
      }
      
      .submit-btn {
        padding: 12px 16px;
        font-size: 0.95rem;
      }
      
      .user-card {
        padding: 20px;
      }
      
      .user-name {
        font-size: 1.1rem;
      }
      
      .user-email {
        font-size: 0.9rem;
      }
      
      .action-btns {
        flex-direction: column;
        gap: 10px;
      }
      
      .logout-btn,
      .continue-btn {
        width: 100%;
        padding: 12px 16px;
        font-size: 0.9rem;
      }
    }

    @media (max-width: 480px) {
      .login-page {
        padding: 10px;
      }
      
      .login-card {
        padding: 25px 20px;
        max-width: 350px;
      }
      
      .login-heading {
        font-size: 1.6rem;
      }
      
      .login-subtitle {
        font-size: 0.9rem;
        margin-bottom: 20px;
      }
      
      .google-btn {
        padding: 10px 14px;
        font-size: 0.9rem;
      }
      
      .login-input {
        padding: 10px 14px;
        font-size: 0.9rem;
      }
      
      .submit-btn {
        padding: 10px 14px;
        font-size: 0.9rem;
      }
      
      .user-card {
        padding: 15px;
      }
      
      .user-name {
        font-size: 1rem;
      }
      
      .user-email {
        font-size: 0.85rem;
      }
      
      .logout-btn,
      .continue-btn {
        padding: 10px 14px;
        font-size: 0.85rem;
      }
    }
  `;
  document.head.appendChild(style);
};

// Initialize hover effects
if (typeof document !== 'undefined') {
  addHoverEffects();
}

export default LoginPage;