import createInputTmpl from '../input/input.js';
  
// Функция создаёт шаблон для контента
const createContentTmpl = function(cardType, inputType, title, classReal, classFake, classLabel, name, text, value, imgFolder, imgName) {
  // создаем конструктор контента
  const CreateContent = function (cardType, inputType, title, classReal, classFake, classLabel, name, text, value, imgFolder, imgName) {
    this.title = title,
    this.inputType = inputType,
    this.group = cardType + '-group',
    this.input = createInputTmpl.createInputTmpl(cardType, inputType, classReal, classFake, classLabel, name, text, value, imgFolder, imgName);
  };

  // Создадим объект контента, сохраним в переменную
  let content = new CreateContent(cardType, inputType, title, classReal, classFake, classLabel, name, text, value, imgFolder, imgName);

  // Шаблон контента
  const contentTmpl = `
    <div class="plate-content">
      <h2 data-question class="title-main">${content.title}</h2>
        <div class="${content.group}" data-answers>
          ${content.input}
        </div>
    </div>
  `;

  // Вернём массив с шаблонами
  return contentTmpl;
}

export default {createContentTmpl};