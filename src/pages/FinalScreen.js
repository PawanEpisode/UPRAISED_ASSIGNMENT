import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { handleAmountChange, handleScoreChange } from "../redux/actions";
import ResultBar from "../components/ResultBar";
import YourResult from "../assets/YourResult.png";
import StartAgain from "../assets/StartAgain.png";
import ColorfulContainer from "../assets/ColorfulContainer.png";

import './FinalScreen.scss';

const FinalScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { amount_of_question,score } = useSelector((state) => state);

  const handleStartAgain = () => {
    dispatch(handleScoreChange(0));
    dispatch(handleAmountChange(5));
    navigate("/");
  };

  return (
    <div className="QuizApp">
      <div className="questionWrapper">
        <img src={ColorfulContainer} alt="ColorfulContainer" />
        <div className="questionBackground">
          <div className="Result-container">
            <div className="ResultHeading">
              <img className="ResultText" src={YourResult} alt="your Result" />
            </div>
            <ResultBar
              numberOfQuestion={amount_of_question}
              correctAnswerCount={score}
            />
            <div className="ResultList">
              <div className="correct">
                <div className="circle Right"></div>
                <div className="score">{score}</div>
                <div className="scoreLabel">Correct</div>
              </div>
              <div className="incorrect">
                <div className="circle Wrong"></div>
                <div className="score">
                  {amount_of_question - score}
                </div>
                <div className="scoreLabel">Incorrect</div>
              </div>
            </div>
            <div className="Result-startAgainButton">
              <div className="startAgainButton" onClick={handleStartAgain}>
                <img
                  className="startAgainButtonImg"
                  src={StartAgain}
                  alt="startAgain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalScreen;
