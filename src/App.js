/* global FB */
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [details, setDetails] = useState(null);
  const [profilepic, setProfilePic] = useState("");
  const [username, setUserName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [posts, setPosts] = useState(0);
  

  useEffect(() => {
      try{
        window.fbAsyncInit = function() {
            FB.init({
              appId: '860826852185352', // Replace with your Facebook App ID
              cookie: true,         // Enable cookies to allow the server to access the session
              xfbml: true,          // Parse social plugins on this webpage
              version: 'v20.0'      // Use the latest version of the Graph API
            });
      
            FB.AppEvents.logPageView(); // Optionally log a page view event
            console.log("init success")
        };
      }catch(e){
        console.log("init Failed")
      }

    console.log("loaded")

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

  }, []);

  const handleLogin = async () => {
    FB.login(function(response) {
      if (response.authResponse) {
        const accessToken = response.authResponse.accessToken;
        console.log("success")

        FB.api(
          '/me',
          'GET',
          {"fields":"id,name,email,picture,posts"},
          function(response) {
            if (response && !response.error) {
              console.log('User data:', response); 
              setDetails(response)
              setUserName(response.name)
              setEmailId(response.email)
              setProfilePic(response.picture.data.url)
              setPosts(response.posts.data.length)
            } else {
              console.error('Error fetching data:', response.error);
            }
          }
        );

      } else {
        console.log('User cancelled login or did not fully authorize.');
      }

    }, { scope: 'public_profile,email,user_posts,' });
    
  };

  const handleLogOut = () => {
    FB.logout(function(response) {
      console.log('User logged out:', response);
      setUserName("")
      setEmailId("")
      setProfilePic("")
    });
  }



  return (
    <div className='flex items-center justify-center h-[90vh]'>
      <div className='flex flex-col gap-[10px]'>
        <button className='bg-blue-900 px-[40px] py-[10px] text-[20px] text-white font-bold rounded-[5px]' onClick={handleLogin}>Log-in</button>

        <div>
          <img src={profilepic} className='w-[100px] rounded-[50%]' />
          <h1>Username: {username} </h1>
          <h2>Email id: {emailId}</h2>
          <h2>No of Posts: {posts}</h2>
        </div>

        <button className='bg-blue-900 px-[40px] py-[10px] text-[20px] text-white font-bold rounded-[5px]' onClick={handleLogOut}>Log-Out</button>

      </div>  
    </div>
  );
}

export default App;
