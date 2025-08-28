//cat ch01/ex09/Hamlet.txt | node ch01/ex09/index.js
//cat ch01/ex09/TheMarchantOfVenice.txt | node ch01/ex09/index.js
class DefaultMap extends Map {
  constructor(defaultValue) {
    super();
    this.defaultValue = defaultValue;
  }

  get(key) {
    if (this.has(key)) {
      return super.get(key);
    } else {
      return this.defaultValue;
    }
  }
}

class wordHistogram {
  constructor() {
    this.wordCounts = new DefaultMap(0);
    this.totalWords = 0;
  }
  add(text) {
    const matches = text.toLowerCase().matchAll(/\w+|\$[\d.]+|\S+/g);
    const words = [...matches].map((r) => r[0]);

    for (let word of words) {
      let count = this.wordCounts.get(word);
      this.wordCounts.set(word, count + 1);
      this.totalWords++;
    }
  }
  toString() {
    let entries = [...this.wordCounts];

    entries.sort((a, b) => {
      if (a[1] === b[1]) {
        return a[0] < b[0] ? -1 : 1;
      } else {
        return b[1] - a[1];
      }
    });

    for (let entry of entries) {
      entry[1] = (entry[1] / this.totalWords) * 100;
    }
    entries = entries.filter((entry) => entry[1] >= 0.5);

    const lines = entries.map(
      ([l, n]) =>
        `${l.padStart(10)}: ${"#".repeat(Math.round(10 * n))} ${n.toFixed(2)}%`
    );
    return lines.join("\n");
  }
}

async function histogramFromStdin() {
  process.stdin.setEncoding("utf-8");
  let histogram = new wordHistogram();
  for await (let chunk of process.stdin) {
    histogram.add(chunk);
  }
  return histogram;
}

histogramFromStdin().then((histogram) => {
  console.log(histogram.toString());
});
