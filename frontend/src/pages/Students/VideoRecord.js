import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../../assets/styles/VideoRecord.css';
import MetricsChart from './MetricsChart';
import { toast } from 'react-toastify';
import * as faceapi from 'face-api.js';

const VideoRecord = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [keywords, setKeywords] = useState([]);
    const [recording, setRecording] = useState(false);
    const [videoURL, setVideoURL] = useState('');
    const [recordingCompleted, setRecordingCompleted] = useState(false);
    const [transcription, setTranscription] = useState('');
    const [feedback, setFeedback] = useState('You answers may not directly relate to the question.');
    const [relevance, setRelevance] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [efficiency, setEfficiency] = useState(0);
    const [tabSwitches, setTabSwitches] = useState(0);
    const [expression,setExpression] = useState('');
    const canvasRef = useRef(null);
    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const questionIndex = useRef(0);
    const speechRecognitionRef = useRef(null);
    const detectionIntervalRef = useRef(null);  // For managing face detection interval

    // Fetch JWT token from local storage
    const jwtToken = localStorage.getItem('token');
    const studentId = localStorage.getItem('userId');

    useEffect(() => {
        const loadModels = async () => {
            await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
            await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
            await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
            await faceapi.nets.faceExpressionNet.loadFromUri("/models");
        };
        loadModels();
    }, []);

    useEffect(() => {
        axios.get('http://127.0.0.1:8080/api/questions', {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
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
                setKeywords(questions[questionIndex.current]?.keywords?.split(','));
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
    const getMaxExpression = (expressions) => {
        let maxExpression = '';
        let maxValue = 0;

        for (const [expression, value] of Object.entries(expressions)) {
            if (value > maxValue) {
                maxValue = value;
                maxExpression = expression;
            }
        }

        return { maxExpression, maxValue };
    };

    // FUNCTION TO PLAY VOICE PROMPTS USING SPEECH SYNTHESIS
    const playVoicePrompt = (message) => {
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.lang = "en-US";  // Set language to English
        window.speechSynthesis.speak(utterance);
    };

    // DETECT FACE EXPRESSIONS AND UPDATE CANVAS
    let lastExpression = ''; // Store the last detected expression

    // DETECT FACE EXPRESSIONS AND UPDATE CANVAS
    const faceMyDetect = () => {
        detectionIntervalRef.current = setInterval(async () => {
            try {
                const detections = await faceapi.detectAllFaces(videoRef.current,
                    new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
    
                const data = detections[0]?.expressions;
                if (data) {
                    const { maxExpression, maxValue } = getMaxExpression(data);
                    console.log(`Max Expression: ${maxExpression}, Value: ${maxValue}`);
    
                    // Only update state and play voice prompt if expression changes significantly
                    if (maxExpression !== lastExpression || maxValue > 0.65) {
                        lastExpression = maxExpression; // Update last detected expression
                        setExpression(maxExpression);
    
                        // Play voice prompts based on expression
                        if (maxExpression === 'sad') {
                            playVoicePrompt("Don't be sad.");
                        } else if (maxExpression === 'angry') {
                            playVoicePrompt("Don't be angry ,take some time!");
                        } else if (maxExpression === 'surprised') {
                            playVoicePrompt("Wow, you seem surprised!");
                        }
                        else if (maxExpression === 'fearful') {
                            playVoicePrompt("Dont panic!.");
                        }
                    }
    
                    // DRAW FACE DETECTIONS ON CANVAS
                    canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
                    faceapi.matchDimensions(canvasRef.current, {
                        width: 940,
                        height: 650
                    });
    
                    const resized = faceapi.resizeResults(detections, {
                        width: 940,
                        height: 650
                    });
    
                    faceapi.draw.drawDetections(canvasRef.current, resized);
                    faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
                    faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
                }
            } catch (e) {
                console.log(e);
            }
        }, 5000);
    };
    
    const analyzeText = (text) => {
        const answerKeywords = text.toLowerCase().split(' ');
        console.log(answerKeywords);
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
        setRecording(true);
        faceMyDetect();
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((currentStream) => {
                videoRef.current.srcObject = currentStream;
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const stopRecording = async () => {
        setRecording(false);

        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
            mediaRecorderRef.current.stop();
        }

        if (videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        }

        if (detectionIntervalRef.current) {
            clearInterval(detectionIntervalRef.current);  // Stop face detection interval
        }

        setRecordingCompleted(true);
        speechRecognitionRef.current.stop();

        let accuracy='21';
        let relevance='27';
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
            accuracy: feedbackData.accuracy,
            efficiency: feedbackData.efficiency,
            relevance: feedbackData.relevance,
            rating: feedbackData.rating,
            feedback: feedbackData.feedback
        };

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
                        <video className='video-frame' ref={videoRef} muted autoPlay></video>
                        {recording && <canvas ref={canvasRef} width="940" height="650" className="appcanvas" />}
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
                            <video src={videoURL} width="400" controls className="video-preview" />
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
                            relevance='20'
                            accuracy='25' 
                            efficiency='27'
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
};
export default VideoRecord;



// const mockQuestions = [
//     "Tell me about yourself.",
//     "Why do you want this job?",
//     "What are your strengths and weaknesses?",
//     "Describe a challenge you faced and how you handled it.",
//     "Where do you see yourself in 5 years?"
// ];

// function VideoRec() {
//     const videoRef = useRef()
//     const canvasRef = useRef()
//     const [expression, setExpression] = useState("");
//     // LOAD FROM USEEFFECT
//     useEffect(() => {
//         const loadModels = async () => {

//             await faceapi.nets.tinyFaceDetector.loadFromUri("/models")
//             await faceapi.nets.faceLandmark68Net.loadFromUri("/models")
//             await faceapi.nets.faceRecognitionNet.loadFromUri("/models")
//             await faceapi.nets.faceExpressionNet.loadFromUri("/models")

//             faceMyDetect();
//         }
//         loadModels()
//     }, [])



//     // OPEN YOU FACE WEBCAM
//     const startVideo = () => {
//         navigator.mediaDevices.getUserMedia({ video: true })
//             .then((currentStream) => {
//                 videoRef.current.srcObject = currentStream
//             })
//             .catch((err) => {
//                 console.log(err)
//             })
//     }
//     // LOAD MODELS FROM FACE API

//     const getMaxExpression = (expressions) => {
//         let maxExpression = '';
//         let maxValue = 0;

//         for (const [expression, value] of Object.entries(expressions)) {
//             if (value > maxValue) {
//                 maxValue = value;
//                 maxExpression = expression;
//             }
//         }

//         return { maxExpression, maxValue };
//     };


//     const faceMyDetect = () => {
//         setInterval(async () => {
//             try{

//                 const detections = await faceapi.detectAllFaces(videoRef.current,
//                     new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
//             const data = detections[0]?.expressions;
//             if(data){
//                 const { maxExpression, maxValue } = getMaxExpression(data);
//                 console.log(`Max Expression: ${maxExpression}, Value: ${maxValue}`);
//             }

//             // DRAW YOU FACE IN WEBCAM
//             canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(videoRef.current)
//             faceapi.matchDimensions(canvasRef.current, {
//                 width: 940,
//                 height: 650
//             })

//             const resized = faceapi.resizeResults(detections, {
//                 width: 940,
//                 height: 650
//             })
            
//             faceapi.draw.drawDetections(canvasRef.current, resized)
//             faceapi.draw.drawFaceLandmarks(canvasRef.current, resized)
//             faceapi.draw.drawFaceExpressions(canvasRef.current, resized)
//         }
//          catch(e){
//              console.log(e)
//          }   
            
//         }, 1000)
//     }


//     return (
//         <div className="myapp">
//             <h1>FAce Detection</h1>
//             <button style={{zIndex:100}} onClick={startVideo}>Start</button>
//             <div className="appvide">
//                 <video className='video' crossOrigin="anonymous" ref={videoRef} autoPlay></video>
//             <canvas ref={canvasRef} width="940" height="650"
//                 className="appcanvas" />
//             </div>
//         </div>
//     );
// }

// export default VideoRec;