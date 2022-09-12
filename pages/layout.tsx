import * as React from 'react';
import styles from "@styles/Layout.module.css"
import { DropDown } from '@components';

interface ILayoutProps {
    children: React.ReactNode
}

const Layout: React.FunctionComponent<ILayoutProps> = ({children}) => (
    <div className={styles.layout}>
        <DropDown />
        <header className={""}>
            <h1 style={{textAlign: "center"}}>Phase 10</h1>
        </header>
        <hr />
        <main>
            {children}
        </main>
    </div>
);

export default Layout;
