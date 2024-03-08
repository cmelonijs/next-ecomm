import { genSalt, hash } from 'bcrypt';
import { Document, Model, Schema, model, models } from 'mongoose';

interface UserDocument extends Document {
    email: string;
    password: string;
    name: string;
    role: "admin" | "user";
    avatar: {url: string, id: string};
    verified: boolean;
}

const UserSchema = new Schema<UserDocument>({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true, trim: true},
    role: {type: String, enum: ['admin', 'user'], default: 'user'},
    avatar: {type: Object, url: String, id: String},
    verified: {type: Boolean, default: false}
}, {timestamps: true})

UserSchema.pre("save", async function (next) {
    try {
        if(!this.isModified("password")) return next();
        const salt = await genSalt(12)
        this.password = await hash(this.password, salt);
        next()
    } catch (err) {
        console.log('err', err)
    }
})

const UserModel = models.User || model('User', UserSchema);

export default UserModel as Model<UserDocument>;
