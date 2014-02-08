function loadScript(url, c){
	if(!window._loadsLeft)window._loadsLeft=0;
	window._loadsLeft++;
    var s = document.createElement("script")
    s.type = "text/javascript";
    if (s.readyState){  //IE
        s.onreadystatechange = function(){
            if (s.readyState == "loaded" ||
                    s.readyState == "complete"){
                s.onreadystatechange = null;
				window._loadsLeft--;
                c();
            }
        };
    } else {  //Others
        s.onload = function(){
			window._loadsLeft--;
            c();
        };
    }
	s.src = url;
    document.getElementsByTagName("head")[0].appendChild(s);
}

function loadNext()
{
	if(!window.CustomElements)
	{
		console.log("Loading custom-elements");
		loadScript("mordrek-tags/custom-elements.min.js",(function(){console.log("custom-elements loaded");loadNext();}));
	}
	else if(!window.jsonPath) 
	{
		console.log("Loading jsonpath-0.8.0");
		loadScript("mordrek-tags/jsonpath-0.8.0.js",(function(){console.log("jsonpath-0.8.0 loaded");loadNext();}));
		
		loadScript("mordrek-tags/data-bind.js", loadNext);
	}
	else if(window._loadsLeft==0)
	{
		window.mtags=true;
		/*
		var oldBody = document.body.cloneNode(true);
		document.body.innerHTML=""; 
		document.body=oldBody;*/
	}
}

loadNext();
