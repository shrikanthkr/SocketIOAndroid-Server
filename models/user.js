var UserSchema = new Schema({
	phone_number:  {type: String,  
		validate: [Validations.validatePresenceOf, "Phone Number Required"], 
		required: true
	},
	user_name:  {type: String,  
		validate: [Validations.validatePresenceOf, "User Name Required"], 
		required: true,
		index: {unique: true} 
	},
	password:  String, 
	display_name: String,
	rooms: [{ type:Schema.ObjectId, ref:"Room" }],
	room: [{ type:Schema.ObjectId, ref:"Room" }]

});

User =  Mongoose.model('User', UserSchema);

User.schema.path('user_name').validate(function (value) {
	return /^\w{1,}$/i.test(value);
}, 'Invalid user name');

User.schema.path('phone_number').validate(function (value) {
	console.log(/^\d{10}$/.test(value));
	return /^\d{10}$/.test(value);
}, 'Invalid phone number');


