import * as express from "express";
import axios from "axios";
import {NextFunction, Request, Response} from "express";

const {API_KEY, allowedOrigins} = require("./config.json");
const fontsApi = `https://www.googleapis.com/webfonts/v1/webfonts?sort=alpha&key=${API_KEY}`;
const app = express();

// Middleware: Handle CORS
app.use((req: Request, res: Response, next: NextFunction) => {

    const origin = req.header("origin") || "NONE";

    if (allowedOrigins.some((allowed: string) => origin === allowed)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        next();
    } else {
        res.sendStatus(403);
    }
});


// Route: Serve font list
let cached: any[];
app.get("/fonts", async (req: Request, res: Response) => {

    console.log("GET /fonts");

    if (cached) {
        console.log("from Cache");
        res.contentType("application/json");
        res.send(cached);
        return;
    }

    const response = await axios.get(fontsApi);

    if (response.status === 200) {
        const json = response.data;

        // only fonts that have a regular weight/type
        const fonts = json.items.filter((font: any) => !!font.files["regular"]);
        cached = fonts;

        res.contentType("application/json");
        res.send(fonts);
    } else {
        res.send(response.statusText);
    }
});


app.listen(3000);
