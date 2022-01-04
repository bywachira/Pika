import QRCode from "qrcode";
import { createCanvas, loadImage, CanvasRenderingContext2D, Image } from "canvas";
import { IQrOptions } from "../interfaces";
import SpacesService from "./spaces.service";

export default class QRGeneratorService {
    private qrOptions: IQrOptions;
    private text: string;

    constructor(text: string, options: IQrOptions) {
        this.qrOptions = options;
        this.text = text;
    }

    public async generateQRCode() {
        try {
            const initQR = await this.qrGenerator();

            const UPLOAD_DATA = new SpacesService().uploadToBucket(initQR, "image/png", "jpg", true)

            return UPLOAD_DATA;
        } catch (error: any) {
            console.log(error)
            throw {
                ...error
            }
        }
    }

    public async qrGenerator() {
        const canvas = createCanvas(150, 150);
        const ctx = canvas.getContext("2d");


        const WIDTH = this.qrOptions.size || 720

        await QRCode.toCanvas(canvas, this.text, {
            margin: 1,
            color: {
                dark: this.qrOptions.color || "#000000",
                light: this.qrOptions.background || "#ffffff"
            },
            width: WIDTH
        })


        if (this.qrOptions.logo) {
            // ctx.save()
            const LOGO_SIZE = this.qrOptions.logo_size || 120;
            const image = await loadImage(this.qrOptions.logo);
            // ctx.beginPath()
            // ctx.arc(WIDTH / 2, WIDTH / 2, 75, 0, 2 * Math.PI)
            const IMAGE_POSITION = (WIDTH / 2) - (LOGO_SIZE / 2);

            let x = IMAGE_POSITION;
            let y = IMAGE_POSITION;
            let radius = 12;

            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + LOGO_SIZE - radius, y);
            ctx.quadraticCurveTo(x + LOGO_SIZE, y, x + LOGO_SIZE, y + radius);
            ctx.lineTo(x + LOGO_SIZE, y + LOGO_SIZE - radius);
            ctx.quadraticCurveTo(x + LOGO_SIZE, y + LOGO_SIZE, x + LOGO_SIZE - radius, y + LOGO_SIZE);
            ctx.lineTo(x + radius, y + LOGO_SIZE);
            ctx.quadraticCurveTo(x, y + LOGO_SIZE, x, y + LOGO_SIZE - radius);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
            ctx.closePath();

            ctx.clip()

            // ctx.strokeStyle = "rgb(255, 0, 0)";
            // ctx.fillStyle = "rgba(255, 255, 0, .5)";
            // this.roundRect(ctx, 5, 5, LOGO_SIZE, LOGO_SIZE, 20)
            // ctx.clip()
            // ctx.fill();
            // ctx.drawImage(image, 0, 0)
            ctx.drawImage(image, IMAGE_POSITION, IMAGE_POSITION, LOGO_SIZE, LOGO_SIZE)
            // ctx.restore()
        }

        return canvas.toBuffer("image/png")
    }

    private roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();

        // ctx.fill()
        // stroke && ctx.stroke()
    }
}