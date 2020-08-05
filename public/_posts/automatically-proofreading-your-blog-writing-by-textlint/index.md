---
title: "ブログの文章は textlint を使って自動で誤字脱字・表記揺れを校正する時代"
cover: "2020-06-09-automatically-proofreading-your-blog-writing-by-textlint/header.png"
category: "Tech"
date: "2020/06/09"
slug: "automatically-proofreading-your-blog-writing-by-textlint"
tags:
  - Blog
  - npm
  - textlint
---

[textlint](https://github.com/textlint/textlint) って知ってますか？

一言で言うなら文章を自動で校正してくれる [npm](https://www.npmjs.com/) のパッケージです。

Node.js や npm の知識が少し必要になりますが、こいつを活用することでブログなどの文章の校正を自動化できます。  
誤字脱字などの初歩的なミスから、表記揺れなどの問題も全て自動で校正してくれます。

## Gatsby を用いたブログへの textlint の導入

先述した通り、Node.js や npm の知識が少し必要になりますが、その点の詳しい説明は省略します。

```bash
npm i -D textlint
```

上記のコマンドでインストール可能です。

```json
"scripts": {
  "texlint:diff": "textlint --cache $(git diff master --name-only) --fix",
  "texlint:full": "textlint --cache README.md content/**/*.md --fix"
},
```

`package.json` には上記のように npm script を設定します。  
文章を構成するファイルのパスは適宜書き換えてください。

CLI コマンドで使えるオプションは以下のようになっています。  
例えば、`--fix` を付けることで文章の修正を自動で行ってくれますね。

```bash
  Options:
    -h, --help                 Show help.
    -c, --config path::String  Use configuration from this file or sharable config.
    --init                     Create the config file if not existed. - default: false
    --fix                      Automatically fix problems
    --dry-run                  Enable dry-run mode for --fix. Only show result, don't change the file.
    --debug                    Outputs debugging information
    -v, --version              Outputs the version number.

  Using stdin:
    --stdin                    Lint text provided on <STDIN>. - default: false
    --stdin-filename String    Specify filename to process STDIN as

  Output:
    -o, --output-file path::String  Enable report to be written to a file.
    -f, --format String        Use a specific output format.
                               Available formatter          : checkstyle, compact, jslint-xml, json, junit, pretty-error, stylish, table, tap, unix
                               Available formatter for --fix: compats, diff, json, stylish
    --no-color                 Disable color in piped output.
    --quiet                    Report errors only. - default: false

  Specifying rules and plugins:
    --no-textlintrc            Disable .textlintrc
    --plugin [String]          Set plugin package name
    --rule [path::String]      Set rule package name
    --preset [path::String]    Set preset package name and load rules from preset package.
    --rulesdir [path::String]  Set rules from this directory and set all default rules to off.

  Caching:
    --cache                    Only check changed files - default: false
    --cache-location path::String  Path to the cache file or directory

  Experimental:
    --experimental             Enable experimental flag.Some feature use on experimental.
    --rules-base-directory path::String  Set module base directory. textlint load modules(rules/presets/plugins) from the base directory.

```

さて、textlint の導入はここまでです。

ただ、**textlint の真髄は数多くリリースされているプラグインやカスタマイズ可能なルールにあります。**

## 当ブログの textlint

さて、それでは、当ブログの文章校正に用いている textlint の設定を共有しておきます。  
（某 OSS の日本語ドキュメントの文章校正に使われている構成をかなり参考にしています）

`package.json` は以下のようになっています。

```json
"devDependencies": {
  "textlint": "11.6.1",
  "textlint-rule-ja-hiragana-fukushi": "1.2.0",
  "textlint-rule-ja-hiragana-hojodoushi": "1.0.4",
  "textlint-rule-ja-hiragana-keishikimeishi": "1.0.2",
  "textlint-rule-ja-no-space-around-parentheses": "2.0.1",
  "textlint-rule-ja-space-around-code": "2.0.1",
  "textlint-rule-preset-ja-spacing": "2.0.1",
  "textlint-rule-preset-ja-technical-writing": "3.1.3",
  "textlint-rule-preset-jtf-style": "2.3.4",
  "textlint-filter-rule-comments": "1.2.2",
  "textlint-filter-rule-whitelist": "2.0.0"
}

```

使用しているパッケージ（プラグイン）は下記のものです。

- [textlint-rule-ja-hiragana-fukushi](https://github.com/lostandfound/textlint-rule-ja-hiragana-fukushi) : 漢字よりひらがなで表記したほうが読みやすい副詞を指摘してくれる
- [textlint-rule-ja-hiragana-hojodoushi](https://github.com/lostandfound/textlint-rule-ja-hiragana-hojodoushi) : 漢字よりもひらがなで表記したほうが読みやすい補助動詞を指摘してくれる
- [textlint-rule-ja-hiragana-keishikimeishi](https://github.com/lostandfound/textlint-rule-ja-hiragana-keishikimeishi) : 漢字よりもひらがなで表記したほうが読みやすい形式名詞を指摘してくれる
- [textlint-rule-ja-no-space-around-parentheses](https://github.com/textlint-ja/textlint-rule-preset-ja-spacing/tree/master/packages/textlint-rule-ja-no-space-around-parentheses) : かっこの外側、内側ともにスペースが入らないように指摘してくれる
- [textlint-rule-ja-space-around-code](https://github.com/textlint-ja/textlint-rule-preset-ja-spacing/tree/master/packages/textlint-rule-ja-space-around-code) : インラインコードの周りをスペースで囲むかどうかを決める textlint ルール
- [textlint-rule-preset-ja-spacing](https://github.com/textlint-ja/textlint-rule-preset-ja-spacing) : 日本語周りにおけるスペースの有無を決定する textlint ルール郡
- [textlint-rule-preset-ja-technical-writing](https://github.com/textlint-ja/textlint-rule-preset-ja-technical-writing) : 日本語による技術文書向けの textlint のルール郡
- [textlint-rule-preset-JTF-style](https://github.com/textlint-ja/textlint-rule-preset-ja-technical-writing) : 日本語用の標準的な textlint のルール郡
- [textlint-filter-rule-comments](https://github.com/textlint/textlint-filter-rule-comments) : コメントアウトした箇所でのエラーを無視するためのルール
- [textlint-filter-rule-whitelist](https://github.com/textlint/textlint-filter-rule-comments) : 正規表現で特定のエラーを無視するためのルール

```js
module.exports = {
  rules: {
    // https://github.com/textlint-ja/textlint-rule-preset-ja-technical-writing
    "preset-ja-technical-writing": true,
    // https://github.com/textlint-ja/textlint-rule-preset-JTF-style
    "preset-jtf-style": {
      "1.1.3.箇条書き": false, // 箇条書きの文末に句点(。)以外を許可
      "3.1.1.全角文字と半角文字の間": false, // 全角文字と半角文字の間にスペースを入れる
      "2.1.6.カタカナの長音": false, // カタカナ語の長音は基本的に伸ばす
      "2.2.1.ひらがなと漢字の使い分け": true // ひらがなにしたほうが良い漢字
    },
    // https://github.com/textlint-rule/textlint-rule-prh
    prh: { rulePaths: ["./prh.yml"] },
    "ja-technical-writing/no-exclamation-question-mark": false, // 文末の感嘆符を許可
    "ja-technical-writing/max-ten": { max: 5 }, // 句点の数を緩和
    "ja-technical-writing/ja-no-weak-phrase": false, // 弱い表現の許容
    "ja-technical-writing/ja-no-mixed-period": { allowPeriodMarks: ["："] }, // 文末は。、：で終わる
    "ja-technical-writing/sentence-length": false, // 翻訳完了後に有効化
    "ja-technical-writing/max-comma": false, // 翻訳完了後に有効化
    "textlint-rule-ja-hiragana-hojodoushi": true, // ひらがなにしたほうが良い補助動詞
    "textlint-rule-ja-hiragana-fukushi": true, // ひらがなにしたほうが良い副詞
    "ja-space-between-half-and-full-width": {
      space: "always",
      exceptPunctuation: true
    }, // 半角文字と全角文字の切替時にスペースを入れる
    "ja-space-around-code": {
      before: true,
      after: true
    }, // インラインコードの周りにスペースを入れる
    "ja-no-space-around-parentheses": true // かっこの外側、内側ともにスペースを入れない
  },
  filters: {
    // https://github.com/textlint/textlint-filter-rule-comments
    comments: true,
    // https://github.com/textlint/textlint-filter-rule-whitelist
    whitelist: {
      allow: ["/^<[\\s\\S]*?/>/m"] // Reactコンポーネントをlintしない
    }
  }
};
```

そして肝心のルールは上記になります。

`.textlintrc.js` を用いています。

プラグインを用いたルールの他に、文章の表記揺れを検出するために以下のルールを用いています。

https://github.com/textlint-rule/textlint-rule-prh

このルールを用いることで、`prh.yml` に定義された言葉を元に、表記揺れを修正してくれます。

```yml
version: 1
rules:
  - expected: Gatsby
    pattern:
      - Gatsby.js
      - GatsbyJS

  - expected: てみる
    pattern: て見る

  - expected: てくる
    pattern: て来る

  - expected: ついに
    pattern: 遂に

  - expected: すること
    pattern: する事

  - expected: リポジトリ
    pattern: レポジトリ

  - expected: ウェブサイト
    pattern: /Web\s?サイト/i

  - expected: ブログ記事
    pattern: ブログポスト

  - expected: Markdown
    pattern: マークダウン

  - expected: ご覧
    pattern: 御覧
```

現在、このブログで用いている `prh.yml` は上記になります。

「リポジトリ」と入力されれば、textlint を使うことで「リポジトリ」に修正してくれるわけです。

## その他にも様々な種類のある textlint のルール

textlint のルールって他にどんなものがあるのか知りたい場合は、以下を参照してみてください。  
英語・日本語を問わずに textlint の様々なルールを使うためのプラグインが記載されています。

https://github.com/textlint/textlint/wiki/Collection-of-textlint-rule
