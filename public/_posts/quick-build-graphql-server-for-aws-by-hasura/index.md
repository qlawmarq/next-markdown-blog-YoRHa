---
title: "Hasura で AWSの EC2 / RDS を用いて GraphQL サーバーを立てる"
cover: "2020-05-09-quick-build-graphql-server-for-aws-by-hasura/header.png"
category: "Tech"
date: "2020/05/09"
slug: "quick-build-graphql-server-for-aws-by-hasura"
tags:
  - GraphQL
  - Hasura
  - AWS
---

[前回](quick-build-graphql-server-by-hasura-with-nuxt-js/)のつづき的な記事。

前回は Hasura と Nuxt.js による GraphQL での動作をローカル環境で動かしてみるところまで進めました。

今回は Hasura を実際に AWS 上で動かして、プロダクトで活用するための方法について実際にやってみたのでメモです。

## Hasura を AWS で動かす

手順は[こちらのリンク先](https://hasura.io/blog/instant-graphql-on-aws-rds-1edfb85b5985/)を参考にしています。  
ただ、参考にした手順が 2 年前に書かれた英語文献というところを加味して、補足を交えながら初心者向けに説明していきます。

以下のことを、前提として話を進めていきます。

- AWS の各サービスに関する知識がある
- Linux に関する基礎的な知識がある

### RDS のセットアップ

AWS のコンソールから PostgreSQL で RDS インスタンスを立ち上げます。

すでに使用している PostgreSQL がある場合は、このステップを省いても問題ないです。

いったん、RDS インスタンス立ち上げの詳細な手順は省略します。（後々書くかもしれません）

### EC2 のセットアップ

AWS のコンソールから Ubuntu で EC2 インスタンスを立ち上げます。

インスタンスを立ち上げる際に気を付ける必要があるのは、RDS と同じ VPC / セキュリティーグループに設定してあげる必要があるところですね。  
この設定をミスると、当たり前ですが EC2 から RDS に接続できなくなります。

### EC2 内部での Linux 環境セットアップ

AWS コンソール上での EC2 / RDS の作成を完了したら、ようやく Hasura を使うためのセットアップです。

いったん、EC2 上に SSH するところから始めます。

Mac ユーザーの場合、`.ssh/config`に接続先の情報を追加しておくと楽です。  
コンフィグに記載しておくことで、`ssh hasura-server` とコマンド入力することで EC2 へ SSH 接続が行えます。

```
Host hasura-server
    HostName 11.111.11.255
    User ubuntu
    Port 22
    IdentityFile ~/.ssh/dev.pem
```

![check-aws-ec2-public-ip](./check-aws-ec2-public-ip.png)

`HostName` には、いったん EC2 のパブリック IP を設定しておきます。（上記の画像の赤枠のところです）  
Route 53 で DNS の設定を行っても問題ないです。

EC2 に接続できたら、まず、RDS（PostgreSQL）のセットアップから始めます。

PostgreSQL 接続用にクライアントソフトをインストールします。

```bash
sudo apt-get -y install postgresql-client
```

クライアントをインストールしたら、RDS に接続してみます。

```bash
psql -h hasura.123456789012.ap-northeast-1.rds.amazonaws.com -p 5432 -U photoruction --password -d postgres
```

RDS に接続できたら、Hasura で使う用の DB を作成します。  
DB の名前はご自由に決めてください。

```sql
CREATE DATABASE db_name;
```

次に、Docker 関連のセットアップを行います。  
以下でインストールします。

```bash
sudo apt-get update
sudo apt-get -y install docker docker-compose
sudo usermod -a -G docker ubuntu
```

次に、Hasura 立ち上げ用の Docker 関連のファイルを作成していきます。  
まず、Docker 関連のファイルを管理するフォルダを作ってしまいます。  
その後、`docker-compose.yaml` を作ります。

```bash
mkdir docker
cd docker
touch docker-compose.yaml
```

`docker-compose.yaml` の中身は以下を参考にしてください。  
DB の名前やエンドポイントなどの情報は、適宜書き換えてください。

（ちなみに公式の手順に載っていた yml を参考にすると、エラー吐いて動かなかったです）

```yml
version: "2"
services:
  graphql-engine:
    image: hasura/graphql-engine:latest
    ports:
      - "80:8080"
    restart: always
    environment:
      HASURA_GRAPHQL_DATABASE_URL: postgres://db_user:db_password@hasura.123456789012.ap-northeast-1.rds.amazonaws.com:5432/db_name
      HASURA_GRAPHQL_ACCESS_KEY: hasura_password
      HASURA_GRAPHQL_ENABLE_CONSOLE: "true" # set to "false" to disable console
      HASURA_GRAPHQL_ENABLED_LOG_TYPES: startup, http-log, webhook-log, websocket-log, query-log
```

### Hasura を立ち上げる

さて、ここまで設定すれば、あとは Hasura を使って GraphQL サーバーをたちあげるだけです。

```bash
docker-compose up -d
```

上記のコマンドだけで立ち上がります。

Docker がエラーを吐くことなく立ち上げることができたら、実際に Hasura のコンソール画面が表示できることを確認しましょう。

![check-aws-ec2-public-ip](./check-aws-ec2-public-ip.png)

先ほどの EC2 のパブリック IP をブラウザで表示してみます。

![hasura-console](./hasura-console.png)

上記のように、ブラウザで Hasura のコンソール画面が表示できれば完了です。

## 最後に

これで GraphQL サーバーの構築は完了です。  
あとは、表示されている GraphQL のエンドポイントに対して、リクエストを送るなりするなどクライアントサイドの開発を進めるだけです。

HTTPS(SSL) に対応するための手順は[別記事](enable-https-ssl-for-hasura-graphql-server-on-aws)でまとめました。

どうでしょう。超簡単じゃないですか？
