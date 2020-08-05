const STORE = [
  {
    question: "What was gaming system was Animal Crossing originally made for?",
    answers: ["Game Cube", "Nintendo Switch", "N64", "Nintendo Wii"],
    correctAnswer: "N64",
  },
  {
    question: "Villagers can get infested with:",
    answers: ["Ants", "Fleas", "Flies", "Beetles"],
    correctAnswer: "Fleas",
  },
  {
    question: "In Animal Crossing: New Horizons Tom Nook is:",
    answers: [
      "President",
      "Mayor",
      "Land Developer and Owner of Nook Inc",
      "Philanthropist",
    ],
    correctAnswer: "Land Developer and Owner of Nook Inc",
  },
  {
    question: "Daisie Mae runs:",
    answers: [
      "Sow Joans Stalk Market",
      "Dow Jones Stock Market",
      "Vegetable Shop",
      "Sow Joans Turnip Market",
    ],
    correctAnswer: "Sow Joans Stalk Market",
  },
  {
    question: "Blathers, the owl who runs the museum hates to collect:",
    answers: ["Fossils", "Fish", "Bugs", "Paintings"],
    correctAnswer: "Bugs",
  },
  {
    question:
      "Which Animal Crossing non-player character is a playable character in Super Smash Bros Ultimate(2018)",
    answers: ["Mable", "Blathers", "Tom Nook", "Isabelle"],
    correctAnswer: "Isabelle",
  },
];

let score = 0;
let questionCounter = 0;

//starts quiz with start button
function startQuiz() {
  $(".startQuiz").on("click", ".start-btn", function (e) {
    $(".startQuiz").hide();
    displayScore();
    $(".questions").show();
    $(".questions").html(renderQuestion());
  });
}

//shows score and question number
function displayScore() {
  $(".score-info").show();
  $(".score").html(score);
  $(".question-conter").html(questionCounter + 1);
  $(".number-of-questions").html(STORE.length);
}

//creates question from source
function renderQuestion() {
  let formGenerate = $(`<form>
    <fieldset>
      <legend>${STORE[questionCounter].question}</legend>
    </fieldset>
  </form>`);

  let fieldSelector = $(formGenerate).find("fieldset");

  STORE[questionCounter].answers.forEach(function (answerValue, answerIndex) {
    $(`<label for="${answerIndex}">
        <input type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
        <span>${answerValue}</span>
      </label>
      `).appendTo(fieldSelector);
  });
  $(
    `<button type="submit" class="submitButton button"> Submit</button > `
  ).appendTo(fieldSelector);
  return formGenerate;
  answerSelect();
}

function nextQuestion() {
  $(".container").on("click", "nextButton", function (e) {
    questionCounter++;
    renderQuestion();
  });
}

//indicates what answer slide will be shown
function answerSelect() {
  $(".rotation").on("click", "submitButton", function (e) {
    $(".feedback").show;
    let selected = $("input:checked");
    let guessed = selected.val();
    if (guessed == STORE[questionCounter].correctAnswer) {
      correctAnswer();
    } else {
      incorrectAnswer();
    }
  });
}

//shows slide for when answer is correct
function correctAnswer() {
  $(".feedback").html(
    `<h3>You are right!</h3>
    <img scr='images/smart.jpg' alt='celebration'>
    <button type="button" class="nextButton btn">Next</button>`
  );
  nextQuestion();
}

//shows slide for when answer is incorrect
function incorrectAnswer() {
  $(".feedback").html(
    `<h3>You were wrong...</h3>
    <p>Resetti is upsetti!!</p>
    <img scr='images/resetti.jpg' alt='celebration'>
    <button type="button" class="nextButton btn">Next</button>`
  );
  nextQuestion();
}

$(startQuiz);

