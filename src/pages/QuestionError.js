import { Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const QuestionError = () => {

  // using navigate to just navigate between the routes
  const navigate = useNavigate();
  
  return (
    <>
      <Typography variant="h6" mt={20} mb={5} color="red">
        OHHHHHH NOOOOOOOOOOOO !!!!!!!!!!, Either you have refreshed the page OR
        There are No Questions under selected different categories, Please change the values of
        categories to get desired questions.
      </Typography>

      <Button variant="contained" onClick={() => navigate("/")}>
        Back to Settings
      </Button>
    </>
  );
};

export default QuestionError;
