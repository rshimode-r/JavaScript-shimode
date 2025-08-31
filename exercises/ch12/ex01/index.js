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

const iter = counterIter(5); //(出力)counterIter
const gen = counterGen(5); //(出力)何も出力しない

iter.next(); //(出力)counterIter: next
gen.next(); //(出力)counterGen \n  counterGen: next

iter.return(); //(出力)counterIter: return: undefined
gen.return(); //(出力)counterGen: finally

for (let i of counterIter(3)) {
  //(出力)counterIter: Symbol.iterator
  //(出力)counterIter: next
  console.log("i is ", i);
  if (i === 2) break; //(出力)counterIter: return: undefined
}

for (let i of counterGen(3)) {
  //(出力)counterGen
  //(出力)counterGen: next
  console.log("i is ", i);
  if (i === 2) break; //(出力)counterGen: finally
}

try {
  for (let i of counterIter(3)) {
    console.log("i is", i);
    if (i === 2) {
      throw "iter error!"; //(出力)counterIter: return: undefined
    }
  }
} catch (e) {
  console.log("caught:", e);
}

try {
  for (let i of counterGen(3)) {
    console.log("i is", i);
    if (i === 2) {
      throw "gen error!"; //(出力)counterGen: finally
    }
  }
} catch (e) {
  console.log("caught:", e);
}
