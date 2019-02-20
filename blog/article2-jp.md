---
date: 2019-02-19T09:04:31.645Z
title: 'Webコンポーネント：属性値とプロパティ値'
banner: /assets/social-lit-elements.png
type: post
medium: https://medium.com/exodevhub/web-components-understanding-attributes-and-properties-5b8606b90a2
category: web-components
language: ja
languages:
  en: /web-components-understanding-attributes-and-properties
  ja: /webコンポーネント-属性値とプロパティ値
shape: corner
author: Alex King
---
ライブラリを使用してコンポーネント開発する際、Javascriptのプロパティ値とHTMLの属性値が混在することがあります。それらが実際は何であるかまたどのように機能するか理解していないと、後に不具合の原因となり得るでしょう。ここではその点を噛み砕いてお話します。

**HTML要素には属性値が存在します** 属性値はHTMLタグに文字列として渡すことができます。

```html
    <img src="https://picsum.photos/200/300" />
```

というのもHTMLドキュメント自体がDOMとして利用できるまではただの文字列だからです。

_ドキュメントオブジェクトモデル（DOM）はその同じ文章…DOM はウェブページの完全なオブジェクト指向の表現で、 JavaScript のようなスクリプト言語から変更できます。 - MDNより_

Javascript上でHTMLタグ要素を取得する際、JavascriptはDOM上の対応するElementオブジェクトを返します。このオブジェクトを介してHTML要素の属性値を設定することができます。同時にそのオブジェクト自体のドキュメント上は目視できないプロパティの値をセットすることも可能です。

プロパティには配列や関数、その他オブジェクトなど複雑な値もセット可能です。特にあるデータを関連するノードに紐付けて保存しておきたい際にこの方法は便利です。
_実際に試してみましょう。_

```js
$0 //will return the selected element in chrome/firefox/safari
$0.coolBeans = ['baked', 'black', 'refried'];
$0.coolBeans; // return a real array, not a string ['baked', 'black', 'refried']
```

属性値についても同様に試してみます。

```js
$0 //will return the selected element in chrome/firefox/safari
$0.setAttribute('coolBeans', ['baked', 'black', 'refried']);
$0.coolBeans; // return undefined
$0.getAttribute('coolBeans'); // return a string "baked,black,refried"
```

タグ要素に属性値としてに既に定義済みのプロパティに同じような操作する際は事態は少し複雑になってきます。

```js
const imgTag = document.createElement('img'); //non rendered img tag
imgTag.srcset = ['https://picsum.photos/320/320 320w',
								 'https://picsum.photos/480/320 480w'
								 'https://picsum.photos/640/320 640w']
// this is going to return a real array right?
// nope
imgTag.srcset; //"https://picsum.photos/320/320 320w,https://picsum.photos/480/320 480w,https://picsum.photos/640/320 640w"
```

この画像要素のクラスは`srcset`というタグ要素の属性値と同じ名前のプロパティ値を持っています。そのプロパティは設定された値を属性値にも反映します。

ほとんどの場合おいて上記のような事象は不具合を引き起こす要因にはならないと言っていいでしょう。しかし、属性値とプロパティ値の関係を頭に入れておくと、より良い再利用可能なWebコンポーネント構築に役立ちます。

[Lit Element](https://lit-element.polymer-project.org)というGoogle製ライブラリを使用し解説していきます。Lit Elementはコンポーネント構築に必要な素晴らしい基本要素を提供します。テンプレートリテラルを用いてHTML定義をすることが可能です。

以下は簡単な例です。

```js
class BeanList extends LitElement {
  constructor() {
    super();
  }
  render() {
    return html`
	   <ul>
			<li>Baked<li>
			<li>Black</li>
		  <li>Refried</li>
		 </ul>
    `
  }
}
customElements.define('cool-beans', BeanList);
// You can now add <cool-beans></cool-beans> to your html
```

もちろん静的な文字列だけの定義でも美しいリスト要素を描画してくれますが、せっかくなので配列に置き換えていきます。

```js
class BeanList extends LitElement {
  constructor() {
    super();
    this.list = [
			'Baked',
			'Black',
			'Refried'
		]
  }
  render() {
    return html`
      <ul>
        ${this.list.map((beanName)=> { return html`<li>${beanName}</li>`})}
      </ul>
		`
  }
}
```

オブジェクトに`.list`をセットしました。このデータはJavascriptからアクセスすることができます。

```js
$0 //will return the selected element in chrome/firefox/safari
$0.list // its return a real array ['Baked','Black','Refried']
$0.list = ['Baked','Black','Refried','Pino'];
$0.list // ['Baked','Black','Refried','Pino']

const x = document.createElement('cool-beans');
x.list = ['Baked','Black','Refried','Pino'];
document.body.appendChild(x);
// This WILL render the <li>Pino</li> because the list was updated before
// it rendered the tag
```

ですが、期待通りHTMLが更新されていないことにお気づきになるでしょう。オブジェクトのプロパティはコンポーネントのレンダリングサイクルと紐づいていないため、値が変更されても再描画が行われません。リストの変更を監視する必要があります。

```js
class BeanList extends LitElement {
  constructor() {
    super();
    this.list = [
			'Baked',
			'Black',
			'Refried'
		]
  }
	static get properties() {
    return {
      list
    };
  }
  render() {
    return html`
      <ul>
        ${this.list.map((beanName)=> { return html`<li>${beanName}</li>`})}
      </ul>
		`
  }
}
```

プロパティリスナーを追加しました。これでリストプロパティが更新された際、再描画が行われるようになりました。

```js
$0 //will return the selected element in chrome/firefox/safari
$0.list // its return a real array ['Baked','Black','Refried']
$0.list = ['Baked','Black','Refried','Pino'];
$0.list // It will re-render and you still have
			  // a real ['Baked','Black','Refried','Pino']
```

これでサンプルコードが期待通り動くようになりました。最後の仕上げとしてプロパティ値と属性値を紐づけていきます。

```js
class BeanList extends LitElement {
	constructor() {
    super();
    this.list = [
			'Baked',
			'Black',
			'Refried'
		]
  }
  static get properties() {
   return {
      list: {
      reflect: true,
      type: {
        fromAttribute: x => x.split(','),
        toAttribute: x => x.join(),
      }
    },
   }
  }
  render() {
    return html`
      <ul>
        ${this.list.map((beanName)=> { return html`<li>${beanName}</li>`})}
      </ul>
		`
  }
}
```

出来ました！これでどちらの値も期待通り反映されるようになりました。

```js
$0 //will return the selected element in chrome/firefox/safari
$0.setAttribute('list', ['Baked','Black','Refried','Pino'];);
$0.list = ['Baked','Black','Refried','Pino'];
```

どちらの記述でも属性値、プロパティ値そしてHTMLコンポーネントが更新されます。

`fromAttribute` と `toAttribute` はとても強力なインタフェースです。その他にも`lit-element` にはデフォルトで使用できる`Array` 型データの変換など様々なコンバーターが存在しています。詳しくはこちらをご参照ください。

```js
class BeanList extends LitElement {
  static get properties() {
   return {
      list: { attribute: false },
   }
  }
  constructor() {
    super();
    this.list = [];
  }
  render() {
    return html`
      <ul>
        ${this.list.map((bean)=> { return html`<li><img width="50px" src="${bean.img}" /></br><caption>${bean.name}</caption></li>`})}
      </ul>
		`
  }
}
customElements.define('cool-beans', BeanList);
```

上記の例では要素に属性値を持たせずプロパティ値のみを使用しています。様々なライブラリで、もちろんネイティブHTMLでもこのプロパティ値を扱うことができます。ぜひ試してみてください。

<iframe width="100%" height="600" src="https://glitch.com/embed/#!/embed/article-example-attributes?path=src/index.ts&previewSize=33" frameborder="0" allowfullscreen></iframe>

一点注意点として、一部のライブラリでは未だプロパティ値を正しくWebコンポーネントに反映できない場合があります。各ライブライの互換性について[はこちらで](https://custom-elements-everywhere.com/)ご確認ください。
