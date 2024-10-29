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


// Listen to click on form
 form.addEventListener('click', function (e) {
  let buttonClicked = e.target;

  // Check if clicked button named 'next'
  if (buttonClicked.hasAttribute('data-nav') && buttonClicked.getAttribute('data-nav') === 'next') {
    
    // Hide current card
    cards[currentIndex].classList.remove('visible');
    currentIndex =  currentIndex + 1;
      console.log(currentIndex);

    // Show the next card
    cards[currentIndex].classList.add('visible');
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
