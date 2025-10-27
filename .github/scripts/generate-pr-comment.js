#!/usr/bin/env node

/**
 * PR自動コメント生成スクリプト
 * より詳細な分析とコメント生成を行う拡張スクリプト
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Git差分から変更情報を取得
function getChangedFiles(baseBranch) {
  try {
    const output = execSync(`git diff --name-status origin/${baseBranch}...HEAD`, {
      encoding: 'utf-8'
    });

    return output.trim().split('\n').map(line => {
      const [status, ...fileParts] = line.split('\t');
      const file = fileParts.join('\t');
      return { status, file };
    }).filter(item => item.file);
  } catch (error) {
    console.error('Error getting changed files:', error.message);
    return [];
  }
}

// ファイル種別ごとに分類
function categorizeFiles(files) {
  const categories = {
    source: [],
    test: [],
    config: [],
    docs: [],
    other: []
  };

  files.forEach(({ status, file }) => {
    const ext = path.extname(file);
    const basename = path.basename(file);

    if (file.includes('test') || file.includes('spec')) {
      categories.test.push({ status, file });
    } else if (['.js', '.ts', '.jsx', '.tsx', '.py', '.java', '.go'].includes(ext)) {
      categories.source.push({ status, file });
    } else if (['.json', '.yml', '.yaml', '.toml', '.ini'].includes(ext) || basename.startsWith('.')) {
      categories.config.push({ status, file });
    } else if (['.md', '.txt', '.rst'].includes(ext)) {
      categories.docs.push({ status, file });
    } else {
      categories.other.push({ status, file });
    }
  });

  return categories;
}

// ステータスアイコンを取得
function getStatusIcon(status) {
  const icons = {
    'A': '✨ 新規',
    'M': '📝 変更',
    'D': '🗑️ 削除',
    'R': '🔄 リネーム',
    'C': '📋 コピー'
  };
  return icons[status] || '❓ 不明';
}

// 統計情報を取得
function getStats(baseBranch) {
  try {
    const output = execSync(`git diff --shortstat origin/${baseBranch}...HEAD`, {
      encoding: 'utf-8'
    });
    return output.trim();
  } catch (error) {
    console.error('Error getting stats:', error.message);
    return '';
  }
}

// コメント本文を生成
function generateComment(baseBranch) {
  const files = getChangedFiles(baseBranch);
  const categories = categorizeFiles(files);
  const stats = getStats(baseBranch);

  let comment = '## 🤖 PR自動レビュー\n\n';

  // 統計情報
  comment += '### 📊 変更サマリー\n';
  comment += stats ? `${stats}\n\n` : '統計情報を取得できませんでした\n\n';

  // カテゴリ別のファイル一覧
  if (categories.source.length > 0) {
    comment += '### 💻 ソースコード\n';
    categories.source.forEach(({ status, file }) => {
      comment += `- ${getStatusIcon(status)} \`${file}\`\n`;
    });
    comment += '\n';
  }

  if (categories.test.length > 0) {
    comment += '### 🧪 テストファイル\n';
    categories.test.forEach(({ status, file }) => {
      comment += `- ${getStatusIcon(status)} \`${file}\`\n`;
    });
    comment += '\n';
  }

  if (categories.config.length > 0) {
    comment += '### ⚙️ 設定ファイル\n';
    categories.config.forEach(({ status, file }) => {
      comment += `- ${getStatusIcon(status)} \`${file}\`\n`;
    });
    comment += '\n';
  }

  if (categories.docs.length > 0) {
    comment += '### 📚 ドキュメント\n';
    categories.docs.forEach(({ status, file }) => {
      comment += `- ${getStatusIcon(status)} \`${file}\`\n`;
    });
    comment += '\n';
  }

  if (categories.other.length > 0) {
    comment += '### 📦 その他\n';
    categories.other.forEach(({ status, file }) => {
      comment += `- ${getStatusIcon(status)} \`${file}\`\n`;
    });
    comment += '\n';
  }

  // チェックリスト
  comment += '### ✅ レビューチェックリスト\n';
  comment += '- [ ] コードレビュー完了\n';
  comment += '- [ ] テスト実行確認\n';
  if (categories.docs.length > 0) {
    comment += '- [ ] ドキュメント確認\n';
  }
  if (categories.config.length > 0) {
    comment += '- [ ] 設定変更の妥当性確認\n';
  }
  comment += '\n';

  // フッター
  comment += '---\n';
  comment += '_このコメントは自動生成されました 🤖_';

  return comment;
}

// メイン処理
function main() {
  const baseBranch = process.env.BASE_BRANCH || 'main';
  const comment = generateComment(baseBranch);
  console.log(comment);
}

if (require.main === module) {
  main();
}

module.exports = { generateComment, categorizeFiles, getChangedFiles };
