import { CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SelectField from "../components/SelectField";
import TextFieldComp from "../components/TextFieldComp";
import useAxios from "../hooks/useAxios";
import Frame from "../assets/Frame.png";
import Quiz from "../assets/Quiz.png";
import Start from "../assets/Start.png";
import { handleQuestionsChange } from "../redux/actions";
import Loading from "../components/Loading";

import "./Settings.scss";

const Settings = () => {
  const {
    question_category,
    question_difficulty,
    question_type,
    amount_of_question,
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  const {
    response: category,
    error: categoryError,
    loading: categoryLoading,
  } = useAxios({ url: "/api_category.php" });
  let apiUrl = `/api.php?amount=${amount_of_question}`;
  if (question_category) {
    apiUrl = apiUrl.concat(`&category=${question_category}`);
  }
  if (question_difficulty) {
    apiUrl = apiUrl.concat(`&difficulty=${question_difficulty}`);
  }
  if (question_type) {
    apiUrl = apiUrl.concat(`&type=${question_type}`);
  }

  const { response, loading, error } = useAxios({ url: apiUrl });
  const navigate = useNavigate();

  if (categoryLoading || loading) {
    return (
      <>
        <Box mt={20}>
          <CircularProgress />
        </Box>
        <Loading />
      </>
    );
  }

  if (categoryError || error) {
    return (
      <Typography variant="h6" mt={20} color="red">
        Some Went Wrong!
      </Typography>
    );
  }

  const difficultyOptions = [
    { id: "easy", name: "Easy" },
    { id: "medium", name: "Medium" },
    { id: "hard", name: "Hard" },
  ];

  const typeOptions = [
    { id: "multiple", name: "Multiple Choise" },
    { id: "boolean", name: "True/False" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleQuestionsChange(response?.results));
    navigate("/questions");
  };
  return (
    <div className="home-wrapper">
      <div className="home-heading">
        <img src={Frame} alt="frame" />
      </div>
      <div className="home-QuizTextWrapper">
        <div className="home-QuizText">
          <div className="quizText">
            <img src={Quiz} alt="frame" />
          </div>
        </div>
      </div>
      <form className="formValues">
        <SelectField options={category.trivia_categories} label="Category" />
        <SelectField options={difficultyOptions} label="Difficulty" />
        <SelectField options={typeOptions} label="Type" />
        <TextFieldComp />
        <div className="home-startButton">
          <div className="startButton" onClick={handleSubmit}>
            <img src={Start} alt="frame" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Settings;
