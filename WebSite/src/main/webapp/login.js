function onSignIn(googleUser) {
	console.log("Success");
    var profile = googleUser.getBasicProfile();
    google = googleUser;
    var user = {"email": profile.getEmail(),
        "firstName": profile.getGivenName(),
        "lastName": profile.getFamilyName(),
        "socialId": profile.getId(),
        "tokenId" : googleUser.getAuthResponse().id_token};

//The ID token you need to pass to the backend:
//    var id_token = googleUser.getAuthResponse().id_token;
//    console.log("ID Token: " + id_token);
    if (profile.getEmail().toLowerCase().search('@frisch.org') != -1) {
        $('#nonfrisch').hide();
        $('#authed').show();
        if (profile.getImageUrl() != null && profile.getImageUrl().length > 1) {
            $('#imgbox').html('<img src="' + profile.getImageUrl() + '" width=20 height=20></img>');
        }
        console.log("Frisch email received");

        $.ajax({
            headers: {
                "Content-Type": "application/json"
            },
            method: 'POST',
            url: '/conf/user',
            data: JSON.stringify(user)
        }).done(function(data) {
            result = data;
        }).fail(function(data) {
            console.log("error: ");
            console.log(data);
        });

    } else {
        $('#nonfrisch').show();
        console.log("Non-Frisch emails are forbidden to log in and submit jobs");
        googleUser.disconnect();
    }

}