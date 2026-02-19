# 工程 5: SCSS チェック

## 概要

MCP_PROMPT.md の規約に従って、SCSS の書き方が正しいかチェックします。規約遵守、パフォーマンス、レスポンシブ対応なども含めて総合的にチェックします。

## 前提条件

- SCSS ファイルが作成されていること

## チェック項目

### 1. SCSS 規約の遵守

#### 1.1. BEM 記法の使用

- [ ] すべてのクラス名が BEM 記法に従っているか
- [ ] ブロック、エレメント、モディファイアの命名が正しいか

**例**:

```scss
// 正しい
.news__item {
}
.news__item-title {
}
.news__item--notice {
}

// 間違い
.news-item {
}
.newsItem {
}
```

#### 1.2. 入れ子禁止（ネスト禁止）

- [ ] すべてのクラスがフラットに記述されているか
- [ ] ネストが使用されていないか

**例**:

```scss
// 正しい
.news__item {
}
.news__item-title {
}
.news__item-text {
}

// 間違い
.news__item {
  &-title {
  }
  &-text {
  }
}
```

#### 1.3. rem()関数の使用

- [ ] すべての数値が `rem()` 関数で囲まれているか
- [ ] px 値がそのまま `rem()` に括られているか
- [ ] **⚠️ 重要: `letter-spacing` は必ず `em` 単位で記述されているか（フォントサイズに対する相対値）**
  - **`letter-spacing` は `rem()` 関数を使用してはいけません。値は「レタスぺの値（px）」割る「フォントサイズ（px）」emです**
  - **必ず `em` 単位で記述してください**

**例**:

```scss
// 正しい
font-size: rem(16);
margin: rem(20);
padding: rem(10) rem(20);
letter-spacing: 0.1em; // Figmaのletter-spacing(px) ÷ font-size(px)

// 間違い
font-size: 16px;
margin: 20px;
font-size: 1rem; // 計算結果を書かない
letter-spacing: rem(1.6); // ❌ 間違い: letter-spacingはemで記述すること
letter-spacing: rem(4.8); // ❌ 間違い: rem()は使用禁止
```

**letter-spacing の計算方法（必ず守ること）**:

Figma の letter-spacing（px）をフォントサイズ（px）で割った値を `em` で記述します。

- 例: フォントサイズ24px、letter-spacing 2.4px → `letter-spacing: 0.1em` (2.4 ÷ 24 = 0.1)
- 例: フォントサイズ50px、letter-spacing 4px → `letter-spacing: 0.08em` (4 ÷ 50 = 0.08)
- 例: フォントサイズ16px、letter-spacing 2px → `letter-spacing: 0.125em` (2 ÷ 16 = 0.125)

**⚠️ 重要: `letter-spacing` は唯一の例外で、`rem()` 関数を使用せず、必ず `em` 単位で記述してください。**

#### 1.4. @use の使用

- [ ] `@import` が使用されていないか
- [ ] `@use` が正しく使用されているか

**例**:

```scss
// 正しい
@use "global" as *;

// 間違い
@import "global";
```

#### 1.5. メディアクエリの記述

- [ ] `@include mq {}` が使用されているか
- [ ] **メディアクエリは各クラス定義ブロック内（`{}`の中）の最下部に記述されているか**
- [ ] ファイルの最後にメディアクエリをまとめて書いていないか
- [ ] PC と重複する記述が書かれていないか

**重要**: メディアクエリは必ず**各クラス定義ブロック内（`{}`の中）の最下部**に記述してください。ファイルの最後にまとめて書くのは間違いです。

**例**:

```scss
// 正しい: 各クラス定義ブロック内の最下部に記述
.news__item {
  font-size: rem(16);
  margin-bottom: rem(20);
  @include mq {
    font-size: rem(14);
    margin-bottom: rem(15);
  }
}

.news__title {
  font-size: rem(24);
  @include mq {
    font-size: rem(20);
  }
}

// 間違い: ファイルの最後にまとめて書く（絶対にNG）
.news__item {
  font-size: rem(16);
  margin-bottom: rem(20);
}

.news__title {
  font-size: rem(24);
}

@include mq {
  .news__item {
    font-size: rem(14);
    margin-bottom: rem(15);
  }
  .news__title {
    font-size: rem(20);
  }
}

// 間違い: メディアクエリがクラス定義の途中にある
.news__item {
  font-size: rem(16);
  @include mq {
    font-size: rem(14);
    margin-bottom: rem(15); // PC側にも必要なら上に書く
  }
  margin-bottom: rem(20);
}
```

#### 1.6. ホバー効果

- [ ] ホバー効果は `@media (any-hover: hover)` で実装されているか

**例**:

```scss
.button {
  background-color: var(--blue);
  @media (any-hover: hover) {
    &:hover {
      background-color: var(--green);
    }
  }
}
```

### 2. 変数の使用

- [ ] CSS 変数（`:root`で定義されたもの）が正しく使用されているか
- [ ] カラーは変数を使用しているか
- [ ] フォントは変数を使用しているか
- [ ] 繰り返し使う値は変数として定義されているか

**例**:

```scss
// 正しい
color: var(--base-color);
background-color: var(--white);
font-family: var(--base-font-family);

// 間違い
color: #1a1a1a;
background-color: #fff;
```

### 3. クラスの存在確認

- [ ] すべてのクラスが定義されているか（中身が空でも `.class {}` を出力）
- [ ] HTML で使用されているクラスがすべて SCSS に定義されているか

### 4. パフォーマンス

- [ ] 不要な CSS が記述されていないか
- [ ] 使用されていないクラスが定義されていないか
- [ ] 重複したスタイルが記述されていないか

### 5. レスポンシブ対応

- [ ] すべてのセクションでレスポンシブ対応がされているか
- [ ] モバイルファーストか、デスクトップファーストかが統一されているか
- [ ] ブレークポイントが適切に設定されているか

### 6. ブラウザ互換性

- [ ] 使用している CSS プロパティが主要ブラウザでサポートされているか
- [ ] ベンダープレフィックスが必要な場合、適切に記述されているか

### 7. アクセシビリティ

- [ ] コントラスト比が適切か（WCAG 2.1 AA 以上）
- [ ] フォーカス表示が適切か
- [ ] キーボード操作でナビゲーション可能か

## チェック手順

### 1. ビルドエラーの確認

**注意**: ビルドツール（Gulp など）が自動で動作している場合、エラーは自動で検出されます。エラーがないか確認してください。

### 2. リンターエラーの確認

```bash
# Stylelintを使用（設定されている場合）
# 例: npx stylelint "{SCSSディレクトリ}/**/*.scss"
```

### 3. 未使用 CSS の確認

```bash
# PurgeCSSなどのツールを使用（設定されている場合）
# 例: npx purgecss --css {CSS出力ファイル} --content {メインHTMLファイル}
```

### 4. 手動チェック

- 上記のチェック項目を 1 つずつ確認
- **特にメディアクエリの記述位置を確認**: ファイル内で `@include mq {` を検索し、各クラス定義ブロック内（`{}`の中）に記述されているか確認。ファイルの最後にまとめて書かれていないか確認
- 問題があれば修正

### 5. ブラウザで確認

- 複数のブラウザで表示を確認
- 開発者ツールでエラーがないか確認
- レスポンシブ表示を確認

## 修正例

### ネストをフラットに修正

```scss
// 修正前
.news__item {
  &-title {
    font-size: rem(16);
  }
}

// 修正後
.news__item-title {
  font-size: rem(16);
}
```

### rem()関数の追加

```scss
// 修正前
font-size: 16px;
margin: 20px;

// 修正後
font-size: rem(16);
margin: rem(20);
```

### 未使用 CSS の削除

```scss
// 削除: 使用されていないクラス
.old-class {
  // ...
}
```

### 重複スタイルの統合

```scss
// 修正前: 重複したスタイル
.news__item-title {
  font-size: rem(16);
  font-weight: var(--bold);
}

.pickup__item-title {
  font-size: rem(16);
  font-weight: var(--bold);
}

// 修正後: 共通クラスを作成（必要に応じて）
.common-title {
  font-size: rem(16);
  font-weight: var(--bold);
}
```

### メディアクエリの記述位置を修正

```scss
// 修正前: ファイルの最後にまとめて書く（間違い）
.header {
  position: fixed;
  height: rem(80);
}

.header__inner {
  padding: 0 rem(50);
}

@include mq {
  .header {
    height: auto;
    padding: rem(16) 0;
  }
  .header__inner {
    padding: 0 var(--padding-sp);
  }
}

// 修正後: 各クラス定義ブロック内の最下部に記述（正しい）
.header {
  position: fixed;
  height: rem(80);
  @include mq {
    height: auto;
    padding: rem(16) 0;
  }
}

.header__inner {
  padding: 0 rem(50);
  @include mq {
    padding: 0 var(--padding-sp);
  }
}
```

### 変数の使用

```scss
// 修正前
color: {カラー値};
background-color: {カラー値};

// 修正後
color: var(--{カラー変数名});
background-color: var(--{カラー変数名});
```

**注意**: `{カラー値}` と `{カラー変数名}` はプロジェクトごとに異なります。CSS 変数を使用してください。

## 注意事項

- 規約に違反している箇所はすべて修正すること
- **メディアクエリは必ず各クラス定義ブロック内（`{}`の中）の最下部に記述すること。ファイルの最後にまとめて書くのは絶対に NG**
- パフォーマンスを考慮した実装を心がけること
- アクセシビリティを考慮した実装を心がけること
