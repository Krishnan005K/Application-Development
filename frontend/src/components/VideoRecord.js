import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';  // Adjust the path as necessary
import '../assets/styles/VideoRecord.css';  // Import the CSS file for styling
import record from '../assets/images/record.png';
import end from '../assets/images/end.png';

const mockQuestions = [
    "Tell me about yourself.",
    "Why do you want this job?",
    "What are your strengths and weaknesses?",
    "Describe a challenge you faced and how you handled it.",
    "Where do you see yourself in 5 years?"
];

function VideoRec() {
    const { isAuthenticated } = useAuth();
    const [recording, setRecording] = useState(false);
    const [videoURL, setVideoURL] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [recordingCompleted, setRecordingCompleted] = useState(false);
    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const questionIndex = useRef(0);

    useEffect(() => {
        let questionInterval;
        if (recording) {
            setCurrentQuestion(mockQuestions[questionIndex.current]);
            questionInterval = setInterval(() => {
                questionIndex.current = (questionIndex.current + 1) % mockQuestions.length;
                setCurrentQuestion(mockQuestions[questionIndex.current]);
            }, 10000);
        } else {
            setCurrentQuestion('');
            questionIndex.current = 0;
        }
        return () => clearInterval(questionInterval);
    }, [recording]);

    const startRecording = () => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
            videoRef.current.srcObject = stream;
            videoRef.current.play();

            mediaRecorderRef.current = new MediaRecorder(stream);
            mediaRecorderRef.current.ondataavailable = (event) => {
                const blob = new Blob([event.data], { type: 'video/webm' });
                setVideoURL(URL.createObjectURL(blob));
            };
            mediaRecorderRef.current.start();
            setRecording(true);
        });
    };

    const stopRecording = () => {
        mediaRecorderRef.current.stop();
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        setRecording(false);
        setRecordingCompleted(true);
    };

    if (!isAuthenticated) {
        return <p>You must be signed in to access this page.</p>;
    }

    return (
        <div className="video-rec-container">
            <h1 style={{ textAlign: "center", color: "#2f65ad" }}>Mock Interview</h1>
            <br />
            {!recordingCompleted ? (
                <>
                    <div className={`video-container ${currentQuestion ? 'large' : ''}`}>
                        <video
                            ref={videoRef}
                            controls
                            className="video-frame"
                        />
                    </div>
                    <div>
                        {!recording ? (
                            <button onClick={startRecording} style={{ border: "none" }}><img src={record} style={{ width: '40px', height: '40px' }} /></button>
                        ) : (
                            <button onClick={stopRecording} style={{ border: "none" }}><img src={end} style={{ width: '40px', height: '40px' }} /></button>
                        )}
                    </div>
                    {currentQuestion && (
                        <div className="question-popup">
                            <h2>Current Question:</h2>
                            <p>{currentQuestion}</p>
                        </div>
                    )}
                </>
            ) : (
                <div>
                    {videoURL && (
                        <>
                            <h2>Recorded Video:</h2>
                            <br />
                            <video src={videoURL} width="400" controls />
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default VideoRec;
