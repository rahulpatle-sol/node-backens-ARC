import jwt from 'jsonwebtoken';

import User from '../models/userModel.js';

const  ptotect=async (req, res, next) => {

    // headere  

    const header = req.headers.authorization;
    if(!header || !header.startsWith('Bearer ')){
        return res.status(401).json({ message: 'Unauthorized' });
    }
 try{
    const  token=header.split(' ')[1];
    const decoded=jwt.verify(token, process.env.JWT_SECRET);
    const user=await User.findById(decoded.id).select('-password');
    req.user=user;
    next();
 } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
 }
}

export default ptotect;
