// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var db = null;

angular.module('starter', ['ionic', 'starter.controllers', 'ionic.native', 'ngCordova', 'xpSqlite'])

	.run(function ($ionicPlatform, $cordovaSQLite, xpSqlite) {
		$ionicPlatform.ready(function () {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			if (window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}

			if (window.StatusBar) {
				// org.apache.cordova.statusbar required
				StatusBar.styleDefault();
			}

			xpSqlite.xpSqlite.initDb();
			// if (window.cordova && window.SQLitePlugin) {
			//   // Device
			//   db = $cordovaSQLite.openDB({ name: "my.db", location: "default" })
			// } else {
			//   // Browser
			//   db = window.openDatabase("my.db", '1', 'my', 1024 * 1024 * 100);
			// }

			// $cordovaSQLite.execute

			// window.sqlitePlugin.echoTest(function () {
			//   console.log('ECHO test OK');
			// });
			// db = window.openDatabase("Db.db", "1.0", "Demo", 2000);
			// Init tables
			// db.transaction(function (tx) {
			// 	tx.executeSql('CREATE TABLE IF NOT EXISTS playlist (namePlaylist)');
			// 	tx.executeSql('CREATE TABLE IF NOT EXISTS entrances (entranceId integer PRIMARY KEY, name string, surname string, nameEntrance string, _date string)');
			// 	tx.executeSql('INSERT INTO entrances VALUES (?, ?, ?, ?, ?)', [12345, "Alice", "O'Connell", "Advanced Ticket", "15/7/2015"]);				
			// 	tx.executeSql('INSERT INTO entrances VALUES (?, ?, ?, ?, ?)', [12346, "Alice", "O'Connell", "Advanced Ticket", "15/7/2015"]);				
			// 	tx.executeSql('INSERT INTO entrances VALUES (?, ?, ?, ?, ?)', [12347, "Alice", "O'Connell", "Advanced Ticket", "15/7/2015"]);				
			// }, function (error) {
			// 	console.log('Transaction ERROR: ' + error.message);
			// }, function () {
			// 	console.log('All inserted');
			// });
			// db = $cordovaSQLite.openDatabase("Db.db", "1.0", "Demo", 2000);

			// var playlists = {
			// 	names: ["Reggae",
			// 		"Chill",
			// 		"Dubstep",
			// 		"Indie",
			// 		"Rap",
			// 		"Cowbell",
			// 		"Rock",
			// 		"Drum&Bass"]
			// }
			// var items_to_push = [];
			// var match = false;
			// db.transaction(function (tx) {
			// 	tx.executeSql('SELECT * FROM playlist', [], function (tx, rs) {
			// 		if (rs.rows.length > 0) {
			// 			// Campos en external diferentes de local
			// 			_.each(playlists.names, function (value) {
			// 				match = false;
			// 				console.log("BD External--> " + value);
			// 				_.each(rs.rows, function (value2) {
			// 					console.log("BD Local --> " + value2.namePlaylist);
			// 					if (value == value2.namePlaylist) {
			// 						match = true
			// 					}
			// 				});
			// 				if (match == false)
			// 					items_to_push.push({
			// 						name: value
			// 					});
			// 				// items_to_push = _.where(playlists, { name: value.namePlaylist });
			// 			});
			// 			console.log(items_to_push);
			// 			_.each(items_to_push, function (value) {
			// 				db.transaction(function (tx) {
			// 					tx.executeSql('INSERT INTO playlist VALUES (?)', [value.name]);
			// 				}, function (error) {
			// 					console.log('Transaction ERROR: ' + error.message);
			// 				}, function () {
			// 					console.log(name + ' inserted');
			// 					// $window.location.reload();
			// 				});
			// 			});
			// 		} else {
			// 			// Campos en local diferentes de la bd
			// 			_.each(rs.rows, function (value) {
			// 				match = false;
			// 				console.log("BD Local--> " + value.namePlaylist);
			// 				_.each(playlists.names, function (value2) {
			// 					console.log("BD External --> " + value2);
			// 					if (value.namePlaylist == value2) {
			// 						match = true
			// 					}
			// 				});
			// 				if (match == false)
			// 					items_to_push.push({
			// 						name: value.namePlaylist
			// 					});
			// 				// items_to_push = _.where(playlists, { name: value.namePlaylist });
			// 			});
			// 		}
			// 	}, function (tx, error) {
			// 		console.log('SELECT error: ' + error.message);
			// 	});
			// });

			// db.transaction(function (tx) {
			// 	// tx.executeSql("DROP TABLE playlist", [],
			// 	// 	function (tx, results) { console.log("Successfully Dropped") },
			// 	// 	function (tx, error) { console.log("Could not delete") }
			// 	// );
			// 	tx.executeSql('CREATE TABLE IF NOT EXISTS playlist (namePlaylist)');				
			// });
			// db.transaction(function (tx) {
			// 	tx.executeSql('SELECT * FROM playlist', [], function (tx, rs) {
			// 		if (rs.rows.length == 0) {
			// 			angular.forEach(playlists.names, function (value2) {
			// 				tx.executeSql('INSERT INTO playlist VALUES (?)', [value2]);
			// 			}, this);
			// 		} else {
			// 			angular.forEach(rs.rows, function (value) {
			// 				angular.forEach(playlists.names, function (value2) {
			// 					if (value.namePlaylist !== value2) {
			// 						tx.executeSql('INSERT INTO playlist VALUES (?)', [value2]);
			// 					}
			// 				}, this);
			// 			}, this);
			// 		}
			// 	}, function (tx, error) {
			// 		console.log('SELECT error: ' + error.message);
			// 	});
			// });
			// db.transaction(function (tx) {
			// 	tx.executeSql('CREATE TABLE IF NOT EXISTS playlist (namePlaylist)');
			// 	tx.executeSql('INSERT INTO playlist VALUES (?)', ['Reggae']);
			// 	tx.executeSql('INSERT INTO playlist VALUES (?)', ['Chill']);
			// 	tx.executeSql('INSERT INTO playlist VALUES (?)', ['Dubstep']);
			// 	tx.executeSql('INSERT INTO playlist VALUES (?)', ['Indie']);
			// 	tx.executeSql('INSERT INTO playlist VALUES (?)', ['Rap']);
			// 	tx.executeSql('INSERT INTO playlist VALUES (?)', ['Cowbell']);
			// 	tx.executeSql('INSERT INTO playlist VALUES (?)', ['Rock']);
			// }, function (error) {
			// 	console.log('Transaction ERROR: ' + error.message);
			// }, function () {
			// 	console.log('OK playlist');
			// });
		});
	})

	.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('app', {
				url: '/app',
				abstract: true,
				templateUrl: 'templates/menu.html',
				controller: 'AppCtrl'
			})

			.state('app.search', {
				url: '/search',
				views: {
					'menuContent': {
						templateUrl: 'templates/search.html',
						controller: 'PlaylistCtrl'
					}
				}
			})

			.state('app.browse', {
				url: '/browse',
				views: {
					'menuContent': {
						templateUrl: 'templates/browse.html',
						controller: 'SynchronizeCtrl'
					}
				}
			})

			.state('app.playlists', {
				url: '/playlists',
				views: {
					'menuContent': {
						templateUrl: 'templates/playlists.html',
						controller: 'PlaylistsCtrl'
					}
				}
			})

			.state('app.single', {
				url: '/playlists/:playlistId',
				views: {
					'menuContent': {
						templateUrl: 'templates/playlist.html',
						controller: 'PlaylistCtrl'
					}
				}
			});
		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/app/playlists');
	});
