import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    email: String,
    preferredRoutes: [String],
    notificationSettings: {
        busArrival: { type: Boolean, default: true },
        delays: { type: Boolean, default: true },
        routeUpdates: { type: Boolean, default: false }
    },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);