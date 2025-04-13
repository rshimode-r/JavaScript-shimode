import * as acorn from "acorn";

const code1 = `
let a
a
=
3
console.log(a)
`;

const code2 = `
let a; a = 3; console.log(a);
`;

const ast1 = acorn.parse(code1, { ecmaVersion: 2025 });
const ast2 = acorn.parse(code2, { ecmaVersion: 2025 });

console.log("=== AST of Code 1 ===");
console.log(JSON.stringify(ast1, null, 2));

console.log("\n=== AST of Code 2 ===");
console.log(JSON.stringify(ast2, null, 2));
