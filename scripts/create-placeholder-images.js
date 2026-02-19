#!/usr/bin/env node
/**
 * 参照されているが存在しない画像のプレースホルダーを作成
 */
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

// 最小限の有効なJPEG (1x1 ピクセル)
const MINIMAL_JPEG = Buffer.from(
  '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBEQACEgoA/8f/2Q==',
  'base64'
);

const files = [
  { path: 'public/assets/images/fv/fv-overlay.jpg', content: MINIMAL_JPEG },
  { path: 'public/assets/images/fv/fv-overlay.webp', content: MINIMAL_JPEG },
];

files.forEach(({ path: filePath, content }) => {
  const fullPath = resolve(projectRoot, filePath);
  if (!existsSync(fullPath)) {
    mkdirSync(dirname(fullPath), { recursive: true });
    writeFileSync(fullPath, content);
    console.log('Created:', filePath);
  }
});
