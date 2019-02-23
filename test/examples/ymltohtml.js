const CheatySheet = require('./../../dist/src');
const path = require('path');

Promise.resolve().then(async () => {
  const cheatySheet = await CheatySheet.parseFromDisk(path.join(__dirname, './nginx.cheatsheet.yml'), 'YML');

  console.log(cheatySheet);

  const html = await cheatySheet.render('HTML');

  await html.saveToDisk(path.join(__dirname, './nginx.cheatsheet.html'))
});