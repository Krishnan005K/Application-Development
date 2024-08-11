// import React, { useState } from 'react';
// import { Container, Typography, TextField, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
// import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
// import { useQuestions } from './QuestionsContext';

// const Interviewer = () => {
//     const { questions, addQuestion, updateQuestion, deleteQuestion } = useQuestions();
//     const [editMode, setEditMode] = useState(false);
//     const [newQuestion, setNewQuestion] = useState({ question: '', options: ['', '', '', ''], correctAnswer: '' });
//     const [editQuestionIndex, setEditQuestionIndex] = useState(null);

//     const handleAddQuestion = () => {
//         addQuestion(newQuestion);
//         setNewQuestion({ question: '', options: ['', '', '', ''], correctAnswer: '' });
//     };

//     const handleEditQuestion = () => {
//         updateQuestion(editQuestionIndex, newQuestion);
//         setNewQuestion({ question: '', options: ['', '', '', ''], correctAnswer: '' });
//         setEditMode(false);
//         setEditQuestionIndex(null);
//     };

//     const handleDeleteQuestion = (index) => {
//         deleteQuestion(index);
//     };

//     const handleQuestionChange = (e) => {
//         setNewQuestion({ ...newQuestion, [e.target.name]: e.target.value });
//     };

//     const handleOptionChange = (index, e) => {
//         const updatedOptions = [...newQuestion.options];
//         updatedOptions[index] = e.target.value;
//         setNewQuestion({ ...newQuestion, options: updatedOptions });
//     };

//     return (
//         <Container>
//             <Typography variant="h4" gutterBottom>
//                 Interviewer Panel
//             </Typography>
//             {editMode ? (
//                 <div>
//                     <TextField
//                         label="Question"
//                         name="question"
//                         value={newQuestion.question}
//                         onChange={handleQuestionChange}
//                         fullWidth
//                         sx={{ marginBottom: 2 }}
//                     />
//                     {newQuestion.options.map((option, index) => (
//                         <TextField
//                             key={index}
//                             label={`Option ${index + 1}`}
//                             value={option}
//                             onChange={(e) => handleOptionChange(index, e)}
//                             fullWidth
//                             sx={{ marginBottom: 2 }}
//                         />
//                     ))}
//                     <TextField
//                         label="Correct Answer"
//                         name="correctAnswer"
//                         value={newQuestion.correctAnswer}
//                         onChange={handleQuestionChange}
//                         fullWidth
//                         sx={{ marginBottom: 2 }}
//                     />
//                     <Button 
//                         variant="contained" 
//                         color="primary" 
//                         onClick={editQuestionIndex !== null ? handleEditQuestion : handleAddQuestion}
//                         sx={{ marginRight: 2 }}
//                     >
//                         {editQuestionIndex !== null ? 'Save Changes' : 'Add Question'}
//                     </Button>
//                     <Button 
//                         variant="contained" 
//                         color="secondary" 
//                         onClick={() => { setEditMode(false); setEditQuestionIndex(null); }}
//                     >
//                         Cancel
//                     </Button>
//                 </div>
//             ) : (
//                 <div>
//                     <Button 
//                         variant="contained" 
//                         color="primary" 
//                         onClick={() => setEditMode(true)}
//                         startIcon={<AddIcon />}
//                         sx={{ marginBottom: 2 }}
//                     >
//                         Add Question
//                     </Button>
//                     <List>
//                         {questions.map((question, index) => (
//                             <ListItem key={index}>
//                                 <ListItemText
//                                     primary={question.question}
//                                     secondary={`Options: ${question.options.join(', ')}` | `Correct Answer: ${question.correctAnswer}`}
//                                 />
//                                 <IconButton 
//                                     onClick={() => { setEditMode(true); setNewQuestion(question); setEditQuestionIndex(index); }}
//                                 >
//                                     <EditIcon />
//                                 </IconButton>
//                                 <IconButton onClick={() => handleDeleteQuestion(index)}>
//                                     <DeleteIcon />
//                                 </IconButton>
//                             </ListItem>
//                         ))}
//                     </List>
//                 </div>
//             )}
//         </Container>
//     );
// };

// export default Interviewer;