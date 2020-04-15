import { NextPageContext, NextPage } from 'next';
import { parseCookies } from 'nookies';

import { Auth } from '../../lib/auth';
import { getUser, User, getAllUser, generateUserList } from '../../lib/user';
import { getBlocklist, generateBlocklist } from '../../lib/blocklist';
import Layout from '../../components/MyLayout'

type Props = {
    auth: Auth;
    user: User[];
};

const BlocklistPage: NextPage<Props> = props => {
    console.log(props.user);
    return (
        <Layout auth={props.auth} >
            {generateUserList(props.user)}
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

    let allUser: User[] = [];
    const res = await getAllUser(auth.token);
    for (var userId of res.id) {
        console.log(userId);
        let user = await getUser(auth.token, userId);
        allUser.push({ id: user.id, name: user.name, icon: user.icon });
    }

    return { auth: auth, user: allUser };
}

export default BlocklistPage;
