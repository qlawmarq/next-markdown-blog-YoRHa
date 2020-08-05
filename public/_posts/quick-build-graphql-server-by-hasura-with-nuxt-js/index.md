---
title: "Hasura を使って爆速で GraphQL サーバーを立てる with Nuxt.js"
cover: "2020-04-30-quick-build-graphql-server-by-hasura-with-nuxt-js/header.png"
category: "Tech"
date: "2020/04/30"
slug: "quick-build-graphql-server-by-hasura-with-nuxt-js"
tags:
  - GraphQL
  - Hasura
  - Nuxt.js
---

一般的に、GraphQL サーバーを立てたいときって、どういう手順を想像するでしょうか？

Node.js で Apollo Server、Golang、Python、Scala。  
手段は色々あると思います。

だけど、どの手順でもわざわざサーバーサイドのプログラム組むのはしんどいですよね。

そんなあなたに [Hasura](https://hasura.io/) です。

Hasura を使えば、**データベースさえ用意すれば爆速で GraphQL サーバーを立てれます。**  
サーバーサイドのプログラムを書く手間がありません。

そう、Hasura ならね。

## Hasura って何？

Hasura とは何なのか、ざっくりとまとめると以下のようになります。（2020 年 4 月現在）

- いわゆる Backend as a Service (BaaS) とか Platform as a Service (PaaS) の部類
- データベースさえ用意すれば、GraphQL サーバーの処理を書かなくても GraphQL を使う API を用意できる
- 既存のデータベースに対しても、GraphQL API を使うための入り口を簡単に作ることが可能
- GUI からデータベースや Hasura の機能について設定できる
- [GitHub](https://github.com/hasできるGitHubできるGitHubura/graphql-engine)からサンプルコードを確認したり、Issue で質問したりできる
- 使用可能な RDBMS は PostgreSQL に限られる
- Webhooks やサーバーレスなファンクションなども使える

より詳しい情報は[こちら](https://hasura.io/blog/what-is-hasura-ce3b5c6e80e8/)からアクセスできます。（英語文献）

まあ、書いてある通りで、**既存や新規のデータベースに対して GraphQL API サーバーを爆速で構築できる**ソフトウェアです。  
後々に Hasura が要らないってなった場合にも、別に GraphQL サーバーを立ててあげれば大抵は解決するので、サービスへの依存度も比較的低くなりやすく、その点では使いやすいかなと思います。

Auth0 や FireBase 　などで認証を行うようにすれば、爆速でアプリを開発することも現実になり得ます。  
もちろん、Hasura を使ってカスタムの認証を作ることもできます。

## 実際に Nuxt.js で Hasura を使ってみる

### Hasura 用の Docker 環境を用意する

まず、最初に Hasura を動かすための Docker 環境を用意するところから始めます。

公式な手順は[こちら](https://hasura.io/docs/1.0/graphql/manual/getting-started/docker-simple.html)にあります。  
なお、例によって英語文献なのはご了承ください。

以下の docker-compose.yml を用意します。  
ちなみに、最新のファイルは[こちら](https://raw.githubusercontent.com/hasura/graphql-engine/stable/install-manifests/docker-compose/docker-compose.yaml)にあります。

```yml
version: "3.6"
services:
  postgres:
    image: postgres:12
    restart: always
    volumes:
      - db_data:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD: postgrespassword
  graphql-engine:
    image: hasura/graphql-engine:v1.1.1
    ports:
      - "8080:8080"
    depends_on:
      - "postgres"
    restart: always
    environment:
      HASURA_GRAPHQL_DATABASE_URL: postgres://postgres:postgrespassword@postgres:5432/postgres
      HASURA_GRAPHQL_ENABLE_CONSOLE: "true" # set to "false" to disable console
      HASURA_GRAPHQL_ENABLED_LOG_TYPES: startup, http-log, webhook-log, websocket-log, query-log
      ## uncomment next line to set an admin secret
      # HASURA_GRAPHQL_ADMIN_SECRET: myadminsecretkey
volumes:
  db_data:
```

用意できたら、以下のコマンドで環境を立ち上げます。
もちろんですが、立ち上げるためには Docker が必要なのでインストールしていない場合はインストールしておきましょう。

```bash
docker-compose up -d
```

![hasura-console](./hasura_console.png)

[localhost:8080](http://localhost:8080/console) にアクセスして、上記の画面が表示されればひとまず OK です。

![hasura-console](./hasura_create_table.png)

試しに、テーブルを作ってみましょう。

GUI の Data タブからサクッと作れます。

![hasura-console](./hasura_insert_row.png)

テスト用にレコードを入れてみます。

追加したレコードを以下のクエリで取得してみます。

```graphql
query {
  users {
    id
    name
  }
}
```

![hasura-use-query](./hasura_use_query.png)

GraphQL でレコードが取得できました。

Hasura で出来ることは数多くあるのですが、超基本的な使い方はこんなところでしょうか。

ちなみにこのコンソール画面は設定で非表示にすることも、表示するためにパスワードを付けることも可能です。

### Nuxt.js から Hasura の GraphQL にアクセスする

Hasura を用意できたら、次はクライアントサイドですね。  
今回は Nuxt.js を使います。

[GitHub](https://github.com/hasura/graphql-engine/tree/master/community/sample-apps/nuxtjs-postgres-graphql) にサンプルコードが公開されているので、そのコードを元にして解説します。  
ある意味では、初心者向けの解説になるので分かる人は読み飛ばして問題ないです。

また、Nuxt.js ではなく Next.js や Gatsby など他のフレームワークを使いたい場合も、対応するサンプルコードが公開されているので、それを見れば何とかなると思います。

とりあえず、Nuxt.js で適当にプロジェクトが作られている前提で話を進めます。

まず、Nuxt.js で使用するパッケージをインストールします。  
今回はクライアントサイドでの GraphQL の操作に [Apollo Client](https://www.apollographql.com/client/) を使うので、その関連パッケージを入れる形です。

```bash
npm i @nuxtjs/apollo apollo-cache-inmemory graphql-tag
```

インストールしたパッケージを使うため、`nuxt.config.js` に以下を書き加えます。  
Apollo に関する記述でまだ未定義のファイルが見受けられますが、いったん気にしない方向で。

```js
export default {

  // --- 中略 --- //
  // --- Omitted --- //

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/apollo'
  ],

  /*
   ** appolo module configuration
   */
  apollo: {
    cookieAttributes: {
      expires: 7 // optional, default: 7 (days)
    },
    includeNodeModules: true, // optional, default: false (this includes graphql-tag for node_modules folder)
    authenticationType: 'Bearer', // optional, default: 'Bearer'
    // optional
    errorHandler: '~/plugins/apollo-error-handler.js',
    // required
    clientConfigs: {
      default: '~/apollo/clientConfig.js'
    }
  },

  // --- 中略 --- //
  // --- Omitted --- //

  }
}

```

Apollo Client 関連の処理をまとめた `apollo` フォルダを作ります。

![nuxt_apollo](./nuxt_apollo.png)

フォルダ構成は上記の形です。  
クエリを置くフォルダと、Apollo 全般の設定を記述したファイルの構成ですね。

クエリを置くフォルダの `fetchUsers.gql` には先ほど使ったクエリをそのまま書きます。

`clientConfig.js` には、API の接続先やキャッシュの設定を記述します。
GraphQL API の接続先は、先ほどの [localhost:8080](http://localhost:8080/console) ですね。

```js
import { InMemoryCache } from "apollo-cache-inmemory";
export default function(context) {
  return {
    httpLinkOptions: {
      uri: "http://localhost:8080/v1/graphql",
      credentials: "same-origin"
    },
    cache: new InMemoryCache(),
    wsEndpoint: "ws://localhost:8080/v1/graphql",
    context
  };
}
```

Apollo の設定が終わったら、エラーハンドリングの設定を追加します。

Nuxt.js の `plugins` フォルダに `apollo-error-handler.js` を追加します。

```js
export default (error, nuxtContext) => {
  console.log("Global error handler");
  console.error(error);
  console.log(nuxtContext);
};
```

最後に GraphQL のクエリを投げるページの作成ですね。

```js
<template>
  <div>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import users from "~/apollo/queries/fetchUsers";

export default {
  apollo: {
    users: {
      prefetch: true,
      query: users
    }
  },
  head() {
    return {
      title: "Users List"
    };
  }
};
</script>

<style>
div {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
```

`pages` フォルダに `index.vue` として上記を作成します。

分かりやすさ重視で、かなりシンプルな作りにしました。  
やっていることは Hasura に先ほどのクエリを投げて、返ってきた結果を表示しているだけです。

最後に実際にページを立ち上げてみて、Hasura に登録した値が表示されていれば OK です。

## トラブルシューティング

### Nuxt.js で TypeScript を使った際に gql ファイルのインポートでエラーになる

TypeScript で開発を行う際に、Apollo Client で使う gql ファイルが見つからずエラーになる場合があります。

以下のようなエラーが出るパターンですね。

```
 ERROR  ERROR in /Users/yopinoji/Workspace/nuxt-hasura/pages/users.vue(12,20):
12:20 Cannot find module '~/apollo/queries/fetchUsers'.
    10 | import Vue from 'vue'
    11 | import UsersList from '~/components/Users/UsersList.vue'
  > 12 | import fetchUsers from '~/apollo/queries/fetchUsers.gql'
       |                    ^
    13 |
    14 | export default Vue.extend({
    15 |   name: 'Users',

```

この問題は、gql ファイルが何なのか TypeScript 側で宣言されていないことで発生しています。  
なので、gql ファイルに関する定義を宣言してあげれば解決します。

最初に、以下の npm パッケージをインストールします。

```bash
npm i graphql
```

次に、gql ファイルの定義を宣言するファイルを追加します。
`declare-gql.ts` というファイル名で作成しますが、ファイル名は変えてしまっても問題ありません。

```ts
declare module "*.gql" {
  import Graphql from "graphql";
  export default Graphql;
}
```

最後に、`tsconfig.json` に以下の記述を追記します。

```json
{
  // 中略
  // Omitted
  "files": ["declare-gql.d.ts"],
  "include": ["apollo/queries/*.gql", "apollo/queries/**/*.gql"]
  // 中略
  // Omitted
}
```

これで TypeScript 環境でビルドした際に gql ファイルがインポートできなくなることから解消されるはずです。

## 最後に

さて、今回 Hasura についてサラッと解説しましたが、Hasura で出来ることはまだまだあります。

[公式ドキュメント](https://hasura.io/docs/1.0/graphql/manual/index.html)を読むと、更に出来ることが色々あると気づくはずなのでぜひ読んでみてください。
