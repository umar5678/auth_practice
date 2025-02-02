import dotenv from "dotenv"
dotenv.config()

const handleSocialLogin = async (req, res) => {
  console.log("handle social login run");
  console.log("user: ", req.user);

  res.redirect(`${process.env.CLIENT_SSO_REDIRECT_URL}`);
};

export { handleSocialLogin };
