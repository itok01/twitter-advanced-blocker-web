import React from 'react';
import { ListItem, ListItemIcon, ListItemText, List, Link } from "@material-ui/core";
import axios from 'axios';
import https from 'https';

import styles from '../styles/user.module.css'

const userUrl = "https://localhost/api/user";
const userIdUrl = "https://localhost/api/userid";
const allUserUrl = "https://localhost/api/alluser";

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

export type GetUserIdResponse = {
    ok: boolean;
    id: string;
};

export async function getUserId(token: string, user: string): Promise<GetUserIdResponse> {
    const res = await axios.get(userIdUrl + "?token=" + token + "&user=" + user, { httpsAgent: agent });
    return res.data;
}

export type GetAllUserResponse = {
    ok: boolean;
    id: string[];
};

export async function getAllUser(token: string): Promise<GetAllUserResponse> {
    const res = await axios.get(allUserUrl + "?token=" + token, { httpsAgent: agent });
    return res.data;
}

export function generateUserList(blockedUser: User[]) {
    return (
        <List>
            {blockedUser.map((user, index) =>
                (
                    <ListItem key={index} >
                        <Link href={"/user/" + user.id} underline="none" className={styles.user} >
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
