// 👇️ using import/export syntax
import {readdir} from 'fs/promises';

import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function listDirectories(pth) {
  const directories = (await readdir(pth, {withFileTypes: true}))
    .filter(dirent => dirent.isDirectory())
    .map(dir => dir.name);

  return directories;
}

console.log(await listDirectories('./'));

// [
//   '.git',
//   '.vscode',
//   'controllers',
//   'node_modules',
//   'pages',
//   'routes',
//   'src',
//   'views'
// ]
console.log(await listDirectories(__dirname));