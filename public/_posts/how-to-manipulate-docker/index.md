---
title: "Docker と Docker Compose の操作をまとめたカンニングペーパー"
cover: '2020-02-10-how-to-manipulate-docker/header.png'
category: "Tech"
date: "2020-02-10"
slug: "how-to-manipulate-docker"
tags:
    - Docker
---

表題の通り。  
Docker の操作について自分用にあらためてまとめた記事です。  
なお、Docker と言いつつ、Docker Compose を普段よく使うので混ざった感じになります。  
どんどん追加していきます。

## 確認する系

### イメージを一覧で確認

```
docker images
```

### コンテナを一覧で確認

`-a` は停止しているコンテナも含めて全てという意味です。

```
docker ps -a
```

### ボリュームを一覧で確認

```
docker volume ls
```

### ネットワークを一覧で確認

```
docker network ls
```

## 削除する系

`docker prune` 系のコマンドは、インストールしてある Docker のバージョンによっては使えないので注意してください。

### 停止コンテナ、未使用イメージ、未使用ボリューム、未使用ネットワーク一括削除

```
docker system prune
```

### 停止コンテナ一括削除

```
docker container prune
```

### 未使用イメージ一括削除

```
docker image prune
```

### 未使用ボリューム一括削除

```
docker volume prune
```

### 未使用ネットワーク一括削除

```
docker network prune
```

## 操作する系

コンテナに `bash` などがインストールされている前提で書いてます。

### コンテナの中に入る（Docker Compose）

```
docker-compose exec app bash
```

`app` の部分は `docker-compose.yml` に定義してあるコンテナ名を入力します。

コンテナに `bash` がインストールされていない場合、`sh` とかでも入れます。

### コンテナの中に入る（Docker）

以下のやり方は基本的にもう使わないけど、念のためメモ。  
Docker Compose 使う場合、使う必要がないです。

```
docker exec　-it {container-id} bash
```

対象のコンテナ ID は、`docker ps` で調べる必要があります。

