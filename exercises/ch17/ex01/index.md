## ESLint

- 以下を`scripts`に追加した。

```
"lint": "eslint . --ext .js,.ts,",
"lint:fix: ": "eslint . --ext .js,.ts --fix,"
```

- `npm run lint `を実行した結果
  (`format_sample.js`はignoreしている)

```
/workspaces/exercises-public/exercises/ch17/ex01/lint_sample.js
  1:1   warning  Filename is not in kebab case. Rename it to `lint-sample.js`  unicorn/filename-case
  1:1   warning  Split 'let' declarations into multiple statements             one-var
  1:5   warning  Variable 'a' should be initialized on declaration             init-declarations
  1:8   warning  Variable 'x' should be initialized on declaration             init-declarations
  1:11  warning  Variable 'y' should be initialized on declaration             init-declarations
  4:1   error    Unexpected use of 'with' statement                            no-with
  5:7   error    'PI' is not defined                                           no-undef
  6:11  error    'cos' is not defined                                          no-undef
  6:15  error    'PI' is not defined                                           no-undef
  7:11  error    'sin' is not defined                                          no-undef
  7:15  error    'PI' is not defined                                           no-undef
```

## Prettier

- 以下を`scripts`に追加した。

```
以下を`scripts`に追加。
"format": "prettier --write ."

以下でformatを実行
npm run format
```
