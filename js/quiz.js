// Template
import createCards from './modules/create-card/cards.js';


// // Get a form
const form = document.querySelector('.quiz-form');

// Заполняем массив карточками
const cardsTmpl = [];
cardsTmpl.push(createCards.createCards('radio', 'radio', 'Что означает сокращение HTML?'));
cardsTmpl.push(createCards.createCards('checkbox', 'checkbox', 'Что означает сокращение HTML?'));
cardsTmpl.push(createCards.createCards('cards', 'radio', 'На HTML можно создавать: '));

// Обходим каждую карточку и выводим на страницу
// Здесь карточки приходят как HTMl, нельзя менять класс. 
cardsTmpl.forEach( card => {
  form.insertAdjacentHTML('beforeend', card);
});

const cards = document.querySelectorAll('.plate');

// Найдём контейнер с кнопками навигации
const buttonsNavWrapper = document.querySelectorAll('.plate-footer__buttons');

// Объявляем текущий индекс для карточек
let currentIndex = 0;

// Объявляем текущий индекс для прогресс бара
let currentCard = 0;

// Скрываем все карточки
cards.forEach((card, index) => {
  card.classList.add('none');

  // Покажем 1-ю карточку
  if (index === currentIndex) {
    card.classList.remove('none');
    card.classList.add('visible');

    // Скрываем кнопку 'Назад' на первой карточке
    card.querySelector('[data-nav="prev"]').remove();
  }
});


// Функция проверят ответы в инпутах
const checkOnAnswer = function (card) {
  // Получаем все радио кнопки
  const radioButtons = card.querySelectorAll('input[type="radio"]');   
  // Получаем все чекбоксы
  const checkboxButtons = card.querySelectorAll('input[type="checkbox"]');  

  // Для несколькх вопросов : получим все блоки вопросов на странице
  const answerBlocks = card.querySelectorAll('.plate-content');

  // Если найдены радиокнопки
  if (radioButtons.length) {
    // Задаём аттрибут 'data-radio' для каждой радио кнопки текущей карточки
    radioButtons.forEach( radioButton => {
      radioButton.setAttribute('data-radio', '');
    });

    // Для нескольких блоков с вопросами на странице: Родительскому элементу блока радио кнопок задаём атрибут data-answers = radio-block
    answerBlocks.forEach( block => {
      block.setAttribute('data-block', 'radio');
    });

    // Счётчик проверенных блоков
    let blocksChecked = 0;

    // Для нескольких блоков с вопросами на странице: в каждой группе кнопок проверяем, сколько было выбранных
    answerBlocks.forEach( block => {
      // Находим текущий блок с кнопками
      let currentRadioButtons = block.querySelectorAll('[data-radio]');

      // Проверяем, что одна кнопка выбрана
      if (currentRadioButtons.length) {
        // Если кнопки с св-вом checked не найдены - добавить рамку error, вернуть false. 
        if (!Array.from(currentRadioButtons).find((button) => button.checked)) {
          block.querySelector('[data-answers]').classList.add('required');
       
          return false;
        } else {
          // Удаляем рамку, увеличиваем счётчик
          block.querySelector('[data-answers]').classList.remove('required');
          blocksChecked = blocksChecked + 1;
        }
      }
    });

    // Если кол-во выбранных кнопок равно кол-ву блоков - возвращаем true
    if (blocksChecked === answerBlocks.length) {
      return true;
    } 
  
  } 
  
  // Если найдены чекбоксы
  if (checkboxButtons.length) {
 
    // // Задаём аттрибут 'data-checkbox' для каждого чекбокса текущей карточки
    checkboxButtons.forEach( checkboxButton => {
      checkboxButton.setAttribute('data-checkbox', '');
    });

    // Для нескольких блоков с вопросами на странице: Родительскому элементу блока радио кнопок задаём атрибут data-answers = checkbox-block
    // answerBlocks.forEach( block => {
    //   block.closest('.plate-content').setAttribute('data-answers', 'checkbox-block');
    // });

    // Счетчик для ответов в группах чекбоксов
    let blocksChecked = 0;

    // Для нескольких блоков с вопросами на странице: в каждой группе кнопок проверяем, сколько было выбранных
    answerBlocks.forEach( block => {
      let currentCheckboxButtons = block.querySelectorAll('[data-checkbox]');

      // Проверяем, что хотя бы одна кнопка выбрана
      if (currentCheckboxButtons.length) {
        // Если кнопки с св-вом checked не найдены - добавить рамку error, вернуть false. 
        if (!Array.from(currentCheckboxButtons).find((button) => button.checked)) {
          block.querySelector('.checkbox-group').classList.add('required');
       
          return false;
        } else {
          // Удаляем рамку, увеличиваем счётчик
          block.querySelector('.checkbox-group').classList.remove('required');
          blocksChecked = blocksChecked + 1;
        }
      }
    });

    // Если кол-во выбранных кнопок равно кол-ву блоков - возвращаем true
    if (blocksChecked === answerBlocks.length) {
      return true;
    }
  } 
}

// Функция контролирует прогресс - бар
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

// Функция показывает и прячет карточки с анимацией
const cardDisplay = function (goTo, answerWrapper) {
  
  // Function count current index
  const cardIndex = function (goTo) {
      if (goTo === 'next') {
        currentIndex =  currentIndex + 1;
      } else if (goTo === 'prev') {
        currentIndex =  currentIndex - 1;
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
  
    }, ms);
  }
  
  // If we go to prev card but index = 0 - stop function
  if ( goTo === 'prev' && currentIndex === 0) return;

  // Start cards handling with slow mode 500ms 
  startingCardsHandling(500);
}

// Функция запускает действия по клику на форму
const startOnFormClick = function (e) {
  let buttonClicked = e.target;

  // Найдем все контейнеры ответов
  const answerWrapper = cards[currentIndex].querySelectorAll('[data-answers]');


  // Проверяем, что нажали кнопку 'Далее'
  if (buttonClicked.hasAttribute('data-nav') && buttonClicked.getAttribute('data-nav') === 'next') {
    // Если проверка ответа вернула false  - завершить программу
    if ( !checkOnAnswer(cards[currentIndex]) ) {
      // answerWrapper.classList.add('required');
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

// Запускаем функцию скролл бара. На старте 0%
updateProgressBar();

// Добавляем прослушивание клика на контейнер с кнопками навигации
buttonsNavWrapper.forEach( navWrapper => {
  navWrapper.addEventListener('click', function (e) {

    // Функция запускает действия по клику
    startOnFormClick(e);
  });
});
 
  
// Валидация формы
const submitForm = document.querySelector('#submitForm');
const telInput = document.querySelector('#tel');

// Если найдена форма и поле телефона - отслеживаем действие 'submit'
if (submitForm && telInput) {
  submitForm.onclick = function () {
    if (telInput.value === '+' || telInput.value.length < 6) {
      telInput.value = '';
    }
  }
}

// Маска номера телефона
mask('#tel');

// Находим чекбокс
const checkBoxPolicy = document.querySelector('#policy');

// Если чекбокс найден
if (checkBoxPolicy) {
  // Отслеживаем фокус и доб. класс
  checkBoxPolicy.addEventListener ('focus', function () {
    this.closest('label').classList.add('hovered');
  });
  
  // Отслеживаем выход из фокуса, удаляем класс
  checkBoxPolicy.addEventListener ('blur', function () {
    this.closest('label').classList.remove('hovered');
  });
}




