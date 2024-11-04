import createHeaderTmpl from '../../templates/card/header/header.js';
import createFooterTmpl from '../../templates/card/footer/footer.js';
import createContentTmpl from '../../templates/card/content/content.js';

const createCards = function () {
  const cards = [];

  // Конструктор для карточек
  const GetCard = function (type, inputType, title) {
    this.type = type,
    this.inputType = inputType,
    this.title = title,
    this.header = createHeaderTmpl.createHeaderTmpl(),
    this.content = createContentTmpl.createContentTmpl(this.type, this.inputType, this.title),
    this.footer = createFooterTmpl.createFooterTmpl()
  }

  // Заполняем массив карточками
  cards.push(new GetCard('radio', 'radio', 'Что означает сокращение HTML?'));
  cards.push(new GetCard('checkbox', 'checkbox', 'Что означает сокращение HTML?'));
  cards.push(new GetCard('cards', 'radio', 'На HTML можно создавать: '));

  const cardsTmpl = [];

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