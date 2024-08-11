// import React, { useState, useEffect } from 'react';
// import { Doughnut } from 'react-chartjs-2';
// import { Container, Typography, Button, List, ListItem, ListItemText, ListItemButton } from '@mui/material';
// import { useQuestions } from './QuestionsContext';

// const Mcq = () => {
//     const { questions } = useQuestions();
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));
//     const [showResults, setShowResults] = useState(false);
//     const [correctCount, setCorrectCount] = useState(0);
//     const [incorrectAnswers, setIncorrectAnswers] = useState([]);
//     const [timeLeft, setTimeLeft] = useState(10); // 10 seconds for each question

//     useEffect(() => {
//         if (timeLeft === 0) {
//             handleNextQuestion();
//         }
//         const timer = setInterval(() => {
//             setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
//         }, 1000);

//         return () => clearInterval(timer);
//     }, [timeLeft]);

//     const handleAnswerSelect = (index, answer) => {
//         const updatedAnswers = [...selectedAnswers];
//         updatedAnswers[index] = answer;
//         setSelectedAnswers(updatedAnswers);
//     };

//     const handleNextQuestion = () => {
//         if (currentQuestionIndex < questions.length - 1) {
//             setCurrentQuestionIndex(currentQuestionIndex + 1);
//             setTimeLeft(10); // Reset the timer for the next question
//         } else {
//             calculateResults();
//             setShowResults(true);
//         }
//     };

//     const calculateResults = () => {
//         let count = 0;
//         let incorrect = [];
//         selectedAnswers.forEach((answer, index) => {
//             if (answer === questions[index].correctAnswer) {
//                 count++;
//             } else {
//                 incorrect.push({
//                     question: questions[index].question,
//                     selectedAnswer: answer,
//                     correctAnswer: questions[index].correctAnswer
//                 });
//             }
//         });
//         setCorrectCount(count);
//         setIncorrectAnswers(incorrect);
//     };

//     const doughnutData = {
//         labels: ['Correct', 'Incorrect'],
//         datasets: [
//             {
//                 data: [correctCount, questions.length - correctCount],
//                 backgroundColor: ['#36A2EB', '#FF6384'],
//                 hoverBackgroundColor: ['#36A2EB', '#FF6384']
//             }
//         ]
//     };

//     const doughnutOptions = {
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: {
//             legend: {
//                 position: 'bottom',
//             }
//         }
//     };

//     return (
//         <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: 4 }}>
//             <Typography variant="h4" gutterBottom>
//                 Mock Interview
//             </Typography>
//             {!showResults ? (
//                 <div>
//                     <Typography variant="h6" gutterBottom>
//                         {questions[currentQuestionIndex]?.question}
//                     </Typography>
//                     <List>
//                         {questions[currentQuestionIndex]?.options.map(option => (
//                             <ListItem key={option} disablePadding>
//                                 <ListItemButton
//                                     onClick={() => handleAnswerSelect(currentQuestionIndex, option)}
//                                     selected={selectedAnswers[currentQuestionIndex] === option}
//                                 >
//                                     <ListItemText primary={option} />
//                                 </ListItemButton>
//                             </ListItem>
//                         ))}
//                     </List>
//                     <Typography variant="h6" gutterBottom>
//                         Time Left: {timeLeft}s
//                     </Typography>
//                     <Button 
//                         variant="contained" 
//                         color="primary" 
//                         onClick={handleNextQuestion} 
//                         sx={{ marginTop: 2 }}
//                     >
//                         {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Show Results'}
//                     </Button>
//                 </div>
//             ) : (
//                 <div>
//                     <Typography variant="h6" gutterBottom>
//                         Results
//                     </Typography>
//                     <div style={{ position: 'relative', height: '200px', width: '200px', margin: 'auto' }}>
//                         <Doughnut data={doughnutData} options={doughnutOptions} />
//                     </div>
//                     {incorrectAnswers.length > 0 && (
//                         <div>
//                             <Typography variant="h6" gutterBottom>
//                                 Incorrect Answers
//                             </Typography>
//                             <List>
//                                 {incorrectAnswers.map((item, index) => (
//                                     <ListItem key={index}>
//                                         <ListItemText 
//                                             primary={Q: ${item.question}}
//                                             secondary={Your Answer: ${item.selectedAnswer || 'Unanswered'}, Correct Answer: ${item.correctAnswer}}
//                                         />
//                                     </ListItem>
//                                 ))}
//                             </List>
//                         </div>
//                     )}
//                 </div>
//             )}
//         </Container>
//     );
// };

// export default Mcq;