import { CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SelectField from "../components/SelectField";
import TextFieldComp from "../components/TextFieldComp";
import useAxios from "../hooks/useAxios";
import Frame from "../assets/Frame.png";
import Quiz from "../assets/Quiz.png";
import Start from "../assets/Start.png";
import Loading from "../components/Loading";

import "./Settings.scss";

const Settings = () => {
  // Getting question_category,question_difficulty, question_type and amount_of_question value from store
  const {
    amount_of_question,
  } = useSelector((state) => state);

  // Fetching the Data for all categories
  const {
    response: category,
    error: categoryError,
    loading: categoryLoading,
  } = useAxios({ url: "/api_category.php" });

  // using navigate to just navigate between the routes
  const navigate = useNavigate();

  // if loading in any api, show CircularProgress AND Loading
  if (categoryLoading) {
    return (
      <>
        <Box mt={20}>
          <CircularProgress />
        </Box>
        <Loading />
      </>
    );
  }

  // if error in any api, error text = 'Something Went Wrong!'
  if (categoryError) {
    return (
      <Typography variant="h6" mt={20} color="red">
        Something Went Wrong!
      </Typography>
    );
  }

  // options for difficulty category
  const difficultyOptions = [
    { id: "easy", name: "Easy" },
    { id: "medium", name: "Medium" },
    { id: "hard", name: "Hard" },
  ];

  // options for type category
  const typeOptions = [
    { id: "multiple", name: "Multiple Choice" },
    { id: "boolean", name: "True/False" },
  ];

  // function to handle start the quiz based on categories
  const handleSubmit = (e) => {
    e.preventDefault();

    // Nothing Happens if amount_of_question is greater than 50
    if(amount_of_question > 50) return;
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
