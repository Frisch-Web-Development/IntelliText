var jumboHeight = $('.jumbotron').outerHeight();
function parallax() {
	var scrolled = $(window).scrollTop();
	$('.bg').css('height', (550 - (scrolled)) + 'px');
}

$(window).scroll(function(e) {
	parallax();
});

var googleUser = {};
gapi
		.load(
				'auth2',
				function() {
					// Retrieve the singleton for the GoogleAuth library and set up the client.
					auth2 = gapi.auth2
							.init({
								client_id : '337875401568-h311m0lmtprrvgbak83kdgubqtn2siep.apps.googleusercontent.com',
								cookiepolicy : 'single_host_origin',
							// Request scopes in addition to 'profile' and 'email'
							//scope: 'additional_scope'
							});
					attachSignin(document.getElementById('loginButton'));
				});

function attachSignin(element) {
	console.log(element.id);
	auth2.attachClickHandler(element, {}, function(googleUser) {
		document.getElementById('buttonText').innerText = "Welcome, "
				+ googleUser.getBasicProfile().getName();

		var data = [ googleUser.getBasicProfile().getName(),
				googleUser.getBasicProfile().getEmail() ];

		/*$.ajax({
			type : "POST",
			headers : {
				"Content-Type" : "application/json"
			},
			url : "/user",
			data : JSON.stringify(data),
		}).done(
				function(response) {
					console.log("response:" + response);
					$('#welcome')
							.text(
									"Welcome, "
											+ data[0].substring(0, data[0]
													.indexOf(' ')));
					//	$(location).attr('href', 'http://localhost:8080/home');  // don't forget to move this from local host! 
				});*/
	}, function(error) {
		alert(JSON.stringify(error, undefined, 2));
	});
}

function onSuccess(googleUser) {
	console.log("Logged in!");
	var user = [ googleUser.getBasicProfile().getName(),
			googleUser.getBasicProfile().getEmail() ];
	var user = {"email": profile.getEmail(),
	        "userName": profile.getGivenName()};

	 $.ajax({
		type : "POST",
		headers : {
			"Content-Type" : "application/json"
		},
		url : "/login/finish",
		data : JSON.stringify(user),
	}).done(
			function(response) {
				console.log("response:" + response);
				$('#welcome').text(
						"Welcome, "
								+ data[0].substring(0, data[0]
										.indexOf(' ')));
				//	$(location).attr('href', 'http://localhost:8080/home');  // don't forget to move this from local host! 
			}); 

}
function onFailure(error) {
	console.log(error);
}
function renderButton() {
	gapi.signin2.render('my-signin2', {
		'scope' : 'profile email',
		'width' : 200,
		'height' : 30,
		'longtitle' : true,
		'theme' : 'dark',
		'onsuccess' : onSuccess,
		'onfailure' : onFailure
	});
}