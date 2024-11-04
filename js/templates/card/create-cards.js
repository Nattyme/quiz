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