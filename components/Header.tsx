import { AppBar, Toolbar, Typography, Link } from '@material-ui/core';

import { Auth } from '../lib/auth';
import styles from '../styles/Header.module.css'

const title = "Advanced Blocker";
const homeUrl = "/";
const signInUrl = "/api/auth";
const signOutUrl = "/api/signout";

type Props = {
    auth: Auth;
}

const signedInLink = (
    <Link href={signInUrl} color="inherit" underline="none">
        ログイン
    </Link>
);

const signedOutLink = (
    <Link href={signOutUrl} color="inherit" underline="none" onClick={signOut}>
        ログアウト
    </Link>
);

function signOut() {
    console.log("FASFASASD");
    document.cookie = "oauth_token=; expires=0";
}

export default function Header(props: Props) {
    const signLink = props.auth.signedIn ? signedOutLink : signedInLink;
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography component="h1" variant="h6" className={styles.title}>
                    <Link href={homeUrl} color="inherit" underline="none">
                        {title}
                    </Link>
                </Typography>
                {signLink}
            </Toolbar>
        </AppBar>
    )
}
