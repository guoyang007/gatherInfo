import mongoose from './mongoose_config';
const { Schema } = mongoose;

const UserSchema = new Schema({
  id:String,
  basic: Schema.Types.Mixed,
  eventType:String,
	content:String,
  stay: String,
  createdAt : Date
});

UserSchema.pre('save', function (next) {
  var now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) this.createdAt = now;
  next();
});

export default mongoose.model('userModel', UserSchema);
