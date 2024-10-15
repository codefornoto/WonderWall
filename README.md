# StickyNotes

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## アプリケーションの使い方

### [クエリパラメーター](https://developer.mozilla.org/ja/docs/Web/URI#%E3%82%AF%E3%82%A8%E3%83%AA%E3%83%BC)

- sheetName: スプレッドシートのシート名を指定してデータを取得できる。指定しない場合は、フォームから回答されたシート（answers）から取得
- interval: 付箋の内容を更新する間隔をmsで指定。指定しない場合は50秒
- polling: カテゴリが切り替わるまでの時間をmsで指定。指定しない場合は5分（300秒）
- left: 左側に表示する付箋の数を指定。指定しない場合は10枚
- right: 右側に表示する付箋の数を指定。指定しない場合は10枚
- mode: demoを指定するとデバッグモードになる（通常使用しない）
