try {
  console.log("tryを実行");
  //dummyは存在しない関数
  dummy();
} catch (e) {
  console.log("catchを実行 : " + e);
} finally {
  console.log("finallyを実行");
}
