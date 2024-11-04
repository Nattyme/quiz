import createFormImgTmpl from './img/img.js';
import createFormGroupTmpl from './form-group/form-group.js';
import createCheckboxTmpl from './checkbox/checkbox.js'
import createFormButtonTmpl from './buttons/buttons.js';

 // Функция создаёт шаблона формы
 const createFormTmpl = function () {
  const CreateForm = function (title, buttonType, buttonValue, formGroup, formGroupId, checkboxIdArr) {
    this.title = title,
    this.formGroup = createFormGroupTmpl.createFormGroupTmpl(formGroup, formGroupId),
    this.checkbox = createCheckboxTmpl.createCheckboxTmpl(checkboxIdArr);
    this.buttons = createFormButtonTmpl.createFormButtonTmpl(buttonType, buttonValue),
    this.img = createFormImgTmpl.createFormImgTmpl(['wave'] , 'Отлично! Последний шаг!');
  }

  const form = new CreateForm('Отлично! Последний шаг!', 'submit', ['result'], ['name', 'email', 'phone'], 
    ['name', 'email', 'phone'], ['policy']);
  console.log(form.formGroup);

  // Создаём form
  const formTmpl = `
    <section class="plate">
      <div class="cover-content-wrapper">
        <div class="cover-content">
            <div>
              ${form.img}
              <div data-question class="title">${form.title}</div>
              ${form.formGroup}
              ${form.checkbox}
              ${form.buttons}
            </div>

        </div>
      </div>
    </section>
  `;

  // Вернём form
  return formTmpl;
}

export default {createFormTmpl};