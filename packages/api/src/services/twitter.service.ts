import axios from "axios";
import { Response } from "express";
import nodeHTMLToImage from "node-html-to-image";
import config from "../config";
import { ITwitterResponse } from "../interfaces";
import { twitterTemplate } from "../utils/html-templates";

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
      } catch (error) {
        throw error.response.data
      }
    } catch (error) {
      throw {
        message: "Please check you provided a tweet url",
        status: 400
      }
    }
  }

  public async generateFromTweet(fileType: string) {
    try {
      const twitterData: ITwitterResponse = await this.lookupTweet();

      let image: any;

      console.log(twitterTemplate(twitterData))

      switch (fileType) {
        case "svg":
          image = await this.toSvg(twitterTemplate(twitterData))
          return {
            image,
            type: "image/svg+xml"
          }
        case "png":
          image = await this.toSvg(twitterTemplate(twitterData))
          return {
            image,
            type: "image/png"
          }
        default:
          image = await this.toSvg(twitterTemplate(twitterData))
          return {
            image,
            type: "image/svg+xml"
          }
      }
    } catch (error) {
      throw {
        ...error
      }
    }
  }

  public async toSvg(htmlString: string) {
    const image = await nodeHTMLToImage({
      html: htmlString
    })

    return image

    // response.writeHead(200, { "Content-Type": "image/png" });

    // response.end(image, "binary")

    // response.setHeader("Content-Type", "image/svg+xml")
    // response.status(200).send(boilerplate)
  }
}

export default TwitterService;