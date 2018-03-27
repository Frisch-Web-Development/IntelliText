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
$( document ).ready(function() {
	$(".fileLink").attr("href","folder?path=gkepets@gmail.com/All");
	$(".fileLink").attr("href","folder?path=gkepets@gmail.com/All");
    $('.flip').hover(function(){
        $(this).find('.card').toggleClass('flipped');

});
});