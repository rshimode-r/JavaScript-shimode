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
//mathを忘れていた。
//-1か1かに囚われていたが、正負が分かればＯＫだった...
console.log(
  data.sort(function (a, b) {
    if (a.math > b.math) return -1;
    if (a.math < b.math) return 1;
    if (a.math === b.math) {
      if (a.chemistry > b.chemistry) return -1;
      if (a.chemistry < b.chemistry) return 1;
      if (a.chemistry === b.chemistry) {
        if (a.geography > b.geography) return -1;
        if (a.geography < b.geography) return 1;
      }
    }
  })
);

// [
//   { name: 'Frank', class: 'B', math: 90, chemistry: 70, geography: 80 },
//   {
//     name: 'Justin',
//     class: 'C',
//     math: 80,
//     chemistry: 40,
//     geography: 30
//   },
//   { name: 'Carol', class: 'A', math: 70, chemistry: 55, geography: 30 },
//   { name: 'Isaac', class: 'C', math: 70, chemistry: 40, geography: 50 },
//   {
//     name: 'Mallet',
//     class: 'C',
//     math: 60,
//     chemistry: 70,
//     geography: 90
//   },
//   { name: 'Ellen', class: 'B', math: 60, chemistry: 70, geography: 40 },
//   { name: 'Bob', class: 'A', math: 50, chemistry: 50, geography: 60 },
//   { name: 'Dave', class: 'B', math: 40, chemistry: 20, geography: 60 },
//   { name: 'Alice', class: 'A', math: 10, chemistry: 30, geography: 20 }
// ]
