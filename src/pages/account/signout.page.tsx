import { useEffect } from 'react';
import {LoadingIndicator} from "../../components/franchising-page/ui/LoadingIndicator";

// import { AuthGuard } from 'app/common/AuthGuard';

export default () => (
  // const router = useRouter();
  // const { clearUserAuthenticated } = useAuthContext();

  // useEffect(() => {
  //   // clearUserAuthenticated();
  //   router.push(Routes.Index);
  // });

  <LoadingIndicator isLoading={true} />
);

// SignOut.layout = BlankLayout;

// SignOut.guard = {
//   allowAuth: true,
//   redirect: Routes.Index,
// }
