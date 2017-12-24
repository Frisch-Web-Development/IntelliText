var getPath = function() {
    return "/";
}
var recentFiles;
var files = {};
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
	    async:false,
	    url: "/conf/storage/folders"
	}).done(function(data) {
	    folders = data;
	    for (var i = 0; i < folders.length; i++) {
	    	console.log(folders[i].name);
	    	$("#folderContainer").append("<li><a class='toggle' id = '" + folders[i].path + "' href='javascript:void(0);'>"+folders[i].name+"<i class='fa fa-question-circle pull-right plus'>&#43;</i></a><div class='row inner' id = '" + folders[i].name  +"'></div>");
	    }
	    $(function(){
	        var menuItems = [
	            { name: "Store", url: "/store" },
	            { name: "Travel", url: "/store/travel" },
	            { name: "Gardening", url: "/store/gardening" },
	            { name: "Healthy Eating", url: "/store/healthy-eating" },
	            { name: "Cook Books", url: "/store/healthy-eating/cook-books" },
	            { name: "Single Meal Gifts", url: "/store/healthy-eating/single-meal-gifts" },
	            { name: "Outdoor Recreation", url: "/store/outdoor-recreation" },
	            { name: "Hiking", url: "/store/outdoor-recreation/hiking" },
	            { name: "Snowshoeing", url: "/store/outdoor-recreation/hiking/snowshoeing" },
	            { name: "Skiing", url: "/store/outdoor-recreation/skiing" },
	            { name: "Physical Fitness", url: "/store/physical-fitness" },
	            { name: "Provident Living", url: "/store/provident-living"}
	        ];
	        var rootList = $("<ul class='accordion' id = 'folderContainer'>").appendTo("#allFileContainer");
	        var elements = {};
	        $.each(menuItems, function() {
	            var parent = elements[this.url.substr(0, this.url.lastIndexOf("/"))];
	            var list = parent ? parent.children("div") : rootList;
	            if (!list.length) {
	                list = $("<li>").appendTo(parent);
	            }
	            var item = $("<li><a class='toggle' id = '" + this.name + "' href='javascript:void(0);'>"+this.name+"<i class='fa fa-question-circle pull-right plus'>&#43;</i></a><div class='row inner' id = '" + this.name  +"'></div>").appendTo(list);
	            elements[this.url] = item;
	        });
	    });
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
	        $("#" + files[i].userPath.substring(0, files[i].userPath.indexOf("/"))).append("<div id='" + files[i].name +"' class = 'col-md-3 card centertext' style = 'height:auto'><img src='images/doc_icon.png'/><h4>"+files[i].name+"</h4></div>");
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
	        $("#recentsDiv").append("<div class='col-md-3 card centertext' style='height: auto'><img src='images/doc_icon.png' /><h4>"+recentFiles[i].name+"</h4></div>");
	    }


	});
	
}

function refreshFolders(){
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
	    	console.log(folders[i].name);
	    	$("#folderContainer").append("<li><a class='toggle' id = '" + folders[i].path + "' href='javascript:void(0);'>"+folders[i].name+"<i class='fa fa-question-circle pull-right plus'>&#43;</i></a><div class='row inner' id = '" + folders[i].name  +"'></div>");
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
	        $("#" + files[i].userPath.substring(0, files[i].userPath.indexOf("/"))).append("<div id='" + files[i].name +"' class = 'col-md-3 card centertext' style = 'height:auto'><img src='images/doc_icon.png'/><h4>"+files[i].name+"</h4></div>");
	    }
	});
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



$(document).ready(function() {
		
    ajaxCalls();

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






$("#moveFolderConfirm").click(function() {
	console.log("Drag'n'drop");
    console.log(drag);
    console.log(drop);

});


    $("#newFolderConfirm").click(function() {
        console.log("New Folder");
        //yyyy.MM.dd HH:mm

        var folder = {
            "name": $("#newFolderInput").val(),
            "color": "#fff",
            "path": $("#newFolderInput").val() + "/",
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

});