Validations = {
	validatePresenceOf : function  (value) { 
		if(typeof value === 'string' || typeof value === 'number') { 
			value = value.toString().trim(); 
		} 
	}
}