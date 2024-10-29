// Get all cards
const cards = document.querySelectorAll('.plate');

// Get a form
const form = document.querySelector('.quiz-form');

// Current index 
let currentIndex = 0;

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

}

// Listen to click on form
 form.addEventListener('click', function (e) {
  let buttonClicked = e.target;

  // Check if clicked button named 'next'
  if (buttonClicked.hasAttribute('data-nav') && buttonClicked.getAttribute('data-nav') === 'next') {
    const result = checkOnAnswer(cards[currentIndex]);

    if (result) {
      // Hide current card
      cards[currentIndex].classList.remove('visible');
      currentIndex =  currentIndex + 1;

      // Show the next card
      cards[currentIndex].classList.add('visible');
    } else {
      console.log('enter answer');
    }
    
    
  }

  // Check if clicked button named 'back'
  if (buttonClicked.hasAttribute('data-nav') && buttonClicked.getAttribute('data-nav') === 'prev') {

    // Stop function word if index is 0
    if (currentIndex === 0) return;
    
     // Hide current card
     cards[currentIndex].classList.remove('visible');
     currentIndex -= 1;
 
     // Show the next card
     cards[currentIndex].classList.add('visible');
  }

});



