cat > demo.js << 'EOF'
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function type(text, delay = 40) {
  for (const ch of text) {
    process.stdout.write(ch);
    await sleep(delay);
  }
}

(async () => {
  await type("$ whoami\n", 60);
  await sleep(300);
  await type("manny\n\n", 40);

  await type("$ cat philosophy.txt\n", 60);
  await sleep(300);

  await type("bare metal > abstractions\n", 35);
  await type("timing matters\n", 35);
  await type("the web is optional\n\n", 35);

  await type("$ _", 80);
})();
EOF

npx svg-term --command "node demo.js" --out terminal.svg --window
