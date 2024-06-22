export const handleUTMParameters = (req, res, next) => {
    const utm = {};
    Object.keys(req.query).forEach(key => {
        if (key.startsWith('utm_')) {
            utm[key] = req.query[key];
        }
    });
    req.utm = utm;
    next();
};
