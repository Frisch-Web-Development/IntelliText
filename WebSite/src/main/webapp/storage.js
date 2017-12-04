var getPath = function() {
    return "/";
}
var recentFiles;
var files = {};
var filesInLocalPath;
var today = new Date();

var profile;

function onSignIn(googleUser) {
    console.log("Success");

    profile = googleUser.getBasicProfile();
    google = googleUser;
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
        	$("#allFileContainer").append("<button class='accordion'>" + folders[i].name +"</button><div class='row panel' id='" + folders[i].name + "'></div>");
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
                $("#All").append("<div class = 'col-md-4 card centertext' style = 'padding-top:20%;'><img src='images/doc_icon.png' /></span><h3>" + files[i].name + "</h3>" + "</div>");
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
            $("#recents").append("<div class = 'col-md-3 card centertext' style = 'padding-top:20%;'><img src='images/doc_icon.png' /></span><h3>" + recentFiles[i].name + "</h3>" + "</div>");

        }


    });

}

$(document).ready(function() {
    $('.accordion').accordion("refresh"); 

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

    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].onclick = function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        }
    }
});