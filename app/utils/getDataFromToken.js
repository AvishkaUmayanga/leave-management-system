import jwt from 'jsonwebtoken';

export const getDataFromToken = (req) => {
    try{
        const token = req.cookies.get('token')?.value || '';
        if (!token) {
            throw new Error("Token not provided");
          }
        const decodeToken = jwt.verify(token, process.env.NEXTAUTH_SECRET);
        return decodeToken.id;
    }
    catch(error){
        console.log(error);
        throw new Error(error.message);
    }
}