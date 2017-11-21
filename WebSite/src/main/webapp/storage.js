var getPath = function()
{
	return "/"; 
}

//$(document).ready(function(){ 
	var user; 
	var recentFiles;
	var files;
	var filesInLocalPath;
	var today = new Date(); 
	
	$.ajax({method: "GET",
        headers: {'Content-Type': 'application/json'},
        url: "/conf/user"
        }).done(function(data) {  user = data; console.log(data); });
	
	
	//console.log("Hallo1"); 
	$.ajax({method: "GET",
        headers: {'Content-Type': 'application/json'},
        url: "/conf/storage"
        }).done(function(data) {  files = data; console.log(data);});

	$.ajax({method: "GET",
        headers: {'Content-Type': 'application/json'},
        url: "/conf/storage/recent"
        }).done(function(data) {  recentFiles = data; console.log(data);});
	
	console.log("Hallo2"); 
//});

function onSignIn(googleUser) {
	console.log("Success");

	var profile = googleUser.getBasicProfile();
	google = googleUser;
	var user = {
		"email" : profile.getEmail(),
		"firstName" : profile.getGivenName(),
		"lastName" : profile.getFamilyName(),
		"socialId" : profile.getId(),
		"tokenId" : googleUser.getAuthResponse().id_token
	};

	console.log(user);

	$.ajax({
		type : 'POST',
		url : "/conf/user",
		data : JSON.stringify(user),
		error : function(e) {
			console.log(e);
		},
		dataType : "json",
		contentType : "application/json"
	});

}