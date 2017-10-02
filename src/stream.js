const Stream = {
	open: function(constrants, successCallback, errorCallback) {
		navigator.mediaDevices.getUserMedia(constrants)
		.then(stream => {
			successCallback(stream);
		})
		.catch(err => console.log(err));
	},
	play: function(stream, videoId) {
		const video = document.getElementById(videoId);
		video.style.background = 'none';
		video.srcObject = stream;
		video.onloadedmetadata = function () { video.play(); };
	}
}

module.exports = Stream;