var database = {};

function getData (key, table) {
  return database[table][key];
}

function putData (key, value, table) {
  database[table][key] = value;
}

function delByKey (key, table) {
  delete database[table][key];
}

function delByValue (value, table) {
  for (var i in database[table]) {
    if (database[table][i] === value) {
      delete database[table][i];
    }
  }
}

function createTable (table) {
  database[table] = {};
}

createTable('cat1');
createTable('cat2');
console.log(database);
putData('name', 'shitbag', 'cat2');
putData('size', 'even bigger', 'cat2');
putData('tail', 'small', 'cat2');
putData('color', 'black', 'cat2');
putData('name', 'asshole', 'cat1');
putData('size', 'fucking big', 'cat1');
putData('tail', 'fucking big', 'cat1');
putData('color', 'tabby', 'cat1');
console.log(database);
console.log(getData('size', 'cat1'));
delByKey('size', 'cat2');
delByValue('fucking big', 'cat1');
console.log(database);
