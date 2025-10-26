const editorFront = document.getElementById("editor-front");
const editorBack = document.getElementById("editor-back");

//div 要素をクリックすると input 要素が focus される
editorFront.addEventListener("click", () => {
  editorBack.focus();
});

// div 要素は通常白色で input 要素に focus されると灰色 (silver)になる (input 要素から focus が外れると白色に戻る)
editorBack.addEventListener("focus", () => {
  editorFront.style.backgroundColor = "silver";
});

editorBack.addEventListener("blur", () => {
  editorFront.style.backgroundColor = "white";
});

editorBack.addEventListener("input", () => {
  editorFront.textContent = editorBack.value;
});
