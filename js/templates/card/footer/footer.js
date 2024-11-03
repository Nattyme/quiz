 import createProgressBarTmpl from '../progress-bar/progressbar.js'
 import createButtonTmpl from '../buttons/buttons.js'
 
 // Функция создаёт шаблон футера
const createFooterTmpl = function () {

  const CreateFooter = function () {
    this.progressBar = createProgressBarTmpl.createProgressBarTmpl(),
    this.buttons = createButtonTmpl.createButtonTmpl()
  }

  const footer = new CreateFooter ();

  const footerTmpl = `
      <footer class="plate-footer">
            ${footer.progressBar}
            ${footer.buttons}
        </footer>
  `;

  return footerTmpl;
}

export default {createFooterTmpl}