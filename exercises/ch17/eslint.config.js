import prettier from 'eslint-config-prettier';
import unicorn from 'eslint-plugin-unicorn';
import importPlugin from 'eslint-plugin-import';

export default [
  // js.configs.recommended,
  // ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        console: 'readonly',
      },
    },
  },
  {
    ignores: ['ex01/format_sample.js'],
  },
  {
    files: ['**/*.{js,ts}'],
    plugins: {
      unicorn,
      import: importPlugin,
    },
    rules: {
      //'unicorn/filename-case': ['warn', { case: 'kebabCase' }], // ファイル名はケバブケース
      'no-tabs': 'warn', // タブ禁止
      'no-trailing-spaces': 'warn', // 行末空白禁止
      'no-irregular-whitespace': 'warn', // 不規則な空白禁止
      curly: ['warn', 'all'], // 制御構造は必ず中括弧
      'brace-style': ['warn', '1tbs', { allowSingleLine: true }], // K&Rスタイル
      indent: ['warn', 2, { SwitchCase: 1 }], // 2スペースインデント
      semi: ['warn', 'always'], // 文末セミコロン必須
      quotes: ['warn', 'single'], // シングルクォート
      'no-multi-spaces': 'warn', // 複数スペース禁止
      'no-mixed-spaces-and-tabs': 'warn', // スペースとタブの混在禁止
      'no-var': 'warn', // var禁止
      'prefer-const': 'warn', // 再代入不要ならconst
      'one-var': ['warn', 'never'], // 宣言は1行1変数
      'init-declarations': ['warn', 'always'], // 使う前に初期化
      'comma-dangle': ['warn', 'always-multiline'], // 末尾カンマ必須
      'no-array-constructor': 'warn', // new Array禁止
      'no-new-object': 'warn', // Objectコンストラクタ禁止
      'object-shorthand': ['warn', 'always'], // メソッド省略形
      'quote-props': ['warn', 'consistent'], // プロパティ名の引用統一
      'prefer-destructuring': ['warn', { array: true, object: true }], // 分割代入推奨
      'prefer-spread': 'warn', // スプレッド演算子推奨
      'prefer-rest-params': 'warn', // argumentsではなく残余引数
      'prefer-template': 'warn', // 複雑な文字列はテンプレートリテラル
      'no-multi-str': 'warn', // 行継続禁止
      'import/first': 'warn', // importは先頭
      'import/no-duplicates': 'warn', // 重複import禁止
      'import/extensions': ['warn', 'always', { js: 'always', ts: 'always' }], // import時に .js / .ts 拡張子必須
      'import/no-cycle': 'warn', // 循環依存禁止
      'import/no-default-export': 'warn', // default export禁止
    },
  },
  //https://zenn.dev/kei615ykhm/articles/ee4b484b651b63
  prettier,
];
