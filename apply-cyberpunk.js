#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function findHtmlFiles(dir, files = []) {
  const items = fs.readdirSync(dir);

  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() && !item.startsWith('.')) {
      findHtmlFiles(fullPath, files);
    } else if (item.endsWith('.html')) {
      files.push(fullPath);
    }
  });

  return files;
}

function applyTheme(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // SIEMPRE remover cualquier link a cyberpunk (viejo o nuevo)
  content = content.replace(/<link rel="stylesheet" href="[^"]*cyberpunk\.css"[^>]*>\n?/g, '');
  content = content.replace(/<link rel="stylesheet" href="\/cyberpunk\.css"[^>]*>\n?/g, '');

  // SIEMPRE agregar el nuevo link en </head>
  content = content.replace('</head>', '<link rel="stylesheet" href="/cyberpunk.css">\n</head>');

  // Guardar siempre
  fs.writeFileSync(filePath, content, 'utf-8');
  return true;
}

console.log('🎨 Aplicando tema...\n');

const htmlFiles = findHtmlFiles('.');
let applied = 0;

htmlFiles.forEach(file => {
  if (applyTheme(file)) {
    console.log(`✅ ${file}`);
    applied++;
  }
});

console.log(`\n✨ Listo: ${applied}/${htmlFiles.length} archivos`);
