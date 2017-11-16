$(documnet).ready(function(){
	
	var user; 
	var recentFiles;
	var files;
	var filesInLocalPath;
	
	$.ajax({
		
		type:"GET", 
		url:"/conf/storage", 
		contentType: "application/json", 
		dataType: 'json',
		sucess: function(data)
		{files = data;}, 
		failure: function(resp)
		{console.log(resp);}
	});
	
	$.ajax({
		
		type:"GET", 
		url:"/conf/user", 
		contentType: "application/json; ", 
		dataType: 'json',
		sucess: function(data)
		{user = data;}, 
		failure: function(resp)
		{console.log(resp);}
	});
	
	$.ajax({
		
		type:"GET", 
		url:"/conf/storage/recent", 
		contentType: "application/json;", 
		dataType: 'json',
		sucess: function(data)
		{recentFiles = data;}, 
		failure: function(resp)
		{console.log(resp);}
	});	
	
	$("#newFile").onClick(function(){
		$.ajax({
            headers: {
                "Content-Type": "application/json"
            },
            method: 'POST',
            url: '/conf/storage',
            data: JSON.stringify(
            {
            	 path = getPath(),
            	 name = "Unnamed Document",
            	 owner = user,
            	 type = "rtf",
            	 lastModified = {date:getDate(), year:getYear(), month: getMonth()},
            	 dateCreated = {date:getDate(), year:
            		 getYear(), month: getMonth()},
            	 sharedWith = null
            }		
            
            )
        }).done(function(data) {
            result = data;
        }).fail(function(data) {
            console.log("error: ");
            console.log(data);
        });
		
		
	}); 
	
	
}); 