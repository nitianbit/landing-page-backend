import axios from "axios"

export const now = () => Math.floor(Date.now() / 1000)

export const sendOtp = async (phone) => {
    // http://smpp.valueleaf.com/generateOtp.jsp?userid=ADYLtran&key=57e454c874XX&mobileno=+919897848711&timetoalive=60
    const response = await axios({
        url: "http://smpp.valueleaf.com/generateOtp.jsp",
        method: "GET",
        params: {
            userid: "ADYLtran",
            key: "57e454c874XX",
            mobileno: phone,
            timetoalive: 300//5 minutes
        }
    })
    return response?.data
    //sample response { result: 'success', otpId: '492522' }
}

export const verifyOtp = async (phone, otp) => {
    // http://smpp.valueleaf.com/validateOtpApi.jsp?mobileno=+919897848711&otp=872568 
    const response = await axios({
        url: "http://smpp.valueleaf.com/validateOtpApi.jsp?mobileno=+919897848711&otp=872568",
        method: "GET",
        params: {
            mobileno: phone,
            otp
        },

    })
    return response?.data
    //sample response { result: 'fail' }
}

export const sendResponse = (res, statusCode, message, data = null) => {
    return res.status(statusCode).json({
        success: statusCode >= 200 && statusCode < 300,
        message: message,
        data: data
    });
}



// export const convertToCsv=(dataArray)=> {

//     const headers = ['Name', 'Email', 'Property Type', 'Mobile No', 'IP Address'];

//     const rows = dataArray.map(data => {
//         const name = data?.values?.[0]?.value || '';
//         const email = data?.values?.[1]?.value || '';
//         const propertyType = data?.values?.[2]?.value || '';
//         const mobileNo = data?.values?.[3]?.value || '';
//         const ipAddress = data?.ipAddress || '';
        
//         return [name, email, propertyType, mobileNo, ipAddress].join(',');
//     });

//     const csv = [headers.join(','), ...rows].join('\n');
//     return csv;
//   }

export const pagination = async (model ,query, page, limit, filters = {}) => {
    //if page ==-1 return all users else pagination
     if (page !== -1) {
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);
    }
    let data = {
        rows: await query.lean()
    }

    if (page == 1) {
        const total = await model.countDocuments(filters);
        data = { data, total };
    }
    return data;
}
export const convertToCsv= (dataArray, fields)=> {
 
        // const fieldMap = {
        //     '6696c938133873a9dbd3fa8c': 'Name',
        //     '6696cdc6133873a9dbd3fa93': 'Email',
        //     '6696d308133873a9dbd3fb46': 'Property Type',
        //     '6696d3c5133873a9dbd3fb8b': 'Mobile No'
        // };

        // const fields = await Fields.find({ companyId: req.user.adminOf });
        const fieldMap = fields?.reduce((prev, cur)=>{
            if(!prev) prev = {}
            prev[cur?._id] = cur?.label
            return prev;
        },{})

    
         const headers = ['Name', 'Email', 'Property Type', 'Mobile No', 'IP Address','Project Name','Product Name'];    
         const rows = dataArray.map(data => {
             const extractedValues = {
                'Name': '',
                'Email': '',
                'Property Type': '',
                'Mobile No': '',
                'IP Address': data.ipAddress || '',
                'Project Name': data?.projectId?.name || '-',
                'Product Name': data?.refererId?.value || '-'
            };
    
             data.values.forEach(value => {
                if (fieldMap[value.fieldId]) {
                    extractedValues[fieldMap[value.fieldId]] = value.value;
                }
            });
    
             return headers.map(header => extractedValues[header] || '').join(',');
        });
    
         const csv = [headers.join(','), ...rows].join('\n');
    
        return csv;
    }

