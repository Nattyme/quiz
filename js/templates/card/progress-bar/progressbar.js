const createProgressBarTmpl = function () {
  const progressBarTmpl = `
    <div class="plate-footer__progress progress">
      <div class="progress__label">Готово: <strong>56%</strong></div>
      <div class="progress__line-wrapper">
          <div class="progress__line-bar"></div>
      </div>
    </div>
  `;
  
  return progressBarTmpl;
}

export default {createProgressBarTmpl};
