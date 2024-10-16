import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { ProductsPage } from "./ProductsPage";
import { PricePlansPage } from "./PricePlansPage";
import { PagesPage } from "./PagesPage";
import styles from "./App.module.css";
import { Navbar } from "./Navbar";

export const App: FC = () => (
    <div className={styles.appContainer}>
        <Navbar />
        <Routes>
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/price-plans" element={<PricePlansPage />} />
            <Route path="/pages" element={<PagesPage />} />
        </Routes>
    </div>
);
