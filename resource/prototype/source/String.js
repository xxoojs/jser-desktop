String.prototype.replaceAll = function(str, targetStr){
	// var regExp = new RegExp(str, 'g');
	// return this.replace(regExp, targetStr);
	var result = this;
	while(result.indexOf(str) != '-1'){
		result = result.replace(str, targetStr);
	}

	return result;
}