import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: [0, 1],
        default: 1,
    },
    adminOf: { type: mongoose.Schema.Types.ObjectId, ref: "Company" }
});

UserSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

export default mongoose.model("User", UserSchema);

export const USER_TYPE = {
    USER: 0,
    ADMIN: 1
}