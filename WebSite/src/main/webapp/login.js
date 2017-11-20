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

$('#storageButton').click(function () {
   
});