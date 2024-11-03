 // Функция создаёт шаблон header
 const createHeaderTmpl = function () {
  const CreateHeader = function (className, imgClass, imgName, imgFolder, title) {
    this.className = className,
    this.imgClass = imgClass,
    this.imgName = imgName,
    this.imgFolder = imgFolder,
    this.imgSrc = this.imgFolder + this.imgName,
    this.title = title
  }

  const header = new CreateHeader('plate-header', 'plate-header__icon', 'list.png', './img/icons/', 'Ваш уровень знания верстки сайтов');
 
  // Создаём header
  const headerTmpl = `
    <header class="${header.className}">
        <img src="${header.imgSrc}" alt="Icon" class="${header.imgClass}" />
        ${header.title}
    </header>
  `;

  // Вернём header
  return headerTmpl
}

export default {createHeaderTmpl};