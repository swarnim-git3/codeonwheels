import mongoose from "mongoose";

const routeSchema = new mongoose.Schema({
    routeId: { type: String, required: true, unique: true },
    routeName: { type: String, required: true },
    stops: [{
        stopId: String,
        stopName: String,
        coordinates: [Number, Number], // [longitude, latitude]
        estimatedTime: Number,
        order: Number
    }],
    frequency: { type: Number, default: 15 },
    operatingHours: {
        start: String,
        end: String
    },
    isActive: { type: Boolean, default: true }
});

export default mongoose.model("Route", routeSchema);