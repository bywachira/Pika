import { AwesomeQR as QRGenerator } from "awesome-qr";
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
            const options: any = this.qrOptions;
            const initQR = await new QRGenerator({
                text: this.text,
                ...options
            }).draw()

            const UPLOAD_DATA = new SpacesService().uploadToBucket(initQR, "image/png", "jpg", true)

            return UPLOAD_DATA;
        } catch (error) {
            throw {
                ...error
            }
        }
    }
}