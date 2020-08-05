---
title: "AWS EC2 の Hasura GraphQL サーバーで HTTPS(SSL) を有効にする"
cover: "2020-07-07-enable-https-ssl-for-hasura-graphql-server-on-aws/header.png"
category: "Tech"
date: "2020/07/07"
slug: "enable-https-ssl-for-hasura-graphql-server-on-aws"
tags:
  - GraphQL
  - Hasura
  - AWS
---

Hasura GraphQL サーバーを実際のプロダクトで本番運用する際に、GraphQL のエンドポイントを HTTPS(SSL) にする必要がありました。  
ただ、インフラを触るのは久しぶりで、少し手間取ったのでメモとして残しておきます。  
（ニッチな情報なため、ネット上に情報がほとんどなかったのでお役に立てれば幸いです）

## Hasura はデフォルトで HTTPS(SSL) に対応しているのか

まず最初に確認しておきたいのは、公式ドキュメントです。  
執筆時点でのドキュメントは以下になります。

https://hasura.io/docs/1.0/graphql/manual/deployment/enable-https.html

ドキュメントによると、執筆時点のバージョンの Hasura は HTTPS(SSL) 形式の API に対応していないようです。

> Hasura GraphQL エンジンは API に対して SSL/TLS を扱いません。つまり、Hasura GraphQL エンジンは HTTPS URL で API を提供できません。リバースプロキシ（Nginx、Caddy、Kong、Traefik など）やクラウドプロバイダーのネイティブロードバランサーの SSL 終端機能を使用して API を保護する必要があります。

そういうことなので、AWS EC2 上に Hasura を構築した場合は、自力でリバースプロキシを駆使して HTTPS(SSL) に対応させる必要があります。  
（ちなみに、Heroku で構築した場合はもっと簡単なようでした）

## Ubuntu へのリクエストをリバースプロキシで Hasura に捌く（ついでに CORS も対応）

AWS EC2 で動く Ubuntu にどうやって Hasura GraphQL サーバーを立てるのかについては[別記事](quick-build-graphql-server-for-aws-by-hasura)で簡単にまとめてあるので、[そちら](quick-build-graphql-server-for-aws-by-hasura)を参考にしてください。

Ubuntu に SSH 接続ができているという状態から解説をします。

```bash
$ sudo apt update
$ sudo apt install nginx
$ service nginx start
```

まず、リバースプロキシをインストールします。  
今回は、比較的使い慣れているという理由で Nginx を採用しています。

Nginx のインストールが完了したら、設定情報を書き換えます。  
コンフィグの場所は以下にあるはずです。

`/etc/nginx/sites-available/default`

```js
server {
	listen 80;
	server_name example.com;
	location / {
    # Support CORS
    if ($request_method = 'OPTIONS') {
      add_header Access-Control-Allow-Origin '*';
      add_header Access-Control-Allow-Methods 'GET, POST, PUT, DELETE';
      add_header Access-Control-Allow-Headers 'Origin, Authorization, Accept, Content-Type';
      add_header Access-Control-Max-Age 3600;
      add_header Content-Type 'text/plain charset=UTF-8';
      add_header Content-Length 0;
      return 204;
    }
    proxy_pass http://localhost:8080/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
	}
}

```

やっていることとしては、80 番ポートにきたアクセスを 8080 番ポートにある Hasura GraphQL サーバーへと渡しているだけです。

ついでに、CORS の設定もしておきます。  
（`OPTIONS` でリクエストがきた際の処理が CORS 対応の処理です）

```bash
$ service nginx restart
```

Nginx 設定を書き換えたら、忘れずに再起動しておきます。

あとは、Docker で動いている Hasura の設定も変えてあげる必要があります。  
デフォルトだと、80 番ポートでアクセスを受けているので、8080 番ポートに変更しておきます。

```yml
version: "2"
services:
  graphql-engine:
    image: hasura/graphql-engine:latest
    # ports:
    #   - "80:8080"
    ports:
      - "8080:8080"
    restart: always
    environment:
      HASURA_GRAPHQL_DATABASE_URL: postgres://db_user:db_password@hasura.123456789012.ap-northeast-1.rds.amazonaws.com:5432/db_name
      HASURA_GRAPHQL_ACCESS_KEY: hasura_password
      HASURA_GRAPHQL_ENABLE_CONSOLE: "true" # set to "false" to disable console
      HASURA_GRAPHQL_ENABLED_LOG_TYPES: startup, http-log, webhook-log, websocket-log, query-log
```

変更箇所の差分は上記のような感じですね。

これで Nginx 経由で Hasura にアクセスできるようになりました。

## AWS のロードバランサーで Hasura のエンドポイントを HTTPS(SSL) 対応する

![Get SSL by AWS Certificate Manager](./awc_cm_01.png)

まず、AWS Certificate Manager で SSL 証明書を取得しておいてください。

今回は、どのように取得するのかという点の説明を省きます。

証明書を取得できたら、EC2 からロードバランサーを作ります。

![Create ALB for hasura](./aws_alb_01.png)

今回利用するのは ALB です。

![Create ALB for hasura](./aws_alb_02.png)

リスナーには、HTTPS(443) を選択してください。  
要するに、ALB でリクエストを受ける時は HTTPS で受けます。

![Create ALB for hasura](./aws_alb_03.png)

証明書は Certificate Manager であらかじめ作成しておいたものを選択します。

次のセキュリティグループの設定は、HTTPS(443) が許可されていれば大丈夫です。

![Create ALB for hasura](./aws_alb_04.png)

受けたリクエストをどのようにルーティングするか、もちろん　 Hasura が’動いている EC2 インスタンスを選択します。

注意してほしいのは、EC2 へは HTTP(80) で渡すというところです。

![Register ALB to Route 53](./aws_route53_01.png)

最後に作成した ALB をドメインと繋いであげれば完了です。

## 最後に

![Register ALB to Route 53](./hasura_https_endpoint.png)

最後にエンドポイントにアクセスしてみて、HTTPS になっていることを確認できれば完了です。

お疲れ様でした。
