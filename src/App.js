import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import Settings from "./pages/Settings";
import Questions from "./pages/Questions";
import FinalScreen from "./pages/FinalScreen";
import QuestionError from "./pages/QuestionError";

function App() {
  return (
    <Router>
      <Container
        sx={{
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box textAlign="center" mt={5}>
          <Routes>
            <Route path="/" element={<Settings />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/score" element={<FinalScreen />} />
            <Route path="/questionError" element={<QuestionError />} />
          </Routes>
        </Box>
      </Container>
    </Router>
  );
}

export default App;
