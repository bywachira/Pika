import nodeHTMLToImage from "node-html-to-image";
import SpacesService from "./spaces.service";

export default class HTMLImageService {
    private html: string;
    private css: string;
    private fileType: string;
    private headContent: string;

    constructor(html: string, css: string, headContent: string, fileType: string) {
        this.html = html;
        this.css = css;
        this.fileType = fileType
        this.headContent = headContent
    }

    public combinedString(): string {
        const html = `
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title></title>
            ${this.headContent}
            <style>
            ${this.css}
            </style>
        </head>
        <body style="width:fit-content;">
            ${this.html}
        </body>
        `

        return html;
    }

    public async generateFromHTML() {
        try {
            const image = await this.generateImage();

            let imageData: {
                image: string | Buffer | (string | Buffer)[];
                type: string;
                extension: string;
            } = {
                image,
                type: "",
                extension: ""
            }

            switch (this.fileType) {
                case "png":
                    imageData = {
                        image,
                        type: "image/png",
                        extension: "png"
                    }
                    break;
                case "jpg":
                    imageData = {
                        image,
                        type: "image/jpg",
                        extension: "jpg"
                    }
                    break;
                case 'webp':
                    imageData = {
                        image,
                        type: "image/webp",
                        extension: "webp"
                    }
                    break;
                case "avif":
                    imageData = {
                        image,
                        type: "image/avif",
                        extension: "avif"
                    }
                    break;
            }

            const UPLOAD_DATA = new SpacesService().uploadToBucket(imageData.image, imageData.type, imageData.extension, true)

            return UPLOAD_DATA;
        } catch (error) {
            throw error;
        }
    }

    public async generateImage(): Promise<string | Buffer | (string | Buffer)[]> {
        const image = await nodeHTMLToImage({
            html: this.combinedString(),
        });

        return image;
    }
}