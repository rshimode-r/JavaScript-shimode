const data = [
  { name: "Alice", class: "A", math: 10, chemistry: 30, geography: 20 },
  { name: "Bob", class: "A", math: 50, chemistry: 50, geography: 60 },
  { name: "Carol", class: "A", math: 70, chemistry: 55, geography: 30 },
  { name: "Dave", class: "B", math: 40, chemistry: 20, geography: 60 },
  { name: "Ellen", class: "B", math: 60, chemistry: 70, geography: 40 },
  { name: "Frank", class: "B", math: 90, chemistry: 70, geography: 80 },
  { name: "Isaac", class: "C", math: 70, chemistry: 40, geography: 50 },
  { name: "Justin", class: "C", math: 80, chemistry: 40, geography: 30 },
  { name: "Mallet", class: "C", math: 60, chemistry: 70, geography: 90 },
];

console.log(
  "1. `math`の全員の合計点 : " +
    data.reduce((sum, value) => sum + value.math, 0)
);
console.log(
  "2. クラスAの`chemistry`の平均点 : " +
    data.reduce(
      //fillterでクラスを絞り込める
      (sum, value) => (value.class === "A" ? sum + value.chemistry : sum),
      0
    ) /
      data.reduce((sum, value) => (value.class === "A" ? sum + 1 : sum), 0)
);
console.log(
  "3. 3科目合計点のクラスC内での平均点 : " +
    data.reduce(
      (sum, value) =>
        value.class === "C"
          ? sum + value.math + value.chemistry + value.geography
          : sum,
      0
    ) /
      data.reduce((sum, value) => (value.class === "C" ? sum + 1 : sum), 0)
);
console.log(
  "4. 3科目合計点が最も高い人の`name` : " +
    data.reduce((excellentPerson, value) =>
      excellentPerson.math +
        excellentPerson.chemistry +
        excellentPerson.geography >
      value.math + value.chemistry + value.geography
        ? excellentPerson
        : value
    ).name
);
// `geography`の平均
const geographyAvg =
  data.reduce((sum, value) => sum + value.geography, 0) / data.length;
// `geography`の分散
const geographyVariance =
  data.reduce(
    (result, value) =>
      result +
      (value.geography - geographyAvg) * (value.geography - geographyAvg),
    0
  ) / data.length;

console.log("5. 全体の`geography`の標準偏差 : " + Math.sqrt(geographyVariance));

// 1. `math`の全員の合計点 : 530
// 2. クラスAの`chemistry`の平均点 : 45
// 3. 3科目合計点のクラスC内での平均点 : 176.66666666666666
// 4. 3科目合計点が最も高い人の`name` : Frank
// 5. 全体の`geography`の標準偏差 : 22.3330569358242
