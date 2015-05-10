var RoomSchema = new Schema({
	name: String,
  members: [ { type:Schema.ObjectId, ref:"User", childPath:"rooms" }],
  owner: { type:Schema.ObjectId, ref:"User"	},
  messages: [{ type:Schema.ObjectId, ref:"Message" }]
 
});
RoomSchema.plugin(Relationship, { relationshipPathName:'members' });
Room =  Mongoose.model('Room', RoomSchema);

