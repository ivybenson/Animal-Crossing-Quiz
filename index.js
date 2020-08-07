const STORE = [
  {
    question: "Which gaming system was Animal Crossing originally made for?",
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

$(document).ready(function () {
  //starts quiz with start button

  function startQuiz() {
    $(".startQuiz").hide();
    displayScore();
    $(".questions").show();
    $(".questions").html(renderQuestion());
  }

  $(".startQuiz").on("click", ".start-btn", function (e) {
    $(startQuiz);
  });

  //shows score and question number
  function displayScore() {
    console.log("Entering displayScore function");
    $(".score-info").show();
    $(".score").html(score);
    $(".question-counter").html(questionCounter + 1);
    $(".number-of-questions").html(STORE.length);
  }

  function updateScore() {
    $(".score").html(score + 1);
  }

  function updateQuestionCounter() {
    $(".question-counter").text(questionCounter + 1);
  }

  //creates question from source
  function renderQuestion() {
    console.log("Entering renderQuestion function", questionCounter);
    $(".feedback").empty();
    let formGenerate = $(`<form>
    <fieldset id="question_form">
      <legend>${STORE[questionCounter].question}</legend>
    </fieldset>
  </form>`);
    $(formGenerate).appendTo(".questions");

    console.log("question", STORE[questionCounter].question);

    let fieldSelector = $(formGenerate).find("fieldset");
    console.log(fieldSelector);

    STORE[questionCounter].answers.forEach(function (answerValue, answerIndex) {
      $(`<label for="${answerIndex}">
        <input type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
        <span>${answerValue}</span>
      </label>
      `).appendTo(fieldSelector);
    });
    $(
      `<button type="submit" class="submitButton">
        Submit
      </button>`
    ).appendTo(fieldSelector);
  }

  $(document).on("click", ".nextButton", function (e) {
    questionCounter++;
    if (questionCounter >= STORE.length) {
      $(".questions").empty();
      $(".feedback").hide();
      $(".final").show();
      finalSlide();
    } else {
      renderQuestion();
      updateQuestionCounter();
    }
  });

  //indicates what answer slide will be shown
  function answerSelect() {
    $(document).on("click", ".submitButton", function (e) {
      e.preventDefault();
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
    console.log("Entering correctAnswer function");
    $(".feedback").html(
      `<h3>You are right!</h3>
      <p>You deserve some bells!</p>
    <img src='images/smart.jpeg' alt='celebration' class="imgbox">
    <button type="button" class="nextButton btn">Next</button>`
    );
    $(".questions").empty();
    updateScore();
    score++;
    //nextQuestion();
  }

  //shows slide for when answer is incorrect
  function incorrectAnswer() {
    console.log("Entering incorrectAnswer function");
    $(".feedback").html(
      `<h3>You were wrong...</h3>
    <p>Resetti is upsetti!!</p>
    <p>The right answer is ${STORE[questionCounter].correctAnswer}.</p>
    <img src='images/resetti.jpeg' alt='celebration' class="imgbox">
    <button type="button" class="nextButton btn">Next</button>`
    );
    $(".questions").empty();
  }

  //displays final slide and shows restart button
  function finalSlide() {
    $(".final").html(
      `<h3>Congratulations! Show off your score!</h3>
      <h4>You score is ${score}.</h4>
      <img src='images/done-streamers.jpg' alt='done' class="imgbox"><button type="button" class="restartButton btn">Restart</button>`
    );
    $("score-info").show();
    $("nextButton").hide();
    $(".questions").empty();

    $(document).on("click", ".restartButton", function (e) {
      e.preventDefault();
      $(".final").hide();
      $(".startQuiz").show();
      $("rotation").hide();
      questionCounter = 0;
      score = 0;
    });
  }

  function quizRunner() {
    startQuiz();
    answerSelect();
  }

  $(quizRunner);
});

