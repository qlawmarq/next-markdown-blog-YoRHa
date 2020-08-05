---
title: "Git 操作を改めてまとめたカンニングペーパー的な記事"
cover: "2020-01-29-how-to-manipulate-git/header.png"
category: "Tech"
date: "2020-01-29"
slug: "how-to-manipulate-git"
tags:
  - Git
---

表題の通り。  
Git 操作をよく忘れるので、あらためてまとめておいて自分用のカンニングペーパーとして使うための記事です。

## 設定する系

### 設定の確認

```bash
git config --global -l
git config --local -l
```

`local` がローカルの Git リポジトリのコンフィグの確認、`global` は PC 全体でのコンフィグの確認です。

### 設定の追加

```
git config --global user.email "your@email.address"
```

ちなみに、GitHub に登録してあるメールアドレスの設定をしておかないと、GitHub の Contributions は増えないので注意してください。

## 確認する系

### リポジトリの確認

```bash
git remote -v
```

### 全ブランチの確認

```bash
git branch -a
```

頭が `remotes` から始まるものがリモートブランチで、それ以外がローカルブランチだと考えておけば OK です。

## ブランチ作成

### リモートブランチからローカルブランチを作成

```bash
git checkout -b local_branch_name remotes/origin/remote_branch_name
```

ちなみに `origin` はクローン元のリポジトリのことです。

### 特定のコミットからブランチを作成

`git log` でコミットハッシュを特定してブランチ作成するときは、以下のコマンドです。

```bash
git checkout 7aba6ab4b94bc5 -b feature/some-function
```

上記を活用することで

## 変更する系

### 直前のコミットメッセージを変更する

割とよくあるコミットメッセージのタイプミス。  
以下のようにタイプミスしたとしても、コミットメッセージを修正できます。

```bash
git add .
git commit -m "Refactoringggg component"

git commit --amend -m "Refactoring component"
```

## 取り消す系

### ローカル変更の取り消し

いったん消したら戻ってこないので気をつけてね！

```bash
git checkout .
git clean -df .
```

### git add の取り消し

#### 個別に取り消す場合

```bash
git rm -r --cache target_folder
```

#### 全部取り消す場合

```bash
git reset HEAD .
```

## 削除する系

GitHub でブランチ自動削除を設定することもできますので、設定しておいたほうがいいでしょう。

今回は主にローカル環境で溜まっていく作業ブランチの整理方法について。

### ローカル環境においてマージ済みブランチの全削除（master/develop は除く）

```bash
git branch --merged|egrep -v '\*|develop|master'|xargs git branch -d
```

### 単体でのブランチ削除

```bash
git branch -D your_local_branch
```

## マージする系

### 作業ブランチへのマージ

```bash
git fetch
git merge origin/develop
```

作業ブランチに対して、`develop` ブランチをマージする例。

## fork したリポジトリで本家に追従する

OSS に貢献する際など、フォークしたリポジトリを扱う場合。

```bash
git remote add root_branch https://github.com/(Fork元のユーザ名)/(フォークしたいリポジトリ.git)
git fetch root_branch
git merge root_branch/master
git push origin master
```
