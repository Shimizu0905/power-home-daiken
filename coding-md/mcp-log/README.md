# MCP取得値の保存ルール

Figma MCP の `get_design_context` / `get_variable_defs` / `get_screenshot` で取得した値は、必ずここに保存します。

## 保存先（ページごとに自動作成）

`coding-md/mcp-log/{page}/`

例:

- `coding-md/mcp-log/top/`
- `coding-md/mcp-log/about/`

## ファイル命名

```
YYYYMMDD_{section}.md
```

例:

- `coding-md/mcp-log/top/20260120_fv.md`
- `coding-md/mcp-log/top/20260120_news.md`
- `coding-md/mcp-log/common/20260120_variables.md`

## 記録テンプレート

```
# {ページ/セクション名}

## 取得元
- nodeId: {nodeId}
- 取得日時: {YYYY-MM-DD HH:MM}

## タイポグラフィ
- font-family:
- font-size:
- font-weight:
- line-height:
- letter-spacing:

## カラー
- text:
- background:
- border:

#### スクショの保存方法（手動保存が必要）

1. **手動でスクリーンショットを保存**
   - 以下のいずれかの方法でスクリーンショットを取得・保存してください：
     - **方法1（推奨）**: Figmaから手動でスクリーンショットを取得し、`coding-md/mcp-log/{page}/screenshot_{YYYYMMDD}.png`として保存


#### 記録テンプレート

```
### スクリーンショット（get_screenshotで取得）
- nodeId: {nodeId}
- 保存先パス: `coding-md/mcp-log/{page}/screenshot_{YYYYMMDD}.png`
- 用途: デザイン全体の確認・比較用
- 取得日時: {YYYY-MM-DD HH:MM}
- ファイル保存状況: ✅ 保存済み / ⚠️ 未保存（手動保存が必要）
- 備考: `get_screenshot`は画像ファイルを保存しないため、Figmaから手動でスクリーンショットを取得して保存してください

**ファイル保存の確認方法**:
```bash
# 保存先ディレクトリを確認
ls -la coding-md/mcp-log/{page}/screenshot_*.png

# ファイルが存在するか確認
test -f coding-md/mcp-log/{page}/screenshot_{YYYYMMDD}.png && echo "✅ ファイル存在" || echo "⚠️ ファイル未保存"
```

例:
- nodeId: 1:4700
- 保存先パス: `coding-md/mcp-log/top/screenshot_20260120.png`
- 用途: デザイン全体の確認・比較用
- 取得日時: 2026-01-20 15:00
- ファイル保存状況: ⚠️ 未保存（手動保存が必要）
- 備考: `get_screenshot`は画像ファイルを保存しないため、Figmaから手動でスクリーンショットを取得して保存してください

### 画像一覧（get_design_contextで取得した画像）
| 用途 | ファイル名（MCP取得時） | 保存先パス | 備考 |
|------|------------------------|-----------|------|
| {用途} | {ハッシュ名}.{拡張子} | {保存先パス} | {備考} |

例:
| 用途 | ファイル名（MCP取得時） | 保存先パス | 備考 |
|------|------------------------|-----------|------|
| KV背景画像 | c6f781e3d0e3526a3cecc6d3f31641ad42b82d99.png | ./assets/img/top/kv_bg.png | リネーム必要 |
| ロゴ | 0ae54122307044a7e77057929f3f15a78ebfccca.svg | ./assets/img/top/logo.svg | リネーム必要 |

### 画像のリネームルール
- MCPで取得した画像はハッシュ名で保存される
- 用途に応じて適切な名前にリネームする
- リネーム後は「保存先パス」を更新する

## 画像取得のベストプラクティス

### 画像取得の指示がない限り、画像は取得しない

**重要**: コーディング指示時に以下の点を遵守してください。

1. **デフォルトの動作**
   - **画像取得の指示がない限り、画像は取得しません**
   - `get_design_context` を使用する際も、デフォルトでは画像は取得せず、デザイン情報（フォント、カラー、レイアウト、テキスト内容など）のみを取得してください
   - 新しい画像が必要な場合のみ、明示的に「○○の画像を取得してください」と指示してください

2. **既取得画像の確認**
   - `design-context.md` に「画像一覧」セクションがあれば、それらは既に工程2で取得済みです
   - 画像一覧に記載されている画像は、再度取得する必要はありません

3. **コーディング指示時のルール**
   - コーディング指示時は、画像取得について明記しない限り、画像は取得しません
   - 新しい画像が必要な場合のみ、明示的に指定してください：
     - 「○○の画像を取得してください」（例: 「ヘッダーの新しいロゴ画像を取得してください」）

4. **`get_design_context` 使用時の注意**
   - `dirForAssetWrites` パラメータは指定しない（画像が再ダウンロードされるため）
   - 画像取得の指示がない限り、画像取得を除外してください

これにより、不要な画像の重複ダウンロードを防ぎ、処理を効率化できます。

## 補足
- {必要に応じて}
```
