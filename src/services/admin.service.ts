import MainService from "@services/main.service";

export default class AdminService extends MainService {
  constructor() {
    super();
  }

  public async createAdmin(data: any): Promise<[boolean, string]> {
    try {
      
      return [true, "Created admin successfully."];
    } catch (error: any) {
      throw error;
    }
  }
}
