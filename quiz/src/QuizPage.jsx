import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './QuizPage.css';

function QuizPage() {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState({ video: false, audio: false });
  const [errorMessage, setErrorMessage] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  // Example questions
  const [questions] = useState([
    { question: "What is the output of 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
    { question: "What does HTML stand for?", options: ["Hypertext Markup Language", "HighText Machine Language", "Hypertext Markup Linguistics", "None of these"], answer: "Hypertext Markup Language" },
    { question: "Which language is used for styling web pages?", options: ["HTML", "CSS", "JavaScript", "Python"], answer: "CSS" },
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Lisbon"], answer: "Paris" },
    { question: "Which of the following is not a programming language?", options: ["Python", "Java", "HTML", "C++"], answer: "HTML" },
    { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"], answer: "Cascading Style Sheets" },
    { question: "Which language is primarily used for web development?", options: ["Python", "C++", "JavaScript", "Java"], answer: "JavaScript" },
    { question: "Which company developed the Java programming language?", options: ["Microsoft", "Apple", "Sun Microsystems", "Google"], answer: "Sun Microsystems" },
    { question: "Which HTML tag is used to define an unordered list?", options: ["<ul>", "<ol>", "<li>", "<list>"], answer: "<ul>" },
    { question: "What is the default port for HTTP?", options: ["80", "443", "21", "25"], answer: "80" },
  ]);

  useEffect(() => {
    const requestMediaPermissions = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        setPermissions({ video: true, audio: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing media devices:', error);
        setErrorMessage('Permission to access camera and microphone was denied or not available.');
      }
    };

    requestMediaPermissions();
  }, []);

  const handleOptionChange = (option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: option,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    const userId = "66c35538569f288689bb8999"; // Example ObjectId
    console.log('Submitting Quiz with answers:', selectedAnswers);
    axios.post('http://localhost:3001/api/submit-quiz', { userId, answers: selectedAnswers })
      .then(response => {
        console.log('Quiz submitted successfully:', response.data);
        navigate('/result', { state: { selectedAnswers, questions } });
      })
      .catch(err => {
        console.error('Error submitting quiz:', err);
        setErrorMessage('Error submitting quiz. Please try again.');
      });
  };

  return (
    <div className="quiz-page">
      <h1>Online Test</h1>
      {errorMessage ? (
        <div style={{ color: 'red' }}>{errorMessage}</div>
      ) : (
        <>
          <div className="camera-preview">
            <video ref={videoRef} autoPlay playsInline muted />
          </div>

          <div className="questions-container">
            <div className="question-item">
              <h2>{`Quant - Question ${currentQuestionIndex + 1}`}</h2>
              <p>{questions[currentQuestionIndex]?.question}</p>
              {questions[currentQuestionIndex]?.options.map((option, idx) => (
                <div className="option-item" key={idx}>
                  <input
                    type="radio"
                    name={`question${currentQuestionIndex}`}
                    value={option}
                    checked={selectedAnswers[currentQuestionIndex] === option}
                    onChange={() => handleOptionChange(option)}
                  />
                  <label>{option}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="navigation-buttons">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
            <button type="button" onClick={handleNext}>
              {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit Test'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default QuizPage;
