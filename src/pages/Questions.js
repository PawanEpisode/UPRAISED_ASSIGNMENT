import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { decode } from "html-entities";
import { handleQuestionsChange, handleScoreChange } from "../redux/actions";
import Next from "../assets/Next.png";
import ColorfulContainer from "../assets/ColorfulContainer.png";
import SelectedTick from "../assets/SelectedTick.png";
import QuestionImage1 from "../assets/QuestionImage1.png";
import {
  convertMillisecondsToTime,
  getUpdatedQuestion,
  shuffle,
} from "../helper";

import "./Questions.scss";

const Questions = () => {
  const { questions, score } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);

  const [startTimer, setStartTimer] = useState(0);

  useEffect(() => {
    const updatedQuestions = getUpdatedQuestion(questions);
    dispatch(handleQuestionsChange([...updatedQuestions]));
    setStartTimer(Date.now());
  }, []);

  useEffect(() => {
    if (questions.length) {
      const { correct_answer = [], incorrect_answers = [] } =
        questions?.[questionIndex];
      setOptions(shuffle([...incorrect_answers, ...correct_answer]));
    }
  }, [questions, questionIndex]);

  const addTimeTakenAndSelectedOptionToEachQuestion = (TimeTaken) => {
    const updatedQuestions = [...questions];
    const currentQuestionObject = { ...questions?.[questionIndex] };
    const updatedCurrentQuestionObject = {
      ...currentQuestionObject,
      TimeTaken: { ...convertMillisecondsToTime(TimeTaken) },
      SelectedOption: [...selectedOption]
    };
    updatedQuestions[questionIndex] = { ...updatedCurrentQuestionObject };

    dispatch(handleQuestionsChange(updatedQuestions));
  };

  const isAnyOptionClicked =
    selectedOption?.some((item) => item.length > 0) ?? false;

  const HandleScoreIncrement = () => {
    console.log("score", selectedOption);
    const correctAnswer = decode(questions?.[questionIndex]?.correct_answer);
    const IsCorrectAnswer =
      correctAnswer.length === selectedOption.length &&
      correctAnswer.every((option) => selectedOption.includes(option))
        ? 1
        : 0;
    console.log("score", correctAnswer, IsCorrectAnswer);
    if (IsCorrectAnswer) {
      dispatch(handleScoreChange(score + 1));
    }
  };

  const handleNextButton = () => {
    if (questionIndex + 1 <= questions.length && isAnyOptionClicked) {
      HandleScoreIncrement();
      setQuestionIndex(questionIndex + 1);
      addTimeTakenAndSelectedOptionToEachQuestion(Date.now() - startTimer);
      setSelectedOption([]);
      setStartTimer(Date.now());
    }
    if (questionIndex + 1 === questions.length && isAnyOptionClicked) {
      navigate("/score");
    }
  };

  const handleOptionSelect = (option) => {
    const updatedOption = [...selectedOption];

    if (!selectedOption.includes(option)) {
      updatedOption.push(option);
      setSelectedOption(updatedOption);
    }
  };
  const progressDegree = ((questionIndex + 1) * 360) / questions?.length;
  const hasImage = questions?.[questionIndex]?.hasImage;
  console.log("questions", questions, score, selectedOption, options);
  return (
    <>
      {questionIndex < questions.length ? (
        <div className="QuizApp">
          <div className="questionWrapper">
            <img src={ColorfulContainer} alt="ColorfulContainer" />
            <div className="questionBackground">
              {
                <>
                  <div className="progress-container">
                    <div
                      className="circular-progress"
                      style={{
                        background: `conic-gradient(#44B77B ${progressDegree}deg, #F3F4FA 0deg)`,
                      }}
                    >
                      <div className="progressTextContainer">
                        <span className="progressText">
                          {questionIndex + 1}
                        </span>
                        <span className="totalQuestion">{`/${questions.length}`}</span>
                      </div>
                    </div>
                  </div>
                  <div className="Question">
                    <span className="question">
                      {decode(questions?.[questionIndex]?.question)}
                    </span>
                    {hasImage ? (
                      <img
                        className="question-img"
                        src={QuestionImage1}
                        alt="questionImage1"
                      />
                    ) : null}
                    {options?.map((option, index) => (
                      <div
                        className={`answer ${
                          selectedOption.includes(decode(option))
                            ? "selected"
                            : ""
                        }`}
                        key={index}
                        onClick={() => handleOptionSelect(decode(option))}
                      >
                        {selectedOption.includes(decode(option)) ? (
                          <img src={SelectedTick} alt="tick" />
                        ) : (
                          <div className="circle"></div>
                        )}
                        {decode(option)}
                      </div>
                    ))}
                    <div className="question-nextButton">
                      <div className="nextButton" onClick={handleNextButton}>
                        <img
                          className="nextButtonImg"
                          src={Next}
                          alt="NextButton"
                        />
                      </div>
                    </div>
                  </div>
                </>
              }
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Questions;
