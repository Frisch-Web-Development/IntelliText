var letters = 0; 
var contents;
var blob;
var quill;
var temp;
var path;
var id = "cards";

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
       
    temp = window.location.href.substring(window.location.href.indexOf("=") + 1, window.location.href.length);
    
    path = temp.substring(temp.indexOf("/"), temp.length);
        
    if(temp.substring(0, temp.indexOf("/")) == user.email){
    	console.log("URL Matches Prince");
    	$.ajax({
    	    method: "GET",
    	    headers: {
    	        'Content-Type': 'application/json'
    	    },
    	    url: "/getfile?path=" + path,
    	    async:false
    	}).done(function(data) {
    			console.log(data + " data");
    			blob = JSON.parse(data);
    			setContent(blob); 
    			
    });
    	// load file here
    	// remember to create new pages if it doesn't exist and prompt them.
    }
    else {
    	console.log("HACKER");
    	// redirect
    }
        
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

			
	$("#annotation").hide(0);
	$('body').on('click', '[data-editable]', function(){
		  
		  var $el = $(this);
		              
		  var $input = $('<input/>').css({'font-size': '200%'}).val( $el.text() );
		  $el.replaceWith( $input );
		  
		  var save = function(){
		    var $p = $('<p style = "font-size: 200%;" data-editable />').text( $input.val() );
		    $input.replaceWith( $p );
		  };
		  
		  $input.one('blur', save).focus();
		  
		});
		
		
		$("#annotationB").click(function(){
			console.log("ann"); 
			$("#annotation").show(200);
			$("#cards").hide(200); 
		});
		$("#cardB").click(function(){
			console.log("card"); 
			$("#annotation").hide(200);
			$("#cards").show(200);
		});
			
	
	
	var toolbarOptions = [ 
	[{'font' : []}],
	[ {'size': []}],
	['bold','italic','underline'],
	[{"color": []}, {"background": []}], 
	['link','video','formula','image'],
	[{'align':[]}],
	[{'indent': '+1'}, {'indent': '-1'}	]
	];
	
	quill = new Quill('#editor', 	{
		modules: { 
			formula: true, 
			toolbar: toolbarOptions
			}, 
		theme: "snow"
	});
	var Parchment = Quill.import("parchment");

	let CustomClass = new Parchment.Attributor.Class('annotation', 'tool', {
	scope: Parchment.Scope.INLINE
	});
	let CustomClass2 = new Parchment.Attributor.Class('name', 'name', {
	scope: Parchment.Scope.INLINE
	});

	Quill.register(CustomClass, true);
	Quill.register(CustomClass2, true);
//	$("button.ql-annotation").append('<svg viewBox="0 0 18 18"> <text font-size="15" font-family="Verdana" x="0" y="11"> @</text></svg>');
	//type,title,image,text,id
	//addCard("math","f(x) = 3x^3",null,"stuff and things", "cards");
	
	var content; 
	var Range; 
	var finalBool = false; 
	quill.on('selection-change', function(range, oldRange, source) {
	if (range) {
		if (range.length != 0) {
			finalBool = true; 
			content = quill.getText(range.index, range.length);
			Range = range.index;  
			console.log('User has highlighted1', content);
			console.log(range); 
			console.log('range' ,range.index); 
			
		} 
	} 
	});
	
	$("button#annotation").click(function(){
		
			console.log('User has highlighted2', content); 
		//	console.log(range); 
		//	console.log(source); 
			let name = $('input#annotation').val(); 
			console.log('Name =', name ); 
			
			if(!(name == null || name == "" || name == " ") && finalBool )
			{
				console.log("run"); 
				addAnnotation(name,content,Range,false,quill.getContents()); 
				finalBool = false; 
			}
			}); 
	
	
	var myTimer = setInterval(timer, 100);
	var mySecondTimer = setInterval(timer2, 1); 
	
	//$("#editor").keypress(function(){
	quill.on('text-change',function(){
		letters++; 
//		timer(); 
		clearInterval(myTimer); 
		myTimer = setInterval(timer, 100);
		checkAnnotation(quill.getText(),quill.getContents()); 
		checkCards(quill.getContents(), quill.getText(),id);
	});	
	function timer()  {
		if(letters > 0) 
		{
			letters = 0; 
			// save and ajax
			
			$.ajax({
			    type: 'POST',
			    url: "/file/save?path=" + path,
			    data: JSON.stringify(quill.getContents()),
			    async: false,
			    error: function(e) {
			        console.log(e);
			    },
			    contentType: "application/json"
			});
			
			contents = JSON.stringify(quill.getContents());
		//	console.log(contents); 
			getResarch(quill.getText(), id); 
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

function setContent(input)
{
	quill.setContents(input); 
	renderTooltip(); 
};