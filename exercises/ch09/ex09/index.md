## SOLID 原則の説明

### 単一責任の原則

- モジュールを変更する理由はたった一つだけであるべきである

  モジュールとはソースファイルのような関数やデータを集めた凝集性のあるもの。  
  モジュールはたったひとつのアクターに対して責務を負うべきである（アクターとは、変更を望む人たちをひとまとめにしたグループ）

(参考) https://qiita.com/MinoDriven/items/76307b1b066467cbfd6a

### オープン・クローズドの原則

- モジュールは、拡張に対しては開いていて、変更に対しては閉じていなければならない

  拡張に対して開かれているとは、新しいコードを追加すれば機能を追加できるということである。　　
  変更に対して閉じているとは、機能追加によって既存のコードが修正されないということである。

  よって、オープン・クローズドの原則を言いかえると、「モジュールは、既存のコードを変更せず新しい機能を追加できるようにすべきである」となる。

(参考)https://zenn.dev/nakurei/books/solid-principle-kanzen-rikai/viewer/open-closed-principle

### リスコフの置換原則

- サブタイプは、そのスーパータイプと置換可能でなければならない

  継承関係において、「サブタイプのインスタンスは、スーパータイプのインスタンスと同じように振る舞うべきである」となる。継承時は、スーパータイプの代わりにサブタイプを利用しても、不都合のないようにしなければならない。

  例 : 正方形・長方形問題→正方形は長方形の派生型とは言えない。なぜなら、正方形は幅と高さの長さを同時に変更しないといけないから。

（参考）https://zenn.dev/nakurei/books/solid-principle-kanzen-rikai/viewer/liskov-substitution-principle

### インターフェース分離の原則

- インターフェースのクライアントに、クライアントが利用しないプロパティ/メソッドへの依存を強制してはならない

  インターフェースは、利用者の立場から最小限の規則にすべきである。クライアントからは、クライアントが必要とするメソッドのみが見えるべきであり、使わないメソッドが見えてはならない。

```
// インターフェース分離の原則を満たさない
interface Bird {
  fly(): void;
  swim(): void;
}

class Duck implements Bird {
  fly() {
    //Duckは飛べる
  }

  swim() {
    //Duckは泳げる
  }
}

class Penguin implements Bird {
  fly() {
    //Penguinは飛べない
    throw new Error();
  }

  swim() {
    //Penguinは泳げる
  }
}
```

```
// インターフェース分離の原則を満たす
interface Flyable {
  fly(): void;
}

interface Swimmable {
  swim(): void;
}

class Duck implements Flyable, Swimmable {
  fly() {
    //Duckは飛べる
  }

  swim() {
    //Duckは泳げる
  }
}

class Penguin implements Swimmable {
  swim() {
    //Penguinは泳げる
  }
}
```

(参考)https://zenn.dev/nakurei/books/solid-principle-kanzen-rikai/viewer/interface-segregation-principle

### 依存性逆転の原則

- 上位レベルのモジュールは下位レベルのモジュールに依存してはならない。
- 依存関係は具象から抽象へ向かうべきである。

例 :

```
//依存性逆転の原則を満たさない
class SaveToDB {
  execute(): void {
    // 保存処理（例：DBへ保存）
  }
}

class Button {
  private save: SaveToDB;

  constructor() {
    this.save = new SaveToDB();
  }

  onClick(): void {
    this.save.execute();
  }
}

```

```
// 依存性逆転の原則を満たす
interface Save {
  execute(): void;
}

class SaveToDB implements Save {
  execute(): void {
    // 保存処理（例：DBへ保存）
  }
}

class SaveToFile implements Save {
  execute(): void {
    // 保存処理（例：ファイルへ保存）
  }
}

class Button {
  constructor(private save: Save) {}

  onClick(): void {
    this.save.execute();
  }
}

// 利用例
const dbButton = new Button(new SaveToDB());
dbButton.onClick();

const fileButton = new Button(new SaveToFile());
fileButton.onClick();

```

(参考)https://zenn.dev/nakurei/books/solid-principle-kanzen-rikai/viewer/dependency-inversion-principle
