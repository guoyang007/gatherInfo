import userModel from './userModel'
let dbFn = {
    add: function(instance) {
        return userModel.create(instance)
    }
}
export default dbFn
