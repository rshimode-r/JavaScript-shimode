function counterIter(max) {
  console.log("counterIter");
  let c = 1;
  return {
    [Symbol.iterator]() {
      console.log("counterIter: Symbol.iterator");
      return this;
    },
    next() {
      console.log("counterIter: next");
      if (c >= max + 1) {
        return { value: undefined, done: true };
      }
      const value = c;
      c++;
      return { value, done: false };
    },
    return(value) {
      console.log("counterIter: return:", value);
      return { value, done: true };
    },
    throw(e) {
      console.log("counterIter: throw:", e);
      throw e;
    },
  };
}

function* counterGen(max) {
  console.log("counterGen");
  try {
    for (let c = 1; c <= max; c++) {
      console.log("counterGen: next");
      yield c;
    }
  } catch (e) {
    console.log("counterGen: catch:", e);
    throw e;
  } finally {
    console.log("counterGen: finally");
  }
}

// ここから動作確認

const iter = counterIter(5);
const gen = counterGen(5);
// counterIter

iter.next();
//counterIter: next
gen.next();
// counterGen
// counterGen: next

iter.return();
// counterIter: return: undefined
gen.return();
// counterGen: finally

for (let i of counterIter(3)) {
  console.log("i is ", i);
}
// counterIter
// counterIter: Symbol.iterator
// counterIter: next
// i is  1
// counterIter: next
// i is  2
// counterIter: next
// i is  3
// counterIter: next

for (let i of counterGen(3)) {
  console.log("i is ", i);
}
// counterGen
// counterGen: next
// i is  1
// counterGen: next
// i is  2
// counterGen: next
// i is  3
// counterGen: finally

for (let i of counterIter(3)) {
  console.log("i is ", i);
  if (i === 2) break;
}
// counterIter
// counterIter: Symbol.iterator
// counterIter: next
// i is  1
// counterIter: next
// i is  2
// counterIter: return: undefined

for (let i of counterGen(3)) {
  console.log("i is ", i);
  if (i === 2) break;
}
// counterGen
// counterGen: next
// i is  1
// counterGen: next
// i is  2
// counterGen: finally

try {
  for (let i of counterIter(3)) {
    console.log("i is", i);
    if (i === 2) {
      throw "iter error!";
    }
  }
} catch (e) {
  console.log("caught:", e);
}
// counterIter
// counterIter: Symbol.iterator
// counterIter: next
// i is 1
// counterIter: next
// i is 2
// counterIter: return: undefined
// caught: iter error!

try {
  for (let i of counterGen(3)) {
    console.log("i is", i);
    if (i === 2) {
      throw "gen error!";
    }
  }
} catch (e) {
  console.log("caught:", e);
}
// counterGen
// counterGen: next
// i is 1
// counterGen: next
// i is 2
// counterGen: finally
// caught: gen error!
