import { NextPageContext, NextPage } from 'next';
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies';

import { Auth } from '../../lib/auth';
import { getUser, User, getUserId } from '../../lib/user';
import { getBlocklist, generateBlocklist } from '../../lib/blocklist';
import Layout from '../../components/MyLayout'

type Props = {
    auth: Auth;
    blockedUser: User[];
};

const BlocklistPage: NextPage<Props> = props => {
    const router = useRouter();
    const { user } = router.query;

    return (
        <Layout auth={props.auth} >
            <h2>@{user} のブロックリスト</h2>
            {generateBlocklist(props.blockedUser)}
        </Layout>
    );
};

BlocklistPage.getInitialProps = async (ctx: NextPageContext) => {
    const { user } = ctx.query;

    let auth: Auth = { token: "", signedIn: false };

    const cookies = parseCookies(ctx);

    if (cookies["oauth_token"] != undefined && cookies["oauth_token"] != "") {
        auth.token = cookies["oauth_token"];
        auth.signedIn = true;
    }

    const userId = await getUserId(auth.token, user as string);

    let blockedUser: User[] = [];
    const res = await getBlocklist(auth.token, userId.id);
    for (var blockedUserId of res.blocklist) {
        let user = await getUser(auth.token, blockedUserId);
        blockedUser.push({ id: user.id, name: user.name, icon: user.icon });
    }

    return { auth: auth, blockedUser: blockedUser };
}

export default BlocklistPage;
