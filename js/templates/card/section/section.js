import createHeaderTmpl from '../header/header.js'
import createFooterTmpl from '../footer/footer.js'
  
  // Функция создаёт section
  const createSectionTmpl = function () {

    const CreateSectionTmpl = function (title) {
      this.title = title,
      this.header = createHeaderTmpl.createHeaderTmpl(),
      this.footer = createFooterTmpl.createFooterTmpl()
    }
  
    const section = new CreateSectionTmpl('Что означает сокращение HTML?');
  
    const sectionTmpl = `
      <section class="plate" data-progress>
          ${section.header}
          <div class="plate-content">
            <h2 data-question class="title-main">${section.title}</h2>
          </div>
          ${section.footer}
      </section>
    `;
    
  //   // Создём новую карточкую Создаем секцию
  //  const section = document.createElement('section');
  //  // Добавляем ей класс
  //  section.classList.add('plate');
  //  // Задаём атрибут data-progress
  //  section.setAttribute('data-progress', '');
   return sectionTmpl;
  }
  export default {createSectionTmpl};