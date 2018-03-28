import userModel from './userModel'
let dbFn = {
    add: function(instance) {
        return userModel.create(instance)
    },
    get: function(id) {
        //id==0, get lists
        if (id==0) {
            return userModel.find({}).lean().exec()
        }else{
            return userModel.findOne({ id: id }).lean().exec()
        }
        
    },
    del: function(id) {
        if (id) {
            return userModel.remove({ id: id })
        }else{
            return userModel.remove({},(err)=>{
                throw new Error(err);
            })
        }
    },
    edit: function(data) {
        return userModel.findOneAndUpdate({ id: data.id }, {
            $set: {
                content: data.content
            }
        }, {}, function() {
            console.log('update done')
        })
    },
    // automatically add or edit
    update: function(data) {
        let userId = data.id;
        userModel.count({ id: userId }, function(err, count) {
            if (err) {
                throw new Error(err)
            }
            if (count > 0) {
                userModel.findOneAndUpdate({ id: userId }, {
                    $set: {
                        content: data.content
                    }
                }, {}, function() {
                    console.log('update done')
                })
            } else {
                userModel.create(data)
            }
        })
    }
}
export default dbFn
