//model
import playerModel from "./../models/player.model";
import adminModel from "./../models/admin.model";
import gamesModel from "./../models/games.model";

export default class MainService {
  public model: {
    player: typeof playerModel;
    admin: typeof adminModel;
    games: typeof gamesModel;
  };

  constructor() {
    this.model = {
      player: playerModel,
      admin: adminModel,
      games: gamesModel
    };
  }

}
