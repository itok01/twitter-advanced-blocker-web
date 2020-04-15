import React from 'react';
import { NextPageContext, NextPage } from 'next';
import { parseCookies } from 'nookies'
import { Link, Typography } from '@material-ui/core';

import { Auth } from '../lib/auth';
import { getBlocklist, postBlocklist } from '../lib/blocklist';
import Layout from '../components/MyLayout'

type Props = {
    auth: Auth;
};

const IndexPage: NextPage<Props> = props => {
    const _postBlocklist = () => {
        postBlocklist(props.auth.token);
    }
    return (
        <Layout auth={props.auth} >
            <Typography component="h2" variant="h6">
                <Link href="/user" underline="none">
                    他のユーザーのブロックリストを探す
                </Link>
            </Typography>
            <Typography component="h2" variant="h6">
                <Link href="/blocklist" underline="none">
                    自分のブロックリストを確認する
                </Link>
            </Typography>
            <Typography component="h2" variant="h6" onClick={_postBlocklist}>
                自分のブロックリストを更新する
            </Typography>
        </Layout>
    )
};

IndexPage.getInitialProps = async (ctx: NextPageContext) => {
    const cookies = parseCookies(ctx);

    let auth: Auth = { token: "", signedIn: false };

    if (cookies["oauth_token"] != undefined && cookies["oauth_token"] != "") {
        auth.token = cookies["oauth_token"];
        auth.signedIn = true;
    }

    return { auth: auth };
}

export default IndexPage;
