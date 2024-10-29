// Get all cards
const cards = document.querySelectorAll('.plate');
// Get a form
const form = document.querySelector('.quiz-form');

// Hide all cards
cards.forEach(card => {card.classList.add('none')});

// Current index for cards move
let currentIndex = 0;
// Current index for progress bar
let currentCard = 0;

// Get the first card button "back" and delete it
cards[0].querySelector('[data-nav="prev"]').remove();

// Display the 1st card 
cards[currentIndex].classList.remove('none');
cards[currentIndex].classList.add('visible');

// Function checks the current answer
const checkOnAnswer = function (card) {
  // Get all radio buttons
  const radioButtons = card.querySelectorAll('input[type="radio"]');

  // Check if at least one of the radio buttons is checked
  if ( radioButtons.length > 0) {
    for (let radio of radioButtons) if ( radio.checked) return true;
  }

  // Check if at least one of the checkbox is checked
  const checkBoxes = card.querySelectorAll('input[type="checkbox"]');

  if (checkBoxes.length > 0 ) {
    for (let checkBox of checkBoxes) if (checkBox.checked) return true;
  }

}

// Function controls progress - bar
const updateProgressBar = function (goTo = 'start') {
  // In case we go to the next card
  if ( goTo === 'next') {
    currentCard = currentCard + 1;
  } 

  // In case we go to the prev card
  if (goTo === 'prev') {
    currentCard = currentCard - 1;
  }

  const progressValue = document.querySelectorAll('.progress__label');
  const progressLineBar = document.querySelectorAll('.progress__line-bar');
  const cardsToCount = document.querySelectorAll('[data-progress]').length;
  const progress = Math.round(currentCard * 100 / cardsToCount);
  
  progressValue.forEach( item => {
    item.innerText = progress + '%';
  });

  progressLineBar.forEach( item => {
    item.style.width = progress + '%';
  });
  
}

// Funtion display and hide cards with slow mode animation
const cardDisplay = function (goTo, answerWrapper) {
  
  // Function count current index
  const cardIndex = function (goTo) {
      if (goTo === 'next') {
        currentIndex =  currentIndex + 1;
      } else if (goTo === 'prev') {
        currentIndex =  currentIndex - 1;
      }
  }

  // Function handling additional operations for the next card
  const doNextCardSpecialMoves = function (goTo, answerWrapper) {
    if (goTo === 'next') {
      // Delete error border
      answerWrapper.classList.remove('required');

      // Show the next card
      cards[currentIndex].classList.add('visible');
    }
  }

  // Animation for card display
  const animatedCardDisplay = function (ms) {
    setTimeout( function () {
      cards[currentIndex].classList.add('visible');
    }, ms);
  }

  // Function hide current card fully
  const hideCard = function (ms) {

    setTimeout( function () {

      // Hide current card fully
      cards[currentIndex].classList.add('none');

      // Count index depend on goTo
      cardIndex(goTo);

      // Display card. Prepare for animation
      cards[currentIndex].classList.remove('none');

      // Display the prev card with animation
      animatedCardDisplay(100);

    }, ms);

  }

  // Function start cards handling
  const startingCardsHandling = function (ms) {
    setTimeout( function () {

      // Hide current card with animation
      cards[currentIndex].classList.remove('visible');
  
      // Fully hide current card
      hideCard(500);
  
      doNextCardSpecialMoves(goTo, answerWrapper);
  
    }, 500);
  }
  
  // If we go to prev card but index = 0 - stop function
  if ( goTo === 'prev' && currentIndex === 0) return;

  // Start cards handling with slow mode 500ms 
  startingCardsHandling(500);
}

// For the start progress-bar display 0%
updateProgressBar();

// Listen to click on form
 form.addEventListener('click', function (e) {
  let buttonClicked = e.target;

  // Get answers wrapper
  const answerWrapper = cards[currentIndex].querySelector('[data-answers');

  // Check if clicked button named 'next'
  if (buttonClicked.hasAttribute('data-nav') && buttonClicked.getAttribute('data-nav') === 'next') {
    const result = checkOnAnswer(cards[currentIndex]);

    if (result) {
      // Progress - bar
      updateProgressBar('next');

      // Display the next card slow mode
      cardDisplay('next', answerWrapper);

    } else {
      // Display error border
      answerWrapper.classList.add('required');
    }
  }

  // Check if clicked button named 'back'
  if (buttonClicked.hasAttribute('data-nav') && buttonClicked.getAttribute('data-nav') === 'prev') {
     // Progress - bar
     updateProgressBar('prev');

     // Display prev card slow mode
     cardDisplay('prev', answerWrapper);
  }
});

// Form validate
const submitForm = document.querySelector('#submitForm');
const telInput = document.querySelector('#tel');

submitForm.onclick = function () {
  if (telInput.value === '+' || telInput.value.length < 6) {
    telInput.value = '';
  }
}

// phone mask
mask('#tel');

// Checbox focus border display by tab
const checkBoxPolicy = document.querySelector('#policy');

checkBoxPolicy.addEventListener ('focus', function () {
console.log('focus');
this.closest('label').classList.add('hovered');
});

checkBoxPolicy.addEventListener ('blur', function () {
  this.closest('label').classList.remove('hovered');
});



