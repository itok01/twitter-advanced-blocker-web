import React from 'react';
import { ListItem, ListItemIcon, ListItemText, List, Link } from "@material-ui/core";
import axios from 'axios';
import https from 'https';

import { User } from '../lib/user';
import styles from '../styles/user.module.css'

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

export function generateBlocklist(blockedUser: User[]) {
    return (
        <List>
            {blockedUser.map((user, index) =>
                (
                    <ListItem key={index} >
                        <Link href={"https://twitter.com/" + user.id} underline="none" className={styles.user} >
                            <ListItemIcon>
                                <img src={user.icon} />
                            </ListItemIcon>
                            <ListItemText
                                primary={user.name}
                                secondary={"@" + user.id}
                            />
                        </Link>
                    </ListItem>
                )
            )}
        </List>
    );
}
