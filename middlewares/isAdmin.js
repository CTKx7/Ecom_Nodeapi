import userModel from "../model/User.js";

const isAdmin = async (req, res, next) => {
  //find the login user
  const user = await userModel.findById(req.userAuthId);
  //check isAdmin
  if (user.isAdmin) {
    next();
  } else {
    next(new Error("Acess Denied, Admin Only"));
  }
};

export default isAdmin;
