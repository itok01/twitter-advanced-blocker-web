import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@material-ui/core';

import styles from '../styles/Header.module.css'

const title = "Advanced Blocker";
const authUrl = "https://localhost/api/auth";

export default function Header() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography component="h1" variant="h6" className={styles.title}>
                    {title}
                </Typography>
                <Button variant="text" color="inherit" onClick={() => window.open(authUrl, "_self")}>
                    ログイン
                </Button>
            </Toolbar>
        </AppBar>
    )
}
