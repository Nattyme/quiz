// Get all cards
const cards = document.querySelectorAll('.plate');

// Get a form
const form = document.querySelector('.quiz-form');

// Current index for cards move
let currentIndex = 0;

// Current index for progress bar
let currentCard = 0;

// Get the first card button "back" and delete it
cards[0].querySelector('[data-nav="prev"]').remove();

// Display the 1st card 
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

// For the start progress-bar display 0%
updateProgressBar();

// Listen to click on form
 form.addEventListener('click', function (e) {
  let buttonClicked = e.target;

  // Check if clicked button named 'next'
  if (buttonClicked.hasAttribute('data-nav') && buttonClicked.getAttribute('data-nav') === 'next') {
    const result = checkOnAnswer(cards[currentIndex]);

    // Get answers wrapper
    const answerWrapper = cards[currentIndex].querySelector('[data-answers');

    if (result) {
      // Progress - bar
      updateProgressBar('next');

      // Moves slow down
      setTimeout( function () {

        // Hide current card
        cards[currentIndex].classList.remove('visible');
        currentIndex =  currentIndex + 1;

        // Delete error border
        answerWrapper.classList.remove('required');

        // Show the next card
        cards[currentIndex].classList.add('visible');
      }, 500);

     
    } else {
      // Display error border
      answerWrapper.classList.add('required');
    }
    
    
  }

  // Check if clicked button named 'back'
  if (buttonClicked.hasAttribute('data-nav') && buttonClicked.getAttribute('data-nav') === 'prev') {
     // Progress - bar
     updateProgressBar('prev');

     // Moves slow down
     setTimeout( function () {
        // Stop function word if index is 0
        if (currentIndex === 0) return;
      

        // Hide current card
        cards[currentIndex].classList.remove('visible');
        currentIndex -= 1;

        // Show the next card
        cards[currentIndex].classList.add('visible');
     }, 500);

    
  }

});



