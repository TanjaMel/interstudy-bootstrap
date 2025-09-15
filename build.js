// build.js
const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "src");
const DIST = path.join(__dirname, "dist");

// Создать dist, если нет
if (!fs.existsSync(DIST)) fs.mkdirSync(DIST, { recursive: true });

// Копирование ассетов
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  fs.readdirSync(src).forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    if (fs.lstatSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

// Загружаем layout
const layout = fs.readFileSync(path.join(SRC, "layout.html"), "utf8");

// Страницы
const pagesDir = path.join(SRC, "pages");
fs.readdirSync(pagesDir).forEach(file => {
  if (file.endsWith(".html")) {
    const content = fs.readFileSync(path.join(pagesDir, file), "utf8");
    const result = layout.replace("{{content}}", content);
    fs.writeFileSync(path.join(DIST, file), result);
    console.log("Built:", file);
  }
});

// Копируем assets
copyDir(path.join(SRC, "assets"), path.join(DIST, "assets"));
console.log("Assets copied");
