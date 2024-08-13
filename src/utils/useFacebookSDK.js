/* global FB */
import { useEffect } from 'react';

const useFacebookSDK = (appId) => {
  useEffect(() => {
    window.fbAsyncInit = function () {
      FB.init({
        appId,
        cookie: true,
        xfbml: true,
        version: 'v16.0',
      });
      FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      let js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }, [appId]);
};

export default useFacebookSDK;
