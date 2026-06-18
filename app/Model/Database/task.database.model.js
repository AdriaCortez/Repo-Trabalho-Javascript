import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },

    descricao: {
        type: String,
        default: ""
    },

    fixada: {
        type: Boolean,
        default: false
    },

    tags: [{
        type: String
    }],

    compartilhadaCom: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

    criadoPor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    criadoEm: {
        type: Date,
        default: Date.now
    }
});

export const Task = mongoose.model("Task", TaskSchema);