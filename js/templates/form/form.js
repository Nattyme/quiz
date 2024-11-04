 // Функция создаёт шаблона формы
 const createFormTmpl = function () {
  // const CreateForm = function (className, imgClass, imgName, imgFolder, title) {
  //   this.className = className,
  //   this.imgClass = imgClass,
  //   this.imgName = imgName,
  //   this.imgFolder = imgFolder,
  //   this.imgSrc = this.imgFolder + this.imgName,
  //   this.title = title
  // }

  // const form = new CreateForm('plate-header', 'plate-header__icon', 'list.png', './img/icons/', 'Ваш уровень знания верстки сайтов');
 
  // Создаём form
  const formTmpl = `
    <section class="plate">
      <div class="cover-content-wrapper">
        <div class="cover-content">
            <div>
              <img
                class="title-img"
                width="70"
                src="img/icons/clapping.svg"
                alt="Отлично! Последний шаг!"
              />
              <div data-question class="title">Отлично! Последний шаг!</div>

              <div class="form-group">
                <!-- <label class="label" for="email">Введите Имя:</label> -->
                <input
                  class="input input--user"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Имя"
                  required
                  autocomplete="off"
                />
              </div>

              <div class="form-group">
                <!-- <label class="label" for="email">Введите Email:</label> -->
                <input
                  class="input input--email"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  required
                  autocomplete="off"
                />
              </div>

              <div class="form-group">
                <input type="hidden" name="url_redirect" value="./final.html" />
                  <!-- <label class="label" for="email">Телефон:</label> -->
                  <input
                    class="input input--phone"
                    type="tel"
                    id="tel"
                    name="tel"
                    placeholder="Телефон"
                    required
                    autocomplete="off"
                  />
              </div>

              <label class="checkbox">
                <input name="policy" required type="checkbox" class="checkbox__real" id="policy" />
                <div class="checkbox__fake"></div>
                <div class="checkbox__text">
                    С <a href="https://google.com" target="_blank">политикой конфеденциальности</a> ознакомлен
                </div>
              </label>

              <button
                  class="button button--huge mt-20"
                  type="submit"
                  name="submit"
                  value="result"
                  id="submitForm"
              >
                Получить результаты
              </button>

            </div>

        </div>
      </div>
    </section>
  `;

  // Вернём form
  return formTmpl;
}

export default {createFormTmpl};