export function counterGroup() {
  const counters = [];

  function counter() {
    let n = 0;
    return {
      count: function () {
        return n++;
      },
      reset: function () {
        n = 0;
      },
      get value() {
        return n;
      },
    };
  }

  return {
    newCounter() {
      const c = counter();
      counters.push(c);
      return c;
    },
    total() {
      return counters.reduce((sum, c) => sum + c.value, 0);
    },
    average() {
      if (counters.length === 0) {
        throw new TypeError(
          "counter が 1 つ以上存在していない場合 TypeError をスローする"
        );
      }
      return this.total() / counters.length;
    },
    variance() {
      if (counters.length <= 1) {
        throw new TypeError(
          "counter が 2 つ以上存在していない場合 TypeError をスローする"
        );
      }
      const mean = this.average();
      const sumSquares = counters.reduce((sum, c) => {
        const diff = c.value - mean;
        return sum + diff * diff;
      }, 0);
      return sumSquares / counters.length;
    },
  };
}
