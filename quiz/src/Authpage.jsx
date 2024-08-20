import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';

function AuthPage() {
  const [permissions, setPermissions] = useState({ video: false, audio: false });
  const [errorMessage, setErrorMessage] = useState('');
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const requestMediaPermissions = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        // Permissions granted
        setPermissions({ video: true, audio: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing media devices.', error);
        if (error.name === 'NotAllowedError') {
          setErrorMessage('Permission to access camera and microphone was denied.');
        } else if (error.name === 'NotFoundError') {
          setErrorMessage('No camera or microphone found.');
        } else {
          setErrorMessage('An unknown error occurred.');
        }
      }
    };

    // Request permissions on component mount
    requestMediaPermissions();
  }, []);

  const handleNext = () => {
    navigate('/quiz'); // Redirect to the quiz page
  };

  return (
    <div className="auth-page">
      <h1>Authenticated Area</h1>
      {errorMessage ? (
        <div className="error-message">{errorMessage}</div>
      ) : (
        <div className="permissions-container">
          <h2>Permissions Status</h2>
          <div className="permissions-status">
            <div className={`permission-item ${permissions.video ? 'granted' : 'denied'}`}>
              Camera Permission: {permissions.video ? '✅' : '❌'}
            </div>
            <div className={`permission-item ${permissions.audio ? 'granted' : 'denied'}`}>
              Microphone Permission: {permissions.audio ? '✅' : '❌'}
            </div>
          </div>
          {permissions.video && permissions.audio && (
            <button className="next-button" onClick={handleNext}>Next</button>
          )}
        </div>
      )}

      {permissions.video && (
        <div className="camera-preview-container">
          <video ref={videoRef} autoPlay playsInline muted className="camera-preview" />
        </div>
      )}
    </div>
  );
}

export default AuthPage;
