var Helper = {
	trimLeft: function(char, str) {
		return (str.slice(0, char.length) === char) ? Helper.trimLeft(char, str.slice(char.length)) : str;
	},
	trimRight: function(char, str) {
		return (str.slice(str.length - char.length) === char) ? Helper.trimRight(char, str.slice(0, 0 - char.length)) : str;
	}
}

module.exports = Helper;