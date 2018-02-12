var letters = 0; 
var contents;


function onSignIn(googleUser) {
    console.log("Success");

    profile = googleUser.getBasicProfile();
    google = googleUser;
    
    // set user
    user = {
        "email": profile.getEmail(),
        "firstName": profile.getGivenName(),
        "lastName": profile.getFamilyName(),
        "socialId": profile.getId(),
        "tokenId": googleUser.getAuthResponse().id_token
    };

    $.ajax({
	    type: 'POST',
	    url: "/conf/user",
	    data: JSON.stringify(user),
	    async: false,
	    error: function(e) {
	        console.log(e);
	    },
	    dataType: "json",
	    contentType: "application/json"
	});
    
    console.log(window.location.href);
    
    $.ajax({
	    type: 'POST',
	    url: "/conf/user",
	    data: JSON.stringify(user),
	    async: false,
	    error: function(e) {
	        console.log(e);
	    },
	    dataType: "json",
	    contentType: "application/json"
	});
    
    console.log(user);
    
   
}


$(document).ready(function(){
	var toolbarOptions = [ 
	[{'font' : []}],
	[ {'size': []}],
	['bold','italic','underline'],
	[{"color": []}, {"background": []}], 
	['link','video','formula','image'],
	[{'align':[]}],
	[{'indent': '+1'}, {'indent': '-1'}	]
	];
	
	var quill = new Quill('#editor', 	{
		modules: { toolbar: toolbarOptions}, 
		theme: "snow"
	});
	
	var myTimer = setInterval(timer, 100);
	var mySecondTimer = setInterval(timer2, 1); 
	
	$("#editor").keypress(function(){
		letters++; 
//		timer();
		clearInterval(myTimer);
		myTimer = setInterval(timer, 500);
	});	
	function timer()  {
		if(letters > 0) 
		{
			letters = 0; 
			// save and ajax
			contents = JSON.stringify(quill.getContents());
			console.log(contents); 
		}
	}
	function timer2()
	{
		if(letters == 500)
			{
			contents = JSON.stringify(quill.getContents());
			console.log(contents)
			// save and ajax
			}
		
	}
	
		
	

	
	
});