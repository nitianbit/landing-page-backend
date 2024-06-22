export const fetchIPAddress = (req, res, next) => {
    let ip = req.headers['x-forwarded-for'] || req?.socket?.remoteAddress;

    if (ip === '::1') {
        ip = '127.0.0.1';
    }

    req.clientIp = ip;
    next();
};
