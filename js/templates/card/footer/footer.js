 import createProgressBarTmpl from '../progress-bar/progressbar.js'
 import createButtonTmpl from '../buttons/buttons.js'
 
 // Функция создаёт шаблон футера
const createFooterTmpl = function () {

  // Создаём конструктор футера
  const CreateFooter = function (type, buttonsArray) {
    this.progressBar = createProgressBarTmpl.createProgressBarTmpl(),
    this.buttons = createButtonTmpl.createButtonTmpl(type, buttonsArray)
  }

  // Создаём футер, сохраняем в переменную
  const footer = new CreateFooter ('button', ['prev', 'next']);

  // Сохраняем шаблон футера 
  const footerTmpl = `
      <footer class="plate-footer">
            ${footer.progressBar}
        <div class="plate-footer__buttons">
            ${footer.buttons}
        </div>
      </footer>
  `;

  // Возращаем шаблон
  return footerTmpl;
}

export default {createFooterTmpl}