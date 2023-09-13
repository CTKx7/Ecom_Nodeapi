import { getTokenFromHeader } from "../utils/getTokenFromHeader.js"
import { verifyToken } from "../utils/verifyToken.js"

export const isLoggedIn = (req, res, next)=>{
//get token headers
 const token = getTokenFromHeader(req)
//verify the token

const decodedUser = verifyToken(token)

if(!decodedUser){
throw new Error("Error Is: Invalid/Expired token ,Enter valid Token And login again");
}else{
    // save the user into req obj
    req.userAuthId = decodedUser?.id;
    next();
}

}