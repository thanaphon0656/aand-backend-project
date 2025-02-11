//model
import playerModel from "@/models/player.model";
import adminModel from "@/models/admin.model";

export default class MainService {
  public model: {
    player: typeof playerModel;
    admin: typeof adminModel;
  };

  constructor() {
    this.model = {
      player: playerModel,
      admin: adminModel
    };
  }

}
