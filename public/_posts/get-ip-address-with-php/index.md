---
title: "PHP でクライアントとサーバのグローバル IP アドレスを取得する"
cover: "2020-02-21-get-ip-address-with-php/header.png"
category: "Tech"
date: "2020-02-21"
slug: "get-ip-address-with-php"
tags:
  - PHP
---

## 現在ページをみているユーザの IP

こいつは簡単です。

```php
$_SERVER['REMOTE_ADDR'];
```

Laravel なら下記でも取得できます。

```php
\Request::ip()
```

## プログラム実行しているサーバーの IP

こいつは少々厄介です。  
複数台でサーバー分散されていたり、サーバーの構成が違ったりすると、特に面倒です。

まずは PHP から用意されている、`$_SERVER` を使うパターン。

```php
$_SERVER['SERVER_ADDR'];
```

ただ、上記だとサーバーのプライベート IP が取れてしまい、グローバル IP が取れないことの方が多いと思います。

次のパターンは、以下です。

```php
$hostname = "www.google.com";
$ip = gethostbyname($hostname);
```

上記ならグローバル IP が取れます。  
ただ、サーバー複数で分散してるとダメですね。  
それにホストが変わることも考慮せねばならず、保守性も悪いです。

なので、`curl` コマンドを使った下記を使います。

```php
$ip = rtrim(`curl inet-ip.info 2>/dev/null`);
```

```php
$ip = rtrim(`curl ifconfig.me　2>/dev/null`);
```

どちらとも上手くいくはずです。

速度的には、`curl inet-ip.info` の方が良いと思います。
