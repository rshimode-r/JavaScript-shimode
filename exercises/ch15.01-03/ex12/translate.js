// prettier-ignore
javascript:(function(){var t=window.getSelection().toString();if(!t){alert("文字を選択してください");return;}window.open("https://translate.google.com/?sl=auto&tl=ja&text="+encodeURIComponent(t),"_blank");})();
// 改行あり
javascript: (function () {
  var t = window.getSelection().toString();
  if (!t) {
    alert("文字を選択してください");
    return;
  }
  window.open(
    "https://translate.google.com/?sl=auto&tl=ja&text=" + encodeURIComponent(t),
    "_blank"
  );
})();
