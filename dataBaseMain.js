const readlineSync = require('readline-sync');
const fs = require('fs');
var existsFile = require('exists-file');
var database = {};
var stayInLoop = true;

function getData (table, key) {
  return database[table][key];
}

function putData (table, key, value) {
  database[table][key] = value;
}

function delByKey (table, key) {
  delete database[table][key];
}

function delByValue (table, value) {
  for (var i in database[table]) {
    if (database[table][i] === value) {
      delete database[table][i];
    }
  }
}

function createTable (table) {
  database[table] = {};
}

function saveTables () {
  fs.writeFileSync('database.json', JSON.stringify(database), 'utf-8');
}

function loadTables () {
  if (!existsFile.sync('database.json')) {
    fs.writeFileSync('database.json', '{}');
  }
  database = JSON.parse(fs.readFileSync('database.json', 'utf-8'));
}

function options () {
  console.log('1 - Create table');
  console.log('2 - Put data into table');
  console.log('3 - Get data from table');
  console.log('4 - Delete key from table');
  console.log('5 - Delete key(s) from table by value');
  console.log('6 - Exit');
}

function menu () {
  var button = readlineSync.keyIn('Please select an option: ');
  switch (button) {
    case '1':
      createTable(readlineSync.question('Please enter the name of the table you would like to create.'));
      break;
    case '2':
      putData(readlineSync.question('Table: '), readlineSync.question('Key: '), readlineSync.question('Value: '));
      break;
    case '3':
      var data = getData(readlineSync.question('Table: '), readlineSync.question('Key: '));
      console.log(data);
      readlineSync.keyIn('Please hit a key to return to the menu.');
      break;
    case '4':
      delByKey(readlineSync.question('Table: '), readlineSync.question('Key: '));
      break;
    case '5':
      delByValue(readlineSync.question('Table: '), readlineSync.question('Value: '));
      break;
    case '6':
      stayInLoop = false;
      break;
  }
}

function loop () {
  while (stayInLoop) {
    console.log('\x1Bc');
    options();
    menu();
  }
}

loadTables();
loop();
saveTables();
