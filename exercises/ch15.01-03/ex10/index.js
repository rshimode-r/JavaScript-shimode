const editorFront = document.getElementById("editor-front");
const editorBack = document.getElementById("editor-back");

editorFront.addEventListener("click", () => {
  editorBack.focus();
});

editorBack.addEventListener("focus", () => {
  editorFront.style.backgroundColor = "silver";
});

editorBack.addEventListener("blur", () => {
  editorFront.style.backgroundColor = "white";
});

editorBack.addEventListener("input", () => {
  editorFront.textContent = editorBack.value;
});
