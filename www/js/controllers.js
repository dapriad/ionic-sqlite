angular.module('starter.controllers', [])

	.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

		var db = null;

		/*  Mocks */
		/*  Nombre, Apellidos, Entrada, idEntrada, Fecha */
		var tickets = {
			entrances: [
				{
					name: "sa",
					surname: "asdsd",
					nameEntrance: "dassad",
					idEntrance: 1231231,
					date: "7/12/2017"
				},
				{
					name: "sa",
					surname: "asdsd",
					nameEntrance: "dassad",
					idEntrance: 1231231,
					date: "7/12/2017"
				},
				{
					name: "sa",
					surname: "asdsd",
					nameEntrance: "dassad",
					idEntrance: 1231231,
					date: "7/12/2017"
				},
				{
					name: "sa",
					surname: "asdsd",
					nameEntrance: "dassad",
					idEntrance: 1231231,
					date: "7/12/2017"
				},
				{
					name: "sa",
					surname: "asdsd",
					nameEntrance: "dassad",
					idEntrance: 1231231,
					date: "7/12/2017"
				}
			]
		}

		// With the new view caching in Ionic, Controllers are only called
		// when they are recreated or on app start, instead of every page change.
		// To listen for when this page is active (for example, to refresh data),
		// listen for the $ionicView.enter event:
		//$scope.$on('$ionicView.enter', function(e) {
		//});

		// Form data for the login modal
		$scope.loginData = {};

		// Create the login modal that we will use later
		$ionicModal.fromTemplateUrl('templates/login.html', {
			scope: $scope
		}).then(function (modal) {
			$scope.modal = modal;
		});

		// Triggered in the login modal to close it
		$scope.closeLogin = function () {
			$scope.modal.hide();
		};

		// Open the login modal
		$scope.login = function () {
			$scope.modal.show();
		};

		// Perform the login action when the user submits the login form
		$scope.doLogin = function () {
			console.log('Doing login', $scope.loginData);

			// Simulate a login delay. Remove this and replace with your login
			// code if using a login system
			$timeout(function () {
				$scope.closeLogin();
			}, 1000);
		};














		////////////////////////////////////////////////////////////////////
		// RECORDAR CAMBIAR VALUES DE PLAYLIST A LA HORA DE MIGRAR A APP///
		//////////////////////////////////////////////////////////////////
		// Funciom que inicia la base de datos y crea las tablas/////////
		$scope.initDB = function () {
			//Init Bd
			db = window.openDatabase("Db.db", "1.0", "Demo", 2000);

			// Init tables
			db.transaction(function (tx) {
				//Aqui las tablas que quiera
				tx.executeSql('CREATE TABLE IF NOT EXISTS playlist (namePlaylist)');
				tx.executeSql('CREATE TABLE IF NOT EXISTS entrances (entranceId integer PRIMARY KEY, name string, surname string, nameEntrance string, _date CURRENT_DATE)');
				tx.executeSql('INSERT INTO entrances VALUES (?, ?, ?, ?, ?)', [12345, "Alice", "O'Connell", "Advanced Ticket"]);
				tx.executeSql('INSERT INTO entrances VALUES (?, ?, ?, ?, ?)', [12346, "Alice", "O'Connell", "Advanced Ticket"]);
				tx.executeSql('INSERT INTO entrances VALUES (?, ?, ?, ?, ?)', [12347, "Alice", "O'Connell", "Advanced Ticket"]);
			}, function (error) {
				console.log('Transaction ERROR: ' + error.message);
			}, function () {
				console.log('All inserted');
			});
		}
		//Devuelve las tablas seleccionadas desde local
		$scope.selectDataLocal = function (table) {
			tx.executeSql('SELECT * FROM ' + table, [], function (tx, rs) {
				// Campos en external diferentes de local
				return rs.rows;
			}, function (tx, error) {
				console.log('SELECT error: ' + error.message);
			});
		}

		//Funcion que compara datos pasados desde server con los de local y los actualiza
		$scope.SyncFromBd = function (data, table) {
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
		}
		//Funcion que compara datos que hay en local diferentes de server y los devuelve
		//Es por si hay datos subidos en local que aun no se han subido a server
		$scope.SyncFromLocal = function (data, table) {
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
		}
		// Funcion que inserta un array de datos en una tabla 
		$scope.pushItemsLocal = function (items_to_push, table) {
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
		}

		// Insertar una fila en una tabla seleccionada en local
		$scope.insertRow = function (row, table) {
			db.transaction(function (tx) {
				tx.executeSql('INSERT INTO ' + table + ' VALUES (?)', [value.name]);
			}, function (error) {
				console.log('Transaction ERROR: ' + error.message);
			}, function () {
				console.log(name + ' inserted');
				$window.location.reload();
			});
		}



















	})

	.controller('PlaylistsCtrl', function ($scope, $timeout) {
		db = window.openDatabase("Db.db", "1.0", "Demo", 2000);
		$scope.playlists = [];
		db.transaction(function (tx) {
			tx.executeSql('SELECT * FROM playlist', [], function (tx, rs) {
				var x = typeof rs.rows;
				angular.forEach(rs.rows, function (value) {
					$scope.playlists.push({
						name: value.namePlaylist
					})
				}, this);
			}, function (tx, error) {
				console.log('SELECT error: ' + error.message);
			});
		});
	})

	.controller('PlaylistCtrl', function ($scope, $window) {
		db = window.openDatabase("Db.db", "1.0", "Demo", 2000);
		$scope.insert = function (name) {
			db.transaction(function (tx) {
				tx.executeSql('INSERT INTO playlist VALUES (?)', [name]);
			}, function (error) {
				console.log('Transaction ERROR: ' + error.message);
			}, function () {
				console.log(name + ' inserted');
				// $window.location.reload();
			});
		}
	});
