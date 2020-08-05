---
title: "GitHub Actions で Markdown で書いた職務経歴書を PDF として自動で生成する"
cover: "2020-07-28-gitHub-actions-automatically-generate-pdf-of-resume-written-in-markdown/header.png"
category: "Tech"
date: "2020/07/28"
slug: "gitHub-actions-automatically-generate-pdf-of-resume-written-in-markdown"
tags:
  - GitHub Actions
---

エンジニア界隈では、[職務経歴書を GitHub 上で公開する](https://qiita.com/okohs/items/abcad0b4aefa585bc50b)というムーブメントが一部であります。  
Markdown 形式で職務経歴書を簡単に書いておいて、文章校正を GitHub からオープンに編集できるというわけです。

自分も実際に [GitHub](https://github.com/YopiNoji) 上で公開していますが、人に見せたり経歴を管理したりする際に何かと楽になりました。

**ただ、どうせ GitHub 上で管理するなら、人に渡しやすいように PDF 化してしまいたくないですか？**

ということで、実際に GitHub Actions を用いて Markdown 形式の職務経歴書を自動で PDF に変換するコードを書いたので共有しておきます。

## Markdown を PDF にするライブラリ

さて、今回 Markdown 形式のファイルを PDF に変換するために、npm パッケージの [`md-to-pdf`](https://www.npmjs.com/package/md-to-pdf) を用います。

[`md-to-pdf`](https://www.npmjs.com/package/md-to-pdf) は以下のようなことが可能なパッケージです。

- PDF に CSS テーマを適用できる
- PDF のヘッダーやフッターにページ数や日付を設定できる
- 複数の Markdown を一括で PDF に変換
- CLI からもプログラムからも実行可能

これで Node.js の実行環境さえあれば、いつでも Markdown を PDF に変換できます！

## 実際に Markdown を PDF に変換してみる

まずは、Node.js ができる環境があることを確かめます。

```bash
$ node -v
v14.5.0
```

次に、プロジェクトの初期設定を行います。

```bash
$ npm init
```

プロジェクトの設定を終えたら、先ほど紹介した [`md-to-pdf`](https://www.npmjs.com/package/md-to-pdf) をインストールします。

```bash
$ npm i md-to-pdf
```

次に、実際に PDF 化する対象の Markdown を作っておきます。

```
$ echo "# This is a sample." >> README.md
```

npm スクリプトで PDF 生成を実行できるように、生成用のスクリプトを書き加えます。  
`"generate": "md-to-pdf ./*.md"` の箇所ですね。

```json
{
  "name": "sample-md-to-pdf",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "generate": "md-to-pdf ./*.md"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "md-to-pdf": "^3.1.1"
  }
}
```

最後に、作った npm スクリプトを実行します。

```bash
$ npm run generate

> sample-md-to-pdf@1.0.0 generate /Users/masakiyoshiiwa/Workspace/sample-md-to-pdf
> md-to-pdf ./*.md

  ✔ generating PDF from ./README.md
```

`npm run generate` で PDF が生成されれば完了です。

どうでしょう？  
とても手軽に PDF として生成できましたね。

## 生成する PDF を CSS で装飾してみる

[`md-to-pdf`](https://www.npmjs.com/package/md-to-pdf) では、Markdown に対して、Frontmatter により変数を指定することで、生成する PDF のレイアウトを操作できます。

試しに先ほどの Markdown に対して、以下のように Frontmatter を書き加えてみます。  
今回は GitHub の Markdown 表示に使われている CSS を適用します。

```md
---
stylesheet: https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css
body_class: markdown-body
pdf_options:
  format: A4
  margin: 25mm 20mm
---

# This is a sample.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
```

Frontmatter を設定した状態で再度 PDF として生成すると、Frontmatter を設定しないで生成した PDF とレイアウトが違うことが分かります。

![md-to-pdf-01.png](./md-to-pdf-01.png)

このように PDF に簡単にスタイルを適用できます！

これは便利！

## GitHub Actions で Markdown の更新を検知して自動で PDF 生成する

さて、[`md-to-pdf`](https://www.npmjs.com/package/md-to-pdf) について理解が深まったところで、実際に GitHub Actions を使って Markdown の更新を検知して PDF を自動生成してみましょう。

あらかじめ、GitHub のリポジトリに先ほど作ったものをプッシュしておいてください。

GitHub に保存したらやることは 1 つだけです。  
ただ、GitHub Actions を実行するためのワークフローを書くだけです。

`.github/workflows/generate-pdf.yml`というファイルを作成して、以下のコードを書きます。

```yml
name: PDF-Generator
on:
  push:
    branches:
      - master

jobs:
  nodejob:
    runs-on: ubuntu-latest
    env:
      REPO: https://${{github.actor}}:${{secrets.GITHUB_TOKEN}}@github.com/${{github.repository}}.git
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v1
        with:
          node-version: "14.5.0"

      - name: npm install
        run: npm install

      - name: Generate PDF
        run: npm run generate

      - name: Git commit and push
        run: |
          git config --global user.email "mail@example.com"
          git config --global user.name "JohnDoe"
          git add .
          git status
          git commit -m 'generate PDF' && git push ${REPO} ${{github.event.pull_request.head.ref}}
```

処理の流れとしては、以下の通りです。

- `master` ブランチの更新を検知して GitHub Actions が動く
- GitHub Actions が最新のブランチをチェックアウトする
- Node.js と npm パッケージのインストールなど環境構築を行う
- 最新のブランチで PDF を生成する
- 生成した PDF を GitHub に再度プッシュする

ちなみに、`${{secrets.GITHUB_TOKEN}}` などの記述があるのでシークレットの作成が必要なのかと思う人もいるかもしれませんが、`${{secrets.GITHUB_TOKEN}}` 自体は [GitHub により自動で生成されるもの](https://docs.github.com/ja/actions/configuring-and-managing-workflows/authenticating-with-the-github_token)なので特に気にする必要はありません。

ワークフローの設定を終えたら、試しに `master` ブランチで Markdown を更新してみましょう。  
GitHub のリポジトリ上に更新内容が反映された PDF が生成されているはずです。

## 最後に

あとは肝心の職務経歴書を書くだけです。

以下に OSS として公開されているテンプレートがあるので参考にすると楽です。

https://github.com/okohs/Curriculum-Vitae-template
