// ['name', 'email', 'phone'], 'id'
const createFormGroupTmpl = function (formGroup, formGroupId) {
  // Создаем конструктор для интпута
  const CreateFormGroup = function (className, type, id, name, placeholder, required='', autocomplete='') {
    this.formGroup = formGroup,
    this.formGroupId = formGroupId,
    this.id = id,
    this.className = className,
    this.type = type
    this.name = name,
    this.required = required,
    this.placeholder = placeholder,
    this.autocomplete = autocomplete;
  };
 
  // Создаём массив с данными об инпутах
  let formGroupArray = [];

  // Создаём массив шаблонов для инпутов
  let formGroupTmplArr = [];

  // Обойдем параметр type и проверим, какие пришли значения. По результату выберем парам-ры
  for (let i = 0; i < formGroup.length; i++) {
    if (formGroup[i] === 'name') {
      formGroupArray.push(new CreateFormGroup (['input', 'input--user'], 'text', formGroupId[i], 'name', 'Имя', 'required', 'off' ));
    }
   
    if (formGroup[i] === 'email') {
      formGroupArray.push(new CreateFormGroup (['input', 'input--email'], 'email', formGroupId[i], 'email', 'email', 'required', 'off' ));
    }

    if (formGroup[i] === 'phone') {
      formGroupArray.push(new CreateFormGroup (['input', 'input--phone'], 'tel', formGroupId[i], 'tel', 'Телефон', 'required', 'off' ));
    }
  }

   // Для каждой кнопки из массива добавляем шаблон в массив buttonsTmplArray 
  formGroupArray.forEach ( formGroup => {
    let formGroupTmpls = `
      <div class="form-group">
        <input
          class="${formGroup.className.join(' ')}"
          type="${formGroup.type}"
          id="${formGroup.id}"
          name="${formGroup.name}"
          placeholder="${formGroup.placeholder}"
          ${formGroup.required}
          ${formGroup.autocomplete}
        />
      </div>`;

    formGroupTmplArr.push(formGroupTmpls);
    
  });

  // Возвращаем массив шаблонов, убираем знак ','
  return formGroupTmplArr.join(' ');
  
}

export default {createFormGroupTmpl};