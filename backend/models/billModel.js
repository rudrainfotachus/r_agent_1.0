// Bills schema for Product Recovery Agent 



import mongoose from 'mongoose'



const commentSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      comment: { type: String, required: true },
      dateTime: {type: String, required:true}
    },
    {
      timestamps: true,
    }
  );

const billSchema = new mongoose.Schema({
    billID:{type:String,require:false},
    customerName:{type:String, require:true},
    contact:{type:String, require:false},
    billImage:{type:String, require:false },
    totalAmount:{type:String, require:true },
    address:{type: String, require:true},
    itemDesc:{type:String, require:false},
    description:{type:String, require:true },
    date:{type:String, require:true},
    type:{type:String,require:false},
    pendingAmount:{type:String,require:false},
    due:{type:String,require:true},
    dueDate:{type:Date,require:false},
    receivedAmount:{type:String, require:true },
    comments:[commentSchema],
   
},{
timestamps:true
})

const Bill = mongoose.model('Bill', billSchema) ;

export default Bill;