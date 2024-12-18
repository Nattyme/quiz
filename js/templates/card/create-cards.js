/*
Компонент createCards
Этот компонент предназначен для создания карточек с различными элементами управления (например, радио-кнопки, чекбоксы) и изображениями. Каждая карточка содержит три основных блока: header (шапка), content (содержимое) и footer (подвал). Карточки добавляются в массив и затем генерируется HTML-разметка для каждой из них.

Описание функции
javascript
Копировать код
const createCards = function () {
  // тело функции
}
Описание:

Функция createCards создает и возвращает HTML-разметку для набора карточек с различными элементами управления и изображениями.
Внутри функции создаются карточки с помощью конструктора GetCard, заполняются массивы с данными и создаются шаблоны HTML для каждой карточки.
Функция возвращает строку с HTML-разметкой всех карточек.
Параметры и используемые классы
Конструктор GetCard Конструктор GetCard используется для создания объектов карточек. Каждый объект содержит информацию о типе карточки, типе ввода, заголовке, содержимом, изображениях и других данных.

type: Тип карточки (например, radio, checkbox, cards).
inputType: Тип ввода (например, radio, checkbox).
title: Заголовок карточки (например, "Что означает сокращение HTML?").
classReal: Классы для реальных элементов (например, для реальных radio или checkbox кнопок).
classFake: Классы для фальшивых элементов (например, для элементов отображения состояния).
classLabel: Классы для метки (label).
name: Имя элемента (например, для radio или checkbox).
text: Массив возможных вариантов для выбора.
imgFolder (необязательный параметр): Папка с изображениями (по умолчанию пустая строка).
imgName (необязательный параметр): Массив с именами изображений (по умолчанию пустой).
Пример создания карточки:

javascript
Копировать код
new GetCard('radio', 'radio', 'Что означает сокращение HTML?', 
  ['radio-block__real'], 
  ['radio-block__fake'], 
  ['radio-block'], 
  'what-html-means', 
  ['Hero Tutorial Multi Level', 'Hyper Text Markup Language', 'High Task Mirage Language', 
   'HTML не имеет расшифровки. Это военная разработка. :D']);
Шаблон карточки
Для каждой карточки формируется строка HTML с использованием шаблонов для header, content и footer.

javascript
Копировать код
const cardTmpl = `
  <section class="plate" data-progress>
    ${cards[i].header}
    ${cards[i].content}
    ${cards[i].footer}
  </section>
`;
header: Шаблон для шапки карточки. Сгенерирован с использованием функции createHeaderTmpl.createHeaderTmpl().
content: Содержимое карточки. Сгенерировано с использованием функции createContentTmpl.createContentTmpl(), которая принимает множество параметров, чтобы настроить карточку в зависимости от типа ввода и других данных.
footer: Шаблон подвала карточки. Сгенерирован с использованием функции createFooterTmpl.createFooterTmpl().
Генерация шаблонов
Для каждой карточки создается строка с HTML-разметкой. Все карточки собираются в массив cardsTmpl:

javascript
Копировать код
for (let i = 0; i < cards.length; i++) {
  const cardTmpl = `
    <section class="plate" data-progress>
      ${cards[i].header}
      ${cards[i].content}
      ${cards[i].footer}
    </section>
  `;
  cardsTmpl.push(cardTmpl);
}
Затем возвращается объединенная строка всех карточек в формате HTML:

javascript
Копировать код
return cardsTmpl.join(' ');
Возвращаемое значение
Функция возвращает строку с HTML-разметкой всех карточек:

html
Копировать код
<section class="plate" data-progress>
  <!-- header -->
  <!-- content -->
  <!-- footer -->
</section>
Каждая карточка обернута в элемент <section> с классом plate и атрибутом data-progress, который может использоваться для отслеживания состояния карточки или других целей.

Пример использования
javascript
Копировать код
const cardsHTML = createCards();
document.getElementById('card-container').innerHTML = cardsHTML;
Этот код вызовет функцию createCards, которая сгенерирует HTML-разметку для всех карточек и вставит её в элемент с id card-container.

Примечания
Функции createHeaderTmpl.createHeaderTmpl(), createContentTmpl.createContentTmpl(), и createFooterTmpl.createFooterTmpl() должны быть заранее определены и должны возвращать соответствующие части HTML-разметки для карточек.
Данные карточек (например, текст и изображения) могут быть легко настроены и изменены путем изменения значений в массиве cards.
*/


import createHeaderTmpl from './header/header.js';
import createFooterTmpl from './footer/footer.js';
import createContentTmpl from './content/content.js';

// Функция создаёт карточки 
const createCards = function () {
  const cards = [];

  // Конструктор для карточек
  const GetCard = function (type, inputType, title, classReal, classFake, classLabel, name, text, imgFolder='', imgName='') {
    this.type = type,
    this.inputType = inputType,
    this.title = title,
    this.inputType = inputType,
    this.inputClassReal = classReal,
    this.inputClassFake = classFake,
    this.classLabel = classLabel,
    this.inputName = name,
    this.inputText = text,
    this.value = this.inputText,
    this.imgFolder = imgFolder,
    this.imgName = imgName,
    this.header = createHeaderTmpl.createHeaderTmpl(),
    this.content = createContentTmpl.createContentTmpl(this.type, this.inputType, this.title, this.inputClassReal, 
    this.inputClassFake, this.classLabel, this.inputName, this.inputText, this.value, this.imgFolder, this.imgName),
    this.footer = createFooterTmpl.createFooterTmpl()
  }

  // Заполняем массив карточками
  cards.push(new GetCard('radio', 'radio', 'Что означает сокращение HTML?', ['radio-block__real'], ['radio-block__fake'], 
    ['radio-block'], 'what-html-means', ['Hero Tutorial Multi Level', 'Hyper Text Markup Language', 'High Task Mirage Language', 
      'HTML не имеет расшифровки. Это военная разработка. :D']));

  cards.push(new GetCard('checkbox', 'checkbox', 'Что означает сокращение HTML?', ['checkbox-block__real'], ['checkbox-block__fake'], 
    ['checkbox-block'], 'what-html-means', ['Hero Tutorial Multi Level', 'Hyper Text Markup Language', 'High Task Mirage Language', 
      'HTML не имеет расшифровки. Это военная разработка. :D']));

  cards.push(new GetCard('cards', 'radio', 'На HTML можно создавать: ', ['card-block__radio-real'], ['card-block__radio-fake'], 
    ['card-block'], 'image-group', ['Мобильные приложения', 'Сайты для всех браузеров и платформ', 'Программы для Windows', 
      'Программы для Linux'], ['img/pictures/'], ['mobile.jpg', 'browser.jpg', 'windows.jpg', 'linux.jpg']));

   
  // Объявим массив для хранения шаблонов картоек
  const cardsTmpl = [];

  // В зав-ти от длинны в массиве cards, создаём такое же кол-во шаблонов карточек
  for (let i = 0; i < cards.length; i++) {
    const cardTmpl = `
      <section class="plate" data-progress>
        ${cards[i].header}
        ${cards[i].content}
        ${cards[i].footer}
      </section>
    `;

    cardsTmpl.push(cardTmpl);
  }
 
  // Возвращаем массив с шаблонами карточек
  return cardsTmpl.join(' ');
}

export default {createCards};