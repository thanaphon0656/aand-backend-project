require("tsconfig-paths/register");

import App from "./app";
import validateEnv from "./utils/validateEnv";
import recursiveDirectory from "node-recursive-directory";

validateEnv();

(async () => {
    try {
        const files = await recursiveDirectory(__dirname + "/controllers/", true);
        const app = new App(files.map((file) => file.fullpath));
        app.listen();
    } catch (error) {
        console.error("🔥 Server initialization failed:", error);
    }
})();
