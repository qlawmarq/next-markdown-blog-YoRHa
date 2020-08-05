---
title: "Nuxt.js のプロジェクトを Docker (Docker Compose) を使って動かす"
cover: "2020-01-08-docker-for-nuxt-js/header.png"
category: "Tech"
date: "2020-01-08"
slug: "docker-for-nuxt-js"
tags:
  - Nuxt.js
  - Docker
---

前回の記事の続きみたいな感じです。  
開発環境を動かすために Node.js が必要なプロジェクトを全て Docker 化したかったので、  
Nuxt.js で動かしているポートフォリオサイトも Docker 化しました。

## オレオレ Docker 環境の紹介

Docker とは何ぞやということについては解説を省きます。

今回は `Dockerfile` と `docker-compose.yml` の 2 つを Nuxt.js プロジェクト直下に配置して、Nuxt.js プロジェクトを Docker 化します。

Docker Compose は複数のコンテナを使う Docker 環境を YML ファイルに定義することで、それらを連動して起動できるツールです。  
今回の例はコンテナを複数使う訳ではないですが、Docker Compose を使うとコマンド 1 つで起動できて楽なので使います。

### docker-compose.yml

```yml
version: "3"
services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    command: npm run dev
    volumes:
      - /usr/src/node_modules
      - .:/usr/src
    environment:
      - NODE_ENV=development
```

まずは `docker-compose.yml` の紹介です。

Docker コンテナ内部の `/usr/src/` フォルダで Nuxt.js を動かす算段です。  
3000 番のポートを解放して、PC から[localhost:3000](http://localhost:3000)にアクセスすることでサイトを確認できるようにしてあります。

Docker Compose を動かした際に、`npm run dev`コマンドをコンテナ内で実行します。

### Dockerfile

```Dockerfile
FROM node:10.14.1-alpine
EXPOSE 3000
ENV HOST 0.0.0.0

WORKDIR /usr/src
COPY ./package.json .
RUN npm install \
    && npm cache clean --force
# CMD ["npm", "run", "dev"]
```

次は `Dockerfile` の紹介です。

Linux ディストリビューションは、ファイルの軽量さに定評のある Alpine Linux を用います。  
ただ、Node.js のバージョンが最新の Docker イメージを使うと、依存関係にあるプログラム（`node-gyp`）が動作しないので、  
Node.js のバージョンは指定しています。

その後、`package.json`を Docker コンテナにコピーして、それを元に依存性パッケージをインストールして、Nuxt.js プロジェクトをコピーします。

Docker Compose 側で `npm run dev` のコマンドは実行してあげているので、最後の行はコメントアウトしています。  
Docker Compose を使わない時は、ここでコマンド実行してあげることでコンテナを起動したままにします。

### .dockerignore

```
node_modules
.nuxt
```

最後に `.dockerignore` の紹介です。  
こいつは無くても動くはずです。  
ただ、ビルド時間の短縮には繋がるはずです。

### Docker 起動

さて、上で紹介した `Dockerfile` 、 `docker-compose.yml` 、 `.dockerignore` を Nuxt.js プロジェクト配下に配置しましょう。

配置したら下記のコマンドを入力します。

```bash
docker-compose up -d --build
```

初回はビルドに時間が少しかかりますが、問題なく動くはずです。

コンテナが起動したら[localhost:3000](http://localhost:3000)にアクセスします。  
問題なく Nuxt.js ブログが動いていれば問題ありません。

### トラブルシューティング

#### Nuxt.js を Docker 化したタイミングで core-js 関連のエラーが出るようになった

```
These dependencies were not found:

* core-js/modules/es6.array.find in ./.nuxt/client.js
* core-js/modules/es6.array.iterator in ./.nuxt/client.js
* core-js/modules/es6.date.to-string in ./.nuxt/utils.js, ./.nuxt/components/nuxt.js
* core-js/modules/es6.function.name in ./.nuxt/utils.js, ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./components/ContactForm.vue?vue&type=script&lang=js&
* core-js/modules/es6.object.assign in ./.nuxt/client.js
* core-js/modules/es6.object.keys in ./.nuxt/client.js
* core-js/modules/es6.object.to-string in ./.nuxt/utils.js, ./.nuxt/components/nuxt-link.client.js and 1 other
* core-js/modules/es6.promise in ./.nuxt/client.js
* core-js/modules/es6.regexp.constructor in ./.nuxt/utils.js, ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./components/ContactForm.vue?vue&type=script&lang=js&
* core-js/modules/es6.regexp.match in ./.nuxt/client.js, ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./components/ContactForm.vue?vue&type=script&lang=js&
* core-js/modules/es6.regexp.replace in ./.nuxt/utils.js, ./.nuxt/components/nuxt.js
* core-js/modules/es6.regexp.search in ./.nuxt/utils.js
* core-js/modules/es6.regexp.split in ./.nuxt/utils.js, ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./.nuxt/components/nuxt-build-indicator.vue?vue&type=script&lang=js&
* core-js/modules/es6.regexp.to-string in ./.nuxt/utils.js, ./.nuxt/components/nuxt.js
* core-js/modules/es6.string.includes in ./.nuxt/client.js, ./.nuxt/components/nuxt-link.client.js
* core-js/modules/es6.string.iterator in ./.nuxt/App.js
* core-js/modules/es6.string.repeat in ./.nuxt/utils.js
* core-js/modules/es6.string.starts-with in ./.nuxt/utils.js
* core-js/modules/es6.symbol in ./.nuxt/utils.js, ./.nuxt/components/nuxt-link.client.js
* core-js/modules/es7.array.includes in ./.nuxt/client.js, ./.nuxt/components/nuxt-link.client.js
* core-js/modules/es7.object.get-own-property-descriptors in ./.nuxt/index.js
* core-js/modules/es7.promise.finally in ./.nuxt/client.js
* core-js/modules/es7.symbol.async-iterator in ./.nuxt/axios.js, ./.nuxt/components/nuxt-link.client.js
* core-js/modules/web.dom.iterable in ./.nuxt/axios.js, ./.nuxt/components/nuxt-link.client.js
```

どうやら npm の依存関係に `core-js` のバージョン 3 系がインストールされているとエラーが起こるようです。

`core-js`自体はバージョン 2 系のメンテナンスを終了しちゃってるみたいなので、  
本当はインストールしたくないのですが、渋々`core-js`のバージョン 2 系をインストールします。

```
npm i --save core-js@2
```

インストール後に再度開発環境を起動したところエラーが起こらなくなりました。
