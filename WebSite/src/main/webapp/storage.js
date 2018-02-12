var getPath = function() {
    return "/";
}
var recentFiles;
var files = [];
var filesInLocalPath;
var today = new Date();
var user;
var profile;

var drag;
var drop;


/** Google Verification **/

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
    
    console.log(user);
   
}


function ajaxCalls(){
	$.ajax({
	    method: "GET",
	    headers: {
	        'Content-Type': 'application/json'
	    },
	    url: "/conf/storage/folders",
	    async:false
	}).done(function(data) {
		console.log("Finished Folder");
	   for(var i = 0; i < data.length; i++){
		   files.push(data[i]);
	   }
});
	$.ajax({
	    method: "GET",
	    headers: {
	        'Content-Type': 'application/json'
	    },
	    url: "/conf/storage",
	    async:false
	}).done(function(data) {
			console.log("Finished Files");
	   for(var i = 0; i < data.length; i++){
		   files.push(data[i]);
	   }
});
	console.log(files);
}

function refreshUI(){
	 $('.toggle').parent().parent().find('li .inner').slideUp(0);
		
	 $('.toggle').click(function(e) {
	   	e.preventDefault();
	   
	     var $this = $(this);
	   
	     if ($this.next().hasClass('show')) {

	         $this.next().removeClass('show');
	         $this.next().slideUp(350);
	 		$('.plus').text("\u002B");
	     } else {
	         $this.parent().parent().find('li .inner').removeClass('show');
	         $this.parent().parent().find('li .inner').slideUp(350);
	 		$this.children().text("\u2212");
	         $this.next().toggleClass('show');
	         $this.next().slideToggle(350);
	     }
	 }); 

	 $(function() {
         $('.card').draggable({ revert: true });
			            $('.toggle').draggable({ revert: true });

         $('.toggle').droppable({
            hoverClass: 'active',
            drop: function(e, ui) {
				  $('#myMovingModal').modal('toggle');
				  drag = ui.draggable;
				  drop = $(this);
            }
         });
      });
	
}

$( document ).ajaxComplete(function() {
	});

$(document).ready(function() {
    ajaxCalls();
    generateAccordion({listP : files, parentDiv : "#content"});

    $( ".file" ).dblclick(function() {
    	//window.location.replace("http://localhost:8080/editorPage/myquill.html");
    });

	$("#newFolderConfirm").click(function() {
		//console.log("New Folder");
        //yyyy.MM.dd HH:mm

        var folder = {
            "name": $("#newFolderInput").val(),
            "color": "#ffffff",
            "path": "/" + $("#newFolderInput").val(),
            "owner": profile.getEmail(),
        }

        $.ajax({
            type: 'POST',
            url: "/conf/storage/insertfolder",
            data: JSON.stringify(folder),
            error: function(e) {
                console.log(e);
            },
            dataType: "json",
            contentType: "application/json"
        });
        $("#newFolderInput").val("");
        $('#folderContainer').empty();
        refreshFolders();
        refreshUI();
    });

   if ($('#back-to-top').length) {
    var scrollTrigger = 100, // px
        backToTop = function () {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > scrollTrigger) {
                $('#back-to-top').addClass('show');
            } else {
                $('#back-to-top').removeClass('show');
            }
        };
    backToTop();
    $(window).on('scroll', function () {
        backToTop();
    });
    $('#back-to-top').on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 700);
    });
}

$("#newTextFile").click(function() {
    console.log("New File");

    var date = {
        "Year": today.getFullYear(),
        "Month": today.getMonth() + 1,
        "Date": today.getDate(),
        "Hour": today.getHours() + 1,
        "Minute": today.getMinutes()
    }
    //yyyy.MM.dd HH:mm


    var file = {
        "path": "/All/new untitled document",
        "storagePath": "/",
        "name": "new untitled document",
        "owner": profile.getEmail(),
        "type": "rtf",
        "color" : "#ffffff",
        "contents" : "{ insert: '' }",
        "lastModified": today.getFullYear() + "." + (today.getMonth() + 1) + "." + today.getDate() + " " + (today.getHours() + 1) + ":" + today.getMinutes(),
        "dateCreated": today.getFullYear() + "." + (today.getMonth() + 1) + "." + today.getDate() + " " + (today.getHours() + 1) + ":" + today.getMinutes(),
        "sharedWith": null
    }

    $.ajax({
        type: 'POST',
        url: "/conf/storage/insert",
        data: JSON.stringify(file),
        error: function(e) {
            console.log(e);
        },
        dataType: "json",
        contentType: "application/json"
    });
});

});