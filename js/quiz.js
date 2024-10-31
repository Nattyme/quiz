// Get all cards
const cards = document.querySelectorAll('.plate');

// Get a form
const form = document.querySelector('.quiz-form');

// Find navigation buttons
const buttonsNavWrapper = document.querySelectorAll('.plate-footer__buttons');

// Hide all cards
cards.forEach(card => {card.classList.add('none')});

// Current index for cards move
let currentIndex = 0;

// Current index for progress bar
let currentCard = 0;

// Get the first card button "back" and delete it
cards[currentIndex].querySelector('[data-nav="prev"]').remove();

// Display the 1st card 
cards[currentIndex].classList.remove('none');
cards[currentIndex].classList.add('visible');

// Function checks the current answer
const checkOnAnswer = function (card) {
  const radioButtons = card.querySelectorAll('input[type="radio"]');   // Get all radio buttons
  const checkboxButtons = card.querySelectorAll('input[type="checkbox"]');   // Get all checkbox buttons

  const radioButtonsWrapper = card.querySelectorAll('.radio-group'); // Get answers wrapper
  const checkboxButtonsWrapper = card.querySelectorAll('.checkbox-group'); // Get answers wrapper

  if (radioButtons) {
    // Set attr 'data-radio' for each radio button on a current card
    radioButtons.forEach( radioButton => {
      radioButton.setAttribute('data-radio', '');
    });

    // Set attr for each radioButtonsWrapper of radio buttons on a current card data-answers', 'radio-group
    radioButtonsWrapper.forEach( radioGroup => {
      radioGroup.setAttribute('data-answers', 'radio-group');
    });
  } else if (checkboxButtons) {
    // Set attr 'data-checkbox' for each checkbox button on a current card
    checkboxButtons.forEach( checkboxButton => {
      checkboxButton.setAttribute('data-checkbox', '');
    });

    // Set attr for each checkboxButtonsWrapper of radio buttons on a current card data-answers', 'radio-group
    checkboxButtonsWrapper.forEach( checkboxGroup => {
      checkboxGroup.setAttribute('data-answers', 'checkbox-group');
    });
  }
  
  if (radioButtons) {
    // Get parents radio buttons group by data-answers = radio-group
    const radioButtonsParent = cards[currentIndex].querySelectorAll('[data-answers="radio-group"]');

    // Let's count here q-ty of groups
    let groupsChecked = 0;

    // For each group we check buttons and count how many 'true' back
    radioButtonsParent.forEach( radioGroup => {
      let currentRadioButtons = radioGroup.querySelectorAll('[data-radio]');
    
      // Check if at least one of the radio buttons is checked
      if (currentRadioButtons.length) {
    
        for (let radio of  currentRadioButtons) {
          if (radio.checked) {
            groupsChecked = groupsChecked + 1;
          }

        } 
      }

    
    });

    if (groupsChecked === radioButtonsParent.length) {
      console.log('here');
      return true;
    } 

  } else if (checkboxButtons) {
    // Get parent radio buttons group by data-answers = radio-group
    const checkboxButtonsParent = cards[currentIndex].querySelectorAll('[data-answers="checkbox-group"]');

    // Let's count here q-ty of groups
    let groupCounterCheckBox = 0;

    // For each group we check buttons and count how many 'true' back
    checkboxButtonsParent.forEach( checkboxGroup => {
      let currentCheckboxButtons = checkboxGroup.querySelectorAll('[data-checkbox]');
    
      // Check if at least one of the radio buttons is checked
      if (currentCheckboxButtons.length) {
    
        for (let checkbox of  currentCheckboxButtons ) {
      
          if (checkbox.checked) groupCounterCheckBox = groupCounterCheckBox + 1;
            console.log(checkbox.checked)
              // After iteration 'true' we increace counter
      
          console.log(groupCounterCheckBox);
        } 
      }

    
    });

    if (groupCounterCheckBox === checkboxButtonsParent.length) {
      return true;
    } 
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
  const progress = Math.round(currentCard * 100 / cardsToCount) + '%';
 
  progressValue.forEach( item => {
    item.innerText = progress;
  });

  progressLineBar.forEach( item => {
    item.style.width = progress;
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

  // Function remove error border after click on 'next' 
  const removeErrorBorder = function (goTo, answerWrapper) {
    if (goTo === 'next') {
      // Delete error border
      answerWrapper.classList.remove('required');
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
  
      removeErrorBorder(goTo, answerWrapper);
  
    }, ms);
  }
  
  // If we go to prev card but index = 0 - stop function
  if ( goTo === 'prev' && currentIndex === 0) return;

  // Start cards handling with slow mode 500ms 
  startingCardsHandling(500);
}

// Function start actions after click on form 
const startOnFormClick = function (e) {
  let buttonClicked = e.target;

  // Get answers wrapper
  const answerWrapper = cards[currentIndex].querySelector('[data-answers]');

  // Check if clicked button named 'next'
  if (buttonClicked.hasAttribute('data-nav') && buttonClicked.getAttribute('data-nav') === 'next') {
    const result = checkOnAnswer(cards[currentIndex]);

    // Display error border
    if ( !result ) {
      answerWrapper.classList.add('required');
      return;
    }

    // Progress - bar
    updateProgressBar('next');

    // Display the next card slow mode
    cardDisplay('next', answerWrapper);
  }

  // Check if clicked button named 'back'
  if (buttonClicked.hasAttribute('data-nav') && buttonClicked.getAttribute('data-nav') === 'prev') {
     // Progress - bar
     updateProgressBar('prev');

     // Display prev card slow mode
     cardDisplay('prev', answerWrapper);
  }
}

// For the start progress-bar display 0%
updateProgressBar();

// For each nav buttons wrapper we add listener of a 'click' event
buttonsNavWrapper.forEach( navWrapper => {
  navWrapper.addEventListener('click', function (e) {
     // Function start actions on click
    startOnFormClick(e);
  });
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
  this.closest('label').classList.add('hovered');
});

checkBoxPolicy.addEventListener ('blur', function () {
  this.closest('label').classList.remove('hovered');
});



