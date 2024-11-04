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