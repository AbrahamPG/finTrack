import { registerAs } from "@nestjs/config";



export default registerAs('auth', () => ({
  accessSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshSecret: process.env.REFRESH_TOKEN_SECRET,
}));