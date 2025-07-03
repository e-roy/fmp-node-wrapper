const fs = require('fs');
const path = require('path');

const folders = [
  'node_modules',
  'packages/api/node_modules',
  'apps/docs/node_modules',
  'pnpm-lock.yaml',
  '.turbo',
  'packages/api/dist',
  'apps/docs/.next',
];

folders.forEach(folder => {
  const fullPath = path.join(__dirname, '..', folder);
  if (fs.existsSync(fullPath)) {
    try {
      if (fs.lstatSync(fullPath).isDirectory()) {
        fs.rmSync(fullPath, { recursive: true, force: true });
      } else {
        fs.unlinkSync(fullPath);
      }
      console.log(`Removed: ${folder}`);
    } catch (error) {
      console.error(`Error removing ${folder}:`, error.message);
    }
  } else {
    console.log(`Not found (skipped): ${folder}`);
  }
});
