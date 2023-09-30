import mongoose, {Document} from "mongoose";
import bcrypt from "bcrypt";

interface IUser {
    username: string;
    email: string;
    password: string;
    avatar: string; 
}

interface UserDocument extends IUser,Document {
    isRightPassword(password: string): Promise<boolean>;
}


const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
    },
    avatar:{
        type:String,
        default: ''
    },

}, { timestamps: true });

UserSchema.pre('save',async function(next){
    try{        
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(this.password!,salt)
        this.password=hashedPassword
        next();
    }
    catch (err){
        next();
    }
})

UserSchema.methods.isRightPassword=async function(password: string){
    try {
        return await bcrypt.compare(password,this.password)
    } catch (error) {
        return false;
    }
}


export default mongoose.model<UserDocument>('users', UserSchema);