var recentFiles;
var files = [];
var today = new Date();
var username;
var profile;
var drag;
var drop;
var testVar = 0;
var currentPath = "/";

function init() {
	testVar = 5;
	console.log("Init Jquery");
	$(".file").dblclick(
			function() {
				window.location
						.replace("http://localhost:8080/file?intellitext="
								+ username + $(this).attr("id"));
			});
	$(".folderDiv").dblclick(
			function() {
				console.log("new path");
				generateNewLayer(currentPath);
				currentPath += $(this).attr("id");
	});

	$("#newFolderConfirm").click(function() {
		//console.log("New Folder");
		//yyyy.MM.dd HH:mm

		var folder = {
			"name" : $("#newFolderInput").val(),
			"color" : "#ffffff",
			"path" : "/" + $("#newFolderInput").val(),
			"owner" : profile.getEmail()
		}

		$.ajax({
			type : 'POST',
			url : "/conf/storage/insertfolder",
			data : JSON.stringify(folder),
			error : function(e) {
				console.log(e);
			},
			dataType : "json",
			contentType : "application/json"
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
				scrollTop : 0
			}, 700);
		});
	}

	$("#newTextFile").click(function() {

		$('#newFileModal').modal('toggle');
	});

	$("#newFileConfirm").click(
			function() {
				var date = {
					"Year" : today.getFullYear(),
					"Month" : today.getMonth() + 1,
					"Date" : today.getDate(),
					"Hour" : today.getHours() + 1,
					"Minute" : today.getMinutes()
				}

				var file = {
					"path" : "/" + $("#fileParentInput").val() + "/"
							+ $("#fileNameInput").val(),
					"storagePath" : "/",
					"name" : $("#fileNameInput").val(),
					"owner" : profile.getEmail(),
					"type" : "rtf",
					"color" : "#ffffff",
					"contents" : "{" + '"insert"' + ":" + '""' + "}",
					"lastModified" : today.getFullYear() + "."
							+ (today.getMonth() + 1) + "." + today.getDate()
							+ " " + (today.getHours() + 1) + ":"
							+ today.getMinutes(),
					"dateCreated" : today.getFullYear() + "."
							+ (today.getMonth() + 1) + "." + today.getDate()
							+ " " + (today.getHours() + 1) + ":"
							+ today.getMinutes(),
					"sharedWith" : null
				}

				$.ajax({
					type : 'POST',
					url : "/conf/storage/insert",
					data : JSON.stringify(file),
					error : function(e) {
						console.log(e);
					},
					dataType : "json",
					contentType : "application/json"
				});
			});
}
/** Google Verification **/

function onSignIn(googleUser) {
	console.log("Success");

	profile = googleUser.getBasicProfile();
	google = googleUser;
	username = profile.getEmail();
	// set user
	user = {
		"email" : profile.getEmail(),
		"firstName" : profile.getGivenName(),
		"lastName" : profile.getFamilyName(),
		"socialId" : profile.getId(),
		"tokenId" : googleUser.getAuthResponse().id_token
	};

	$.ajax({
		type : 'POST',
		url : "/conf/user",
		data : JSON.stringify(user),
		async : false,
		error : function(e) {
			console.log(e);
		},
		dataType : "json",
		contentType : "application/json"
	});

	console.log(user);

}

function ajaxCalls() {
	$.ajax({
		method : "GET",
		headers : {
			'Content-Type' : 'application/json'
		},
		url : "/conf/storage/folders",
		async : false
	}).done(function(data) {
		console.log("Finished Folder");
		for (var i = 0; i < data.length; i++) {
			files.push(data[i]);
		}
	});
	$.ajax({
		method : "GET",
		headers : {
			'Content-Type' : 'application/json'
		},
		url : "/conf/storage",
		async : false
	}).done(function(data) {
		console.log("Finished Files");
		for (var i = 0; i < data.length; i++) {
			files.push(data[i]);
		}
	});
	console.log(files);
}


function generateFirstFolders(){
	for(let i = 0; i < files.length; i++){
		if(files[i].path.replace(/[^/]/g, "").length == 1){
			console.log("First Folder! " + files[i].path);
			generateFileType(files[i]);
		}
	}
}

function generateNewLayer(path){
	console.log("New Layer");
	$(".folderContainer").empty();
	for(let i = 0; i < files.length; i++){
		if(files[i].path.replace(/[^/]/g, "").length == path.replace(/[^/]/g, "").length + 1 && files[i].path.includes(path)){
			console.log(files[i].path);
			generateFileType(files[i]);
		}
	}
}

function generateFileType(file){
	console.log("Generating File");
	var myDiv;
	var mySpan;
	
	if(file.type == "rtf"){
		myDiv = $("<div>").attr("id", file.path).attr("class", "folderDiv").addClass("listView").appendTo(".folderContainer");
		mySpan = $("<span>").text(file.name).attr("class", "fileText").appendTo(myDiv);
	}
	else{
		myDiv = $("<div>").attr("id", file.path).attr("class", "folderDiv").addClass("listView").appendTo(".folderContainer");
		mySpan = $("<span>").text(file.name).attr("class", "fileText").appendTo(myDiv);
	}
}


$(document).ready(function() {
	ajaxCalls();
	generateFirstFolders();
	init();
});