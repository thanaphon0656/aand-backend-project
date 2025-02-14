require("tsconfig-paths/register");

import App from "@/app";
import validateEnv from "@utils/validateEnv";
import recursiveDirectory from "node-recursive-directory";

validateEnv();

(async () => {
    const files = await recursiveDirectory(__dirname + "/controllers/", true);
    const app = new App(files.map((file) => file.fullpath));
    app.listen();
})();
