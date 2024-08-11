// import React, { createContext, useState, useContext } from 'react';

// const QuestionsContext = createContext();

// export const QuestionsProvider = ({ children }) => {
//     const [questions, setQuestions] = useState([]);

//     const addQuestion = (question) => {
//         setQuestions([...questions, question]);
//     };

//     const updateQuestion = (index, updatedQuestion) => {
//         const updatedQuestions = questions.map((q, i) => i === index ? updatedQuestion : q);
//         setQuestions(updatedQuestions);
//     };

//     const deleteQuestion = (index) => {
//         const updatedQuestions = questions.filter((_, i) => i !== index);
//         setQuestions(updatedQuestions);
//     };

//     return (
//         <QuestionsContext.Provider value={{ questions, addQuestion, updateQuestion, deleteQuestion }}>
//             {children}
//         </QuestionsContext.Provider>
//     );
// };

// export const useQuestions = () => useContext(QuestionsContext);