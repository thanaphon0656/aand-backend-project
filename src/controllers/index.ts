import { Controller, Get } from "routing-controllers";

@Controller()
export default class IndexController {
  @Get("/")
  index() {
    return "OK";
  }
}
