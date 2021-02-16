import twitter from "twitter-text";
import { ITwitterResponse } from "../interfaces";
import { formatData } from "./date";

export const twitterTemplate = (data: ITwitterResponse): string => {
    const url: any = data.data[0].entities?.urls ? data.data[0].entities.urls[0] : null;
    const mentions: any = data.data[0].entities?.mentions ? data.data[0].entities.mentions : null;
    return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title></title>
    </head>
    
    <body style="width:784px;">
        <div
            style="background:#000;max-width:720px;width:100%;height:auto;display:flex;justify-content:center;place-items:center;padding:32px;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';">
            <div>
                <div
                    style="display:grid;grid-template-columns:80px 1fr;grid-template-rows:80px;grid-column-gap:0px;grid-row-gap:0px">
                    <img src="${data.includes.users[0].profile_image_url}"
                        style="width:80px;border-radius:50%;" />
                    <div style="padding-left:8px;">
                        <p style="color:#fff;font-size:28px;margin:2px 0px;font-weight:bold;">
                            ${data.includes.users[0].name}
                        </p>
                        <p style="color:#6e767d;margin:2px 0px;font-size:28px">
                            @${data.includes.users[0].username}
                        </p>
                    </div>
                </div>
                <div style="margin: 4px 0px 0px 0px;">
                    <p style="color:#d9d9d9;font-size:42px;">
                        ${url || mentions ? twitter.autoLink(data.data[0].text, {
        urlEntities: url,
        // usernameUrlBase: mentions,
        usernameClass: mentions,
        usernameIncludeSymbol: mentions
    }).replace(/<a /g, `<a style="color:#1b98e0;text-decoration:none;"`) : data.data[0].text}
                    </p>
                    <p style="color:#6e767d;font-size:30px;">
                        ${formatData(new Date(data.data[0].created_at))} · ${data.data[0].source}
                    </p>
                </div>
            </div>
        </div>
    </body>
    
    </html>
    `
}

// So <a href="https://twitter.com/RobinhoodApp"
                        //     style="color:#1b98e0;text-decoration:none;">@RobinhoodApp</a> is restricting users from buying
                        // certain stock. This is market manipulation and users are furious. They quicky got a class action
                        // lawsuit and tons of 1 star reviews. What's Google do? They deleted the 1 star reviews... <a
                        //     style="color:#1b95e0;text-decoration:none;" href="theverge.com/2021/1/28/2225">
                        //     theverge.com/2021/1/28/2225
                        // </a> …