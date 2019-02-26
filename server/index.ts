import * as express from "express";
import axios from "axios";
import {NextFunction, Request, Response} from "express";

const {API_KEY} = require("./config.json");
const fontsApi = `https://www.googleapis.com/webfonts/v1/webfonts?sort=alpha&key=${API_KEY}`;
const app = express();

// Middleware: Handle CORS
app.use((req: Request, res: Response, next: NextFunction) => {

    const origin = req.header("origin") || "NONE";
    res.setHeader("Access-Control-Allow-Origin", origin);
});


// Route: Serve font list
app.get("/fonts", async (req: Request, res: Response) => {

    console.log("GET /fonts");

    const response = await axios.get(fontsApi);

    if (response.status === 200) {
        const json = response.data;

        // only fonts that have a regular weight/type
        const fonts = json.items.filter((font: any) => !!font.files["regular"]);

        res.contentType("application/json");
        res.send(fonts);
    } else {
        res.send(response.statusText);
    }
});


app.listen(3000);
