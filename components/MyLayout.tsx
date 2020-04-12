import Header from './Header';
import { ReactNode } from 'react';

import { Auth } from '../lib/auth';

type Props = {
    children: ReactNode;
    auth: Auth;
};

export default function Layout(props: Props) {
    return (
        <div>
            <Header auth={props.auth} />
            <main>
                {props.children}
            </main>
        </div>
    )
}
