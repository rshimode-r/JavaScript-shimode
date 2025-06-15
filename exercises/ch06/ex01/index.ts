type Entry = {
  key: string;
  value: any;
  next?: Entry;
};

function hash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt
    // https://qiita.com/kodack/items/5339999ed536f7e3dec3
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function newHashTable(capacity: number) {
  const entries: (Entry | undefined)[] = new Array(capacity);
  return {
    size: 0, // マッピング数を示すプロパティ
    entries, // マッピングを格納する固定長の配列
    get(key: string): Entry | undefined {
      // keyにマップされた値を取得する
      const index = hash(key) % capacity;
      let node: Entry | undefined = entries[index];
      while (node) {
        if (node.key === key) return node.value;
        node = node.next;
      }
      return undefined;
    },
    put(key: string, value: any): void {
      // key, valueのマッピングを追加する(keyが存在する場合はvalueを上書きする)
      const index = hash(key) % capacity;
      let node: Entry | undefined = entries[index];

      if (!node) {
        entries[index] = { key, value };
        this.size++;
        return;
      }

      let beforeNode: Entry | undefined;
      while (node) {
        if (node.key === key) {
          node.value = value;
          return;
        }
        beforeNode = node;
        node = node.next;
      }

      beforeNode!.next = { key, value };
      this.size++;
    },
    remove(key: string): void {
      // keyのマッピングを削除する
      const index = hash(key) % capacity;
      let node: Entry | undefined = entries[index];
      let beforeNode: Entry | undefined;

      while (node) {
        if (node.key === key) {
          if (!beforeNode) {
            entries[index] = node.next;
          } else {
            beforeNode.next = node.next;
          }
          this.size--;
          return;
        }
        beforeNode = node;
        node = node.next;
      }
    },
  };
}
