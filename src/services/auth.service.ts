import PlayerService from "./../services/player.service";
import { LoginPlayerWithProviderDto } from "./../dtos/auth.dto";
import { Player, PlayerLoginReshape } from "../interfaces/player.interface";
import jwt from "jsonwebtoken";
import { isEmpty, isValidEmail } from "./../utils/util";

export class AuthService {
  private playerService = new PlayerService();
  private socialProvider = { google: "google_access_token", facebook: "facebook_access_token", apple: "apple_access_token" };

  public async loginWithProvider(
    player_data: LoginPlayerWithProviderDto
  ): Promise<{ cookie: string; player: PlayerLoginReshape; token_data: object } | { status: false; message: string }> {
    
    if (!isValidEmail(player_data.email)) return { status: false, message: "Invalid email format" };
    if (isEmpty(player_data)) return { status: false, message: "Invalid player data" };

    const providerKey = this.socialProvider[player_data.provider_name];
    if (!providerKey) return { status: false, message: "Provider name not found" };

    if (!player_data.provider_access_token) return { status: false, message: "Provider access token required" };

    const existingPlayer = await this.playerService.findPlayerByEmail(player_data.email);

    if (existingPlayer) {
      if (existingPlayer[providerKey] && existingPlayer[providerKey] !== player_data.provider_access_token) {
        return { status: false, message: `Your email ${player_data.email} is already linked with ${player_data.provider_name}` };
      }

      if (!existingPlayer[providerKey]) {
        existingPlayer[providerKey] = player_data.provider_access_token;
        await existingPlayer.save();
      }
    } else {
      await this.playerService.createPlayerByProvider({
        ...player_data,
        username: player_data.email.split("@")[0],
        [providerKey]: player_data.provider_access_token,
      });
    }

    const player = await this.playerService.findPlayerByEmail(player_data.email, false);
    const playerReshape = this.playerService.reshapePlayerLoginData(player);
    const token_data = this.createToken(player);
    const cookie = this.createCookie(token_data);
    return { cookie, player: playerReshape, token_data };
  }

  private createToken(player: Player) {
    return jwt.sign({ playerId: player._id }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
  }

  private createCookie(token: string) {
    return `Authorization=${token}; HttpOnly; Max-Age=${7 * 24 * 60 * 60}`;
  }
}
