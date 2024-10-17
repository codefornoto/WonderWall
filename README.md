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
- interval: 付箋の内容を更新する間隔を秒数で指定。指定しない場合は50秒
- polling: カテゴリが切り替わるまでの時間を秒数で指定。指定しない場合は5分（300秒）
- left: 左側に表示する付箋の数を指定。指定しない場合は10枚
- right: 右側に表示する付箋の数を指定。指定しない場合は10枚
- mode: demoを指定するとデバッグモードになる（通常使用しない）

## 運用

### フォーム追加運用

下記のレポジトリにある画像をファイル名で指定することで表示している。
QRコードを作成し、以下のレポジトリに追加、クエリパラメーターでファイル名を指定する流れで運用する。
https://github.com/codefornoto/images

1. フォーム追加
2. qrコード発行~追加

### フォーム追加

既存フォームからコピーして作成

<img src="./images/ope_10.png" width="300px" height="300px">
<img src="./images/ope_11.png" width="300px" height="300px">
<img src="./images/ope_12.png" width="300px" height="300px">
<img src="./images/ope_20.png" width="300px" height="300px">
<img src="./images/ope_21.png" width="300px" height="300px">
<img src="./images/ope_22.png" width="300px" height="300px">
<img src="./images/ope_30.png" width="300px" height="300px">
<img src="./images/ope_31.png" width="300px" height="300px">

### QRコード発行~追加

作成したフォームは無料の作成サイト、もしくは以下のmacショートカットから作成。
https://www.icloud.com/shortcuts/49303f89df024076aabad3a695cde28f

下記のレポジトリに作成したQRコードの画像を追加
https://github.com/codefornoto/images
