import createHeaderTmpl from '../../templates/card/header/header.js';
import createFooterTmpl from '../../templates/card/footer/footer.js';
import createContentTmpl from '../../templates/card/content/content.js';

const createCards = function (type, inputType, title, progress) {
  const cards = [];
  // Constructor for card
  const GetCard = function (type, inputType) {
    this.type = type,
    this.inputType = inputType,
    this.title = title,
    this.header = createHeaderTmpl.createHeaderTmpl(),
    this.content = createContentTmpl.createContentTmpl(this.type, this.inputType, this.title),
    this.footer = createFooterTmpl.createFooterTmpl(progress)
  }

  const card = new GetCard (type, inputType, progress);

  const cardTmpl = `
    <section class="plate" data-progress>
      ${card.header}
      ${card.content}
      ${card.footer}
    </section>
  `;
   
  // Вызываем функцию создания шаблона карточки и записываем его в переменную card
  return cardTmpl;
}

export default {createCards};