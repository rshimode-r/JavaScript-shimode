function printValue(a, a, b) {
  console.log("a is " + a + ", b is " + b);
}

printValue(1, 2, 3);

// file:///workspaces/exercises-public/exercises/ch05/ex12/strict.js:1
// function printValue(a, a, b) {
//                        ^

// SyntaxError: Duplicate parameter name not allowed in this context
//     at compileSourceTextModule (node:internal/modules/esm/utils:338:16)
//     at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:102:18)
//     at #translate (node:internal/modules/esm/loader:468:12)
//     at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:515:27)
//     at async ModuleJob._link (node:internal/modules/esm/module_job:115:19)

// Node.js v22.14.0
