var UserSchema = new Schema({
	phone_number: String,
  user_name:  String,
  display_name: String,
  rooms: [{ type:Schema.ObjectId, ref:"Room" }],
  room: [{ type:Schema.ObjectId, ref:"Room" }]
 	
});

