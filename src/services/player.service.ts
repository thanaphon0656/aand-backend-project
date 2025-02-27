import MainService from "./../services/main.service";
import { Player } from "../interfaces/player.interface";

export default class PlayerService extends MainService {
  constructor() {
    super();
  }

  async findPlayerByEmail(email: string, selectPassword: boolean = true): Promise<Player | null> {
    return selectPassword
      ? this.model.player.findOne({ email })
      : this.model.player.findOne({ email }).select("-password");
  }

  async createPlayerByProvider(playerData: Partial<Player>): Promise<Player> {
    const newPlayer = new this.model.player(playerData);
    return await newPlayer.save();
  }

  reshapePlayerLoginData(player: Player) {
    return {
      _id: player._id,
      email: player.email,
      username: player.username
    };
  }
}
