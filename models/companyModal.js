import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    websiteURL: { type: String, required: true },
});


export default mongoose.model("Company", CompanySchema);
