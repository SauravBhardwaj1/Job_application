const jwt = require('jsonwebtoken');
const errorResponse = require('../utils/errorResponse');
require('dotenv').config



exports.protect = async(req,res, next)=>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token){
        return next(new errorResponse('Not authorized to access this route', 401))
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await User.findById(decoded.id)

        next()
    } catch (error) {
        return next(new errorResponse('Not authorized to access this route', 401))
    }
}

exports.authorize = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(new ErrorResponse(`User role ${req.user.role} is not authorized to access this route`, 403));
      }
      next();
    };
  };