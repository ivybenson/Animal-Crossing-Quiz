const STORE = [ 
  {question:'What was gaming system was Animal Crossing originally made for?', answers:['Game Cube', 'Nintendo Switch', 'N64', 'Nintendo Wii'], correctAnswer:'N64'
  }, 
  {question:'Villagers can get infested with:', answers:['Ants','Fleas','Flies','Beetles'], correctAnswer:'Fleas'
  },
  {question:'In Animal Crossing: New Horizons Tom Nook is:', answers:['President','Mayor','Land Developer and Owner of Nook Inc', 'Philanthropist'], correctAnswer:'Land Developer and Owner of Nook Inc'
  },
  {question:'Daisie Mae runs:', answers:['Sow Joans Stalk Market', 'Dow Jones Stock Market','Vegetable Shop','Sow Joans Turnip Market'], correctAnswer:'Sow Joans Stalk Market'
  },
  {question:'Blathers, the owl who runs the museum hates to collect:', answers:['Fossils','Fish','Bugs','Paintings'], correctAnswer:'Bugs'
  },
  {question:'Which Animal Crossing non-player character is a playable character in Super Smash Bros Ultimate(2018)', answers:['Mable','Blathers','Tom Nook','Isabelle'], correctAnswer:'Isabelle'
  }
];

let score = 0;
let questionCounter = 0;


function updateQuestionAndScore() {
  // lets you know where you are in the quiz
  console.log('`updateQuestionAndScore` ran')
};

function startQuiz() {
  $('.startQuiz').on('click', '.start-btn', function (event) {
    $('.startQuiz').hide();
    $('.questions').show();
    $('.questions').prepend(renderQuestion());
  });
}


function renderQuestion(){
  let formGenerate = $(`<form>
    <fieldset>
      <legend>${STORE[questionIndex].question}</legend>
    </fieldset>
  </form>`)

  let fieldSelector = $(formGenerate).find('fieldset');

  STORE[questionIndex].answers.forEach(function (answerValue, answerIndex) {
    $(`<label for="${answerIndex}">
        <input type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
        <span>${answerValue}</span>
      </label>
      `).appendTo(fieldSelector);
  });
  $(`<button type="submit" class="submitButton button"> Submit</button > `).appendTo(fieldSelector);
  return formGenerate;

};


function answerSelect(){
  $('.container').on('submit', function (e){
    event.preventDefault();
    $('.mobile').hide();
    $('.guess').show();
    let selected = $('input:checked');
    let guessed = selected.val();
    let correct = STORE[questionNumber].correctAnswer;
    if (guessed === correct) {
      correctAnswer();
    } else {
      incorrectAnswer();
    }
  });
};

//shows slide for when answer is correct
function correctAnswer() {
  $('.feedback').html(
    `<h3>You are right!</h3>
    <img scr='images/smart.jpg' alt='celebration'>
    <button type="button" class="nextButton button">Next</button>
    `
  )
};

//shows slide for when answer is incorrect
function incorrectAnswer() {
  $('.feedback').html(
    `<h3>You were wrong...</h3>
    <img scr='images/resetti.jpg' alt='celebration'>
    <button type="button" class="nextButton button">Next</button>
    `
  )
};

function runQuizApp() {
  startQuiz()
  renderQuestion();
  answerSelect();
  correctAnswer();
  incorrectAnswer();
};

$(runQuizApp); 
