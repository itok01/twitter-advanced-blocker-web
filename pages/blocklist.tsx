import { NextPageContext, NextPage } from 'next';
import { parseCookies } from 'nookies';

import { Auth } from '../lib/auth';
import { getUser, User } from '../lib/user';
import { getBlocklist, generateBlocklist } from '../lib/blocklist';
import Layout from '../components/MyLayout'

type Props = {
    auth: Auth;
    blockedUser: User[];
};

const BlocklistPage: NextPage<Props> = props => {
    console.log(props.blockedUser);
    return (
        <Layout auth={props.auth} >
            <h2>ブロックリスト</h2>
            {generateBlocklist(props.blockedUser)}
        </Layout>
    );
};

BlocklistPage.getInitialProps = async (ctx: NextPageContext) => {
    let auth: Auth = { token: "", signedIn: false };

    const cookies = parseCookies(ctx);

    if (cookies["oauth_token"] != undefined && cookies["oauth_token"] != "") {
        auth.token = cookies["oauth_token"];
        auth.signedIn = true;
    }

    let blockedUser: User[] = [];
    const res = await getBlocklist(auth.token);
    for (var userId of res.blocklist) {
        console.log(userId);
        let user = await getUser(auth.token, userId);
        blockedUser.push({ id: user.id, name: user.name, icon: user.icon });
    }

    return { auth: auth, blockedUser: blockedUser };
}

export default BlocklistPage;
