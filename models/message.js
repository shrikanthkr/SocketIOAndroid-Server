var MessageSchema = new Schema({
	message:  {type: String,  
		validate: [Validations.validatePresenceOf, "Enter a valid message"], 
		required: true
	},
	room: { type:Schema.ObjectId, ref:"Room", childPath:"messages" },
	to:  String,
	from:  String
});
MessageSchema.plugin(Relationship, { relationshipPathName:'room' });
Message =  Mongoose.model('Message', MessageSchema);