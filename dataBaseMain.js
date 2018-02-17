const readlineSync = require('readline-sync');
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

loop();
/*
createTable('cat1');
createTable('cat2');

putData('name', 'shitbag', 'cat2');
putData('size', 'even bigger', 'cat2');
putData('tail', 'small', 'cat2');
putData('color', 'black', 'cat2');
putData('remainingLives', 6, 'cat2');
putData('name', 'asshole', 'cat1');
putData('size', 'fucking big', 'cat1');
putData('tail', 'fucking big', 'cat1');
putData('color', 'tabby', 'cat1');
putData('remainingLives', 3, 'cat1');

console.log(getData('size', 'cat1'));
delByKey('size', 'cat2');
delByValue('fucking big', 'cat1');

killCat('remainingLives', 'cat1');
killCat('remainingLives', 'cat2');
console.log(database);
*/
