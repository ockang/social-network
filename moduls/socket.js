module.exports = function(io) {
    
    var usuariosArr = new Array();
    var usuariosArrComment = new Array();

	io.on('connection', function(socket){
		console.log('usuario se ha conectado');
	});


	io.on('connect', function(socket){

		socket.emit('bienvenido', {
			title: 'Bienvenido',
			apalusos: 'bravo!!!'
		});

		socket.on('idusuario', function(user){
			
			//usuariosArr.push(data);
			
			/*usuariosArr[data.idSocketClient] = {
				'idMongoDB': data.idMongoDB,
				'idSocketClient': data.idSocketClient
			}*/


			socket.user = user.idMongoDB,
			usuariosArrComment.push(user);

			//console.log(usuariosArr);

			/*for( var i = 0; i < usuariosArr.length; i++){
				
				
				if(usuariosArr[i].idMongoDB == data.idMongoDB) {
					usuariosArr[i].idSocketClient = data.idSocketClient;
				}
				else {
					console.log('no es igual');
					console.log(usuariosArr);
				}

			}*/
			

		});


		socket.on('nuevoComentario', function(data){
			
			console.log('estoy aquiii')

			for(var i = 0; i < usuariosArrComment.length; i++) {
			
				if(usuariosArrComment[i].idMongoDB == data.usuarioID) {
				
					var idEncontrado = '/#' +usuariosArrComment[i].idSocketClient;
					
					console.log('encontre el id?')

					console.log(idEncontrado);
					
					var push = io.sockets.connected[idEncontrado];

					/*push.emit('notificacionComentarios', {
					 	'bienvenido': 'funciona mano'
					});*/ 

					io.to(idEncontrado).emit('notificacionComentarios', {
					 	'usuarioID':  data.usuarioID,
					 	'usuarioName': data.nameUsuario,
					 	'usuarioImagen': data.imagen,
					 	'usuarioTexto': data.texto
					}); 

				}
			}
			
		});

		socket.on('friends', function(data){

			console.log()
			
			for(var i = 0; i < usuariosArr.length; i++) {
			
				if(usuariosArr[i].idMongoDB == data.usuarioID) {
				
					var idEncontrado = '/#' +usuariosArr[i].idSocketClient;
					console.log('idEncontrado');
					
					var push = io.sockets.connected[idEncontrado];

					/*push.emit('notificacionComentarios', {
					 	'bienvenido': 'funciona mano'
					});*/ 

					io.to(idEncontrado).emit('notificacionFriend', {
					 	'usuarioID':  data.usuarioID,
					 	'usuarioName': data.nameUsuario,
					 	'usuarioImagen': data.imagen,
					 	'usuarioAccept': data.acceptTheme
					}); 

				}
			}


		});




	});


}