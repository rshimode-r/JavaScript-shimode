export function* Counter() {
  //なぜ1から始めるようにしたのか？catchで0にリセットするのでcountの初期値は0でよい
  let count = 1;
  while (true) {
    try {
      yield count++;
    } catch (e) {
      count = 0;
    }
  }
}
