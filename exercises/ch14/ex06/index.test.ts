import { createLoggingProxy } from "./index.ts";

describe("createLoggingProxy", () => {
  it("メソッド呼び出しを記録できる", () => {
    const obj = {
      say(msg: string) {
        return `言った: ${msg}`;
      },
    };

    const [proxy, log] = createLoggingProxy(obj);
    proxy.say("こんにちは");

    expect(log.length).toBe(1);
    expect(log[0].method).toBe("say");
    expect(log[0].args).toEqual(["こんにちは"]);
    expect(log[0].timestamp).toBeInstanceOf(Date); //Date型であることを確認
  });

  it("複数メソッド呼び出しを順番通りに記録できる", () => {
    const obj = {
      foo() {
        return "foo";
      },
      bar(x: number) {
        return x * 2;
      },
    };

    const [proxy, log] = createLoggingProxy(obj);
    proxy.foo();
    proxy.bar(10);

    expect(log.length).toBe(2);
    expect(log[0].method).toBe("foo");
    expect(log[1].method).toBe("bar");
    expect(log[0].args).toEqual([]);
    expect(log[1].args).toEqual([10]);
  });

  it("関数以外のプロパティはそのまま返る", () => {
    const obj = {
      name: "Taro",
      age: 20,
    };

    const [proxy, log] = createLoggingProxy(obj);
    expect(proxy.name).toBe("Taro");
    expect(proxy.age).toBe(20);
    expect(log.length).toBe(0);
  });

  it("Proxyを経由しないメソッド呼び出しは記録されない", () => {
    const obj = {
      hello() {
        return "world";
      },
    };
    const [proxy, log] = createLoggingProxy(obj);
    obj.hello();

    expect(log.length).toBe(0); // 記録されないことを確認
  });
});
