const createInputTmpl = function (cardType, type) {
  // создаем конструктор атрибутов для интпута
  const CreateInput = function (cardType, type, classReal, classFake, classLabel, name, text, value, imgFolder = '', imgName = '') {
    this.type = type,
    this.cardType = cardType,
    this.classReal = classReal,
    this.classFake = classFake,
    this.classLabel = classLabel,
    this.name = name,
    this.text = text,
    this.value = value,
    this.imgFolder = imgFolder,
    this.imgName = imgName
  };

  // Создаём массив с данными об инпутах
  let inputArray = [];

  // Создаём массив шаблонов для инпутов
  let inputTmplArr = [];

  // Если тип карточки 'radio' или 'checkbox' - используем шаблон
  if (cardType === 'radio' || cardType === 'checkbox') {
    const radioTitles = [
      'Hero Tutorial Multi Level', 
      'Hyper Text Markup Language', 
      'High Task Mirage Language', 
      'HTML не имеет расшифровки. Это военная разработка.'
    ];

    const checkboxTitles = [
      'Hero Tutorial Multi Level', 
      'Hyper Text Markup Language', 
      'High Task Mirage Language', 
      'HTML не имеет расшифровки. Это военная разработка.'
    ]

    // Создаём пустой массив. В него запишем ссылку на массив radioTitles или checkboxTitles
    let dataTitles = [];

    cardType === 'radio' ? dataTitles = radioTitles : dataTitles = checkboxTitles;

    // Функция обходит массив c заголовками инпута, создаёт объект и добавляет в массив inputArray
    const inputData = function (titleArr) {

      titleArr.forEach ( title => {
        if ( type === 'radio') {
          inputArray.push(new CreateInput(cardType, type, 'radio-block__real', 'radio-block__fake', 'radio-block', 'what-html-means', title, title));
        } 

        if (type === 'checkbox') {
          inputArray.push(new CreateInput(cardType, type, 'checkbox-block__real', 'checkbox-block__fake', 'checkbox-block', 'what-html-means', title, title));
        }
      })
    }

    // Запускаем функцию
    inputData(dataTitles);

    // const inputRadioTmplArr = [];
    // Заполняем шаблон для страниц radio или checkbox
    for (let i = 0; i < inputArray.length; i++) {
      let inputText = '';
      if (inputArray[i].type === 'radio') {
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

      inputTmplArr.push(inputTmpl);
    }

  }
  
  // Если тип карточки 'card' - используем шаблон
  if ( cardType === 'cards') {
    const getCardsData =  [
      {title : 'Мобильные приложения', imgFolder : 'img/pictures/', imgName : 'mobile.jpg'},
      {title : 'Сайты для всех браузеров и платформ', imgFolder : 'img/pictures/', imgName : 'browser.jpg'},
      {title : 'Программы для Windows', imgFolder : 'img/pictures/', imgName : 'windows.jpg'},
      {title : 'Программы для Linux', imgFolder : 'img/pictures/', imgName : 'linux.jpg'}
    ];
 
    
    // Функция заполняет массив данными о карточке
    const inputData = function (inputArray, getCardsData) {
      getCardsData.forEach( data => {
        inputArray.push(new CreateInput(cardType, type, 'card-block__radio-real', 'card-block__radio-fake', 'card-block__radio', 'image-group', 
          data.title, data.title, data.imgFolder, data.imgName));
      })
    }

    inputData(inputArray, getCardsData);
    
    // Заполняем массив inputTmplArr шаблонами инпутов для страниц radio или checkbox
    for (let i = 0; i < inputArray.length; i++) {
        const inputTmpl = `
           <label class="card-block">
              <div class="card-block__radio">
                  <input
                      name="image-group"
                      type="${inputArray[i].type}"
                      class="${inputArray[i].classReal}"
                      value="${inputArray[i].value}"
                  />
                  <div class="${inputArray[i].classFake}"></div>
              </div>
              <div class="card-block__img">
                  <img src="${inputArray[i].imgFolder + inputArray[i].imgName}" alt="Img" />
              </div>
              <div class="card-block__text">
                  ${inputArray[i].text}
              </div>
          </label>
        `;

        inputTmplArr.push(inputTmpl);
    }

  }


  // new CreateInput(cardType, type, 'card-block__radio-real', 'card-block__radio-fake', 'card-block__radio', 'image-group', 
  //   'Мобильные приложения', 'Мобильные приложения', data.imgName, data.imgSrc)

  // Возвращаем массив шаблонов, убираем знак ','
  return inputTmplArr.join(' ');
  
}

export default {createInputTmpl};