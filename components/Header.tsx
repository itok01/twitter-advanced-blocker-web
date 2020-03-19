import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const title = "Advanced Blocker";

export default function Header() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography className="title" variant="h6">
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
