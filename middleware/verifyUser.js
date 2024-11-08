import jwt from 'jsonwebtoken'

export const verifyUser = (req,res,next) => {
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).json({ message: 'unauthorize' });
    }
    
    try {

        const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user = decode;
        next();
        
    } catch (error) {
        if (!token) {
            return res.status(401).json({ message: 'something went wrong' });
        }
    }
}

