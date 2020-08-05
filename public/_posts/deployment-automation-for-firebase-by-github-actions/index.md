---
title: "GitHub Actions で Firebase に Nuxt.js 製の静的サイトを自動デプロイする yml ファイル"
cover: "2020-05-27-deployment-automation-for-firebase-by-github-actions/header.png"
category: "Tech"
date: "2020/05/27"
slug: "deployment-automation-for-firebase-by-github-actions"
tags:
  - GitHub Actions
  - Firebase
  - Nuxt.js
---

インフラエンジニア（！？）なので、最近 GitHub Actions の yml ファイルばかり書いています。

というとこで、GitHub Actions の知見について少しばかり共有します。

## Nuxt.js 製の静的サイトを GitHub Actions で Firebase に自動デプロイする

さて今回は、Nuxt.js / Firebase の構成の Web アプリにおいて、Nuxt.js により生成された静的サイトを Firebase Hosting にデプロイするということを、GitHub Actions を用いて自動化してみます。

```bash
|--.env.example
|--.firebaserc
|--README.md
|--assets
|--components
|--docker-compose.yml
|--firebase.json
|--functions
|  |--.gitignore
|  |--index.js
|  |--package-lock.json
|  |--package.json
|--jest.config.js
|--layouts
|--middleware
|--nuxt.config.js
|--package-lock.json
|--package.json
|--pages
|--plugins
|--static
|--store
|--test
```

今回の例では上記のような構成のプロジェクトを用います。  
（約 1 年前に作ったポートフォリオサイトがこんな構成でした）

Nuxt.js と Firebase で別々に `package.json` を持っており、Nuxt.js で生成した静的サイトを Firebase でホスティングする形です。

処理の流れとしては以下のような形になります。

- `develop` ブランチの更新を検知して GitHub Actions が動く
- 最新のブランチをチェックアウト
- Nuxt.js で静的サイトを生成する
- 生成された静的サイトを Firebase にホスティングする

注意しておきたいのは、Firebase の Node.js のバージョンは 8.x 系を用いていて、Nuxt.js は 12.x 系の Node.js を使ってビルドする必要がある点です。  
（現時点での Firebase は古いバージョンの Node.js しか対応していないのが少し残念な感じではあります）

さて、それらを考慮して作成した yml ファイルが以下になります。

```yml
# Firebaseへの自動デプロイ
name: Deploy to Firebase

# develop ブランチの更新を検知して動くという記述
on:
  push:
    branches:
      - develop

jobs:
  firebase-deploy:
    runs-on: ubuntu-latest
    steps:
      # 最新のブランチをチェックアウト
      - name: Checkout
        uses: actions/checkout@v2

      # Nuxt.js ように Node.js をセットアップ
      - name: Setup Node.js
        uses: actions/setup-node@v1
        with:
          node-version: "12.x"

      # Nuxt.js のビルドに .env を使用している場合、.env をサンプルから作成
      - name: Copy .env
        run: cp .env.example .env

      # Nuxt.js 依存性パッケージをインストール
      - name: yarn install in Nuxt.js
        run: yarn

      # Nuxt.js で静的サイトを生成
      - name: Nuxt generate
        run: yarn generate

      # Firebase 用に Node.js をセットアップ
      - name: Setup Node.js
        uses: actions/setup-node@v1
        with:
          node-version: "8.x"

      # Firebase 依存性パッケージインストールs
      - name: yarn install in Firebase
        run: cd functions && yarn

      # Firebase へデプロイ
      - name: deploy to Firebase
        uses: w9jds/firebase-action@master
        with:
          args: deploy --only hosting
        env:
          FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
          PROJECT_ID: your-firebase-project-id
```

yml ファイルを書くにあたって、以下のサイトを参考にさせていただきました。  
Firebase のトークンの発行などは以下を参考にしながら行えばできるはずです。

https://fireship.io/snippets/github-actions-deploy-angular-to-firebase-hosting/
