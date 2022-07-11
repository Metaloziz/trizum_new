import { Backdrop } from "@mui/material";
import { RevolvingDot } from "react-loader-spinner";

interface LoadingIndicatorProps {
    isLoading: boolean;
}

export const LoadingIndicator = (props: LoadingIndicatorProps) => {
    return <Backdrop
        sx={{ color: "#fff", zIndex: 1000 }}
        open={props.isLoading}
    >
        <RevolvingDot height={30} width={30} />
    </Backdrop>
}