var getPath = function() {
    return "/";
}
var recentFiles;
var files = {};
var filesInLocalPath;
var today = new Date();

var profile;

/** Google Verification **/

function onSignIn(googleUser) {
    console.log("Success");

    profile = googleUser.getBasicProfile();
    google = googleUser;
    
    // set user
    
    var user = {
        "email": profile.getEmail(),
        "firstName": profile.getGivenName(),
        "lastName": profile.getFamilyName(),
        "socialId": profile.getId(),
        "tokenId": googleUser.getAuthResponse().id_token
    };

    console.log(user);

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

    
    
    $.ajax({
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        async:false,
        url: "/conf/storage/folders"
    }).done(function(data) {
        folders = data;
        for (var i = 0; i < folders.length; i++) {
        	//$("#allFileContainer").append("<button class='accordion'>" + folders[i].name +"</button><div class='row panel' id='" + folders[i].name + "'></div>");
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
        files = data;
        for (var i = 0; i < files.length; i++) {
            if (files[i].userPath == "All/") {
               // $("#All").append("<div class = 'col-md-4 card centertext' style = 'padding-top:20%;'><img src='images/doc_icon.png' /></span><h3>" + files[i].name + "</h3>" + "</div>");
            } else {

            }
        }
    });

    $.ajax({
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        url: "/conf/storage/recent"
    }).done(function(data) {
        recentFiles = data;
        console.log(data);

        for (var i = 0; i < recentFiles.length; i++) {
            //$("#recents").append("<div class = 'col-md-3 card centertext' style = 'padding-top:20%;'><img src='images/doc_icon.png' /></span><h3>" + recentFiles[i].name + "</h3>" + "</div>");

        }


    });

}




$(document).ready(function() {
    
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



    $("#newFolderConfirm").click(function() {
        console.log("New Folder");
        //yyyy.MM.dd HH:mm

        var folder = {
            "name": $("#newFolderInput").val(),
            "color": "#fff",
            "path": "/",
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

$(function() {
            $('.card').draggable({ revert: true });
			            $('.toggle').draggable({ revert: true });

            $('.toggle').droppable({
               hoverClass: 'active',
               drop: function(e, ui) {
				  $('#myMovingModal').modal('toggle');
                  // make calculations and ajax calls here!
               }
            });
         });

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
        "userPath": "All/",
        "storagePath": "/",
        "name": "new untitled document",
        "owner": profile.getEmail(),
        "type": "rtf",
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

$("#newFolderConfirm").click(function() {
    console.log("New Folder");
    //yyyy.MM.dd HH:mm

    var folder = {
        "name": $("#newFolderInput").val(),
        "color": "#fff",
        "path": "/",
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
});


});