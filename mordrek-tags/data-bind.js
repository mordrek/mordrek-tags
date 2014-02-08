if(!window.databind)
{
	databind=[]
	var tp = Object.create(HTMLElement.prototype,
	{
		datafile: {	get:function(){return this._datafile;},
					set:function(v){this._datafile=v; this.load();}},
		data: 	{	get:function(){return this._data;},
					set:function(v){this._data=v; this.onData();}},				
		tag: 	{ 	get:function(){return this._tag;},
					set:function(v){this._tag=v;}},
		context:{ 	get:function(){return this._context;},
					set:function(v){this._context=v;}},
		template:{ 	get:function(){return this._template;},
					set:function(v){this._template=v; }},
		target:{ 	get:function(){return this._target;},
					set:function(v){this._target=v; }}
	});
	tp.createdCallback = function() 
	{
		//console.log("data-bind");
		this.style.display="none";
	    //if(this.attributes.tag)
			//console.log("tag:"+this.attributes.tag.value);
		var p=this.parentNode; while(p){ if(p.tagName==this.tagName) break; p=p.parentNode;   }
		this.parentBind=p;
		
		this.templateObject = this;
		if(this.attributes.context!=undefined) this.context = this.attributes.context.value;
		if(this.attributes.target!=undefined) this.target = this.attributes.target.value;
		if(this.attributes.template!=undefined) this.template = this.attributes.template.value;
		if(this.attributes.tag!=undefined) this.tag = this.attributes.tag.value; else this.tag="";
		if(this.attributes.datafile)this.datafile=this.attributes.datafile.value;
		else if(this.attributes.data)this.data =  this.attributes.data.value;
		else this.onData();
	};
	tp.attributeChangedCallback = function(n,old,val)
	{
		//console.log("attributeChangedCallback: "+n);
		
	};
	tp.load = function()
	{
		//console.log("load: "+this.datafile);
		if(!databind.cache)databind.cache=[];
		if(!databind.cachewait)databind.cachewait=[];
		if(this.datafile.indexOf('?')==-1)
		{
			if(databind.cache[this.datafile])
			{   //console.log("cache found for: "+this.datafile);
				this.onLoad(databind.cache[this.datafile]);
				return;
			}
			if(databind.cachewait[this.datafile])
			{
				//console.log("cachewait found for: "+this.datafile);
				databind.cachewait[this.datafile].push(this);
				return;
			}
		}
		//console.log("load: "+this.datafile);
		if(!databind.cachewait[this.datafile])
			databind.cachewait[this.datafile]=[]; 
		var f = new XMLHttpRequest();
		var that=this;
		f.open("GET", this.datafile, true);
		f.onreadystatechange = function() {
		  if (f.readyState === 4) {  // Makes sure the document is ready to parse.
			if (f.status === 200) {  // Makes sure it's found the file.
			  databind.cache[that.datafile]=f.responseText;
			  var wait = databind.cachewait[that.datafile];
			  while(wait.length>0)
				{
				var waitO = wait.splice(0, 1);
				waitO[0].onLoad(f.responseText);
				}
			  that.onLoad(f.responseText); 
			}
		  }
		}
		f.send(null);	
	};

	tp.onLoad = function(txt)
	{
		//console.log("onLoad");
		this.data = eval('('+txt+')');
	};
	tp.onData = function()
	{
		//console.log("onData for tag "+this.tag);
		if(this.parentBind && !this.parentBind._updated)
			return;
		this._updated=true;
		var o=this._data;
		var tgt = this;
		if(!o && this.parentBind) o=this.parentBind.data;
		
		if(o && this.template)
		{
			//console.log("template is "+this.template);
			this.templateObject = document.getElementById(this.template);
			//console.log("Found "+this.templateObject);
			this._orgChildren = null;
			if(!this.context) this.context="$";
		}
		if(o && this.context)
		{
			var inner = this._org;
			if(!inner) inner = this.templateObject.innerHTML;
			this._org=inner;
			if(this.template)
					this.templateObject.style.display="none";
			//console.log("Looking for context "+this.context);
			var cobj = jsonPath(o,this.context);
			var innerTot="";
			if(cobj)
			{
			for(var ci=0; ci < cobj.length;ci++)
				{
					var o2 = cobj[ci];
					var tmpDiv=document.createElement("DIV"); tmpDiv.innerHTML=inner;
					//console.log("TMPDIV with inner : "+inner);
					this.update(tmpDiv,o2,ci,cobj.length);
					innerTot = innerTot+tmpDiv.innerHTML;
				}
			} //else console.log("context "+this.context+" not found on "+o);
			if(this.target)
				{ 
				this.style.display='none'; 
				var targetO=document.getElementById(this.target);
				if(targetO) targetO.innerHTML=innerTot; 
				//else console.log("Cannot find target: "+this.target);
				this.innerHTML="";
				}
			else this.innerHTML=innerTot;
			/*var children = this._orgChildren;
			if(!children)
			{
				//console.log("Creating new children");
				var content = this.templateObject;
				if(content.content)
					content = content.content;
				children=[];
				for(var i=0; i < content.childNodes.length;i++)
				{
					var cnode = content.childNodes[i];
					children.push(cnode);
					//console.log("Adding "+cnode);
				}
				if(this.template)
					this.templateObject.style.display="none";
			}
			this._orgChildren=children;
			while (this.firstChild) 
				this.removeChild(this.firstChild);
			//console.log("Looking for context "+this.context);
			var cobj = jsonPath(o,this.context);
			if(cobj)
			{
			
			//console.log("o:"+cobj+" "+cobj.length);
			
			for(var ci=0; ci < cobj.length;ci++)
				{
					var o2 = cobj[ci];
					
					//console.log("Children found: "+children.length);
					for(var i=0; i < children.length;i++)
					{
						var cnode = children[i];
						console.log("Adding child "+cnode.tagName);
						var newNode = cnode.cloneNode(true);
						this.appendChild(newNode);
						this.update(newNode,o2,ci,cobj.length);
						if(this.target){ this.style.display='none'; document.getElementById(this.target).innerHTML=this.innerHTML; this.innerHTML="";}

					}
					
					
				 }
				
			} else console.log("context "+this.context+" not found on "+o); */
		}
		else 
		{
			this.update(this,o);
			if(this.target){ this.style.display='none'; document.getElementById(this.target).innerHTML=this.innerHTML; this.innerHTML="";}
					
		}		
		
		
	};
	tp.update=function(node,data, i,l)
	{
		//console.log("update for tag "+this.tag);
		
		var txt = node._org;
		if(!txt) 
			{ txt = node.innerHTML; if(!txt) txt=node.innerText; if(!txt) txt=node.nodeValue; 
			//console.log("First time node:"+txt+" "+node.tagName);
			if(!txt)
				{// console.log("No data here: "+node);return;
				}
			}
			//else  console.log("Second time node:"+txt);
		node._org=txt;
		var res=this.alter(txt,data,i,l);
		
		if(node.innerHTML)
			node.innerHTML = res;
		else if(node.innerText)
			node.innerText = res;
		else node.nodeValue =res;
		this.shadowSearch(node);
		this.style.display="block";
		
	// Look through all attributes
					//console.log("+NODE "+node.tagName);
		/*var dic=[];
		if(node.attributes!=undefined)
		{
			for(var i2 = 0; i2 <node.attributes.length;i2++)
			{
				var attr = node.attributes[i2];
				console.log("ATTR "+attr.name+" = "+attr.value);
				if(attr.value!=null && attr.value != undefined)
				{
				dic[attr.name]=attr;
				var newVal = this.alter(attr.value, data,i,l);
				if(newVal!=null)
					attr.value = newVal;
				}
			}
			for(var i2 = 0; i2 <node.attributes.length;i2++)
			{
				var attr = node.attributes[i2];
				if(attr.value!=null && attr.value != undefined && attr.name != null)
				{
				
				 var xi = attr.name.indexOf("_shadow");
				 if(xi!= -1)
				 {
				 
					var orgAttrName = attr.name.substr(0,xi); 
					console.log("_shadow as postfix on "+orgAttrName+" using shadow value "+attr.value);
					var orgAttr = dic[orgAttrName];
					orgAttr.value = attr.value;
				 }
				}
			}
		}
		
		var childCount=0;
		if(node.childNodes!=undefined)
		{
		
			// Look through children
			console.log("Children in "+node.tagName+":"+node.childNodes.length);
			for (var i2 = 0; i2 < node.childNodes.length; i2++) 
			{
				var n=node.childNodes[i2];
				console.log("update "+n.innerHTML);
				if(n.tagName!=null)
				{
					console.log("update child");
					this.update(n,data,i,l);
					childCount++;
				}
			}
		}
		if(childCount==0)
		{
			console.log("INNER:"+node.innerHTML);
			var newVal = this.alter(node.innerHTML, data,i,l);
			if(newVal!=null)
				node.innerHTML = newVal;
		}	
		*/
		
	};
	tp.alter=function(str,data,i,l)
	{
		var res=str;
		while(str)
		{
		var sTag =this.tag; if(sTag!="") sTag=sTag+":";
		var reg="{{"+sTag+"[^{{]*?}}"; 
		//console.log("search "+str+" for "+reg+" in "+data);
		var index = str.search(reg);
		if(index != -1)
			{
				var indexEnd = str.substr(index).search("}}");
				var param = str.substr(index+2+sTag.length,indexEnd-2-sTag.length);
				//console.log(index+":"+indexEnd+":"+param);
				
				var val = "";
				if(param=="#index")
					val = i+1;
				else if(param=="#length")
					val = l;
				else if(param.substr(0,1)=="=")
					{
						val=eval(param.substr(1));
					}
				else
					{
					var rep = jsonPath(data,param);
					//console.log("evaluate "+param+" on the  doc "+xmldoc+" gives "+rep);
					if(!rep || rep==false){val="?"+param;}
					else
						val = rep[0];
					}
				str = str.replace("{{"+sTag+param+"}}",val );
				//console.log("replace "+"{{"+sTag+param+"}} with "+val+" giving "+str);
				res = str;
				
			}
		else 
			{
			
			return res;
			}
		}				
		return res;
	};

	tp.shadowSearch=function(n)
	{
		if(n.attributes!=undefined)
		{
			for(var i2=0; i2 < n.attributes.length;i2++)
			{
				var attr = n.attributes[i2];
				if(attr.value!=null && attr.value != undefined && attr.name != null)
				{
				
				 var xi = attr.name.indexOf("_shadow");
				 if(xi!= -1)
				 {
				 
					var orgAttrName = attr.name.substr(0,xi); 
					//console.log("_shadow as postfix on "+orgAttrName+" using shadow value "+attr.value);
					var orgAttr = n.attributes[orgAttrName];
					orgAttr.value = attr.value;
				 }
				}
			}
		}
		if(n.childNodes!=undefined)
		{
			// Look through children
			for (var i2 = 0; i2 < n.childNodes.length; i2++) 
				this.shadowSearch(n.childNodes[i2]);
		}	
	}

	//console.log("registering data-bind");
	var tag = document.registerElement('data-bind', {
	  prototype: tp
	});
	_databind_start = function(o)
	{
	//console.log("DATABIND_START");
		var node; node = document.getElementsByName('data-bind');
		for (var i = node.length-1; i>=0; i--) {
		node[i].onData();
		}
	}/*
	if(window.addEventListener){
		window.addEventListener('load',_databind_start,false); //W3C
	}
	else{
		window.attachEvent('onload',_databind_start); //IE
	}*/
}