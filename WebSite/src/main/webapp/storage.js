var getPath = function()
{
	return "/"; 
}

$(document).ready(function(){ 
	var user; 
	var recentFiles;
	var files;
	var filesInLocalPath;
	var today = new Date(); 
	
	
	
	$.ajax({method: "GET",
        headers: {'Content-Type': 'application/json'},
        url: "/conf/user"
        }).done(function(data) {  user = data; console.log(data); });
	
	
	//console.log("Hallo1"); 
	$.ajax({method: "GET",
        headers: {'Content-Type': 'application/json'},
        url: "/conf/storage"
        }).done(function(data) {  files = data; console.log(data);});

	$.ajax({method: "GET",
        headers: {'Content-Type': 'application/json'},
        url: "/conf/storage/recent"
        }).done(function(data) {  recentFiles = data; console.log(data);});
	
	console.log("Hallo2"); 
	
	/*$.ajax({
		
		type:"GET", 
		url:"/conf/storage", 
		contentType: "application/json", 
		dataType: 'json',
		sucess: function(data)
		{files = data;
		console.log("Hello"); }, 
		fail: function(resp)
		{console.log(resp);}
		
	});
	
	$.ajax({
		
		type:"GET", 
		url:"/conf/user", 
		contentType: "application/json; ", 
		dataType: 'json',
		sucess: function(data)
		{user = data;
		console.log(data);}, 
		fail: function(resp)
		{console.log(resp);}
	});
	
	$.ajax({
		
		type:"GET", 
		url:"/conf/storage/recent", 
		contentType: "application/json;", 
		dataType: 'json',
		sucess: function(data)
		{recentFiles = data;
		console.log(data);}, 
		fail: function(resp)
		{console.log(resp);}
	});	
	
	$("#newFile").click(function(){
		$.ajax({
            headers: {
                "Content-Type": "application/json"
            },
            method: 'POST',
            url: '/conf/storage',
            data: JSON.stringify(
            {
            	 path: getPath(),
            	 name : "Unnamed Document",
            	 owner : user,
            	 type : "rtf",
            	 lastModified : {date:today.getDate(), year:today.getFullYear(), month: today.getMonth()+1},
            	 dateCreated : {date:today.getDate(), year:
            		 today.getFullYear(), month: today.getMonth()},
            	 sharedWith : null
            }		
            
            )
        }).done(function(data) {
            result = data;
        }).fail(function(data) {
            console.log("error: ");
            console.log(data);
        });
		
		
	}); */
	

});