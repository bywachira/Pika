import axios from "axios";
import config from "../config";

export default class FontService {
    public async getFonts() {
        const response = await axios.get(`https://www.googleapis.com/webfonts/v1/webfonts?key=${config.google.fonts}`)

        const fonts = response.data.items;

        return fonts;
    }
}