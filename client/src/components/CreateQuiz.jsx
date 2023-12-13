import React, { useEffect, useState } from "react";
import AlertModal from "./AlertModal";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../style/style.css";
import { useSelector } from "react-redux";

export const CreateQuiz = ({ quizUpdate, listingId }) => {
  const helpAlertModalIdentify = true;
  const navigate = useNavigate();
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [showFinalResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [numberOfQues, setNumberOfQues] = useState(0);
  //   const [convertButton, setConvertButton] = useState("Next");
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState(
    Array.from({ length: 1 }, () => ({
      questionText: "",
      options: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
    }))
  ); // Initialize with 1 questions

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "questionText" || name === "Value") {
      const updatedQuestions = [...questions];
      updatedQuestions[currentQuestion] = {
        ...updatedQuestions[currentQuestion],
        [name]: value,
      };
      setQuestions(updatedQuestions);
    }
  };

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch(`http://localhost:3001/API/listing/get/${listingId}`);
        const data = await res.json();
  
        if (data.success === false) {
          console.log(data.message);
          return;
        }
  
        if (quizUpdate === true) {
          // Transform data to match the initial state structure
          const transformedData = {
            quizTitle: data.title,
            questions: data.questions.map((question) => ({
              questionText: question.questionText,
              options: question.options.map((option) => ({
                text: option.text,
                isCorrect: option.isCorrect,
              })),
            })),
          };
  
          setQuizTitle(transformedData.quizTitle);
          // Set the number of questions based on the fetched data
          setNumberOfQues(transformedData.questions.length);
          setQuestions(transformedData.questions);
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };
  
    if (quizUpdate === true) {
      // Reset questions before fetching new data
      setQuestions([]);
      fetchQuiz();
    }
  }, [listingId, quizUpdate]);

  const handleAddQuestion = () => {
    if (currentQuestion + 1 < numberOfQues) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setNumberOfQues(numberOfQues + 1);
      setQuestions((prevQuestions) => [
        ...prevQuestions,
        {
          questionText: "",
          options: [
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
          ],
        },
      ]);
    }
  };

  const handleRemoveQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setQuestions((prevQuestions) => {
        const updatedQuestions = [...prevQuestions];
        updatedQuestions.splice(currentQuestion, 1);
        return updatedQuestions;
      });
    }
  };

  const handleNumberOfQuesChange = (event) => {
    const newNumberOfQues = parseInt(event.target.value, 10);
  
    if (!isNaN(newNumberOfQues)) {
      setNumberOfQues(newNumberOfQues);
  
      // Update the questions array accordingly
      if (newNumberOfQues > questions.length) {
        // If increasing the number of questions, add new questions
        setQuestions((prevQuestions) => [
          ...prevQuestions,
          ...Array.from({ length: newNumberOfQues - prevQuestions.length }, () => ({
            questionText: "",
            options: [
              { text: "", isCorrect: false },
              { text: "", isCorrect: false },
              { text: "", isCorrect: false },
              { text: "", isCorrect: false },
            ],
          })),
        ]);
      } else if (newNumberOfQues < questions.length) {
        // If decreasing the number of questions, remove extra questions
        setQuestions((prevQuestions) => prevQuestions.slice(0, newNumberOfQues));
      }
    } else {
      // Handle the case when the input is not a valid number
      setNumberOfQues(0);
    }
  };
  

  const PreviousQues = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleOptionChange = (optionIndex, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestion].options[optionIndex] = {
      ...updatedQuestions[currentQuestion].options[optionIndex],
      [event.target.name]: event.target.value,
    };
    setQuestions(updatedQuestions);
  };

  const URL = quizUpdate
    ? `http://localhost:3001/API/listing/update/${listingId}`
    : "http://localhost:3001/API/listing/create";

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const quizData = {
        title: quizTitle,
        questions,
        userRef: currentUser._id,
      };
      // console.log(quizData);
      const res = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(quizData),
      });

      if (res.ok) {
        const data = await res.json();
        // Handle the response data if needed
        // console.log(data);
        closeAlert();
        alert("Successfully Uploaded Quiz!!");
        setTimeout(navigate("/home"), 3000);
      } else {
        console.error("Failed to save quiz data:", res.status, res.statusText);
      }
    } catch (error) {
      console.error("Error during quiz data submission:", error.message);
      alert(error.message);
    }
  };

  const closeAlert = () => setShowAlertModal(false);
  

  return (
    <>
      {/* {console.log(currentUser._id)} */}
      <div className="quiz-app-UI-design">
        <div className="div1">
          <div className="overlap1">
            <div className="rectangle">
              <div className="QuestionText">
                <div className="quizTitle">
                  <label htmlFor="quizTitle">Quiz Title: </label>
                  <input
                    type="text"
                    id="quizTitle"
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="fname">
                    {" "}
                    <div>No. of Questions: </div>
                  </label>

                  <input
                    type="text"
                    id="no.OfQues"
                    className="no.OfQues"
                    name="Questions"
                    value={numberOfQues}
                    onChange={handleNumberOfQuesChange}
                  />
                </div>
              </div>
            </div>
            <div className="ellipse1" />
            <div className="ellipse1-2" />
            <div className="ellipse1-3" />

            <Link to="/home">
              <svg
                className="frame1"
                width="32"
                height="30"
                viewBox="0 0 32 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.6461 23.6604L16.5561 24.6771C16.0945 25.1076 15.3482 25.1076 14.8915 24.6771L5.34617 15.7786C4.88461 15.3481 4.88461 14.6519 5.34617 14.226L14.8915 5.32288C15.3531 4.89237 16.0994 4.89237 16.5561 5.32288L17.6461 6.33959C18.1126 6.77467 18.1028 7.48454 17.6265 7.91046L11.7097 13.1681H25.8216C26.4746 13.1681 27 13.6581 27 14.2672V15.7328C27 16.3419 26.4746 16.8319 25.8216 16.8319H11.7097L17.6265 22.0895C18.1077 22.5155 18.1175 23.2253 17.6461 23.6604Z"
                  fill="white"
                  fillOpacity="0.9"
                />
              </svg>
            </Link>

            <div className="ellipse1-4" />
            <div className="rectangle1-2" />
            <div className="group1">
              <div className="overlap-group1">
                <svg
                  className="img1"
                  width="57"
                  height="57"
                  viewBox="0 0 57 57"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M57 28.5C57 44.2401 44.2401 57 28.5 57C12.7599 57 0 44.2401 0 28.5C10 28.5 28.5 20 28.5 0C44.2401 0 57 12.7599 57 28.5Z"
                    fill="#FEB005"
                  />
                </svg>
                <div className="ellipse1-5" />
                <div className="text-wrapper1">{currentQuestion + 1}</div>
              </div>
            </div>
            <div className="rectangle1-3" />
            <div className="rectangle1-4" />
            <div className="text-wrapper1-2"></div>
            <div className="text-wrapper1-3">
              Question {currentQuestion + 1}/{numberOfQues}
            </div>
            <div className="quiz-score flex">
              <span idname="correct-score"></span>/
              <span idname="total-question"></span>
            </div>
            <p className="how-many-students-in1">
              <textarea
                className="textarea"
                name="questionText"
                onChange={handleChange}
                placeholder="Enter Your Question Here"
                rows="3"
                cols="30"
                value={questions[currentQuestion]?.questionText || ""}
              ></textarea>
              {/* <input type="text" /> */}
            </p>

            <ul className="quiz-options">
              {[...Array(4)].map((_, optionIndex) => (
                <React.Fragment key={optionIndex}>
                  <li className="LI">
                    <input
                      type="text"
                      placeholder={`Option ${optionIndex + 1}`}
                      className="Options"
                      name="text"
                      onChange={(e) => handleOptionChange(optionIndex, e)}
                      value={
                        questions[currentQuestion]?.options[optionIndex]
                          ?.text || ""
                      }
                    />
                  </li>
                  <li className="ValueBox">
                    <select
                      className="Value"
                      name="isCorrect"
                      onChange={(e) => handleOptionChange(optionIndex, e)}
                      value={
                        questions[currentQuestion]?.options[optionIndex]
                          ?.isCorrect || ""
                      }
                    >
                      <option value="">Select</option>
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  </li>
                </React.Fragment>
              ))}
            </ul>
            <div className="btnBox">
              <button className="btn" onClick={PreviousQues}>
                Previous
              </button>
              {currentQuestion != numberOfQues - 1 && (
                <button
                  type="button"
                  className="btnP"
                  onClick={handleAddQuestion}
                  // disabled={!questions[currentQuestion].questionText}
                >
                  Next
                </button>
              )}
              {currentQuestion === numberOfQues - 1 && (
                <button
                  type="button"
                  className="btnP"
                  onClick={() => {
                    setShowAlertModal(true);
                  }}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
        {showAlertModal && (
          <AlertModal
            helpAlertModalIdentify={helpAlertModalIdentify}
            handleSubmit={handleSubmit}
            closeAlert={closeAlert}
          />
        )}
      </div>
    </>
  );
};

export default CreateQuiz;
