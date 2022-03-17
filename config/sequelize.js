const {dbHost, dbName, dbUser, dbPass} = require('./dbMysql');

module.exports = {
  "development": {
    "username": dbUser,
    "password": dbPass,
    "database": dbName,
    "host": dbHost,
    "dialect": "mysql",
    "operatorsAliases": '0'
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": '0'
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": '0'
  }
}
