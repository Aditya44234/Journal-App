import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { signInWithGoogle, logout } from "../firebase";

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
    <div style={styles.page}>
      <div style={styles.card}>
        <img src="/logo.png" alt="logo" width={60} />
        <h2 style={styles.heading}>Journal App</h2>

        <button style={styles.googleBtn} onClick={async () => {
          await signInWithGoogle();
          setUserName(localStorage.getItem("User"));
          setUserEmail(localStorage.getItem("EmailId"));
          setUserImage(localStorage.getItem("UserPic"));
        }}>
          Sign in with Google
        </button>

        <div style={styles.divider}>or</div>

        <form onSubmit={handleManualSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Your Name"
            value={manualName}
            onChange={(e) => setManualName(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={manualEmail}
            onChange={(e) => setManualEmail(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.submitBtn}>Continue</button>
        </form>

        {userName && (
          <div style={styles.userDetails}>
            <h3>{userName}</h3>
            <p>{userEmail}</p>
            {userImage && <img src={userImage} alt="User" style={styles.avatar} />}
            <div style={styles.actionBtns}>
              <button onClick={() => {
                logout();
                setUserName(null);
                setUserEmail(null);
                setUserImage(null);
                localStorage.clear();
              }} style={styles.logoutBtn}>
                Logout
              </button>
              <button onClick={handleContinue} style={styles.continueBtn}>
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#f5f7fa',
    fontFamily: 'Segoe UI, sans-serif',
  },
  card: {
    background: '#fff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '20px',
    color: '#333',
  },
  googleBtn: {
    padding: '12px 20px',
    backgroundColor: '#4285F4',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  divider: {
    margin: '20px 0',
    fontSize: '14px',
    color: '#888',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '12px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '8px',
  },
  submitBtn: {
    padding: '12px 20px',
    backgroundColor: '#0078d4',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  userDetails: {
    marginTop: '30px',
    textAlign: 'center',
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    marginTop: '10px',
  },
  actionBtns: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-around',
  },
  logoutBtn: {
    padding: '10px 16px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  continueBtn: {
    padding: '10px 16px',
    backgroundColor: '#2ecc71',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default LoginPage;