function ishit(target, el){
	if(target && el){
		var tRect = target.getBoundingClientRect(),
			eRect = el.getBoundingClientRect();
		
		return (eRect.left + 10) < tRect.right;
	}else{
		console.log('请确认ishit传参数！');
	}
}