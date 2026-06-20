import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 100
    },

    descricao: {
        type: String,
        default: "",
        minLength: 1,
        maxLength: 1000
    },

    checklist: {
        type: [{
            texto: {
                type: String,
                required: true,
                minLength: 1,
                maxLength: 200
            },

            concluido: {
                type: Boolean,
                default: false
            }
        }],
        
        default: []
    },

    fixada: {
        type: Boolean,
        default: false
    },

    tag: [{
        type: String,
        required: false,
        minLength: 1
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

export const Tarefa = mongoose.model("Task", TaskSchema);