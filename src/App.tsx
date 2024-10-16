import { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProductsPage } from "./ProductsPage";
import { PricePlansPage } from "./PricePlansPage";
import { PagesPage } from "./PagesPage";
import styles from "./App.module.css";

export const App: FC = () => (
    <div className={styles.appContainer}>
        <Router>
            <Routes>
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/price-plans" element={<PricePlansPage />} />
                <Route path="/pages" element={<PagesPage />} />
            </Routes>
        </Router>
    </div>
);
