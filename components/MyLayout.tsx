import Header from './Header';
import { ReactNode } from 'react';

type ContentProps = {
    children: ReactNode;
};

export default function Layout(props: ContentProps) {
    return (
        <div>
            <Header />
            <main>
                {props.children}
            </main>
        </div>
    )
}
