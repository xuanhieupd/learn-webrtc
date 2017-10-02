const Peer = require('peerjs');
const jQuery = require('jquery');
const UID = require('uid');
const Stream = require('./stream.js');
const Helper = require('./helper.js');
const getICEResult = require('./turnModel.js');

var iceConfig = {};
getICEResult((iceResult) => iceConfig = (iceResult.s == 'ok') ? iceResult.v : {});

var windowHash = window.location.hash;
var userId = windowHash.substr(1);
var connectionConfig = {host: 'atomic-peerjs.herokuapp.com', port: 443, secure: 1, key: 'peerjs', config: iceConfig};
const peerInstance = new Peer(userId, connectionConfig);

/**
 * Khi nhấn vào button gọi
 *
 * @author shin_conan <xuanhieu.pd@gmail.com>
 * @return
 */
jQuery('.btn-request-user-media-access').click(function(event) {
	var remoteId = prompt('Nhập ID của người mà bạn muốn gọi ?', '');
	if(remoteId) {
		Stream.open({audio: false, video: true}, function(stream) {
			Stream.play(stream, 'streamLocal');
			const call = peerInstance.call(remoteId, stream);
			call.on('stream', remoteStream => Stream.play(remoteStream, 'streamRemote'));
		});
	}
});

/**
 * Đối tượng nhận được cuộc gọi
 *
 * @author shin_conan <xuanhieu.pd@gmail.com>
 * @return
 */
peerInstance.on('call', call => {
	Stream.open({audio: true, video: true}, stream => {
	    Stream.play(stream, 'streamLocal');
	    call.answer(stream);
	    call.on('stream', remoteStream => Stream.play(remoteStream, 'streamRemote'));
	});
});

/**
 * Trường hợp có lỗi xảy ra với PeerJS
 *
 * @author shin_conan <xuanhieu.pd@gmail.com>
 * @return
 */
peerInstance.on('error', (error) => {
	switch(error.type) {
		case 'browser-incompatible': return alert('The client\'s browser does not support some or all WebRTC features that you are trying to use.');
		case 'disconnected': return alert('You\'ve already disconnected this peer from the server and can no longer make any new connections on it.');
		case 'invalid-id': return alert('The ID passed into the Peer constructor contains illegal characters.');
		case 'invalid-key': return alert('The API key passed into the Peer constructor contains illegal characters or is not in the system (cloud server only).');
		case 'network': return console.log('Lost or cannot establish a connection to the signalling server.');
		case 'peer-unavailable': return alert('The peer you\'re trying to connect to does not exist.');
		case 'ssl-unavailable': return alert('PeerJS is being used securely, but the cloud server does not support SSL. Use a custom PeerServer.');
		case 'server-error': return alert('Unable to reach the server.');
		case 'socket-error': return alert('An error from the underlying socket.');
		case 'socket-closed': return alert('The underlying socket closed unexpectedly.');
		case 'unavailable-id': return alert('The ID passed into the Peer constructor is already taken.');
		case 'webrtc': return alert('Native WebRTC errors.');
		default: return alert('Chua handle error: ' + error.type);
	}
});


jQuery('.text-body-sub').text(userId);
console.log('HELLO_WORLD', userId);