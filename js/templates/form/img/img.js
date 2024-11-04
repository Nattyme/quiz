// Функция создаёт и возвращает шаблон кнопок
const createFormImgTmpl = function (type, alt) {
  // Создаём конструктор кнопок
  const CreateButton = function (type, imgClass, imgWidth, imgName, imgFolder) {
    this.type = type,
    this.alt = alt,
    this.className = imgClass,
    this.width = imgWidth,
    this.name = imgName,
    this.folder = imgFolder,
    this.src = this.folder + this.name
  }

  // Создаём массив для изобржения
  const imgs = [];

  // Создаём массив для шаблонов изобрадения
  const imgTmplArr = [];

  for (let i = 0; i < type.length; i++) {
    // Если тип 'wave' - создаём кнопку с нужными параметрами
    if (type[i] === 'wave') {
      imgs.push(new CreateButton (type, 'title-img', '70', 'clapping.svg', './img/icons/'));
    }
  }

  // Для каждой кнопки из массива добавляем шаблон в массив buttonsTmplArray 
  imgs.forEach (img => {
    const imgTmpl = `
      <img
        class="${img.className}"
        width="${img.width}"
        src="${img.src}"
        alt="${img.alt}"
      />`;

    imgTmplArr.push(imgTmpl);
  });


  // Возвращаем массив кнопок без запятых
  return imgTmplArr.join(' ');
}

export default {createFormImgTmpl}