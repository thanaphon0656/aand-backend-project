import { Controller, Get } from "routing-controllers";

@Controller("/admin")
export default class AdminIndexController {
  @Get("/")
  index() {
    return "ADMIN OK";
  }
}
