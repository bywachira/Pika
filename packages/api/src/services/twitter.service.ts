import axios from "axios";
import { Response } from "express";
import nodeHTMLToImage from "node-html-to-image";
import config from "../config";
import { ITwitterResponse } from "../interfaces";
import { twitterTemplate } from "../utils/html-templates";
import SpaceService from "./spaces.service";

const { twitter: {
  apiKey,
  apiSecretKey,
  bearerToken,
  appId,
  accessToken,
  accessTokenSecret
} } = config

class TwitterService {
  private apiKey: string | undefined;
  private apiSecretKey: string | undefined;
  private bearerToken: string | undefined;
  private appId: string | undefined;
  private accessToken: string | undefined;
  private accessTokenSecret: string | undefined;
  private baseURL: string;
  private statusID: string;
  private tweetFields: string;
  private userFields: string;
  public twitterURL: string;
  private expansions: string;

  constructor(url: any) {
    this.accessToken = accessToken;
    this.accessTokenSecret = accessTokenSecret;
    this.appId = appId;
    this.bearerToken = bearerToken;
    this.apiSecretKey = apiSecretKey;
    this.apiKey = apiKey;
    this.baseURL = "https://api.twitter.com/2/tweets";
    this.twitterURL = url;
    this.statusID = "";
    this.tweetFields = "attachments,author_id,created_at,entities,geo,id,in_reply_to_user_id,lang,possibly_sensitive,referenced_tweets,source,text,withheld";
    this.userFields = "created_at,id,username,profile_image_url,url,name,verified";
    this.expansions = "author_id"
  }

  private getStatusID() {
    const url = new URL(this.twitterURL);

    this.statusID = url.pathname.split("/")[3]
  }

  public async lookupTweet() {
    try {
      this.getStatusID();

      const params = {
        ids: this.statusID,
        "tweet.fields": this.tweetFields,
        "user.fields": this.userFields,
        "expansions": this.expansions
      }
      try {

        const response = await axios.get(this.baseURL, {
          headers: {
            "authorization": `Bearer ${this.bearerToken}`
          },
          params
        })

        return response.data;
      } catch (error: any) {
        throw error.response.data
      }
    } catch (error) {
      throw {
        message: "Please check you provided a tweet url",
        status: 400
      }
    }
  }

  public async generateFromTweet(fileType: any) {
    try {
      const twitterData: ITwitterResponse = await this.lookupTweet();

      let image: any;
      let imageMeta: {
        image: string;
        type: string;
        extension: string;
      } = {
        image: "",
        type: "",
        extension: ""
      }

      image = await this.htmlToBase64(twitterTemplate(twitterData))

      switch (fileType) {
        case "svg":
          imageMeta = {
            image,
            type: "image/svg+xml",
            extension: "svg"
          }
          break;
        case "png":
          imageMeta = {
            image,
            type: "image/png",
            extension: "png"
          }
          break;
        case "avif":
          imageMeta = {
            image,
            type: "image/avif",
            extension: "avif"
          }
          break;
        default:
          imageMeta = {
            image,
            type: "image/svg+xml",
            extension: "svg"
          }
          break;
      }

      const uploadData = new SpaceService().uploadToBucket(imageMeta.image, imageMeta.type, imageMeta.extension, true);

      return uploadData

    } catch (error: any) {
      throw {
        ...error
      }
    }
  }

  public async htmlToBase64(htmlString: string) {
    const image = await nodeHTMLToImage({
      html: htmlString,
      encoding: "binary"
    })

    return image
  }
}

export default TwitterService;