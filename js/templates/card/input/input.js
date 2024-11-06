/** 
 * @param {string} cardType - The type of card or context related to the input field. This can be used for styling or additional logic.
 * @param {string} type - The type of the input element (e.g., "text", "radio", "checkbox").
 * @param {string} classReal - The CSS class for the real input element.
 * @param {string} classFake - The CSS class for the fake or helper element that might be used for custom styling (e.g., custom radio buttons).
 * @param {string} classLabel - The CSS class for the label element associated with the input.
 * @param {string} name - The name attribute for the input field, used in form submissions.
 * @param {string} text - The label text displayed next to the input (used for radio buttons, checkboxes, etc.).
 * @param {string} value - The value associated with the input field (e.g., for radio buttons or checkboxes).
 * @param {string} imgFolder - The folder path where images related to the input are stored.
 * @param {string} imgName - The specific image file name to associate with the input (e.g., logo for payment methods).
 * 
 * @returns {Object} - An object containing the following properties:
 *   - `type` (string): The type of the input element (e.g., "text", "radio").
 *   - `cardType` (string): The type of card/context.
*/


const createInputTmpl = function (cardType, type, classReal, classFake, classLabel, name,  text, value, imgFolder, imgName) {
  // Создаем конструктор для интпута
  const CreateInput = function (cardType, type, classReal, classFake, classLabel, name, text, value, imgFolder, imgName) {
    this.type = type,
    this.cardType = cardType,
    this.classReal = classReal,
    this.classFake = classFake,
    this.classLabel = classLabel,
    this.name = name,
    this.text = text,
    this.value = value,
    this.imgFolder = imgFolder,
    this.imgName = imgName,
    this.imgSrc = imgFolder + imgName
  };

  // Создаём массив с данными об инпутах
  let inputArray = [];

  // Создаём массив шаблонов для инпутов
  let inputTmplArr = [];

  for (let i = 0; i < text.length; i++) {
    inputArray.push(new CreateInput(cardType, type, classReal.join(' '), classFake ? classFake.join(' ') : '', classLabel.join(' '), 
    name, text[i], value[i], imgFolder[0], imgName[i]));
  }

  // Если тип карточки 'radio' или 'checkbox' - используем шаблон
  if (cardType === 'radio' || cardType === 'checkbox') {
    // Заполняем шаблон для страниц radio или checkbox
    for (let i = 0; i < inputArray.length; i++) {
      let inputText = '';
      if (type === 'radio') {
        inputText = inputArray[i].text;
      };

      if (inputArray[i].type === 'checkbox') {
        inputText = `
          <div class="checkbox-block__text">
            ${inputArray[i].text}
          </div>
        `;
      }

      const inputTmpl = `
            <label class="${inputArray[i].classLabel}">
              <input
                type="${inputArray[i].type}"
                name="${inputArray[i].name}"
                class="${inputArray[i].classReal}"
                value="${inputArray[i].value}"
              />
              <div class="${inputArray[i].classFake}"></div>
              ${inputText}
            </label>`;

      // Добавляем шаблон в массив inputTmplArr
      inputTmplArr.push(inputTmpl);
    }
  }
  
  // // Если тип карточки 'card' - используем шаблон
  if ( cardType === 'cards') {
  
    // Заполняем массив inputTmplArr шаблонами инпутов 
    for (let i = 0; i < inputArray.length; i++) {
        const inputTmpl = `
           <label class="${inputArray[i].classLabel}">
              <div class="card-block__radio">
                  <input
                      name="${inputArray[i].name}"
                      type="${inputArray[i].type}"
                      class="${inputArray[i].classReal}"
                      value="${inputArray[i].value}"
                  />
                  <div class="${inputArray[i].classFake}"></div>
              </div>
              <div class="card-block__img">
                  <img src="${inputArray[i].imgSrc}" alt="Img" />
              </div>
              <div class="card-block__text">
                  ${inputArray[i].text}
              </div>
          </label>
        `;

        inputTmplArr.push(inputTmpl);
    }

  }

  // Возвращаем массив шаблонов, убираем знак ','
  return inputTmplArr.join(' ');
  
}

export default {createInputTmpl};