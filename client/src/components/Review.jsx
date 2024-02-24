import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmark} from '@fortawesome/free-solid-svg-icons'
import "../style/Review.css";

function Review({ questions, closeReview, showReview }) {
    return (
        <>
        <div className={`main ${showReview ? 'show' : ''}`}>
            <div className="page">
            <FontAwesomeIcon icon = {faXmark} className="fa-solid fa-xmark" onClick={closeReview}/>
                <h1 className='Heading'>Review Page</h1>
                <br />
                <div>
                {questions.map((question, index) => (
                    <div key={index}>
                        <p>{question.questionText}</p>
                        <ul>
                            {question.options.map((option, optionIndex) => (
                                <li key={optionIndex}
                                style={{
                                    color: option.isCorrect ? 'green' : 'black',
                                  }}
                                >
                                    {option.text}
                                    {option.isCorrect && <span> (Correct)</span>}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <br />
            <br />
            <div className="btnBoxR">
                <button onClick={closeReview} className='btnR'>Exit</button>
            </div>

            </div>

            </div>

        </>
    )
}

export default Review