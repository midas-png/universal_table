import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export const Navbar: FC = () => {
    return (
        <nav className={styles.navbar}>
            <Link to="/products">Products</Link>
            <Link to="/price-plans">Price Plans</Link>
            <Link to="/pages">Pages</Link>
        </nav>
    );
};

