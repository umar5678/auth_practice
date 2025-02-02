import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId) => {
  const user = await User.findById(userId);

  if (!user) throw new ApiError(404, "User not found");

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

const login = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found");

  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Incorrect email or password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  res
    .status(200)
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    })
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken },
        "Log in success"
      )
    );
});

const signup = AsyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (![firstName, lastName, email, password].every((field) => field?.trim())) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  const user = await User.create({ firstName, lastName, email, password });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { user: createdUser },
        "User registered successfully"
      )
    );
});

const logout = AsyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { refreshToken: "" });

  res
    .status(200)
    .clearCookie("refreshToken", { httpOnly: true })
    .json(new ApiResponse(200, {}, "User logged out"));
});

const refreshAccessToken = AsyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request, please login again");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const user = await User.findById(decodedToken._id);

    if (!user || incomingRefreshToken !== user.refreshToken) {
      throw new ApiError(
        401,
        "Invalid or expired refresh token, please login again"
      );
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id);

    res
      .status(200)
      .cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      })
      .json(new ApiResponse(200, { accessToken }, "Access token refreshed"));
  } catch (error) {
    throw new ApiError(401, error.message || "Invalid refresh token");
  }
});

const handleSocialLogin = AsyncHandler(async (req, res) => {
  console.log("triggered handleSocialLogin");
  const user = await User.findById(req.user?._id)
  if(!user) throw new ApiError(404, "user not found")
  
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );
 
const loggedInUser = await User.findById(user._id).select(
  "-password -refreshToken"
);
  
  res
    .status(301)
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    })
    .redirect(`${process.env.SSO_CLIENT_REDIRECT_URL}`);
  
} )

export { login, signup, logout, refreshAccessToken, handleSocialLogin };
