npm i -D webpack webpack-cli # Webpackインストール
# 以下それぞれ ./ch10/ex01/dist/main.jsが出力される
npx webpack --mode=none ./ch10/ex01/index.cjs -o ./ch10/ex01/dist/none
npx webpack --mode=development ./ch10/ex01/index.cjs -o ./ch10/ex01/dist/dev
npx webpack --mode=production ./ch10/ex01/index.cjs -o ./ch10/ex01/dist/prod