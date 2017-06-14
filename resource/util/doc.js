function getEl(str){
	var firstStr = str.substring(0,1),
		el = '';
	switch(firstStr){
		case '#':
			el = document.getElementById(str.substring(1));
			break;
		case '.':
			el = document.getElementsByClassName(str.substring(1));
			break;
		default:
			el = document.getElementsByTagName(str);
	}

	return el;
}