import { NextPageContext, NextPage } from 'next';
import { parseCookies } from 'nookies'

import { Auth } from '../components/Header';
import Layout from '../components/MyLayout'

type Props = {
    auth: Auth;
};

const Index: NextPage<Props> = props => (
    <Layout auth={props.auth} >
        <h1>Hello world!</h1>
    </Layout>
);

Index.getInitialProps = async (ctx: NextPageContext) => {
    let props: Props = { auth: { token: "", signedIn: false } };

    const cookies = parseCookies(ctx);

    if (cookies["oauth_token"] != undefined && cookies["oauth_token"] != "") {
        props.auth.token = cookies["oauth_token"];
        props.auth.signedIn = true;
    }
    return props;
}

export default Index;
