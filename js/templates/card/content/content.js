import createInputTmpl from '../input/input.js';
  
// Функция создаёт шаблон для контента
// ('radio', 'radio-block__real', 'what-html-means', 'Hero Tutorial Multi Level')
const createContentTmpl = function(cardType, inputType, title) {
  // создаем конструктор контента
  const CreateContent = function (cardType, inputType, title) {
    this.title = title,
    this.inputType = inputType,
    this.group = cardType + '-group',
    this.input = createInputTmpl.createInputTmpl(cardType, inputType);
  };

  let content = new CreateContent(cardType, inputType, title);
  
  const contentTmpl = `
    <div class="plate-content">
      <h2 data-question class="title-main">${content.title}</h2>
        <div class="${content.group}" data-answers>
          ${content.input}
        </div>
    </div>
  `;

  return contentTmpl;
}

export default {createContentTmpl};