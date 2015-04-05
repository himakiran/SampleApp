    window.fbAsyncInit = function() {
	FB.init({
		appId      : '245014062351604', // App ID
		channelUrl : '//chundi.biz/SampleApp/channel.php', // Channel File
		status     : true, // check login status
		cookie     : true, // enable cookies to allow the server to access the session
                frictionlessRequests : true, // enable frictionless requests
		xfbml      : true  // parse XFBML
	});

	// Additional initialization code here
        
        //Next, find out if the user is logged in
	FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {
			var uid = response.authResponse.userID;
			accessToken = response.authResponse.accessToken;
			FB.api('/me', function(info) {
			    console.log(info);
			    //document.getElementById('welcome').innerHTML="Welcome Mr " + info.first_name;  Javascript version
			    $('#welcome').html("<h2>Welcome Mr " + info.first_name +"</h2>" ); //jQuery Version
			    //document.getElementById('img1').src='http://graph.facebook.com/'+info.username+'/picture?type=large';
			    $('#img1').attr("src","https://graph.facebook.com/"+ info.username + "/picture?type=large");
			    $('#msg').html("<h2>Here is some of your info we received </h2>");
			    //document.getElementById('bio').innerHTML="Your Bio : " + info.bio;
			    $('#bio').html("<p><b>Your Bio : </b>"+ info.bio + "</p>");
			    //document.getElementById('bday').innerHTML="Your Birthday : " + info.birthday;
			    $('#bday').html("<p><b>Your Birthday : </b>" + info.birthday +"</p>");
			    //document.getElementById('email').innerHTML="Your email: " + info.email;
			    $('#email').html("<p><b>Your email: </b>" + info.email + "</p>");
			    //document.getElementById('uname').innerHTML="Your username: " + info.username;
			    $('#uname').html("<p><b>Your username: </b>" + info.username + "</p>");
			    $('#friendslist').html("<p><b>Your friends: </b>"+"</p>");
			    
			 });
			
		} else if (response.status === 'not_authorized') {
			//User is logged into Facebook, but not your App
                        //alert("Hey permit my app to do its magic !!!");
			var oauth_url = 'https://www.facebook.com/dialog/oauth/';
			oauth_url += '?client_id=245014062351604'; //Your Client ID
			oauth_url += '&redirect_uri=' + 'https://apps.facebook.com/sampleapp-chk/'; //Send them here if they're not logged in
			oauth_url += '&scope=user_about_me,email,publish_actions,user_birthday,user_friends';

			window.top.location = oauth_url;
		} else {
			// User is not logged into Facebook at all
                        alert("Please login to Facebook");
			window.top.location ='https://www.facebook.com/index.php';
		}
	});

};

function populateVideos(data) {
  var entries = data.feed.entry;
  document.getElementById('entrys').innerHTML=entries;
  var output = '<h2 class="label">Latest Videos</h2>';

  output += '<ul>';
  for (var i=0; i<data.feed.entry.openSearch$itemsPerPage.$t; i++) {
    var entriesID=entries[i].id.$t.substring(38);
    var entriesTitle=entries[i].id.title.$t;
    var entriesDescription=entries[i].id.media$group.media$description.$t;
    var entriesThumbnail=entries[i].id.media$group.media$thumbnail[1].url;

		output += '<li><div class="entriestitle">' + entriesTitle + '</div>';
		output += '<a href="http://www.youtube.com/watch?v=' + entriesID + '&feature=youtube_gdata" target="_blank"><img src="' + entriesThumbnail + '" alt=' + entriesTitle + ' /></a>';
  }
	output +='</ul>';
	document.getElementById('videogroup').innerHTML = output;
}


// Load the JavaScript SDK Asynchronously
(function(d){
  var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
  js = d.createElement('script'); js.id = id; js.async = true;
  js.src = "//connect.facebook.net/en_US/all.js";
  d.getElementsByTagName('head')[0].appendChild(js);
}(document));

