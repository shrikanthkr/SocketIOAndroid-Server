var RoomSchema = new Schema({
	name: String,
  members: [ { type:Schema.ObjectId, ref:"User", childPath:"rooms" }],
  owner: { type:Schema.ObjectId, ref:"User", childPath:"room" }
 
});
Room =  Mongoose.model('Room', RoomSchema);

