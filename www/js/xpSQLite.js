angular
	.module('xpSqlite', [])
	.service('xpSqlite', ['$rootScope', '$q',
		function ($rootScope, $q) {
			var that = this;
			return {
				xpSqlite: {
					// Funciom que inicia la base de datos y crea las tablas/////////
					initDb: function () {
						//Init Bd
						db = window.openDatabase("Db.db", "1.0", "Demo", 2000);
						// Init tables
						db.transaction(function (tx) {
							//Aqui las tablas que quiera
							tx.executeSql('CREATE TABLE IF NOT EXISTS entrances (entranceId integer PRIMARY KEY, name string, surname string, nameEntrance string, _date string)');
							// tx.executeSql('INSERT INTO entrances VALUES (?, ?, ?, ?, ?)', [123458, "Danié", "O'Connell", "Advanced Ticket", "15/7/2015"]);
							// tx.executeSql('INSERT INTO entrances VALUES (?, ?, ?, ?, ?)', [123462, "Fran", "O'Connell", "Advanced Ticket", "15/7/2015"]);
							// tx.executeSql('INSERT INTO entrances VALUES (?, ?, ?, ?, ?)', [1234, "Xavi", "O'Connell", "Advanced Ticket", "15/7/2015"]);
						}, function (error) {
							console.log('Transaction ERROR: ' + error.message);
						}, function () {
							console.log('All created');
						});
					},
					//Devuelve las tablas seleccionadas desde local
					selectDataLocal: function (table) {
						var defered = $q.defer();
						var promise = defered.promise;

						db.transaction(function (tx) {
							tx.executeSql('SELECT * FROM ' + table, [], function (tx, rs) {
								defered.resolve(rs.rows);
								// Campos en external diferentes de local
								// return rs.rows;
							}, function (tx, error) {
								console.log('SELECT error: ' + error.message);
								defered.reject(error.message);
								// return null;
							});
						})
						return promise;
					},
					//Funcion que compara datos pasados desde server con los de local y los actualiza
					SyncFromBd: function (data, table) {
						var match = false;
						var items_to_push = [];

						db.transaction(function (tx) {
							tx.executeSql('SELECT * FROM ' + table, [], function (tx, rs) {
								// Campos en external diferentes de local
								_.each(data, function (value) {
									match = false;
									// console.log("BD External--> " + value);
									_.each(rs.rows, function (value2) {
										// console.log("BD Local --> " + value2.namePlaylist);
										if (value == value2.namePlaylist) {
											match = true
										}
									});
									if (match == false)
										items_to_push.push({
											name: value
										});
								});
								$scope.pushItemsLocal(items_to_push, table);
							}, function (tx, error) {
								console.log('SELECT error: ' + error.message);
							});
						});
					},
					//Funcion que compara datos que hay en local diferentes de server y los devuelve
					//Es por si hay datos subidos en local que aun no se han subido a server
					SyncFromLocal: function (data, table) {
						var match = false;

						db.transaction(function (tx) {
							tx.executeSql('SELECT * FROM ' + table, [], function (tx, rs) {
								// Campos en local diferentes de la bd
								_.each(rs.rows, function (value) {
									match = false;
									console.log("BD Local--> " + value.namePlaylist);
									_.each(data, function (value2) {
										console.log("BD External --> " + value2);
										if (value.namePlaylist == value2) {
											match = true
										}
									});
									if (match == false)
										items_to_push.push({
											name: value.namePlaylist
										});
									return items_to_push;
								});
							}, function (tx, error) {
								console.log('SELECT error: ' + error.message);
							});
						});
					},
					// Funcion que inserta un array de datos en una tabla 
					pushItemsLocal: function (items_to_push, table) {
						_.each(items_to_push, function (value) {
							db.transaction(function (tx) {
								tx.executeSql('INSERT INTO ' + table + ' VALUES (?)', [value.name]);
							}, function (error) {
								console.log('Transaction ERROR: ' + error.message);
							}, function () {
								console.log(name + ' inserted');
								$window.location.reload();
							});
						});
					},
					// Insertar una fila en una tabla seleccionada en local
					insertRow: function (row, table, ) {
						db.transaction(function (tx) {
							tx.executeSql('INSERT INTO ' + table + ' VALUES (?)', [value.name]);
						}, function (error) {
							console.log('Transaction ERROR: ' + error.message);
						}, function () {
							console.log(name + ' inserted');
							$window.location.reload();
						});
					}
				}
			};
		}
	])
	.directive('xpSqlite', function () {
		return {
			restrict: 'A',
			controller: ['$scope', 'xpSqlite',
				function ($scope, xpSqlite) {
					angular.extend($scope, xpSqlite);
				}
			]
		};
	});