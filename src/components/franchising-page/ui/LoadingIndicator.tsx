import { Backdrop } from '@mui/material';
import { TailSpin } from 'react-loader-spinner';

interface LoadingIndicatorProps {
  isLoading: boolean;
}

export const LoadingIndicator = (props: LoadingIndicatorProps) => (
  <Backdrop sx={{ color: '#fff', zIndex: 1000 }} open={props.isLoading}>
    <TailSpin height={100} width={100} color="#2e8dfd" />
  </Backdrop>
);
