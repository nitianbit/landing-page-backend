import axios from "axios"
export const now = () => Math.floor(Date.now() / 1000)


export const sendOtp = async (phone) => {
    const options = {
        method: 'POST',
        url: 'https://control.msg91.com/api/v5/otp',
        params: { otp_expiry: '', template_id: '', mobile: phone, authkey: '', realTimeResponse: '' },
        headers: { 'Content-Type': 'application/JSON' },
        data: '{\n  "Param1": "value1",\n  "Param2": "value2",\n  "Param3": "value3"\n}'
    };
    try {
        const { data } = await axios.request(options);
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const verifyOtp = async (otp, mobile) => {
    const options = {
        method: 'GET',
        url: 'https://control.msg91.com/api/v5/otp/verify',
        params: { otp: otp, mobile:mobile }
    };
    try {
        const { data } = await axios.request(options);
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}


// export const sendOtp = async (phone) => {
//     // http://smpp.valueleaf.com/generateOtp.jsp?userid=ADYLtran&key=57e454c874XX&mobileno=+919897848711&timetoalive=60
//     const response = await axios({
//         url: "http://smpp.valueleaf.com/generateOtp.jsp",
//         method: "GET",
//         params: {
//             userid: "ADYLtran",
//             key: "57e454c874XX",
//             mobileno: phone,
//             timetoalive: 300//5 minutes
//         }
//     })
//     return response?.data
//     //sample response { result: 'success', otpId: '492522' }
// }

// export const verifyOtp = async (phone, otp) => {
//     // http://smpp.valueleaf.com/validateOtpApi.jsp?mobileno=+919897848711&otp=872568 
//     const response = await axios({
//         url: "http://smpp.valueleaf.com/validateOtpApi.jsp?mobileno=+919897848711&otp=872568",
//         method: "GET",
//         params: {
//             mobileno: phone,
//             otp
//         },

//     })
//     return response?.data
//     //sample response { result: 'fail' }
// }

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

export const pagination = async (model, query, page, limit, filters = {}) => {
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
        data = { ...data, total };
    }
    return data;
}
// export const convertToCsv = (dataArray, form) => {

//     const fieldMap = form?.reduce((prev, cur) => {
//         if (!prev) prev = {}
//         prev[cur?._id] = cur?.label
//         return prev;
//     }, {})

//     const headers = Object.values(fieldMap)
//     const rows = dataArray.map(data => {
//         const extractedValues = {
//             'IP Address': data.ipAddress || '',
//             'Project Name': data?.projectId?.name || '-',
//             'Product Name': data?.refererId?.value || '-',
//             "Date":"",
//             "Time":""
//         };

//         data.values.forEach(value => {
//             if (fieldMap[value.fieldId]) {
//                 extractedValues[fieldMap[value.fieldId]] = value.value;
//             }
//         });

//         return headers.map(header => extractedValues[header] || '').join(',');
//     });

//     const csv = [headers.join(','), ...rows].join('\n');

//     return csv;
// }

function formatDate(date) {
    if (!date) return 'Date not available';
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  }

  function formatTime(date) {
    if (!date) return 'Time not available';
  
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${hours}:${minutes}:${seconds}`;
  }

export const convertToCsv = (dataArray, form) => {
    // Create a map from field `_id` to `label`
    const fieldMap = form.fields.reduce((prev, cur) => {
        prev[cur._id.toString()] = cur.label; // Ensure `_id` is a string
        return prev;
    }, {});

    // Generate CSV headers by extracting values from fieldMap
    const headers = [
        'IP Address',
        'Project Name',
        'Product Name',
        'Date',
        'Time',
        ...Object.values(fieldMap),
    ];

    // Generate CSV rows
    const rows = dataArray.map(data => {
        const extractedValues = {
            'IP Address': data.ipAddress || '',
            'Project Name': data?.projectId?.name || '-',
            'Product Name': data?.refererId?.value || '-',
            'Date': formatDate(data?.submittedAt), // Include logic if date information is available
            'Time': formatTime(data?.submittedAt), // Include logic if time information is available
        };

        // Map custom field values using fieldMap
        data.values.forEach(value => {
            if (fieldMap[value.fieldId]) {
                extractedValues[fieldMap[value.fieldId]] = value.value || '';
            }
        });

        // Construct the row string by mapping headers to values
        return headers.map(header => extractedValues[header] || '').join(',');
    });

    // Combine headers and rows into a single CSV string
    return [headers.join(','), ...rows].join('\n');
};
