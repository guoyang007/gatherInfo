import mongoose from './mongoose_config';
const {
  Schema
} = mongoose;

// verbs:  abandoned,answered,asked,attemted,attended,commented,completed,exited,experienced,failed,
//    imported,initialized,interacted,launched,mastered,passed,preferred,progressed,registered,resumed,satisfied,
//    scored,shared,suspended,terminated,voided,waived
const UserSchema = new Schema({
  id: Schema.Types.ObjectId,
  actor: {
    objectType: {
      type: String,
      default: "Agent"
    },
    mbox: {
      type: String,
      default: "mailto:123456@qq.com"
    }
  },
  verb: {
    id: String,
    display: {
      "en-GB": String
    }
  },
  // object:{
  //   objectType:"experienced",
  //   id:"http://www.gomolearning.com/xapi/activities/question/p40804i02s11a13",
  //   definition:{
  //     name:{
  //       "en-GB":"Part 9 | Questions 1~3"
  //     }
  //   }
  // }
  object: {
    objectType:{
      type:String,
      default:"Activity"
    },
    definition:{
      name:{
        "en-GB":String
      }
    },
    id:String
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', function (next) {
    this.verb.id = "http://adlnet.gov/expapi/verbs/"+this.get('verb.display["en-GB"]'); // considering _id is input by client
    next();
});

export default mongoose.model('userModel', UserSchema);