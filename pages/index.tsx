import { NextPageContext, NextPage } from 'next';
import { parseCookies } from 'nookies'
import { Link } from '@material-ui/core';

import { Auth } from '../lib/auth';
import Layout from '../components/MyLayout'

type Props = {
    auth: Auth;
};

const IndexPage: NextPage<Props> = props => {
    return (
        <Layout auth={props.auth} >
            <h1>Hello world!</h1>
            <Link href="https://localhost/blocklist">
                ブロックリスト
            </Link>
        </Layout>
    )
};

IndexPage.getInitialProps = async (ctx: NextPageContext) => {
    let props: Props = { auth: { token: "", signedIn: false } };

    const cookies = parseCookies(ctx);

    if (cookies["oauth_token"] != undefined && cookies["oauth_token"] != "") {
        props.auth.token = cookies["oauth_token"];
        props.auth.signedIn = true;
    }
    return props;
}

export default IndexPage;
