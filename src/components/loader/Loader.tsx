import React  from "react";

import loader from "../../assets/images/loader.png";

import s from "./Loader.module.scss";

interface LoadingIndicatorProps {
    isLoading: boolean;
}

export const Loader = () => (
    <div className={s.loaderWrapper}>
        <img className={s.imageLoader}  src={loader} alt="loading.." />
    </div>
);