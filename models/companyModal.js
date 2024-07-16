import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
    name: { type: String, required: true },
    websiteURL: { type: String, required: true },
});

UserSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

export default mongoose.model("Company", CompanySchema);
