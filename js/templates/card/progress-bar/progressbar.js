const createProgressBarTmpl = function () {
  const CreateProgressBar = function (progress) {
    this.progress = progress
  }

  const progressBar = new CreateProgressBar('56');

  const progressBarTmpl = `
    <div class="plate-footer__progress progress">
      <div class="progress__label">Готово: <strong>${progressBar.progress}%</strong></div>
      <div class="progress__line-wrapper">
          <div class="progress__line-bar" style="width: ${progressBar.progress}%;" ></div>
      </div>
    </div>
  `;
  
  return progressBarTmpl;
}

export default {createProgressBarTmpl};
