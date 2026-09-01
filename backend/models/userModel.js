const mongoose  = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username : {
        type: String,
        required: true,
        unique: true,
    },
    email : {
        type:String,
        required: true,
        unique: true,
    },
    password : {
        type:String
    },
    repositories : [
        {
            default: [],
            type: Schema.Types.ObjectId,
            ref : "User",
        }
    ],

    startRepos : [
        {
            default: [],
            type: Schema.Types.ObjectId,
            ref : "repositories",
        }
    ],
});

const User = mongoose.model("User", UserSchema);

export default User;