export type LogEntry = {
  timestamp: Date;
  method: string | symbol;
  args: any[];
};

export function createLoggingProxy<T extends object>(
  target: T
): [T, LogEntry[]] {
  const logs: LogEntry[] = [];
  // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Proxy
  //https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/get
  const handler: ProxyHandler<T> = {
    get(target, property, receiver) {
      const orig = target[property as keyof T];
      if (typeof orig === "function") {
        return function (...args: any[]) {
          logs.push({
            timestamp: new Date(),
            method: property,
            args: args,
          });
          return Reflect.apply(orig as Function, target, args); //メソッド呼び出し
        };
      }
      return Reflect.get(target, property, receiver); //プロパティの値を取得
    },
  };

  const proxy = new Proxy(target, handler);
  return [proxy, logs];
}
