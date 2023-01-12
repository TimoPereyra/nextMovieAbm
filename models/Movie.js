import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Obligatorio ingresar titulo mi rey"]
    },
    plot:{
        type: String,
        required: [true, "Obligatorio ingresar plot pa"]
    }
});

export default mongoose.models.Movie || mongoose.model('Movie', MovieSchema);