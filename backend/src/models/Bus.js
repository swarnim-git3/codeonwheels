import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
    busId: { type: String, required: true, unique: true },
    routeId: { type: String, required: true },
    currentLocation: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        timestamp: { type: Date, default: Date.now }
    },
    capacity: { type: Number, default: 50 },
    currentPassengers: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    speed: { type: Number, default: 0 },
    heading: { type: Number, default: 0 }
});


export default mongoose.model("Bus", busSchema);