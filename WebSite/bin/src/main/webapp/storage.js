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


function initFolders() {
    $(".folderDiv").dblclick(
        function() {
            currentPath = $(this).attr("id");
            history.pushState({
                    id: 'file explorer'
                }, 'Explorer | IntelliText', window.location.href.split('/', 4)
                .join('/') +
                (currentPath.charAt(0) == '/' ? currentPath : "/" +
                    currentPath));
            generateNewLayer(currentPath);
        });
}

function init() {
    testVar = 5;
    console.log("Init Jquery");
    $("#newFolderConfirm").click(
        function() {
            // console.log("New Folder");
            // yyyy.MM.dd HH:mm

            let tempPath = (currentPath.charAt(0) === "/" ? "" : "/") + currentPath + (currentPath == '/' ? "" : "/") + $("#newFolderInput").val();

            var folder = {
                "name": $("#newFolderInput").val(),
                "color": "#ffffff",
                "path": tempPath,
                "owner": profile.getEmail(),
                "type": "folder"
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
        console.log("toggle!");
    });
    $("#newFolder").click(function() {
        $('#myModal').modal('toggle');
        console.log("toggle!");
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

            console.log("new file" + currentPath);

            let tempPath = "";
            
            if(currentPath == "/" || currentPath == ""){
            	tempPath = "/All" + "/" + $("#fileNameInput").val();
            }
            else{
            	tempPath = (currentPath.charAt(0) == '/' ? "" : "/") +
                currentPath + "/" + $("#fileNameInput").val();
            }
            
            var file = {
                "path": tempPath,
                "storagePath": "/",
                "name": $("#fileNameInput").val().trim(),
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

    $("#items>li").click(function() {
        console.log($(this).text());
        if ($(this).text().includes("assignment")) {
            $('#newFileModal').modal('toggle');
            console.log("toggle!");
        } else if ($(this).text().includes("folder")) {
            $('#myModal').modal('toggle');
            console.log("toggle!");
            console.log(currentPath);
        }
    });

}
/** Google Verification * */

function onSignIn(googleUser) {
    //console.log("Success");

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

    //console.log(path + "   current Path");

    if (temp.substring(0, temp.indexOf("/")) == user.email) {
        //console.log("URL Matches Prince");
    } else {
        //console.log("HACKER");
        // redirect
    }

    $("#welcomeMsg").text("Welcome " + profile.getGivenName() + "!");
    //console.log(user);
    init();
    initFolders();
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
        //console.log("Finished Folder");
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
        //console.log("Finished Files");
        for (var i = 0; i < data.length; i++) {
            files.push(data[i]);
        }
    });
    //console.log(files);
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
    generatePath(tempPath);
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
    
    let existCheck = 1;

    if(tempPath != "/"){
     existCheck = 0;
    for (let i = 0; i < files.length; i++) {
    	console.log("Exist check" + tempPath + "test" + files[i].path);
        if (tempPath == files[i].path + "/") {
        	existCheck += 1;
        }
    }
    }
    console.log("exist chec" + existCheck);
    if (emptyCheck == 0 || existCheck == 0) {
        generateEmptyMessage((existCheck == 0 ? "This folder path does not exist." : "This folder is empty."));
    }
}

function generateNewLayer(localPath) {
    /*
     * let temp =
     * window.location.href.substring(window.location.href.indexOf("=") + 1,
     * window.location.href.length); let tempPath =
     * temp.substring(temp.indexOf("/"), temp.length);
     */
    //console.log("New Layer " + localPath);
    let temp = window.location.href.substring(
        window.location.href.indexOf("=") + 1, window.location.href.length);
    let tempPath = temp.substring(temp.indexOf("/"), temp.length);

    console.log(tempPath + " gen path");

    $(".folderContainer").empty();
    $("#pathNav").empty();
    generatePath(tempPath);
    let emptyCheck = 0;
    for (let i = 0; i < files.length; i++) {
        //console.log(files[i].path + " : " + localPath + "/" + files[i].name);
        //console.log(files[i].path === localPath + "/" + files[i].name);
        if (files[i].path.replace(/[^/]/g, "").length == localPath.replace(
                /[^/]/g, "").length + 1 &&
            files[i].path.trim() == (localPath + "/" + files[i].name)
            .trim()) {
            //console.log(files[i].path);
            generateFileType(files[i]);
            emptyCheck += 1;
        }
    }
    if (emptyCheck == 0) {
        generateEmptyMessage();
    }
    initFolders();
}

function generateFileType(file) {
    //console.log("Generating File");
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
        myDiv.dblclick(function() {
            //console.log("Double Click");
            window.location.replace("http://localhost:8080/file?intellitext=" +
                username + $(this).attr("id"));
        });
    } else {
        console.log("Generating Folder");
        myDiv = $("<div>").attr("id", file.path).attr("class", "folderDiv")
            .addClass("listView").appendTo(".folderContainer");
        mySpan = $("<span>").text(file.name).attr("class", "fileText")
            .appendTo(myDiv);
        myIcon = $("<i>").addClass("material-icons").text("folder").appendTo(
            mySpan);
    }
}

function generatePath(path) {
    let usePath = path;
    if (path.charAt(path.length - 1) == '/') {
        usePath = path.substring(0, usePath.length - 1);
    }

    $("#pathNav").empty();

    if (path != "/") {
        let back = $("<div>").attr("id", "backButton");
        let backText = $("<p>").text("back to top ");
        let myIcon = $("<i>").addClass("material-icons")
            .text("keyboard_return").appendTo(backText);
        backText.appendTo(back);
        back.appendTo("#pathNav");
        back.click(function() {
            currentPath = "";
            history.pushState({
                    id: 'file explorer'
                }, 'Explorer | IntelliText', window.location.href.split('/', 4)
                .join('/') +
                (currentPath.charAt(0) == '/' ? currentPath : "/" +
                    currentPath));
            generateNewLayer(currentPath);
        });
    }

    let strings = usePath.split("/");
    //console.log(usePath);
    for (let i = 1; i < strings.length - 1; i++) {
        //console.log("Layer " + i);
        let currentName = strings[i];

        let tempStrings = strings;
        
        let tempPathArr = [];        
        for(let z = 0; z < i + 1; z++){
        	tempPathArr.push(tempStrings[z]);
        }
        console.log(tempPathArr);
        
        let temp = tempPathArr.join('/');
        console.log(temp + " temp");

        console.log(temp + " szdxghjkljffds;kpl''h");
        let myDiv = $("<div>").addClass("pathElement").attr("id", temp);
        let myP = $("<p>").text(currentName).appendTo(myDiv);
        myDiv.appendTo("#pathNav");
        let spacerDiv = $("<div>").addClass("pathSpacer");
        let spacer = $("<p>").text("/");
        spacer.appendTo(spacerDiv);
        spacerDiv.appendTo("#pathNav");
        
        myDiv.click(function() {            
            history.pushState({
                    id: 'file explorer'
                }, 'Explorer | IntelliText', window.location.href.split('/', 4)
                .join('/') +
                ($(this).attr("id") == '/' ? $(this).attr("id") :
                		$(this).attr("id")));
            console.log($(this).attr("id") == "/" ? $(this).attr("id") : $(this).attr("id"));
            generateNewLayer($(this).attr("id") == "/" ? $(this).attr("id") : $(this).attr("id"));
        });
    }
}

function generateEmptyMessage(text) {
    myText = $("<p>").attr("class", "emptyText").addClass("font-weight-light")
        .text(text).appendTo(".folderContainer");
}

$(document).ready(
    function() {
        ajaxCalls();
        generateFirstFolders();
        window.addEventListener('popstate', function(e) {
            //console.log("Changed");
            currentPath = "";
            $(".folderContainer").empty();
            if (window.location.href.includes("=")) {
                temp = window.location.href.substring(window.location.href
                    .indexOf("=") + 1, window.location.href.length);
                path = temp.substring(temp.indexOf("/"), temp.length);
                currentPath += path.substring(1, path.length);
            }
            generateFirstFolders(currentPath);
            init();
            initFolders();
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
    });
}