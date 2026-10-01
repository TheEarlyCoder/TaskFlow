import { User } from "../models/user.models.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;
  console.log("Backend received:", req.body);
  if (!fullName?.trim() || !email?.trim() || !password?.trim()) throw new ApiError(400, "All fields are required!");
  const existingUser = await User.findOne({ email: email });
  if (existingUser) throw new ApiError(409, "User with email already exists!");
  const user = await User.create({
        fullName: fullName,
        email: email,
        password: password
    });

    const createdUser = await User.findById(user._id).select("-password")
    if(!createdUser) throw new ApiError(500, "User could not be registered")
    return res
    .status(201)
    .json({
        success: true,
        message: "User Registered Successfully",
        user: createdUser
    })
});

const loginUser = asyncHandler(async(req, res)=> {
    const {email, password} = req.body
    if (!password?.trim()) throw new ApiError(400, "Password is required!");
    const user = await User.findOne({email})
    if(!user) throw new ApiError(401,"User doesn't exist")
    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid) throw new ApiError(401, "Incorrect Password")
    const accessToken = await user.generateAccessToken()
    const loggedInUser = await User.findById(user._id).select("-password");
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
    }
    return res
    .status(200)
    .cookie("accessToken", accessToken, {...options, maxAge: 24 * 60 * 60 * 1000})
    .json({
        success: true,
        message: "User Logged In Successfully",
        user: loggedInUser
    })
})

const getCurrentUser = asyncHandler(async(req, res) => {
    return res
    .status(200)
    .json(
        {
            success: true,
            message: "Current user fetched successfully",
            user: req.user
        }
    )
})

const logoutUser = asyncHandler(async(req, res)=> {
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(
        {
            success: true,
            message: "User logged out successfully",
        }
    )
})

export {
    registerUser,
    loginUser,
    getCurrentUser,
    logoutUser
}
