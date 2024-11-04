// Функция создаёт и возвращает шаблон кнопок
const createFormButtonTmpl = function (type, buttonsArray) {
  // Создаём конструктор кнопок
  const CreateButton = function (type, value, text, className, id) {
    this.type = type,
    this.value = value,
    this.text = text,
    this.className = className,
    this.id = id;
  }

  // Создаём массив для кнопок
  const buttons = [];

  // Создаём массив для шаблонов кнопок
  const buttonsTmplArr = [];

  for (let i = 0; i < buttonsArray.length; i++) {
    // Если тип 'result' - создаём кнопку с нужными параметрами
    if (buttonsArray[i] === 'result') {
      buttons.push(new CreateButton (type, 'result', 'Получить результаты', ['button', 'button button--huge', 'mt-20'], 'submitForm'));
    }
  }

  // Для каждой кнопки из массива добавляем шаблон в массив buttonsTmplArray 
  buttons.forEach (button => {
    const buttonsTmpl = `
      <button
          class="${button.className.join(' ')}"
          type="${button.type}"
          name="${button.type}"
          value="${button.value}"
          id="${button.id}"
      >
          ${button.text}
      </button>`;

    buttonsTmplArr.push(buttonsTmpl);
  });


  // Возвращаем массив кнопок без запятых
  return buttonsTmplArr.join(' ');
}

export default {createFormButtonTmpl}