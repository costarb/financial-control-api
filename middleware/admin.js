module.exports = function(req, res, next){
    if (!req.user.isAdmin) return res.status(403).send('Access denied. Not access granted to access this feature.');
    next();
}