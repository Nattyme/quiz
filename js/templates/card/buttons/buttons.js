// Функция создаёт шаблон кнопки
const createButtonTmpl = function () {
  const CreateButton = function (type, goTo) {
    this.type = type,
    this.goTo = goTo,
    this.text = {
      prev : 'Назад',
      next : 'Далее'
    }
  }

  const buttons = [] 
  
  buttons.push(new CreateButton ('button', 'prev'));
  buttons.push(new CreateButton ('button', 'next'));

  const buttonsTmpl = `
    <div class="plate-footer__buttons">
      <button type="${buttons[0].type}" class="button button--back" data-nav="${buttons[0].goTo}">${buttons[0].text.prev}</button>
      <button type="${buttons[1].type}" class="button" data-nav="${buttons[1].goTo}">${buttons[0].text.next}</button>
    </div>
  `;

 return buttonsTmpl;

}

export default {createButtonTmpl}