import React from 'react';
import { NextPageContext, NextPage } from 'next';
import { parseCookies } from 'nookies'
import { Link, Typography } from '@material-ui/core';

import { Auth } from '../lib/auth';
import { getBlocklist } from '../lib/blocklist';
import Layout from '../components/MyLayout'

type Props = {
    auth: Auth;
};

const IndexPage: NextPage<Props> = props => {
    return (
        <Layout auth={props.auth} >
            <Typography component="h2" variant="h6">
                <Link href="/blocklist" underline="none">
                    ブロックリスト
                </Link>
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
    const blocklistResponse = await getBlocklist(auth.token);

    return { auth: auth };
}

export default IndexPage;
