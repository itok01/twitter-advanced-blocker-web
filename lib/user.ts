import axios from 'axios';
import https from 'https';

const userUrl = "https://localhost/api/user";

const agent = new https.Agent({ rejectUnauthorized: false });

export type GetUserResponse = {
    ok: boolean;
    id: string;
    name: string;
    icon: string;
};

export type User = {
    id: string;
    name: string;
    icon: string;
};

export async function getUser(token: string, user: string): Promise<GetUserResponse> {
    const res = await axios.get(userUrl + "?token=" + token + "&user=" + user, { httpsAgent: agent });
    return res.data;
}
