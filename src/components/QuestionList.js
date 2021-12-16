import React from "react";
import { useState, useEffect } from "react/cjs/react.development";
import QuestionItem from "./QuestionItem";

function QuestionList() {

  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(resp => resp.json())
    .then(questions => setQuestions(questions))
  }, [])

  function onDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
    .then(resp => resp.json())
    .then(() => {
      const updatedQuestions = questions.filter(question => question.id !== id);
      setQuestions(updatedQuestions);
    })
  }

  function onAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers:  {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ correctIndex })
    })
    .then(resp => resp.json)
    .then(updatedQuestion => {
      const updatedQuestions = questions.map(question => {
        if (question.id === updatedQuestion.id) return updatedQuestion;
        return question;
      })
      setQuestions(updatedQuestions);
    })

  }


  const questionItems = questions.map(question => (
    <QuestionItem 
      key={question.id}
      question={question}
      onDeleteClick={onDeleteClick}
      onAnswerChange={onAnswerChange}
    />
  ))

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );

}

export default QuestionList;
