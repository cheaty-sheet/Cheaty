const CheatySheet = require('./../../dist');
const path = require('path');


console.log(CheatySheet);

Promise.resolve().then(async () => {
  const cheatySheet = new CheatySheet({ title: 'NGINX Cheat Sheet', description: 'by @CheatSheet' }, {});

  cheatySheet.blocks.push({
    title: 'Port (listen)',
    content: [
      {
        type: 'code',
        language: 'nginx',
        content: `#standard HTTP protocol
server {
  listen 80;
  listen 443 ssl;
}`,
      },
      {
        type: 'text',
        content: `Some text to render in the block.`,
      },
      {
        type: 'text',
        content: `Some text to render in the block.`,
      }
    ]
  });

  cheatySheet.blocks.push({
    title: 'Another Block',
    content: [
      {
        type: 'text',
        content: `Some text to render in the block.`,
      }
    ]
  });

  const html = await cheatySheet.render('HTML');

  await html.saveToDisk(path.join(__dirname, './output.html'));
});
