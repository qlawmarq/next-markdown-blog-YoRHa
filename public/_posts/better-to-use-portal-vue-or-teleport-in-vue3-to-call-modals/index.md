---
title: "Vue.js でのモーダル呼び出しには Vuex ではなく、Portal-Vue を使うべき"
cover: "2020-06-20-better-to-use-portal-vue-or-teleport-in-vue3-to-call-modals/header.png"
category: "Tech"
date: "2020/06/20"
slug: "better-to-use-portal-vue-or-teleport-in-vue3-to-call-modals"
tags:
  - Vue.js
  - Nuxt.js
  - npm
---

Vue.js ユーザーの皆さん、おはこんばんにちわ。

今回は、Vue.js でモーダルを実装する際の方法について、考察を交えて紹介していきます。  
モーダルと言いましたが、メッセージボックス、ダイアログボックス、スナックバーなどの実装にも同じことが言えます。

まあ、結論から端的に言うと、現時点の Vue.js では [Portal-Vue](https://portal-vue.linusb.org/) を使おうという話になります。

## Portal-Vue is What?

まず最初に、[Portal-Vue](https://portal-vue.linusb.org/) の説明からします。

[Portal-Vue](https://portal-vue.linusb.org/) で、できることは以下の通りです。

- 別々の Vue コンポーネントにおいて、DOM を呼び出すことができる
- 指定した場所に DOM を呼び出せる

DOM で例えるなら、以下のようなことができるイメージです。

```html
<portal to="destination">
  <p>呼び出したい内容</p>
</portal>

<!-- 中略 -->

<portal-target name="destination">
  <!--
    ここに呼び出される
  -->
</portal-target>
```

呼び出したい場所に、呼び出したい DOM を呼び出せる。  
要するに、それができます。

## なぜ Portal-Vue を使ってモーダルを呼び出す方法が良いのか

それでは、なぜ Portal-Vue を使う方法が良いのかを考えていきます。

まず、例としてモーダルを呼び出す際に以下のような構成を想像してほしいです。

![Nested components](./nested_component_sample_image.png)

大元になるページがあり、そこにコンポーネント A がいて、さらに中にコンポーネント B がいる構成です。  
入れ子構造になってしまっているパターンですね。

スタイルの崩れなどを考慮して、大元になるページ層でモーダルを呼び出すものとします。

こういう場合、コンポーネント B から大元のページのモーダルを呼び出す際の方法は 2 パターン考えられます。

```js
export default {
  methods: {
    event() {
      const val = "メッセージ";
      this.$emit("open-modal", val);
    }
  }
};
```

まず、1 つ目の方法は、上記のように `$emit` でイベントを受け渡していく方法です。  
イベントを受け渡していき、大元のページで受け取ったイベントを使ってモーダルを呼び出すという寸法です。

ただ、今回の例の場合、コンポーネントが入れ子構造になってしまっている都合で、イベントの受け渡しを 2 回行う必要があり、処理がやや冗長です。

入れ子の数が増えた場合、目も当てられないような状況になります。

```js
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("modules/modal", ["setMessage"]),
    event() {
      this.setMessage("メッセージ");
    }
  }
};
```

2 つ目の方法としてあるのが、Vuex です。

コンポーネント B から Vuex に対してメッセージを受け渡し、  
大元のページで Vuex の変更を検知してメッセージを表示する方法ですね。

この方法であれば、入れ子構造になっていたとしても 1 度の情報の受け渡しでモーダルを呼び出すことが確かに可能です。

このように Vuex は便利です。  
ただ、便利に何でも使えるグローバル変数として Vuex を使用することが設計として正しいのかどうかに疑念が残ります。  
（個人的に、ユーザー情報や API から取得した情報の管理だけに Vuex の使用を止めておいた方が良いと考えています）

どのような Vuex 設計が正しいのかについての議論を話すことはここでは避けます。  
（Vuex 自体、もともと便利なグローバル変数として使えてしまう素養があります）

それでは、Vuex の代わりにどうやってモーダルを呼び出せば良いのでしょうか。

```html
<html>
  <portal-target name="destination">
    <!--
      実際には、ここに<modal>が表示される。
    -->
  </portal-target>

  <template name="ComponentA">
    <template name="ComponentB">
      <portal to="destination">
        <!-- コンポーネントBで表示を制御できる。 -->
        <modal v-if="isOpen">メッセージ</modal>
      </portal>
    </template>
  </template>
</html>
```

そこで、[Portal-Vue](https://portal-vue.linusb.org/) です。

1 度の情報の受け渡しでモーダルを呼び出すことができ、Vuex への依存も排除できます。

どうです？  
[Portal-Vue](https://portal-vue.linusb.org/) を使う理由が理解できたのではないでしょうか。

## Nuxt.js で実際に使ってみる

事前に `create-nuxt-app` で Nuxt.js で動くアプリを用意しておいてください。

利用する環境は以下のバージョンで行います。

```bash
$ npx nuxt -v
@nuxt/cli v2.12.1

$ node -v
v12.17.0
```

まず最初にインストールから行います

```bash
npm i portal-vue
```

インストールが完了したら、`nuxt.config.js` のモジュールに以下を追記します。

```js
{
  modules: ["portal-vue/nuxt"];
}
```

次に、表示する内容を制御するためのコンポーネントを作ります。

名前はひとまず `components/Notification.vue` にしておきます。

ちなみに、今回作ったコンポーネントは [Vuetify](https://vuetifyjs.com/ja/) を使っています。

```ts
<template>
  <portal to="notification">
    <v-snackbar v-model="open" :color="color">
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="$emit('close')"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
  </portal>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    open: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: '予期せぬエラーが起こりました。システム管理者に連絡してください'
    },
    // @see https://vuetifyjs.com/ja/styles/colors/
    color: {
      type: String,
      default: 'error'
    }
  }
})
</script>

```

呼び出すコンポーネントを作り終えたら、呼び出す先も作ります。

Nuxt.js では、各ページで共通したレイアウトを設定できるの、今回はレイアウトに呼び出すことでコード量を削減します。

モーダルなどを呼び出したい場所に `<portal-target name="notification" />` と記述してあげるだけです。  
ここで設定した場所にモーダルなど呼び出したい要素が呼び出されます。  
今回は `notification` という名前にしていますが、適宜変えてしまっても問題ありません。

`layouts/default.vue` を用いたサンプルが以下です。

```ts
<template>
  <v-app>
    <portal-target name="notification" />
    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Default'
})
</script>

```

あとは任意のコンポーネントで呼び出すだけです。

今回は、axios で API を叩いた時にエラーだった場合を想定した例を書いてみました。

```ts
<template>
  <v-container>
    <Notification
      :open="openNotification"
      :message="messageNotification"
      color="error"
      @close="openNotification = false"
    />
    <v-row>
      <v-col :cols="10">
        <-- This is just sample component -->
      </v-col>
      <v-col :cols="2">
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Notification from '@/components/Notification.vue'

export default Vue.extend({
  components: {
    Notification
  },
  data() {
    return {
      openNotification: false,
      messageNotification:
        '予期せぬエラーが発生しました。システム管理者に問い合わせてください'
    }
  },
  async created() {
    const res = await this.getExample()
  },
  methods: {
    async getExample() {
      const example = await this.$axios
        .get(
          'https://example.com/api/get'
        )
        .catch(() => {
          this.openNotification = true
          this.messageNotification = 'サンプルの取得に失敗しました。'
        })
      return example
    }
  }
})
</script>

```

このように、どんなコンポーネントの構造であっても、呼び出したい要素を指定した場所に呼び出すことができます。  
`z-index` など気にする必要はありません。

## 最後に

さて、今回の話はここまでです。

ちなみに、この [Portal-Vue](https://portal-vue.linusb.org/) ですが、  
Vue 3.0 からは、[Teleport](https://qiita.com/ryo2132/items/a620755b04294ffabde6) という名称で Vue.js そのものの機能として使えるようです。

どんどん活用していきましょう。
