import { instanceOf } from "./index.ts";

class Animal {}
class Mammal extends Animal {}
class Dog extends Mammal {}

class Car {}

describe("instanceOf", () => {
  it("Dogのインスタンスに対してDogを指定するとtrueを返す", () => {
    const dog = new Dog();
    expect(instanceOf(dog, Dog)).toBe(dog instanceof Dog);
  });

  it("Dogのインスタンスに対して親クラスのMammalを指定するとtrueを返す", () => {
    const dog = new Dog();
    expect(instanceOf(dog, Mammal)).toBe(dog instanceof Mammal);
  });

  it("多段に継承したクラス(Dog)のインスタンスと基底クラス(Animal)のコンストラクタを入力する場合", () => {
    const dog = new Dog();
    expect(instanceOf(dog, Animal)).toBe(dog instanceof Animal);
  });

  it("継承関係にないインスタンス(Dog)とクラス(Car)のコンストラクタを入力する場合", () => {
    const dog = new Dog();
    expect(instanceOf(dog, Car)).toBe(dog instanceof Car);
  });

  it("配列に対してArrayとObjectの両方でtrueを返す", () => {
    expect(instanceOf([], Array)).toBe([] instanceof Array);
    expect(instanceOf([], Object)).toBe([] instanceof Object);
  });
});
