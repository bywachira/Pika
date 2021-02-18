export interface ITwitterResponse {
    data: {
        id: string;
        text: string;
        lang: string;
        created_at: string;
        entities: {
            urls: {
                start: number;
                end: number;
                url: string;
                expanded_url: string;
                display_url: string;
                images?: {
                    url: string;
                    width: number;
                    height: number;
                }[],
                status: number;
                title: string;
                description: string;
                unwound_url: string;
            }[];
            annontations?: {
                start: number;
                end: number;
                probability: number;
                type: string;
                normalized_text: string;
            }[];
            mentions: {
                start: number;
                end: number;
                username: string;
            }[];
        };
        author_id: string;
        source: string;
        possibly_sensitive: boolean;
    }[];
    includes: {
        users: {
            id: string;
            verified: false;
            profile_image_url: string;
            created_at: string;
            name: string;
            url: string;
            username: string;
        }[]
    }
}

export interface IQrOptions {
    size?: number;
    margin?: number;
    correctLevel?: number;
    maskPattern?: number;
    version?: number;
    colorDark?: string;
    colorLight?: string;
    autoColor?: boolean;
    backgroundImage?: string | Buffer;
    backgroundDimming?: string;
    gifBackground?: ArrayBuffer;
    whiteMargin?: boolean;
    dotScale?: number;
    logoImage?: string | Buffer;
    logoScale?: number;
    logoMargin?: number;
    logoCornerRadius?: number;
}