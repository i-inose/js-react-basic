# GitHub Actions 自動PR コメント機能

このリポジトリには、プルリクエストに自動でコメントを生成・投稿するGitHub Actionsワークフローが設定されています。

## 📁 ファイル構成

```
.github/
├── workflows/
│   ├── pr-comment.yml           # 基本版ワークフロー
│   └── pr-comment-advanced.yml  # 高度な分析版ワークフロー
├── scripts/
│   └── generate-pr-comment.js   # コメント生成スクリプト
└── README.md                     # このファイル
```

## 🚀 使い方

### 基本設定

1. **ワークフローの選択**
   - `pr-comment.yml`: シンプルで軽量なバージョン（推奨）
   - `pr-comment-advanced.yml`: より詳細な分類と分析を行うバージョン

2. **不要なワークフローの無効化**
   両方のワークフローが有効だと重複してコメントが投稿されます。どちらか一方を使用する場合は、もう一方を削除または無効化してください。

   無効化する場合は、ファイル名を変更します：
   ```bash
   # 例: 高度版を無効化する場合
   mv .github/workflows/pr-comment-advanced.yml .github/workflows/pr-comment-advanced.yml.disabled
   ```

### トークンの設定

このワークフローは `GITHUB_TOKEN` を使用します。これはGitHubが自動的に提供するトークンで、追加設定は**不要**です。

ただし、リポジトリの設定で以下を確認してください：

1. リポジトリの **Settings** → **Actions** → **General** に移動
2. **Workflow permissions** セクションで以下を確認：
   - "Read and write permissions" が選択されている、または
   - "Read repository contents and packages permissions" が選択されていて、"Allow GitHub Actions to create and approve pull requests" にチェックが入っている

## 💡 機能

### 基本版 (pr-comment.yml)

- PRの変更統計（追加/削除行数）
- 変更されたファイル一覧と各ファイルの変更行数
- レビューチェックリスト

### 高度版 (pr-comment-advanced.yml)

基本版の機能に加えて：
- ファイル種別ごとの分類（ソースコード、テスト、設定、ドキュメント）
- 変更タイプの表示（新規、変更、削除など）
- カテゴリ別のチェックリスト

## 🔧 カスタマイズ

### コメント内容のカスタマイズ

#### 基本版の場合
`.github/workflows/pr-comment.yml` の `Generate PR comment` ステップを編集してください。

#### 高度版の場合
`.github/scripts/generate-pr-comment.js` を編集してください。

例：
```javascript
// コメントに追加情報を含める
comment += '### 🎯 レビューポイント\n';
comment += '- パフォーマンスへの影響を確認\n';
comment += '- セキュリティ上の問題がないか確認\n\n';
```

### トリガーの変更

デフォルトでは、PRが開かれた時、更新された時、再開された時にコメントが生成されます。

トリガーを変更する場合は、ワークフローファイルの `on` セクションを編集：

```yaml
on:
  pull_request:
    types: [opened]  # PRが開かれた時のみ実行
```

## 📝 コメントの更新

このワークフローは、既存の自動生成コメントを検索し、見つかった場合は更新します。これにより、PR内に複数のコメントが投稿されるのを防ぎます。

## 🐛 トラブルシューティング

### コメントが投稿されない

1. **権限を確認**
   - リポジトリの Actions 設定で write 権限が有効か確認

2. **ワークフローの実行ログを確認**
   - GitHub の **Actions** タブでワークフローの実行状態を確認
   - エラーメッセージがあれば確認

3. **ブランチの比較**
   - PRのベースブランチが正しく設定されているか確認

### 高度版が動作しない

- Node.js のバージョンを確認（v20を使用）
- スクリプトに実行権限があるか確認

## 🔐 セキュリティ

- `GITHUB_TOKEN` は各ワークフロー実行ごとに自動生成され、実行後に無効化されます
- トークンの権限は必要最小限（PRへの書き込みとコンテンツの読み取りのみ）に設定されています
- プライベートリポジトリでも安全に使用できます

## 📚 参考リンク

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Script Action](https://github.com/actions/github-script)
- [GitHub REST API](https://docs.github.com/en/rest)
