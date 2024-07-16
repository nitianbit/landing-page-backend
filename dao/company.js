import Company from '../models/companyModal.js'
export const checkorCreateCompany = async (websiteURL, companyName) => {
    let company = await Company.findOne({ websiteURL });

    if (company) {
        return company._id;
    }
    const newCompany = new Company({ websiteURL, companyName });
    company = await newCompany.save();
    return company?._id

}