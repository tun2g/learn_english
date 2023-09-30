import mongoose, {Document} from "mongoose"

interface VocabDocument extends Document {
    userId: mongoose.Schema.Types.ObjectId,
    eng: String,
    vnese: [String],
    example: [String],
    note: String,
    type: [String],
    symonyms: [String]
}


const VocabSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        require: true,
    },
    eng:{
        type:String,
        require:true,
    },
    vnese:{
        type:[String],
        require:true,
    },
    example:{
        type:[String],
        default:[],
    },
    note:{
        type:String,
    },
    type:{
        type:[String],
        default:[],
    },
    synonyms:{
        type:[String],
        default:[]
    }   
}, { timestamps: true });



export default mongoose.model<VocabDocument>('vocabs', VocabSchema);
