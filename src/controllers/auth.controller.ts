import { Post, Body, Res, UseBefore, Controller } from "routing-controllers";
import { Response } from "express";
import validationMiddleware from "./../middlewares/validation.middleware";
import { LoginPlayerWithProviderDto } from "./../dtos/player.dto";
import { AuthService } from "./../services/auth.service";

@Controller("/login-with-provider")
export default class AuthController {
  private authService = new AuthService();

  @Post("/")
  @UseBefore(validationMiddleware(LoginPlayerWithProviderDto, "body"))
  async logInWithProvider(
    @Body() player_data: LoginPlayerWithProviderDto,
    @Res() res: Response
  ) {
    const result = await this.authService.loginWithProvider(player_data);

    if ("status" in result && result.status === false) {
      return res.status(200).json({ status: false, message: result.message });
    }

    const { cookie, player, token_data }: any = result;
    res.setHeader("Set-Cookie", [cookie]);
    return res.json({ data: player, message: "Login successful", token: token_data });
  }
}
