// Получим шаблоны карточек и формы
import createCards from './templates/card/create-cards.js';
import createFormTmpl from './templates/form/form.js';

// Вызываем функцию создания карточек и записываем результат в переменную
const cardsTmpl = createCards.createCards();
// Вызываем функцию создания формы и записываем результат в переменную
const formTmpl = createFormTmpl.createFormTmpl();

// Находим форму на  странице
const form = document.querySelector('.quiz-form');

// Добавляем карточки на страницу
form.insertAdjacentHTML('beforeend', cardsTmpl);
// Добавляем форму обратной связи на страницу
form.insertAdjacentHTML('beforeend', formTmpl);


// Сохраним все добавленные карточки в переменную 
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


// Функция контролирует прогресс - бар
const updateProgressBar = function (goTo = 'start') {
  // Если нажали кнопку 'Далее'
  if ( goTo === 'next') {
    currentCard = currentCard + 1;
  } 

  // Если нажали кнопку 'Назад'
  if (goTo === 'prev') {
    currentCard = currentCard - 1;
  }

  const progressValue = document.querySelectorAll('.progress__label');
  const progressLineBar = document.querySelectorAll('.progress__line-bar');
  const cardsToCount = document.querySelectorAll('[data-progress]').length;
  const progress = Math.round(currentCard * 100 / cardsToCount) + '%';
 
  progressValue.forEach( item => {
    item.querySelector('strong').innerText = progress;
  });

  progressLineBar.forEach( item => {
    item.style.width = progress;
  });
  
}

// Функция показывает и прячет карточки с анимацией
const cardDisplay = function (goTo) {
  
  // Функция считает текущ. индекс
  const cardIndex = function (goTo) {
      if (goTo === 'next') {
        currentIndex =  currentIndex + 1;
      } else if (goTo === 'prev') {
        currentIndex =  currentIndex - 1;
      }
  }

  // Анимация для показа карточки
  const animatedCardDisplay = function (ms) {
    setTimeout( function () {
      cards[currentIndex].classList.add('visible');
    }, ms);
  }

  // Функция скрывает текущую карточку
  const hideCard = function (ms) {

    setTimeout( function () {

      // Функция полностью скрывает текущую карточку
      cards[currentIndex].classList.add('none');

      // Считаем индекс в завис-ти. от goTo
      cardIndex(goTo);

      // Показываем карточку
      cards[currentIndex].classList.remove('none');

      // Показываем карточку с анимацией
      animatedCardDisplay(100);

    }, ms);

  }

  // Function start cards handling
  const startingCardsHandling = function (ms) {

    setTimeout( function () {

      // Скрываем текущ. карточку с анимацией
      cards[currentIndex].classList.remove('visible');
  
      // Полностью скрываем текущую карточку
      hideCard(500);
  
    }, ms);
  }
  
  // If we go to prev card but index = 0 - stop function
  if ( goTo === 'prev' && currentIndex === 0) return;

  // Start cards handling with slow mode 500ms 
  startingCardsHandling(500);
}

// Функция проверят ответы в инпутах
const checkOnAnswer = function (card) {
  // Получаем все радио кнопки
  const radioButtons = card.querySelectorAll('input[type="radio"]');   
  // Получаем все чекбоксы
  const checkboxButtons = card.querySelectorAll('input[type="checkbox"]');  

  // Для несколькх вопросов : получим все блоки вопросов на странице
  const answerBlocks = card.querySelectorAll('.plate-content');
  
  // Если найдены радиокнопки
  if (radioButtons.length ) {
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

  // Проверяем, что нажали кнопку 'Назад'
  if (buttonClicked.hasAttribute('data-nav') && buttonClicked.getAttribute('data-nav') === 'prev') {
     // Обновляем прогресс бар
     updateProgressBar('prev');

     // Показываем предыдущую карточку с анимацией
     cardDisplay('prev');
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
const telInput = document.querySelector('#phone');

// Если найдена форма и поле телефона - отслеживаем действие 'submit'
if (submitForm && telInput) {
  submitForm.onclick = function () {
    if (telInput.value === '+' || telInput.value.length < 6) {
      telInput.value = '';
    }
  }
}

// Маска номера телефона
mask('#phone');

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




