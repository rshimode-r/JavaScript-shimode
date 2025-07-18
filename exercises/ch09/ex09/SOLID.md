# SOLID 原則

## 目次

[[_TOC_]]

## 概要

SOLID 原則はオブジェクト指向設計で用いられる 5 つの原則のアクロニムであり、ソフトウェアの拡張性や保守性を高めるためのものである。
Robert C. Martin により提唱された。

以下の 5 つの原則からなる。

- 単一責任の原則 (single-responsibility principle)
- 開放閉鎖の原則（open/closed principle）
- リスコフの置換原則（Liskov substitution principle）
- インターフェース分離の原則 (Interface segregation principle)
- 依存性逆転の原則（dependency inversion principle）

解説記事としては以下を参照するとよい。また本稿も以下の記事から引用している。

- [Wikipedia](https://ja.wikipedia.org/wiki/SOLID)
- [The S.O.L.I.D Principles in Pictures](https://medium.com/backticks-tildes/the-s-o-l-i-d-principles-in-pictures-b34ce2f1e898) およびその[和訳記事](https://qiita.com/baby-degu/items/d058a62f145235a0f007)

## 単一責任の原則 (single-responsibility principle)

> There should never be more than one reason for a class to change.
>
> (変更するための理由が、一つのクラスに対して一つ以上あってはならない)

"A class should have a single responsibility." (1 つのクラスは 1 つの責任を持つべき) とも言い換えられる。
「責任」とは、クラスの利用者に対して特定の機能を提供する役割である。

クラスに多くの責任をもたせるとバグが発生する確率が高くなる。
なぜなら、その責任の 1 つに変更を加えると、知らないうちの他の責任に影響を与える可能性があるためである。

単一責任の原則は、変更の結果としてバグが発生しても、他の無関係な動作に影響を与えないように、動作を分離することを目的としている。

**原則を満たさない例**

- この例では、長方形クラス Rectangle を幾何計算アプリケーション GeometryApplication とグラフィックアプリケーション GraphicApplication が利用している
- Rectangle クラスは以下のように複数の責務を持っており、単一責任の原則に違反している
  - GeometryApplication クラスに対して長方形の幾何的な責務を提供している
  - GraphicApplication クラスに対して長方形を画面に描画する責務を提供している
- GraphicApplication のために Rectangle に対して行った変更が GeometryApplication が利用する機能に対して影響を及ぼしてしまう可能性がある

```ts
// 長方形クラス
class Rectangle {
    // 幾何的な責務を提供
    readonly position: Point;
    readonly size: Size;

    // 画面描画の責務を提供
    draw(): void {
        const pos = this.rectangle.position();
        const size = this.rectangle.size()
        ... // 描画処理
    }
}

// 幾何計算を行うアプリケーション
class GeometryApplication {
    private rectangle: Rectangle;
    affine(): number {
        const pos = this.rectangle.position();
        const size = this.rectangle.size()
        ... // pos と size を使った幾何学処理
    }
}

// グラフィックアプリケーション
class GraphicApplication {
    private rectangle: Rectangle;
    draw() {
        this.rectangle.draw();
        ... // 追加の描画処理
    }
}
```

**原則を満たす例**

- 原則を満たさない例の Rectangle クラスの責務を、幾何的な責務(Rectangle)と画面描画の責務(GraphicRectangle)に分離
- GraphicRectangle は Rectangle をコンポジションし、幾何的な責務を移譲している
- これにより、幾何計算を行う責務(純粋に数学的な処理)と、画面描画を行う責務(OS やプラットフォームに依存した処理)を分離し、単一責任の原則を満足したと言える。

```ts
// 幾何的な責務を持つ長方形クラス
class Rectangle {
    readonly position: Point;
    readonly size: Size;
}

// 画面描画の責務を持つ長方形クラス
class GraphicRectangle {
    private rectangle: Rectangle // 幾何的な責務はRectangleに移譲
    draw(): void {
        const pos = this.rectangle.position;
        const size = this.rectangle.size;
        ... // 描画処理
    }
}

// 幾何計算を行うアプリケーション
class GeometryApplication {
    private rectangle: Rectangle;
    affine(): number {
        const pos = this.rectangle.position();
        const size = this.rectangle.size()
        ... // pos と size を使った幾何学処理
    }
}

// グラフィックアプリケーション
class GraphicApplication {
    private rectangle: GraphicRectangle;
    draw() {
        this.rectangle.draw();
        ... // 追加の描画処理
    }
}
```

## 開放閉鎖の原則（open/closed principle）

> software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification.
>
> （ソフトウェアのエンティティ（クラス、モジュール、関数など）は、拡張に対して開かれているべきであり、修正に対して閉じていなければならない）

「悪い設計」では、プログラムの動作を変更すると、それに依存するエンティティに対して連鎖的に影響を与える。
変更に対してどこでどのような影響が発生して問題を引き起こすか予測不可能で、再利用性は壊滅している。

開放閉鎖の原則は、非常にわかりやすい方法でこれに対処する。
それは、変更を必要としないエンティティを設計するというものである。
既存のエンティティに対して変更をせず、新しいコードを追加することでエンティティの動作を拡張するというものである。
これによって、既存のソフトウェアにバグを混入させずに新しい機能を拡張することを目的とする。

**原則を満たさない例**

- この例では、Rectangle クラスと Circle クラスがあり、それぞれの面積を計算する関数が存在している
- sumAllAreas 関数は、Rectangle または Circle インスタンスの配列を受け取りすべての図形の面積の合計を計算している
- これに対して新たな図形クラス Triangle を追加することを考えると、 sumAllAreas は新しい図形クラスに対して閉じていないため開放閉鎖の原則に違反している
  - 引数の型、及び、型により処理を分岐し面積を計算する処理に変更が必要になる

```ts
// 長方形クラス
class Rectangle {
    readonly position: Point;
    readonly size: Size;
}
// 長方形の面積を計算
function calcRectangleArea(r: Rectangle): number {...}

// 円クラス
class Circle {
  readonly center: Point;
  readonly radius: number;
}
// 円の面積を計算
function calcCircleArea(c: Circle): number {...}

// 引数で受け取ったすべての図形の面積の合計を計算
function sumAllAreas(shapes: (Rectangle | Circle)[]): number {
    return shapes.reduce((sum, shape) => {
        if (shape instanceof Rectangle) {
            return sum + calcRectangleArea(shape);
        } else if (shape instanceof Circle) {
            return sum + calcCircleArea(shape);
        }
        return sum;
    }, 0)
}
```

**原則を満たす例**

- 抽象な型 Shape を導入し、図形の面積を計算する抽象メソッド area() を定義する
- Rectangle 及び Circle は area()を実装し、このメソッド内で各図形の面積を計算する
- sumAllAreas() は Shape の型制約を満たすオブジェクトの配列を受け取り、これらの area() メソッドを呼び出して取得した面積の合計を計算する
- これに対して新たな図形クラス Triangle を追加することを考えると、Triangle が area() メソッドを実装していれば、sumAllAreas() に対する変更は必要なく、開放閉鎖の原則を満足したと言える

```ts
// 図形の抽象型
interface Shape {
    area(): number; // 図形の面積を計算する
}

// 長方形クラス
class Rectangle {
    readonly position: Point;
    readonly size: Size;
    area(): number {...}
}

// 円クラス
class Circle {
  readonly center: Point;
  readonly radius: number;
  area(): number {...}
}

// 引数で受け取ったすべての図形の面積の合計を計算
function sumAllAreas(shapes: Shape[]): number {
    return shapes.reduce((sum, shape) => sum + shape.area(), 0)
}
```

---

**追加コメント**

開放閉鎖の原則は、「将来発生するかもしれない変更」を予め予測して、それに対して拡張可能な設計を行う原則と言える。
本節の例は極めて単純なものであり、図形のバリエーションが増えることはかなり自明であるので、このようなケースに対応した設計を行うのは難しくはない。

しかし、実際に業務で開発するアプリケーションは、現実的な問題を扱うため、将来的にどのような変更が必要になるかを完全に予測するのはほぼ不可能である。
起こるかどうかわからない未来の変更に対して過度に抽象度の高い設計を行うことは、却って可読性を損なうことも多いし、予想したのとは全く違う要求が来た結果、将来を見越したはずの設計がむしろ機能追加の障壁になってしまうこともある。

明確に抽象化が必要な箇所以外に対する過度に抽象的な設計を避け、エンティティの設計をシンプルに保ち、ユニットテスト/結合テスト/E2E テストを整備し、継続的インテグレーションによって変更によるデグレーションの即座な発見と修正を可能にし、リファクタリングによってコードの品質を保つことで、ソフトウェア開発のライフサイクルを健全に保つのが良い。

## リスコフの置換原則（Liskov substitution principle）

> Functions that use pointers or references to base classes must be able to use objects of derived classes without knowing it.
>
> （ある基底クラスへのポインタまたは参照を扱っている関数は、その派生クラスのオブジェクトの詳細を知らなくても扱えるようにしなければならない）

これは Barbala Liskov が説いたオリジナルのリスコフの置換原則の言い換えである。

> What is wanted here is something like the following substitution property: If for each object o1 of type S there is an object o2 of type T such that for all programs P defined in terms of T, the behavior of P is unchanged when o1 is substituted for o2 then S is a subtype of T.
>
> ここで求められるのは、次のような置換特性である: 型 S の各オブジェクト o1 に対して、型 T のオブジェクト o2 が存在し、T に関して定義されたすべてのプログラム P に対して、o1 を o2 に代入しても P の動作が変わらないような場合、S は T のサブタイプである。

[The S.O.L.I.D Principles in Pictures](https://medium.com/backticks-tildes/the-s-o-l-i-d-principles-in-pictures-b34ce2f1e898) の例にあるように、親クラスがコーヒーを提供しているのであれば、子クラスがカプチーノを提供することはカプチーノがコーヒーの一種なので許容されるが、水を提供することは許容されない。

リスコフの置換原則は、派生型は基底型に対して同じ振る舞いを提供することを定め、利用者に対して一貫したインターフェースを提供することを目的とする。

**原則を満たさない例**

- この例では、「正方形は長方形の一種である」という事実に基づいて Rectangle クラスから Square クラスを継承している
- Square は 「正方形は縦と横に長さが同じ」という性質を維持するため、 width と height のセッターをオーバーライドし、一辺が設定されたときにもう一辺の長さも同じ値に設定している
- assertRectangleArea() 関数は、長方形の面積計算が正しいことを検証する関数で、幅と高さを設定し、それらの積と area() メソッドの結果が一致することを確認している
  - では、assertRectangleArea() に Square インスタンスを渡すとどうなるか?
  - assertRectangleArea() が間違っているのか? 長方形の幅と高さをセットして、それの積が面積と一致するというのは明らかに合理的だろう
  - これは、利用者に対して派生型が基底型と異なる振る舞いをしていることを示し、すなわち Square がリスコフの置換原則に違反していることを示す

```ts
// 長方形クラス
class Rectangle {
  private w: number;
  private h: number;
  constructor(w: number, h: number) {
    this.w = w;
    this.h = h;
  }
  get width(): number {
    return this.w;
  }
  set width(w: number) {
    this.w = w;
  }
  get height(): number {
    return this.h;
  }
  set height(h: number) {
    this.h = h;
  }
  area(): number {
    return this.w * this.h;
  }
}

// 正方形クラス
// 正方形は長方形の一種なので当然継承されるべきだよね
class Square extends Rectangle {
  constructor(l: number) {
    super(l, l);
  }
  // 正方形は縦と横が同じながななのだから、一辺が設定されたらもう一辺の長さも合わせる
  set width(w: number) {
    super.width = w;
    super.height = w;
  }
  set height(h: number) {
    super.width = h;
    super.height = h;
  }
}

// 長方形の面積計算が正しいことを検証する関数
function assertRectangleArea(r: Rectangle) {
  r.width = 4;
  r.height = 5;
  if (r.width * r.height !== r.area()) {
    throw new Error();
  }
}
assertRectangleArea(new Rectangle(1, 2));
assertRectangleArea(new Square(3)); // どうなる?
```

**原則を満たす例**

- 正方形は長方形の一部だが、ソフトウェアとしての振る舞いとして、正方形クラスは長方形クラスではない
- そのため、Rectangle と Square は派生関係のないクラスとして定義すべきである
- このケースでは、双方に共通する振る舞いをインターフェースとして定義し、利用者をその型に依存させることで、リスコフの置換原則を満たすことができる
  - 豆知識: extends による派生を公称型(Nominal Typing)といい、interface による派生を構造的部分型(Structural Subtyping)という
- (別解として、Rectangle を幅と高さを変更できないイミュータブルなクラスにして、 Square が Rectangle を extends するのもリスコフの置換原則を満たす)

```ts
interface Shape {
  area(): number
}

// Rectangle と Square の共通する振る舞い
interface RectangleIF extends Shape { // Rectangle と名前が衝突するのでIFをつけている
  get width(): number;
  get height(): number;
}

class Rectangle {...} // 原則を満たさない例と同じ

class Square { // Rectangle からは継承しない
  private l: number;
  get length(): number {
    return this.l;
  }
  set length(l: number) {
    this.l = l;
  }
  get width(): number {
    return this.l;
  }
  get height(): number {
    return this.l;
  }
  area(): number {
    return this.w * this.l;
  }
}

function assertRectangleArea(r: RectangleIF) {
    if(r.width * r.height !== r.area()) {
        throw new Error();
    }
}
```

## インターフェース分離の原則 (Interface segregation principle)

> Clients should not be forced to depend upon interfaces that they do not use.
>
> (クライアントは自分が使わないインターフェースへの依存を強制されるべきではない)

クライアントが使用していないインターフェースに依存せざるを得ない場合、それらのクライアントはインターフェースの変更にさらされることになる。
その結果、すべてのクライアント間で不注意なカップリングが発生する。
別の言い方を すれば、あるクライアントが、そのクライアントは使用しないが他のクライアントが使用するインターフェイスを含むクラスに依存している場合、そのクライアントは、他のクライアントがそのクラスに強制する変更の影響を受けることになる。

インターフェース分離の原則は、そのような意図しないモジュール間の結合を可能な限り避けるため、可能な限りインターフェースを分離することを目的とする。

**原則を満たさない例**

- 簡略化された ATM を例として扱う
  - ATM の UI は柔軟さが求められ、画面だけでなく音声対応や点字タブレットにも対応が求められ、必要なすべてのメッセージを備えたインターフェース ATMUI を定義し、各派生 UI がこれを実装することで実現する
  - ATM が扱う入金/引き出し/送金などの取引は Transaction インターフェースの派生型として実現し、各クラスで ATMUI のメソッドを利用して取引処理を実現している
- 各 Transaction の派生クラスは、それぞれ他のクラスが利用していない ATMUI のメソッドを利用しており、自分の使用していないメソッドの変更の影響を受ける状態になっている
  - 例えば、各 Transaction の派生クラスが異なるモジュールとしてビルドされている場合、 requestDepositAmount() メソッドのシグネチャを変更すると、Withdrawal や Transfer には全く関係ないにも関わらず、依存先の ATMUI のインターフェースが変更されたので、自動ビルドシステムは再ビルドが必要と判断するかも知れない

```ts
// ATM UI の基底型
interface ATMUI {
  requestDepositAmount(): void;
  requestWithdrawalAmount(): void;
  requestTransferAmount(): void;
  informInsufficientFunds(): void
}

// 画面の UI
class ScreenUI implements ATMUI {...}

// スピーチ UI
class SpeechUI implements ATMUI {...}

// 点字 UI
class BrailleUI implements ATMUI {...}

// 取引の基底型
interface Transaction {
  execute(): void;
}

// 入金
class Deposit implements Transaction {
  private ui: ATMUI;
  constructor(ui: ATMUI) {
    this.ui = ui
  }
  execute(): void {
    ...
    this.ui.requestDepositAmount();
    ...
  }
}

// 引き出し
class Withdrawal implements Transaction {
  private ui: ATMUI;
  constructor(ui: ATMUI) {
    this.ui = ui
  }
  execute(): void {
    ...
    // 残高が引き出し額移譲の場合
    this.ui.requestWithdrawalAmount();
    ...
    // 残高不足の場合
    this.ui.informInsufficientFunds();
    ...
  }
}

// 送金
class Transfer implements Transaction {
  private ui: ATMUI;
  constructor(ui: ATMUI) {
    this.ui = ui
  }
  execute(): void {
    ...
    this.ui.requestTransferAmount
    ...
  }
}

const ui = new ScreenUI();
const deposit = new Deposit(ui)
const withdrawal = new Withdrawal(ui)
const transfer = new Transfer(ui)
```

**原則を満たす例**

- ATMUI を各 Transaction の派生クラスに対するインターフェースに分離して、派生クラス間で ATMUI を介して発生したいた結合を回避する
- インターフェースの分離は、このような結合の解消だけでなく、クライアントに関係ない機能を隠蔽することによって、可読性の向上にもつながる

```ts
// ATMUI/ScreenUI/SpeechUI/BrailleUI/Transaction は変更なし

interface DepositUI {
  requestDepositAmount(): void;
}
interface WithdrawalUI {
  requestWithdrawalAmount(): void;
  informInsufficientFunds(): void;
}
interface TransferUI {
  requestTransferAmount(): void;
}

class Deposit implements Transaction {
  private ui: DepositUI;
  constructor(ui: DepositUI) {
    this.ui = ui
  }
  execute(): void {
    ...
    this.ui.requestDepositAmount();
    ...
  }
}

// 引き出し
class Withdrawal implements Transaction {
  private ui: WithdrawalUI;
  constructor(ui: WithdrawalUI) {
    this.ui = ui
  }
  execute(): void {
    ...
    // 残高が引き出し額移譲の場合
    this.ui.requestWithdrawalAmount();
    ...
    // 残高不足の場合
    this.ui.informInsufficientFunds();
    ...
  }
}

// 送金
class Transfer implements Transaction {
  private ui: TransferUI;
  constructor(ui: TransferUI) {
    this.ui = ui
  }
  execute(): void {
    ...
    this.ui.requestTransferAmount
    ...
  }
}

const ui = new ScreenUI();
const deposit = new Deposit(ui)
const withdrawal = new Withdrawal(ui)
const transfer = new Transfer(ui)
```

## 依存性逆転の原則（dependency inversion principle）

> A. High level modules should not depend upon low level modules. Both should depend upon abstractions.
>
> B. Abstractions should not depend upon details. Details should depend upon abstractions.
>
> (A, 高レベルモジュールは低レベルモジュールに依存すべきではない。双方とも抽象に依存すべきである。)
>
> (B. 抽象は詳細に依存すべきではない。詳細は抽象に依存すべきである。)

「逆転」という用語に違和感を覚えるかも知れない。

伝統的なソフトウェアでは高レベルモジュールが低レベルモジュールに依存している。
例えば、アプリケーションのビジネスロジック(高レベルモジュール)は、データをファイルの保存するのにファイルモジュール(低レベルモジュール)を利用するので、依存している。

アプリケーションにとってより重要なビジネスモデルを含むのは、言うまでもなく高レベルモジュールである。
しかし、依存先の低レベルモジュールが変更されれば、それに依存している高レベルモジュールも影響を受ける。
重要度の高いモジュールが重要度の低いモジュールの影響を受けるのはナンセンスである。
また、再利用したいのは高レベルのモジュールであるべきである(データの保存先にファイル以外を増やしたいかも知れない)。

依存性逆転の原則は、高レベルモジュールと低ベルモジュールの間に抽象(インタフェース)を挟み、低レベルモジュールが依存を受けるのではなく、低レベルモジュールが抽象に対して依存するようにし、依存性を「逆転」させる。

`高レベルモジュール -依存-> 抽象(インターフェース) <-依存- 低レベルモジュール`

これによって、高レベルモジュールの独立性を高め、再利用性を向上させるのが目的である。

**原則を満たさない例**

- この例では、ファイルの読み書きを行うクラス File に対して、その内容をコピーする関数 copyFile() を定義している
- では、ファイルでなく RAM 上のバイト列からデータを読んでファイルにコピーしたい場合、あるいはその逆、あるいはファイルでも RAM 上のバイト列でも無いデータを扱うたいときにはどうすればよいか?
- それらのすべての組み合わせに対してコピー関数を作成するのはナンセンスであり、コピーのロジックを再利用できるようにしたい

```ts
class File() {
  constructor(path: string, mode: number) {...}
  read(): { data: Int8Array; eof: boolean } {...}
  write(data: Int8Array) {...}
}

function copyFile(w: File, r: File) {
  for (const {data, eof} = r.read() ; !eof ; ) {
    w.write(data)
  }
}
```

**原則を満たす例**

- バイト列を読み取るインターフェース Reader とバイト列を書き出すインターフェース Writer を定義する (抽象)
- それらのインタフェースを実装する File クラスと BytesBuffer クラスを実装する (低レベルモジュール)
- 関数 copy() は Reader からデータを読み、Writer に書き出すようにし、それらの実装には依存しないようにする (高レベルモジュール)

```ts
interface Reader {
  read(): { data: Int8Array; eof: boolean };
}

interface Writer {
  write(data: Int8Array): void;
}

class File {
  constructor(path: string, mode: number) {...}
  read(): { data: Int8Array; eof: boolean } {...}
  write(data: Int8Array) {...}
}

class BytesBuffer {
  constructor(data: Int8Array) {...}
  read(): { data: Int8Array; eof: boolean } {...}
  write(data: Int8Array) {...}
}

function copy(w: Writer, r: Reader) {
  for (const {data, eof} = r.read() ; !eof ; ) {
    w.write(data)
  }
}
```
