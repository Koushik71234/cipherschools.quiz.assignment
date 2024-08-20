
import React from 'react';
import './ResultPage.css';

function ResultPage() {
  return (
    <div className="result-page">
      <div className="result-message">
        <h1>Test Completed Successfully!</h1>
        <p>Your results will be emailed to you shortly.</p>
        <div className="result-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            fill="green"
            className="bi bi-check-circle"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm3.97-8.03a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 0 1 1.06-1.06L7.5 10.94l3.47-3.47a.75.75 0 0 1 1.06 0z"
            />
          </svg>
        </div>
        <button className="home-button" onClick={() => window.location.href = '/'}>Return to Home</button>
      </div>
    </div>
  );
}

export default ResultPage;
