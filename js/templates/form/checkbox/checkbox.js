// Функция создаёт и возвращает шаблон кнопок
const createCheckboxTmpl = function (checkboxIdArray) {
  // Создаём конструктор кнопок
  const CreateCheckbox = function (type, value, link, text) {
    this.type = type,
    this.value = value,
    this.link = link,
    this.text = text,
    this.id = checkboxIdArray;
  }

  // Создаём массив для кнопок
  const checkboxes = [];

  // Создаём массив для шаблонов кнопок
  const checkboxTmplArr = [];

  for (let i = 0; i < checkboxIdArray.length; i++) {
    // Если тип 'result' - создаём кнопку с нужными параметрами
    if (checkboxIdArray[i] === 'policy') {
      // name, id, link, text
      checkboxes.push(new CreateCheckbox ('policy', checkboxIdArray[i], 'https://google.com', 'политикой конфеденциальности'));
    }
  }

  // Для каждой кнопки из массива добавляем шаблон в массив buttonsTmplArray 
  checkboxes.forEach (checkbox => {
    const checkboxTmpl = `
      <label class="checkbox">
        <input name="${checkbox.name}" required type="checkbox" class="checkbox__real" id="${checkbox.id}" />
        <div class="checkbox__fake"></div>
        <div class="checkbox__text">
            С <a href="${checkbox.link}" target="_blank">${checkbox.text}</a> ознакомлен
        </div>
      </label>`;

      checkboxTmplArr.push(checkboxTmpl);
  });

  // Возвращаем массив кнопок без запятых
  return checkboxTmplArr.join(' ');
}

export default {createCheckboxTmpl}