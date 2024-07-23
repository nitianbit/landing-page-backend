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

export const unGroupForm = (form) => {
    return {
        ...form,
        fields: form.fields.map(fieldItem => {
            if (fieldItem.field) {
                const { field, ...rest } = fieldItem;
                const flattenedField = {};
                for (const key in field) {
                    flattenedField[`field_${key}`] = field[key];
                }
                return {
                    ...rest,
                    ...flattenedField
                };
            } else {
                const { field, ...rest } = fieldItem;
                return rest;
            }
        })
    };
}

export const groupForm = (form) => {
    return {
        ...form,
        fields: form.fields.map(fieldItem => {
            const nestedField = {};
            const rest = {};
            for (const key in fieldItem) {
                if (key.startsWith('field_')) {
                    nestedField[key.slice(6)] = fieldItem[key];
                } else {
                    rest[key] = fieldItem[key];
                }
            }
            if (Object.keys(nestedField).length > 0) {
                return {
                    ...rest,
                    field: nestedField
                };
            } else {
                return {
                    ...rest,
                    field: null
                };
            }
        })
    };
}

export const unGroupFormData = (forms) => {
    return forms.map(form => {
        return unGroupForm(form)
    });
}

export const groupFormData = (forms) => {
    return forms.map(form => {
        return groupForm(form)
    });
}
