import axios from 'axios';
import https from 'https';

const blocklistUrl = "https://localhost/api/blocklist";

const agent = new https.Agent({ rejectUnauthorized: false });

export type GetBlocklistResponse = {
    ok: boolean;
    id: string;
    blocklist: string[];
};

export type PostBlocklistResponse = {
    ok: boolean;
};

export async function getBlocklist(token: string): Promise<GetBlocklistResponse> {
    const res = await axios.get(blocklistUrl + "?token=" + token, { httpsAgent: agent });
    return res.data;
}

export async function postBlocklist(token: string): Promise<PostBlocklistResponse> {
    const res = await axios.post(blocklistUrl, { token: token }, { httpsAgent: agent });
    return res.data;
}
