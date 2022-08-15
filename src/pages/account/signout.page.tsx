import React, { useEffect } from 'react';
import {LoadingIndicator} from "../../components/franchising-page/ui/LoadingIndicator";

// import { AuthGuard } from 'app/common/AuthGuard';

export default () => (
  // const router = useRouter();
  // const { clearUserAuthenticated } = useAuthContext();

  // useEffect(() => {
  //   // clearUserAuthenticated();
  //   router.push(Routes.Index);
  // });

    <video autoPlay loop muted src={require("../../assets/videos/loader.MP4")}/>
);

// SignOut.layout = BlankLayout;

// SignOut.guard = {
//   allowAuth: true,
//   redirect: Routes.Index,
// }
