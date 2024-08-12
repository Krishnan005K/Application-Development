import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../../assets/styles/VideoRecord.css';
import MetricsChart from './MetricsChart';
import { toast } from 'react-toastify';

const VideoRecord = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [keywords, setKeywords] = useState([]);
    const [recording, setRecording] = useState(false);
    const [videoURL, setVideoURL] = useState('');
    const [recordingCompleted, setRecordingCompleted] = useState(false);
    const [transcription, setTranscription] = useState('');
    const [feedback, setFeedback] = useState('');
    const [relevance, setRelevance] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [efficiency, setEfficiency] = useState(0);
    const [tabSwitches, setTabSwitches] = useState(0);

    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const questionIndex = useRef(0);
    const speechRecognitionRef = useRef(null);

    // Fetch JWT token from local storage
    const jwtToken = localStorage.getItem('token');
    const studentId = localStorage.getItem('userId');

    useEffect(() => {
        axios.get('http://127.0.0.1:8080/api/questions', {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then(response => {
                const fetchedQuestions = response.data;
                setQuestions(fetchedQuestions);
                if (fetchedQuestions.length > 0) {
                    setCurrentQuestion(fetchedQuestions[0].questionText);
                    setKeywords(fetchedQuestions[0].keywords.split(','));
                }
            })
            .catch(error => {
                console.error("There was an error fetching the questions!", error);
            });
    }, [jwtToken]);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden && recording) {
                setTabSwitches(prev => {
                    const newCount = prev + 1;
                    if (newCount >= 3) {
                        alert("Final tab switch count reached. The interview has ended.");
                        stopRecording();
                    } else {
                        alert(`Tab switches: ${newCount}`);
                    }
                    return newCount;
                });
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [recording]);

    useEffect(() => {
        if (recording) {
            const questionInterval = setInterval(() => {
                questionIndex.current = (questionIndex.current + 1) % questions.length;
                setCurrentQuestion(questions[questionIndex.current].questionText);
                setKeywords(questions[questionIndex.current].keywords.split(','));
            }, 10000);
            return () => clearInterval(questionInterval);
        }
    }, [recording, questions]);

    useEffect(() => {
        if ('webkitSpeechRecognition' in window) {
            const SpeechRecognition = window.webkitSpeechRecognition;
            speechRecognitionRef.current = new SpeechRecognition();
            speechRecognitionRef.current.continuous = true;
            speechRecognitionRef.current.interimResults = true;
            speechRecognitionRef.current.lang = 'en-US';

            speechRecognitionRef.current.onresult = (event) => {
                let interimTranscription = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    if (event.results[i].isFinal) {
                        setTranscription(prev => prev + event.results[i][0].transcript + ' ');
                    } else {
                        interimTranscription += event.results[i][0].transcript;
                    }
                }
                setTranscription(prev => prev + interimTranscription);
            };

            speechRecognitionRef.current.onerror = (event) => {
                toast.error('Speech recognition error', event);
            };
        } else {
            toast.error('Speech Recognition API not supported in this browser.');
        }
    }, []);

    useEffect(() => {
        if (transcription) {
            analyzeTranscription(transcription);
        }
    }, [transcription]);

    const analyzeText = (text) => {
        const answerKeywords = text.toLowerCase().split(' ');
        const keywordMatch = keywords.filter(keyword => answerKeywords.includes(keyword)).length;
        const totalKeywords = keywords.length;

        let relevance = (keywordMatch / totalKeywords) * 100;
        let accuracy = Math.min(100, Math.max(0, relevance));
        let efficiency = Math.min(100, Math.max(0, keywordMatch));

        setRelevance(relevance);
        setAccuracy(accuracy);
        setEfficiency(efficiency);

        let feedbackMessage = '';
        if (relevance > 50) {
            feedbackMessage = 'Your answer is relevant to the question.';
        } else {
            feedbackMessage = 'Your answer may not be directly related to the question.';
        }
        setFeedback(feedbackMessage);
    };

    const analyzeTranscription = (transcription) => {
        const answer = transcription.trim();
        analyzeText(answer);
    };

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
            speechRecognitionRef.current.start();
        });
    };

    const stopRecording = async() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
            mediaRecorderRef.current.stop();
        }
        if (videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        }
        setRecording(false);
        setRecordingCompleted(true);
        speechRecognitionRef.current.stop();

        // Post feedback to the backend
        const feedbackData = {
            feedback,
            accuracy,
            relevance,
            efficiency,
            rating: (accuracy + relevance + efficiency) / 3 
        };

        const newData = {
            id: 0,
          accuracy:feedbackData.accuracy,
          efficiency:feedbackData.efficiency,
          relevance:feedbackData.relevance,
          rating:feedbackData.rating,
          feedback:feedbackData.feedback
        }
        await axios.post(`http://127.0.0.1:8080/api/feedbacks/students/${studentId}`, newData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log("Feedback saved successfully:", response.data);
            })
            .catch(error => {
                console.log(feedbackData);
                toast.error("There was an error saving the feedback!", error);
            });
    };

    return (
        <div className="demo-container">
            <h1>Mock Interview</h1>
            {!recordingCompleted ? (
                <>
                    <div className={`video-container ${currentQuestion ? 'large' : ''}`}>
                        <video ref={videoRef} className="video-frame" muted />
                    </div>
                    <div className="button-container">
                        {!recording ? (
                            <button className="start-button" onClick={startRecording}>Start Recording</button>
                        ) : (
                            <button className="stop-button" onClick={stopRecording}>Stop Recording</button>
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
                <div className="video-preview-container">
                    {videoURL && (
                        <>
                            <h2>Recorded Video:</h2>
                            <video src={videoURL} width="400"   controls className="video-preview" />
                        </>
                    )}
                    {feedback && (
                        <div className="feedback-container">
                            <h2>Feedback:</h2>
                            <p>{feedback}</p>
                        </div>
                    )}
                    <div className="chart-container">
                        <MetricsChart 
                            relevance={relevance} 
                            accuracy={accuracy} 
                            efficiency={efficiency}
                        />
                    </div>
                </div>
            )}
            <div className="tab-switches-count">
                <h2>Tab Switches Count:</h2>
                <p>{tabSwitches}</p>
            </div>
        </div>
    );
}

export default VideoRecord;
