---
title: "クライアントサイドの JavaScript (Vue.js) で PDF を出力する方法"
cover: "2019-12-27-make-pdf-with-vue-js/header.png"
category: "Tech"
date: "2019-12-27"
slug: "make-pdf-with-vue-js"
tags:
  - Vue.js
  - npm
  - PDF
---

クライアントサイドの JavaScript(フレームワークは Vue.js)を使い PDF を出力する方法やパッケージについて色々調べたので、そのメモです。

## そもそもなぜクライアントサイドの JS で PDF 出力したいのか

クライアントサイドで PDF 出力しようと思ったのは主に以下の理由です。

- サーバーサイドにあまり負荷をかけたくないから
- クライアントサイドの JS で PDF 出力する方法を知っておけば、サーバーサイドの言語に縛られず PDF 出力可能だから
- クライアントサイドの JS だけの実装で済むなら実装コストも少なくなるから
- 単純に JavaScript での実装が好きだから

## 求めるもの

- クライアントサイドで PDF 出力を可能にしたい
- 導入するパッケージは npm で管理したい（node_module 内に手を加えるのはもちろん禁止）
- シンプルな構成で PDF 出力が実現できるもの
- IE11、Chrome、Safari など普及している Web ブラウザで問題なく PDF がダウンロードできるもの

## PDF 出力するためのパッケージ/ライブラリ

PDF 出力するための主なパッケージは以下になります。  
他にもあるみたいですが、情報が少なすぎるものは省いています。

- pdfmake
- jspdf
- pdfkit

どのパッケージも 2019 年 12 月時点で当月内での更新があるパッケージです。  
npm での人気は以下から見ることができます。

https://www.npmtrends.com/jspdf-vs-pdfkit-vs-pdfmake

以下はざっくりした比較です。

### pdfkit

- Web 上で軽く調べてみた感じでは、サーバーサイドで使う用途での情報がほとんど

### jspdf

- クライアントサイド（Vue.js）で PDF 出力可能
- デフォルトでは日本語フォントに対応していない
- 日本語出力するためには以下の方法がある
  - html 要素を `canvas` に変換して画像として PDF に書き出す方法
  - パッケージのソースコードを改造する（npm で管理ができなくなる）
  - Base64 形式にエンコードしたフォントのデータを読み込む方法

### pdfmake

- クライアントサイド（Vue.js）で PDF 出力可能
- デフォルトでは日本語フォントに対応していない
- 日本語出力するためには以下の方法がある
  - html 要素を `canvas` に変換して画像として PDF に書き出す方法
  - パッケージのソースコードを改造する（npm で管理ができなくなる）
  - 日本語フォントの情報が載った `vfs_fonts.js` を用意して読み込む

## pdfmake で日本語フォントの情報が載った vfs_fonts.js を用意して読み込むサンプル

`pdfmake`を使い、`vfs_fonts.js`を読み込むサンプルです。
`vfs_fonts.js` はもともと `node_modules/pdfmake/build/` 直下にいるのですが、こいつだけ日本語フォントに対応したものを後から読み込ませてあげます。  
こうすることで `pdfMake` 自体は `npm` で管理しつつ日本語フォントに対応することを実現しています。

日本語フォント入りの `vfs_fonts.js` は自分で生成することも可能ですが、手間だったので今回は省きます。  
偉大な先人が作成してくださった[vfs_fonts.js](https://github.com/naoa/pdfmake/blob/master/build/vfs_fonts.js)を使わせてもらうのが楽です。

pdfmake 自体は `npm` か `yarn` を使ってインストールします。  
今回は `npm` を使います。

```
npm i pdfmake --save
```

以下のサンプルプログラムは Vue.js を使って書いています。  
`vfs_fonts.js`を用意すれば、そのままコンポーネントとして使えるはずです。

```javascript
<template>
    <button type="button" class="btn btn-refresh no-margin"
        @click="onDownloadPDFClickWithPDFMake"
    >
        PDFダウンロード
    </button>
</template>

<script>
import pdfMake from 'pdfmake/build/pdfmake';
import './vfs_fonts.js';
export default {
    methods: {
        onDownloadPDFClickWithPDFMake() {
            pdfMake.fonts = {
                GenShin: {
                    normal: 'GenShinGothic-Normal-Sub.ttf',
                    bold: 'GenShinGothic-Normal-Sub.ttf',
                    italics: 'GenShinGothic-Normal-Sub.ttf',
                    bolditalics: 'GenShinGothic-Normal-Sub.ttf',
                },
            };
            const defaultStyle = 'GenShin';

            // PDF出力する内容の定義
            const docDefinition = {
                content: [
                    {
                        text: 'サンプルPDF',
                        style: 'header'
                    },
                    {
                        text: 'サンプルです。',
                        style: 'subheader'
                    },
                    {
                        text: '※これはただのサンプルです。',
                        style: { color: 'red', fontSize: 10 },
                    },
                    {
                        layout: 'lightHorizontalLines',
                        table: {
                            headerRows: 1,
                            widths: ['*', 'auto', 100, '*'],
                            body: [
                                ['いち', 'に', 'さん', 'よん'],
                                ['Value 1', 'Value 2', 'Value 3', 'Value 4'],
                                [{ text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4']
                            ]
                        }
                    },
                ],
                defaultStyle: {
                    font: defaultStyle,
                },
                styles: {
                    header: {
                        fontSize: 30,
                    },
                    subheader: {
                        fontSize: 20,
                    },
                },
            };

            // pdfMakeでのPDF出力
            pdfMake.createPdf(docDefinition).download();
        },
    },
};
</script>

```

`pdfmake`は、ただ PDF に文字を書けるだけでなく、文字に対してスタイルを細かく設定できます。  
ユーザーからの細かい要望にも答えやすいのは魅力です。  
ただ、場合によってはコードが長くなりやすいかもしれないですね。

PDF の図表やテーブルなど `pdfmake` を使ったスタイリングについては、以下のページから試すことが可能です。  
http://pdfmake.org/playground.html

Chrome、Safari、IE11、Edge などのブラウザで PDF 出力を確認しましたが、特に問題なさそうでした。

## jspdf を使い HTML を画像化（Canvas 化）して PDF 出力するサンプル

`jspdf`を使う例も置いておきます。  
今回の例では HTML を Canvas に変換して画像として PDF に書き出す方法を使っています。  
そのため、どんな言語の文字であってもフォントなしで PDF 出力可能です。  
（ただし、文字を画像として出力するので、PDF 内を文字で検索することはできません）

Canvas に変換するためのパッケージとして `html2canvas` というパッケージも導入する必要があります。  
このパッケージを使うことで HTML 要素を指定して画像化できます。

使用するパッケージは `npm` か `yarn` を使ってインストールします。  
今回は例によって `npm` を使います。

```
npm i pdfmake html2canvas --save
```

以下のサンプルプログラムは例によって Vue.js を使って書いています。  
コピーすれば、そのままコンポーネントとして使えるはずです。
（ただし、HTML に要素を追加してあげないと白紙の PDF が出力されるかもですが）

```javascript
<template>
    <button type="button" class="btn btn-refresh no-margin"
        @click="onDownloadPDFClickWithJsPDF"
    >
        PDFダウンロード
    </button>
</template>

<script>
import * as JsPDF from 'jspdf';
import html2canvas from 'html2canvas';
export default {
    methods: {
        onDownloadPDFClickWithJsPDF() {
            // html2canvasを使い、指定した要素をCanvasに変換する処理
            html2canvas(document.getElementById('target')).then((canvas) => {
                // jspdfの初期化
                const pdf = new JsPDF('p', 'pt', 'a4');
                const width = pdf.internal.pageSize.width;

                // html2canvasで取得した要素をPDFに追加する処理
                const dataURI = canvas.toDataURL();
                pdf.addImage(dataURI, 'JPEG', 0, 0, width, 0);
                pdf.addPage();

                // Canvas要素を指定してPDFに追加する処理
                // html2canvasは不要で元からCanvasの場合はPDFに画像として貼り付けられる
                const canvas_HTMLCollection = document.getElementsByTagName('canvas');
                const canvas_array = Array.prototype.slice.call(canvas_HTMLCollection);
                const canvas_base64_array = canvas_array.map(x=> x.toDataURL());
                let i = canvas_base64_array.length - 1;
                for (i; i >= 0; i --) {
                    pdf.addImage(canvas_base64_array[i], 'JPEG', 0, 0, width, 0);
                    pdf.addPage();
                }

                // PDFに「サンプルです」と文字を書くサンプル
                // ちなみに日本語フォントには対応していないので日本語を書くと文字化けします
                doc.setFontSize(20);
                doc.text(60, 150, 'This is SAMPLE.');

                // JsPDFでのPDF保存
                pdf.save('sample.pdf');
            });
        },
    },
};
</script>

```

`jspdf`は少ないコードで簡単に書けるのが特徴ですね。  
とりあえず Web ページを PDF 化したいという場合に向いていると思います。  
ただ、画像のサイズによっては PDF が重くなってしまうので注意が必要です。

## 結論

凝った PDF を作りたい場合は `pdfmake` を、とりあえず Web ページをそのまま PDF にしたい場合は `jspdf` を選ぶといいんじゃないのかな。

## 最後に

PDF 出力のパッケージ自体は色々と見つかったのですが、デフォルトで日本語対応のものが壊滅的に見つからず苦労しました。  
日本語対応するにしても `node_module` の中を弄る必要があるものの情報が多く、色々と方法を考える必要がありました。

今回はなんとかなりましたが、日本語フォントにデフォルトで対応した PDF 出力用の JS ライブラリって意外と無いものなんですね。  
機会があれば作りたいですね。(誰か作ってください）
