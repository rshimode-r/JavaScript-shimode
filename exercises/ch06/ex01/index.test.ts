import { newHashTable } from "./index.ts";

describe("HashTable", () => {
  test("異なるキーの追加と取得が正しく動作し、サイズが増加することを確認する", () => {
    const hashTable = newHashTable(2);
    hashTable.put("key1", "value1");
    hashTable.put("key2", { value: "value2" });

    expect(hashTable.get("key1")).toBe("value1");
    expect(hashTable.get("key2")).toEqual({ value: "value2" });
    expect(hashTable.size).toBe(2);
  });

  test("同じキーに対して値を上書きし、値が更新される", () => {
    const hashTable = newHashTable(1);
    hashTable.put("key1", "old value");
    hashTable.put("key1", "new value");

    expect(hashTable.get("key1")).toBe("new value");
    expect(hashTable.size).toBe(1);
  });

  test("存在しないキーでgetを行うとundefinedを返す", () => {
    const hashTable = newHashTable(1);
    expect(hashTable.get("missing")).toBeUndefined();
  });

  test("removeでキーを削除できる(衝突が起きていない場合)", () => {
    const hashTable = newHashTable(1);
    hashTable.put("key1", "value1");
    hashTable.remove("key1");

    expect(hashTable.get("key1")).toBeUndefined();
    expect(hashTable.size).toBe(0);
  });

  test("衝突が起きた状態でも、removeは指定したキーだけを削除する", () => {
    const hashTable = newHashTable(1);
    hashTable.put("key1", "value1");
    hashTable.put("key2", "value2");
    hashTable.put("key3", "value3");
    hashTable.remove("key2");

    expect(hashTable.get("key2")).toBeUndefined();
    expect(hashTable.get("key1")).toBe("value1");
    expect(hashTable.get("key3")).toBe("value3");
    expect(hashTable.size).toBe(2);
  });
});
