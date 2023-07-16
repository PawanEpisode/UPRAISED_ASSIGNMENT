import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { decode } from "html-entities";
import axios from "axios";
import {
  handleAmountChange,
  handleQuestionsChange,
  handleScoreChange,
} from "../redux/actions";
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
import QuestionError from "./QuestionError";
import { Box, CircularProgress } from "@mui/material";
import Loading from "../components/Loading";

const Questions = () => {
  // Getting questions,amount_of_question, question_category
  // question_difficulty, question_type and score value from store
  const {
    questions,
    score,
    amount_of_question,
    question_category,
    question_difficulty,
    question_type,
  } = useSelector((state) => state);

  // using navigate to just navigate between the routes
  const navigate = useNavigate();

  //using dispatch to Update Values for each actionType
  const dispatch = useDispatch();

  // State = questionIndex(current question index),
  // options( all options of current question),
  // selectedOption(options clicked)
  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);

  // startTimer will store the value for how much time the user took for a
  // particular question (time between appearance of question To Clicking the next question button)
  const [startTimer, setStartTimer] = useState(0);

  useEffect(() => {
    let apiUrl = `/api.php?amount=${amount_of_question}`;

    // concatenating in api url based on question_category
    if (question_category) {
      apiUrl = apiUrl.concat(`&category=${question_category}`);
    }

    // concatenating in api url based on question_difficulty
    if (question_difficulty) {
      apiUrl = apiUrl.concat(`&difficulty=${question_difficulty}`);
    }

    // concatenating in api url based on question_type
    if (question_type) {
      apiUrl = apiUrl.concat(`&type=${question_type}`);
    }

    axios
      .get(apiUrl)
      .then((response) => {
        const Data = response?.data;
        const responseCode = Data?.response_code;
        if (responseCode === 0) {
          // updated questions by adding new key-pair(hasImage, correct_answer)
          const updatedQuestions = getUpdatedQuestion([...Data?.results]);
          dispatch(handleQuestionsChange([...updatedQuestions]));
        } else {
          dispatch(handleScoreChange(0));
          dispatch(handleAmountChange(5));
          navigate("/questionError");
        }
      })
      .catch((err) => {
        navigate("/");
      });

    // timer starts for a question
    setStartTimer(Date.now());
  }, []);

  useEffect(() => {
    if (questions.length) {
      const { correct_answer = [], incorrect_answers = [] } =
        questions?.[questionIndex];
      // Adding correct_answer AND incorrect_answers array into one array and shuffling the option
      // updating the options value
      setOptions(
        shuffle(
          [...incorrect_answers, ...correct_answer].map((item) => decode(item))
        )
      );
    }
    // update option after questions or questionIndex updates
  }, [questions, questionIndex]);

  // if loading in any api, show CircularProgress AND Loading
  if (!questions?.length) {
    return (
      <>
        <Box mt={20}>
          <CircularProgress />
        </Box>
        <Loading />
      </>
    );
  }

  // updating question value by adding new key-pair(TimeTaken, SelectedOption) in the store
  const addTimeTakenAndSelectedOptionToEachQuestion = (TimeTaken) => {
    const updatedQuestions = [...questions];
    const currentQuestionObject = { ...questions?.[questionIndex] };
    const updatedCurrentQuestionObject = {
      ...currentQuestionObject,
      // time taken how much user took for a question
      TimeTaken: { ...convertMillisecondsToTime(TimeTaken) },
      // SelectedOption : user selected option for each question
      SelectedOption: [...selectedOption],
    };
    updatedQuestions[questionIndex] = { ...updatedCurrentQuestionObject };

    dispatch(handleQuestionsChange(updatedQuestions));
  };

  // Checking if user has clicked any option
  const isAnyOptionClicked =
    selectedOption?.some((item) => item.length > 0) ?? false;

  // Function to verify if User has clicked the right options , incrementing the score
  const HandleScoreIncrement = () => {
    const correctAnswer = (questions?.[questionIndex]?.correct_answer).map(
      (item) => decode(item)
    ); // decoding html-entities

    // correctAnswer must be same length  and each element in selectedOption must be in the correctAnswer array
    const IsCorrectAnswer =
      correctAnswer.length === selectedOption.length &&
      // all the correct answer should be in the selected option
      correctAnswer.every((option) => selectedOption.includes(option))
        ? 1
        : 0;

    // increment the score value in store if Correct Options are clicked
    if (IsCorrectAnswer) {
      dispatch(handleScoreChange(score + 1));
    }
  };

  // Function to handle Next Button
  const handleNextButton = () => {
    // Nothing happens if questionIndex is greater than questions.length
    // Nothing happens if no option is selected

    if (questionIndex + 1 <= questions.length && isAnyOptionClicked) {
      // increment score in store
      HandleScoreIncrement();

      // increment questionIndex by 1
      setQuestionIndex(questionIndex + 1);

      // update questions by adding two keys in each question
      addTimeTakenAndSelectedOptionToEachQuestion(Date.now() - startTimer);

      // questionIndex has increased, each question must have own selectedOption state, updating to empty array
      setSelectedOption([]);

      // updating startTimer to new time for next question
      setStartTimer(Date.now());
    }
    // if last question , then navigate to score page
    if (questionIndex + 1 === questions.length && isAnyOptionClicked) {
      navigate("/score");
    }
  };

  // Function to handle if any option is clicked,
  const handleOptionSelect = (option) => {
    const updatedOption = [...selectedOption];

    // if the question is Multiple choice OR boolean
    if (questions?.[questionIndex]?.type === "boolean") {
      // if boolean , then selected option should contain only 1 option
      if (!selectedOption.length) {
        updatedOption.push(option);
        setSelectedOption(updatedOption);
      }
    } else {
      //if that option is not present then we update the selectedOption state only
      if (!selectedOption.includes(option)) {
        updatedOption.push(option);
        setSelectedOption(updatedOption);
      }
    }
  };

  // progress degree for questions in a circle for questionIndex,
  const progressDegree = ((questionIndex + 1) * 360) / questions?.length;

  // checking if current question has Image or not
  const hasImage = questions?.[questionIndex]?.hasImage;

  // if the questions length is not equal to amount_of_question
  const isQuestionError =
    questions && questions?.length !== Number(amount_of_question);

  // if true, show question error component
  if (isQuestionError) {
    return <QuestionError />;
  }
  return (
    <>
      {!isQuestionError && questionIndex < questions.length ? (
        <div className="QuizApp">
          <div className="questionWrapper">
            <img src={ColorfulContainer} alt="ColorfulContainer" />
            <div className="questionBackground">
              <div className="progress-container">
                <div
                  className="circular-progress"
                  style={{
                    background: `conic-gradient(#44B77B ${progressDegree}deg, #F3F4FA 0deg)`,
                  }}
                >
                  <div className="progressTextContainer">
                    <span className="progressText">{questionIndex + 1}</span>
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
                      selectedOption.includes(decode(option)) ? "selected" : ""
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
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Questions;
