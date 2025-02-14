import MainService from "./../services/main.service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "./../config"; // นำเข้า Secret Key

export default class AdminService extends MainService {
  constructor() {
    super();
  }

  public async createAdmin(data: any): Promise<[boolean, string]> {
    try {
      const existingAdmin = await this.model.admin.findOne({ email: data.email });
      if (existingAdmin) {
        return [false, "Email is already registered"];
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);

      const newAdmin = new this.model.admin({
        username: data.username,
        email: data.email,
        password: hashedPassword,
        role: data.role
      });

      await newAdmin.save();
      return [true, "Created admin successfully."];
    } catch (error: any) {
      throw error;
    }
  }

  public async loginAdmin(email: string, password: string): Promise<{
    success: boolean;
    message: string;
    data?: any;
    token?: {
      token: string;
      expires_in: number;
    };
    cookie?: string;
  }> {
    try {
      const admin = await this.model.admin.findOne({ email });
      if (!admin) {
        return { success: false, message: "Admin not found" };
      }

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return { success: false, message: "Invalid credentials" };
      }

      const expiresIn = 3 * 60 * 60; // 10800 sec (3 hr)
      const token = jwt.sign({ _id: admin._id }, SECRET_KEY, { expiresIn });

      const cookie = `Authorization=${token}; HttpOnly; Path=/; Max-Age=${expiresIn}; Secure=${process.env.NODE_ENV === "development"}; SameSite=Strict`;

      return {
        success: true,
        message: "login",
        data: {
          _id: admin._id,
          username: admin.username,
          email: admin.email
        },
        token: { token, expires_in: expiresIn },
        cookie
      };
    } catch (error) {
      throw new Error("Login failed");
    }
  }

  public async getAllAdmins(): Promise<[boolean, any]> {
    try {
      const admins = await this.model.admin.find({}, "-password");
      return [true, admins];
    } catch (error) {
      throw new Error("Failed to fetch admins");
    }
  }

  public async getAdminDetail(admin_id: string): Promise<[boolean, any]> {
    try {
      const admin = await this.model.admin.findById(admin_id).select({ username: 1, email: 1, role: 1, created_at: 1 });

      if (!admin) {
        return [false, 'admin id not found'];
      }

      return [true, admin];
    } catch (error) {
      throw new Error("Failed to fetch admin details");
    }
  }

  public async deleteAdmin(id: string): Promise<[boolean, string]> {
    try {
      const admin = await this.model.admin.findById(id);
      if (!admin) {
        return [false, "Admin not found, unable to delete."];
      }

      await this.model.admin.findByIdAndDelete(id);

      return [true, "Admin deleted successfully."];

    } catch (error) {
      throw new Error("Failed to delete admin.");
    }
  };
}



