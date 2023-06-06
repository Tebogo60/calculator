const buttons = document.querySelectorAll(".cal-button");
const question = document.querySelector(".cal-screen-question");
const result = document.querySelector(".cal-screen-result");

let numberActive = false;
let operatorActive = false;
let resultActive = false;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.innerHTML.match(/[0-9]/) || button.innerHTML === ".") {
      if (resultActive !== false) {
        reset();
        question.innerHTML = button.innerHTML;
        result.innerHTML = "";
      } else {
        question.innerHTML += button.innerHTML;
      }

      numberActive = true;
    }
    if (button.id === "operator") {
      if (
        numberActive !== false &&
        operatorActive === false &&
        resultActive === false
      ) {
        question.innerHTML += " " + button.innerHTML + " ";

        numberActive = false;
        operatorActive = true;
      } else if (operatorActive !== false && resultActive === false) {
        question.innerHTML = calculate() + " " + button.innerHTML + " ";
      } else if (resultActive !== false) {
        question.innerHTML = result.innerHTML + " " + button.innerHTML + " ";
        result.innerHTML = "";

        resultActive = false;
      }
    }
    if (button.innerHTML === "%" && numberActive !== false) {
      if (resultActive !== false) {
        question.innerHTML = result.innerHTML;
        result.innerHTML = "";

        resultActive = false;
        operatorActive = false;
      }
      question.innerHTML = percent();
    }
    if (button.innerHTML === "CE") {
      question.innerHTML = "";
      result.innerHTML = "";
      reset();
    }
    if (resultActive === false) {
      if (button.innerHTML === "C") {
        question.innerHTML = "";
      }
      if (button.id === "backspace") {
        question.innerHTML = removeLast();
      }
    }
    if (button.innerHTML === "=" && numberActive !== false) {
      if (operatorActive !== false) {
        if (resultActive !== false) {
          question.innerHTML = newQuestion();
        }
        result.innerHTML = calculate();
        resultActive = true;
      }
    }
  });
});

const percent = () => {
  let tempQuestion = "";
  let tempResult = "";
  for (let i = 0; i < question.innerHTML.length; i++) {
    if (question.innerHTML[i] === "%") {
      tempQuestion += " ";
    }
    tempQuestion += question.innerHTML[i];
  }
  let questionArr = tempQuestion.split(" ");
  tempResult = parseFloat(questionArr[0]) / 100;

  return tempResult;
};

const reset = () => {
  numberActive = false;
  operatorActive = false;
  resultActive = false;
};

const removeLast = () => {
  let tempQuestion = "";
  for (let i = 0; i < question.innerHTML.length - 1; i++) {
    tempQuestion += question.innerHTML[i];
  }

  return tempQuestion;
};

const calculate = () => {
  let questionArr = question.innerHTML.split(" ");
  let tempResult = 0;

  if (questionArr[1] === "/") {
    tempResult = parseFloat(questionArr[0]) / parseFloat(questionArr[2]);
  } else if (questionArr[1] === "*") {
    tempResult = parseFloat(questionArr[0]) * parseFloat(questionArr[2]);
  } else if (questionArr[1] === "-") {
    tempResult = parseFloat(questionArr[0]) - parseFloat(questionArr[2]);
  } else if (questionArr[1] === "+") {
    tempResult = parseFloat(questionArr[0]) + parseFloat(questionArr[2]);
  }

  return tempResult;
};

const newQuestion = () => {
  let questionArr = question.innerHTML.split(" ");
  let tempQuestion =
    result.innerHTML + " " + questionArr[1] + " " + questionArr[2];

  return tempQuestion;
};
