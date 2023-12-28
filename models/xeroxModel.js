import mongoose from "mongoose";

const xeroxSchema = new mongoose.Schema(
  {  
    pdf: {
        data: Buffer,
        contentType: String,
      },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    // status: {
    //   type: String,
    //   default: "Not Process",
    //   enum: ["Not Process", "Processing", "Shipping", "Delivered", "Cancelled"],
    // },
    description: {
        type: String,
        
      },
      location: {
        type: String,
        required: true,
      },
      filename: {
        type: String,
        required: true,
      },
      copies: {
        type: Number,
        required: true,
      },
      page_count:{
        type:Number,
        // required:true
      }
  },
  { timestamps: true }
);

export default mongoose.model("Xerox", xeroxSchema);
