export const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export const getUpdatedQuestion = (questions) => {
  const updatedQuestions = questions.map((eachQuestion) => {
    const hasImage = eachQuestion?.question?.length > 70;
    return {
      ...eachQuestion,
      hasImage: hasImage,
      correct_answer: [`${eachQuestion?.correct_answer}`],
    };
  });
  return updatedQuestions;
};

export const convertMillisecondsToTime = (milliseconds) => {
  const hours = Math.floor(milliseconds / 3600000);
  const minutes = Math.floor((milliseconds % 3600000) / 60000);
  const seconds = Math.floor(((milliseconds % 3600000) % 60000) / 1000);

  return {
    hours,
    minutes,
    seconds,
    milliseconds,
  };
};
