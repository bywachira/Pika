import AWS from "aws-sdk";
import atob from "atob";
import { v4 as uuid4 } from "uuid"
import config from "../config";

export default class SpacesService {
    // private spacesEndpoint: AWS.Endpoint;
    private s3: AWS.S3;
    private upload: AWS.S3.PutObjectOutput | null;
    private error: Error | null;

    constructor() {
        this.s3 = new AWS.S3({
            // endpoint: this.spacesEndpoint,
            accessKeyId: config.spaces.key,
            secretAccessKey: config.spaces.secret,
        })
        this.upload = null;
        this.error = null;
    }

    private dataUriToBlob(dataUri: string, fileType: string) {
        let binary = atob(dataUri.split(",")[1])
        let array = []

        for (let i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i))
        }

        return new Blob([new Uint8Array(array)], {
            type: fileType,
        })
    }

    public async uploadToBucket(file: any, fileType: string, fileExtension: string, trial: boolean) {
        // const file: Blob = this.dataUriToBlob(dataUri, fileType);

        let params = {
            Key: `${uuid4()}.${fileExtension}`,
            ContentType: fileType,
            Body: file,
            Bucket: "pika-images",
            ACL: "public-read"
        }

        this.upload = await this.s3.upload(params).promise()

        if (this.error) {
            throw {
                status: 500,
                ...this.error,
            }
        } else {
            return {
                upload: this.upload
            }
        }
    }

    public async sizeOf(key: string, bucket: string) {
        try {
            const HEAD = await this.s3.headObject({ Key: key, Bucket: bucket }).promise()

            return HEAD.ContentLength;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public deleteObjbect(key: string, bucket: string) {

        const DELETE = new Promise((resolve, reject) => {
            this.s3.deleteObject({ Key: key, Bucket: bucket }, (error: any, data: any) => {
                if (error) {
                    reject(error);
                }

                resolve(data);
            })
        })

        return DELETE;
    }
}