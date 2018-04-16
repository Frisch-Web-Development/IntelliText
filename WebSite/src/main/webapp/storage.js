var recentFiles;
var files = [];
var today = new Date();
var username;
var profile;
var drag;
var drop;
var testVar = 0;
var currentPath = "";
var temp;
var path;

function init() {
    testVar = 5;
    console.log("Init Jquery");
    $(".folderDiv").dblclick(
        function() {
            console.log("new path");
            currentPath += $(this).attr("id");
            history.pushState({
                    id: 'file explorer'
                }, 'Explorer | IntelliText', window.location.href +
                currentPath.substring(1, currentPath.length));
            generateNewLayer(currentPath);
            console.log("clicked folder " + currentPath);
        });

    $("#newFolderConfirm").click(function() {
        // console.log("New Folder");
        // yyyy.MM.dd HH:mm

        var folder = {
            "name": $("#newFolderInput").val(),
            "color": "#ffffff",
            "path": "/" + $("#newFolderInput").val(),
            "owner": profile.getEmail()
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
    });

    if ($('#back-to-top').length) {
        var scrollTrigger = 100, // px
            backToTop = function() {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $('#back-to-top').addClass('show');
                } else {
                    $('#back-to-top').removeClass('show');
                }
            };
        backToTop();
        $(window).on('scroll', function() {
            backToTop();
        });
        $('#back-to-top').on('click', function(e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }

    $("#newTextFile").click(function() {
        $('#newFileModal').modal('toggle');
    });
    $("#newFolder").click(function() {
        $('#myModal').modal('toggle');
    });

    $("#newFileConfirm").click(
        function() {
            var date = {
                "Year": today.getFullYear(),
                "Month": today.getMonth() + 1,
                "Date": today.getDate(),
                "Hour": today.getHours() + 1,
                "Minute": today.getMinutes()
            }

            var file = {
                "path": (currentPath.charAt(0) == '/' ? "" : "/") + currentPath + "/" + $("#fileNameInput").val(),
                "storagePath": "/",
                "name": $("#fileNameInput").val(),
                "owner": profile.getEmail(),
                "type": "rtf",
                "color": "#ffffff",
                "contents": "{" + '"insert"' + ":" + '""' + "}",
                "lastModified": today.getFullYear() + "." +
                    (today.getMonth() + 1) + "." + today.getDate() +
                    " " + (today.getHours() + 1) + ":" +
                    today.getMinutes(),
                "dateCreated": today.getFullYear() + "." +
                    (today.getMonth() + 1) + "." + today.getDate() +
                    " " + (today.getHours() + 1) + ":" +
                    today.getMinutes(),
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

    $("#items > li").click(function() {
        console.log($(this).text());
        if($(this).text().toLowerCase() == "assignment new file"){
            $('#newFileModal').modal('toggle');
        }
        else if($(this).text().toLowerCase() == "folder new folder"){
            $('#myModal').modal('toggle');
        }
    });

}
/** Google Verification * */

function onSignIn(googleUser) {
    console.log("Success");

    profile = googleUser.getBasicProfile();
    google = googleUser;
    username = profile.getEmail();
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

    if (window.location.href.includes("=")) {
        temp = window.location.href.substring(
            window.location.href.indexOf("=") + 1,
            window.location.href.length);
        path = temp.substring(temp.indexOf("/"), temp.length);
        currentPath += path.substring(1, path.length);
    }

    console.log(path + "   current Path");

    if (temp.substring(0, temp.indexOf("/")) == user.email) {
        console.log("URL Matches Prince");
    } else {
        console.log("HACKER");
        // redirect
    }

    $("#welcomeMsg").text("Welcome " + profile.getGivenName() + "!");
    console.log(user);

}

function ajaxCalls() {
    $.ajax({
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        url: "/conf/storage/folders",
        async: false
    }).done(function(data) {
        console.log("Finished Folder");
        for (var i = 0; i < data.length; i++) {
            files.push(data[i]);
        }
    });
    $.ajax({
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        url: "/conf/storage",
        async: false
    }).done(function(data) {
        console.log("Finished Files");
        for (var i = 0; i < data.length; i++) {
            files.push(data[i]);
        }
    });
    console.log(files);
}

function generateFirstFolders() {
    let temp = window.location.href.substring(
        window.location.href.indexOf("=") + 1, window.location.href.length);
    let tempPath = temp.substring(temp.indexOf("/"), temp.length);
    // console.log(tempPath.trim().charAt(tempPath.length-1));
    if (tempPath.trim().charAt(tempPath.length - 1) != "/") {
        tempPath += "/";
        // console.log("Added slash" );
    }
    let emptyCheck = 0;
    for (let i = 0; i < files.length; i++) {
        if (files[i].path.replace(/[^/]/g, "").length == tempPath.replace(
                /[^/]/g, "").length &&
            files[i].path.includes(tempPath)) {
            // console.log("First Folder! " + files[i].path);
            generateFileType(files[i]);
            emptyCheck += 1;
        }
    }
    if (emptyCheck == 0) {
        generateEmptyMessage();
    }
}

function generateNewLayer(localPath) {
    /*
     * let temp =
     * window.location.href.substring(window.location.href.indexOf("=") + 1,
     * window.location.href.length); let tempPath =
     * temp.substring(temp.indexOf("/"), temp.length);
     */
    console.log("New Layer " + localPath);
    $(".folderContainer").empty();
    let emptyCheck = 0;
    for (let i = 0; i < files.length; i++) {
        console.log(files[i].path + " : " + localPath + "/" + files[i].name);
        console.log(files[i].path === localPath + "/" + files[i].name);
        if (files[i].path.replace(/[^/]/g, "").length == localPath.replace(
                /[^/]/g, "").length + 1 &&
            files[i].path.trim() == (localPath + "/" + files[i].name)
            .trim()) {
            console.log(files[i].path);
            generateFileType(files[i]);
            emptyCheck += 1;
        }
    }
    if (emptyCheck == 0) {
        generateEmptyMessage();
    }
}

function generateFileType(file) {
    console.log("Generating File");
    var myDiv;
    var mySpan;
    var myIcon;

    if (file.type == "rtf") {
        myDiv = $("<div>").attr("id", file.path).attr("class", "file")
            .addClass("listView").appendTo(".folderContainer");
        mySpan = $("<span>").text(file.name).attr("class", "fileText")
            .appendTo(myDiv);
        myIcon = $("<i>").addClass("material-icons").text("assignment")
            .appendTo(mySpan);
        myDiv.dblclick(
                function() {
                	console.log("Double Click");
                    window.location
                        .replace("http://localhost:8080/file?intellitext=" +
                            username + $(this).attr("id"));});
    } else {
        myDiv = $("<div>").attr("id", file.path).attr("class", "folderDiv")
            .addClass("listView").appendTo(".folderContainer");
        mySpan = $("<span>").text(file.name).attr("class", "fileText")
            .appendTo(myDiv);
        myIcon = $("<i>").addClass("material-icons").text("folder").appendTo(
            mySpan);
    }
}

function generateEmptyMessage() {
    myText = $("<p>").attr("class", "emptyText").addClass("font-weight-light")
        .text("this folder is empty").appendTo(".folderContainer");
}

$(document).ready(function() {
    ajaxCalls();
    generateFirstFolders();
    init();
    window.addEventListener('popstate', function(e){
    	console.log("Changed");
    	currentPath = "";
        $(".folderContainer").empty();
        if (window.location.href.includes("=")) {
            temp = window.location.href.substring(
                window.location.href.indexOf("=") + 1,
                window.location.href.length);
            path = temp.substring(temp.indexOf("/"), temp.length);
            currentPath += path.substring(1, path.length);
        }
    	generateFirstFolders(currentPath);
    	init();
    	});
});

// context menu setup
$(document).bind("contextmenu", function(e) {
    e.preventDefault();
    $("#menu").css("left", e.pageX);
    $("#menu").css("top", e.pageY);
    $("#menu").fadeIn(200, startFocusOut());
});

function startFocusOut() {
    $(document).on("click", function() {
        $("#menu").hide();
        $(document).off("click");
    });
}