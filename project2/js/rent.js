document.addEventListener("DOMContentLoaded", function() {
  const inputLeft = document.getElementById("input-left");
  const inputRight = document.getElementById("input-right");

  const thumbLeft = document.querySelector(".slider > .thumb.left");
  const thumbRight = document.querySelector(".slider > .thumb.right");
  const range = document.querySelector(".slider > .range");

  const leftValueDisplay = document.getElementById("left-value");
  const rightValueDisplay = document.getElementById("right-value");

  const setLeftValue = () => {
    const _this = inputLeft;
    const [min, max] = [parseInt(_this.min), parseInt(_this.max)];

    // 값 교차 방지
    _this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 1);

    const percent = ((_this.value - min) / (max - min)) * 100;
    thumbLeft.style.left = percent + "%";
    range.style.left = percent + "%";
    range.style.width = (parseInt(inputRight.value) - parseInt(inputLeft.value)) / (max - min) * 100 + "%";

    // 텍스트 업데이트
    leftValueDisplay.textContent = Number(_this.value).toLocaleString()
  };

  const setRightValue = () => {
    const _this = inputRight;
    const [min, max] = [parseInt(_this.min), parseInt(_this.max)];

    // 값 교차 방지
    _this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value) + 1);

    const percent = ((_this.value - min) / (max - min)) * 100;
    thumbRight.style.right = 100 - percent + "%";
    range.style.width = (parseInt(inputRight.value) - parseInt(inputLeft.value)) / (max - min) * 100 + "%";
    range.style.right = 100 - percent + "%";

    // 텍스트 업데이트
    rightValueDisplay.textContent = Number(_this.value).toLocaleString()
  };

  inputLeft.addEventListener("input", setLeftValue);
  inputRight.addEventListener("input", setRightValue);

  // 초기값 설정
  setLeftValue();
  setRightValue();
});
