function multiDeclaration() {
  {
    const hoge = 1;
    console.log(hoge);
  }
  {
    const hoge = 2;
    console.log(hoge);
  }
}
multiDeclaration();
