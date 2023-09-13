export const getTokenFromHeader = (req)=>{
   //get Token from headers
const token = req.headers?.authorization?.split(" ")[1];
//console.log(token)
if(token === undefined){
    return 'No Token Found In The Header';
}else{
    return token;
}
}