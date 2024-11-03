// Функция создаёт и возвращает шаблон кнопок
const createButtonTmpl = function (type, buttonsArray) {
  // Создаём конструктор кнопок
  const CreateButton = function (type, goTo, text, className) {
    this.type = type,
    this.goTo = goTo,
    this.text = text,
    this.className = className;
  }

  // Создаём массив для кнопок
  const buttons = [];

  // Создаём массив для шаблонов кнопок
  const buttonsTmplArr = [];

  for (let i = 0; i < buttonsArray.length; i++) {
    // Если тип 'prev' - создаём кнопку с нужными параметрами
    if (buttonsArray[i] === 'prev') {
      buttons.push(new CreateButton (type, 'prev', 'Назад', ['button', 'button--back']));
    }

    // Если тип 'next' - создаём кнопку с нужными параметрами
    if (buttonsArray[i] === 'next') {
      buttons.push(new CreateButton (type, 'next', 'Далее', ['button']));
    }
  }

  // Для каждой кнопки из массива добавляем шаблон в массив buttonsTmplArray 
  buttons.forEach (button => {
    const buttonsTmpl = `
        <button type="${button.type}" class="${button.className.join(' ')}" data-nav="${button.goTo}">${button.text}</button>
    `;

    buttonsTmplArr.push(buttonsTmpl);
  });


  // Возвращаем массив кнопок без запятых
  return buttonsTmplArr.join(' ');
}

export default {createButtonTmpl}