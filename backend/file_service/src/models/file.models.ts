import mongoose from "mongoose";

const schema = mongoose.Schema;

const fileSchema = new schema({
    name: {
        type: String,
        require: true
    },
    format: {
        type: String,
        require: true
    },
    size: {
        type: Number,
        require: true
    },
    owner: {
        type: String,
        require: true
    }
}, {timestamps: true});

export const File = mongoose.model("File", fileSchema);