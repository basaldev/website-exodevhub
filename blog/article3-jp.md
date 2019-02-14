---
date: 2019-02-14T17:04:31.645Z
title: イミュータブルなアプリケーションステート管理
banner: /assets/social-immutable.png
medium: >-
  https://medium.com/exodevhub/immutable-data-management-in-single-state-applications-71d1bd84839f
type: post
language: ja
languages:
  en: /immutable-data-management-in-single-state-applications
  ja: /イミュータブルなアプリケーションステート管理
category: immutable
shape: circle
author: '"Marty" Shinsuke'
---

本記事ではアプリケーションステート管理ライブラリとして知られているReduxの要素の一つ「Reducer」に焦点を当てながらイミュータブルなステート管理、またそれにまつわるJavaScriptのデータ型についてサンプルコードとともにご紹介していきます。

## ステートマネジメントとは

今日、ステート管理という考え方はSPAを開発する上で欠かせない重要な役割を担ってきました。その火付け役となったライブラリとしてReduxが挙げられるでしょう。多くの開発者がReduxを支持してきた背景には、複雑なアプリケーションをシンプルに構築でき、かつアプリケーションの状態を容易に想像しやすく、結果デバッグがしやすい、といったことが挙げられるのではないでしょうか。Redux自体とてもシンプルなコンセプトのものに作られています。

ReduxがSPAに持たらす「シンプルさ」とは何でしょうか。Reduxを構成する重要な要素の１つ、Reducerに注目してみたいと思います。Reducerはピュアな関数で作られる、唯一ステートを更新するために用意されたインタフェースです。Reducerはステートを更新するために、現在のステートとアクションと呼ばれる差分データを受け取り、新しいステートを生成します。

<iframe style="border: none;" width="100%" height="120" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FSRSwEBJjin6hEIUu6ejkygUM%2Freducer"></iframe>

ここで特筆したい点は、Reducerはステートを変更するのではなく、新たにステートを生成するということです。この新たに生成されたステートは変更前のステートから独立しており、生成後も一つ前のステートは変更されないということを意味しています。これによりアプリケーションがどのような状態変化を遂げてきたのか、時系列で追いやすくなります。このような生成後変更できないデータのことを一般的には**イミュータブル（不変の）**と呼ばれています。

<iframe style="border: none;" width="100%" height="270" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FZuYrwj8KzLbycZlQK5TlNU%2Fstate-transition%3Fnode-id%3D0%253A1"></iframe>

## イミュータブルなデータ

本題に入る前にJavaScriptにおけるイミュータブルなデータについて少し触れておきたいと思います。文字列や数値、真偽値などのプリミティブ型のデータは、生成した後変更することはできません。それに対し、オブジェクトや配列といった参照型のデータは生成後にデータを変更することができます。これらのデータは**ミュータブル（無常の）**と呼ばれています。

<iframe src="https://runkit.com/e?name=a7c21d09-ef38-42b3-997a-6c478547d5fc&base64source=dmFyIGEgPSAxOwp2YXIgYiA9IHsgazogMSB9Owp2YXIgYyA9IFsxXTsKCmEgPSAyOyAvLyB0aGlzIGlzIG5vdCBjaGFuZ2luZyAxIGJ1dCBjcmVhdGluZyAyIG5ld2x5IGFuZCByZS1hc3NpZ25pbmcgdG8gYQpiLmsgPSAyOyAvLyBjYW4gY2hhbmdlIGEgcHJvcGVydHkKYy5wdXNoKDIpOyAvLyBjYW4gYWRkIG5ldyB2YWx1ZQpjb25zb2xlLmxvZyhiKTsKY29uc29sZS5sb2coYyk7&minHeight=231&fixedHeight=371&location=&title=&oembed=true" width="100%" height="270"></iframe>

上の例を見ると、オブジェクト { k: 1 } と配列 [1] は生成後でも値が変更可能であるということが分かります。一見変数aに代入された"1"も生成後変更であるように見えますが、これは"1"を"2"に変更しているのではなく、変数aに"2"を再代入しています（変数aの値"1"は"2"で上書かれています）。

<iframe src="https://runkit.com/e?name=380ae816-f895-4eda-b2ef-8771d5cf0199&base64source=dmFyIGIgPSB7IGs6IDEgfTsKdmFyIGMgPSBbMV07CgpPYmplY3QuZnJlZXplKGIpOwpPYmplY3QuZnJlZXplKGMpOwoKYi5rID0gMjsgLy8gdGhpcyBkb2Vzbid0IHdvcmsKY1swXSA9IDI7IC8vIHRoaXMgZG9lc24ndCB3b3JrCmNvbnNvbGUubG9nKGIpOwpjb25zb2xlLmxvZyhjKTs%3D&minHeight=252&fixedHeight=392&location=&title=&oembed=true" width="100%" height="270"></iframe>

オブジェクトや配列をイミュータブルにする方法もあります。**Object.freeze()**を使用する方法です。上記の例ではObject.freeze()を使用し、オブジェクトや配列の値の変更ができないようにしています。

## イミュータブルな変数

ES6からvar以外に新たに**const**と**let**という変数定義が追加されました。constを使用し変数を定義すると再代入できない変数を定義することができます。以下の例ではconstで定義された変数bに再代入しようとするとエラーが発生します。これにより意図しない変数の変更を未然に防ぐことができます。

<iframe src="https://runkit.com/e?name=97837f9d-2a67-4c47-8d78-8195abc8d951&base64source=bGV0IGEgPSAxOwphID0gMjsgLy8gWW91IGNhbiBhc3NpZ24gMiB0byBhCgpjb25zdCBiID0gMTsKYiA9IDI7IC8vIFlvdSBjYW5ub3QgYXNzaWduIGEgdmFsdWUgKFRocm93IGFuIGVycm9yKQ%3D%3D&minHeight=147&fixedHeight=287&location=&title=&oembed=true" width="100%" height="190"></iframe>

constでオブジェクト定義した際に注意すべき点は、そのオブジェクトのプロパティはミュータブルであるということです。constは変数そのものの再代入を不可にするもので、イミュータブルな値に変換するわけではありません。オブジェクトをイミュータブルな値にするためには前述のObject.freeze()を適用する必要があります。
<iframe src="https://runkit.com/e?name=48fda270-07ed-46d2-9d26-3deff321de30&base64source=Y29uc3QgYyA9IHsgazogMSB9OwpjLmsgPSAyOyAvLyBZb3UgY2FuIGNoYW5nZSB0aGUgcHJvcGVydHkKYy5sID0gMzsgLy8gWW91IGFsc28gY2FuIGFkZCBhIG5ldyBwcm9wZXJ0eQpjb25zb2xlLmxvZyhjKTsKCmNvbnN0IGQgPSB7IGs6IDEgfTsKT2JqZWN0LmZyZWV6ZShkKTsKZC5rID0gMjsgLy8gWW91IGNhbm5vdCBjaGFuZ2UgdGhlIHByb3BlcnR5CmQubCA9IDM7IC8vIFlvdSBhbHNvIGNhbm5vdCBhZGQgYSBuZXcgcHJvcGVydHkKY29uc29sZS5sb2coZCk7&minHeight=252&fixedHeight=392&location=&title=&oembed=true" width="100%" height="300"></iframe>

## 入れ子構造の場合

オブジェクトや配列をイミュータブルにする方法としてObject.freeze()をご紹介しましたが、入れ子構造を持つ場合は少し注意が必要です。下の例を見てみましょう。入れ子構造を持つオブジェクト自身にのみObject.freeze()を適用しただけでは、入れ子になっているオブジェクトの値を変更することができてしまっています。これはObject.freeze()が渡されたオブジェクト自身のみに適用されているからです。入れ子になっているオブジェクトを含め全体をイミュータブルにした場合には、全てのオブジェクトに対してObject.freeze()を適用する必要があるため注意が必要です。

<iframe src="https://runkit.com/e?name=9520673a-40e5-49f1-967d-b7bad34247c4&base64source=Y29uc3QgYSA9IHsgazogeyBsOiAxIH0gfTsKT2JqZWN0LmZyZWV6ZShhKTsKYS5rID0geyBsOiAyIH07IC8vIFlvdSBjYW5ub3QgY2hhbmdlIGl0IGJ1dC4uLgpjb25zb2xlLmxvZyhhLmspOwphLmsubCA9IDI7IC8vIFlvdSBjYW4gY2hhbmdlIHRoZSBjaGlsZCB2YWx1ZSAKY29uc29sZS5sb2coYS5rKTsKCmNvbnN0IGIgPSB7IGs6IHsgbDogMSB9IH07Ck9iamVjdC5mcmVlemUoYik7Ck9iamVjdC5mcmVlemUoYi5rKTsKYS5rLmwgPSAxOyAvLyBZb3UgY2Fubm90IGNoYW5nZSB0aGUgdmFsdWUhIChJdCdzIHN0aWxsIDEpCmNvbnNvbGUubG9nKGEuayk7&minHeight=294&fixedHeight=434&location=&title=&oembed=true" width="100%" height="350"></iframe>

## Reducerによるイミュータブルなステート管理

ここからは本題のステート管理に話を移しましょう。冒頭でご紹介したReduxを構成する重要な要素、Reducerの実装について掘り下げていきたいと思います。

<iframe style="border: none;" width="100%" height="120" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FSRSwEBJjin6hEIUu6ejkygUM%2Freducer"></iframe>

Reducerは上記の式で表されるように、現在のステートとアクションつまり変更データを受け取りステートを更新します。実際にはReducerが返す現在のステートから独立した新たなステートを現在のステートと入れ替えることで更新が完了します。例えば、現在のステートの値をオブジェクト `{ a: 1, b: 1, c: 1 }` 、Actionをオブジェクト `{ b: 2 }` とします。Reducerは新たにステートを生成しアクションとして渡された値 2 を b にセットします。aとcは変更が無いため現在のステートから値をそのまま新しいステートにコピーします。最終的にオブジェクト `{ a: 1, b: 2, c: 1 }` が新しいステートとして返されます。最後に生成されたステートが現在のステートと入替えられ（スワップ）更新が完了します。このようにReducerはステートを更新するたびに新しいステートを生成することで、イミュータブルなステート管理を可能にします。

<iframe src="https://www.figma.com/embed?embed_host=oembed&url=https://www.figma.com/file/Qw4Fecib4UklKQZR8bKoKq7M/state?node-id=0%3A1" width="100%" height="300"></iframe>

## Reducerの実装例

以下は先の例を実際のコードに起こしてみたものです。ご覧の通りReducerは現在のステートとアクションから新しいステートを生成し返すだけの非常にシンプルな作りになっています。3行目では**Object.assign()** を使用し第１引数に渡された新しいオブジェクトを現在のステート、アクションの順で上書きしながら値をセットし呼び出し元に返しています。ES6が使用できる環境ではスプレッドオペレーターを使用し同様の操作を行うことが可能です。ここで返される新しいステートは引数で渡されたステートとは異なるメモリ空間に確保されているため、17行目では新たに生成されたステートと一つ前のステートを比較した際、異なっていることが確認できます。皆さんお気付きの通り、15行目で生成されたステートは `state.a = 2` のように直接ステートの値を変更することが出来てしまいます。しかし次のステートが生成されスワップが起こった際、その変更は全て失われてしまいます。ステートを更新する際は必ずReducerを介して行わなければなりません。Object.freeze()を使用することでそのような意図しない変更を防ぐことも可能です。

<iframe src="https://runkit.com/e?name=c6e7e48c-8de6-460d-b103-77c9c65b4d31&base64source=ZnVuY3Rpb24gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKSB7CiAgLy8gR2VuZXJhdGUgbmV3IHN0YXRlCiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBhY3Rpb24pOwogIC8vIG9yIHVzZSBzcHJlYWQgb3BlcmF0b3Igb2YgZXM2IGxpa2UgdGhpcwogIC8vIHJldHVybiB7IC4uLnN0YXRlLCBhY3Rpb24gfTsKfQoKLy8gSW5pdGlhbGl6ZSBzdGF0ZQpsZXQgc3RhdGUgPSB7IGE6IDEsIGI6IDEsIGM6IDEgfTsKLy8gQ3JlYXRlIGFjdGlvbgpjb25zdCBhY3Rpb24gPSB7IGI6IDIgfTsKLy8gQ2FjaGUgcHJldmlvdXMgc3RhdGUKY29uc3QgcHJldlN0YXRlID0gc3RhdGU7Ci8vIFVwZGF0ZSBzdGF0ZQpzdGF0ZSA9IHJlZHVjZXIoc3RhdGUsIGFjdGlvbik7Cgpjb25zb2xlLmxvZyhzdGF0ZSA9PT0gcHJldlN0YXRlKTsgLy8gZmFsc2UKY29uc29sZS5sb2coc3RhdGUuYik7IC8vIDI%3D&minHeight=420&fixedHeight=560&location=&title=&oembed=true" width="100%" height="450"></iframe>

## 終わりに

Reduxのステート更新関数「Reducer」に焦点を当てながらイミュータブルなステート管理、またそれにまつわるJavaScriptのデータ型についてご紹介してきました。冒頭ではイミュータブルなデータがもたらすシンプルさについてお話ししました。イミュータブルなデータとは生成後変更出来ないデータのことで、JavaScriptでは数値や文字列などの値がイミュータブル、オブジェクや配列は変更可能なミュータブルな値というお話をしました。また、Object.freeze()を適用することでミュータブルな値でも変更不可にできるというお話しもしました。最後に実際にReducerの中でどのようにイミュータブルなステートが生成されているかサンプルコードを交えてご紹介しました。
今回ご紹介したサンプルコードで取り上げているステートは、わかりやすく説明するため非常にシンプルなものを使用しましたが、実際には入れ子構造を伴ったもう少し複雑なデータ構造を扱っているケースのではないでしょうか。そのような場合でもイミュータブルなステート管理どのように維持していくのか、次回以降機会があればその辺りについても取り上げてみたいと思います。
