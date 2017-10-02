const jQuery = require('jquery');

function getICEResult(successCallback, errorCallback) {
	jQuery.ajax ({
		url: 'https://global.xirsys.net/_turn/Atomic/',
		type: 'PUT',
		async: false,
		headers: {'Authorization': 'Basic ' + btoa('xuanhieupd:729d9278-9da9-11e7-91a5-e05d16a81c23')},
		success: function (result){
			successCallback(result);
		}
	});
}

module.exports = getICEResult;