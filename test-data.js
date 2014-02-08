{

	databind : 
	{
		title:"&lt;data-bind&gt;",
		id:"databind",
		intro: 
"Used to bind data, usually from other file, to a template to create a page.<br/>\
The binding can include nested bindings and several data sources and javascript<br/>\
can be put inline to spice things up",
		attributes:
			[
				{ title:"datafile",optional:true,type:"URL",description:"URL to json file containing data",sample:"myData.json" }
			],
		usage:
"Put &lt;data-bind&gt; around the content you wish to bind or use the template argument to target a template.<br/>\
Use a context if you wish to repeat the content (or template) based on data.<br/>\
Place binding sections anywhere inside the content (or template) to bind data.<br/>\
Bindings are identified by being inside double brackets and may be tagged.<br/>\
{{BINDING}}, {{TAG:BINDING}}, {{TAG:BINDING}}, {{=JAVASCRIPT}}, {{#SPECIALVARIABLE}}<br/>\
Bindings are done using <a href=&quot;http://goessner.net/articles/JsonPath/&quot; target=&quot;_blank&quot;>JSONPath</a>, similar to XPath <br/>\
See the samples for more information on specific cases",
		
		samples:
			[
				{title:"Select sample here",sample:''},
				{title:"Simple binding",sample:
'&lt;!-- Simple binding of data from a file into the content inside the tag --&gt;\r\n\
&lt;data-bind datafile=&quot;sampledata/sample-data.json&quot;&gt;\r\n\
	&lt;span&gt;Binding data in the middle of text: {{text.hello}} {{$..world}}&lt;/span&gt;\r\n\
&lt;/data-bind&gt;\r\n'},
				{title:"Switching data/translation",sample:
'&lt;!-- The attribute data or datafile can be used to swap data on the fly --&gt;\r\n\
&lt;data-bind id=&quot;myTag&quot; datafile=&quot;sampledata/sample-data.json&quot;&gt;\r\n\
	&lt;span&gt{{text.hello}} {{$..world}}&lt;/span&gt;\r\n\
&lt;/data-bind&gt;<br/>\r\n\
&lt;button onclick=&quot;myTag.datafile=\'sampledata/sample-data.json\'&quot;&gt;Click for english&lt;/button&gt;<br/>\r\n\
&lt;button onclick=&quot;myTag.datafile=\'sampledata/sample-data-se.json\'&quot;&gt;Click for swedish&lt;/button&gt;\r\n\
\r\n'},
				{title:"Nested binds",sample:
'<!-- Bindings can be encapsulated in each other, resolving from inside and out  -->\r\n\
<data-bind datafile=&quot;sampledata/sample-data.json&quot;>\r\n\
	<span>Binding data with nested binds: {{text.{{$..link}}}} </span>\r\n\
</data-bind>\r\n'},
				{title:"Nested tags",sample:
'<!-- Tags can be encapsulated in each other.  -->\r\n\
<!-- When nesting tags you must use the tag attribute to allocate the binds  -->\r\n\
<data-bind datafile=&quot;sampledata/sample-data.json&quot;  tag=&quot;en&quot;>\r\n\
	<data-bind datafile=&quot;sampledata/sample-data-se.json&quot; tag=&quot;se&quot;>\r\n\
		<span>First binding using the outmost tag: {{en:text.hello}} </span><br/>\r\n\
		<span>And then using our inner tag: {{se:text.hello}} </span>\r\n\
	</data-bind>\r\n\
</data-bind>\r\n'},
				{title:"Binding context",sample:
'<!-- A tag can use a context to specify where in the data you want to start -->\r\n\
<!-- This can be used to shorten the JSONPath on each bind -->\r\n\
<data-bind datafile=&quot;sampledata/sample-data.json&quot;  tag=&quot;one&quot;>\r\n\
	<data-bind datafile=&quot;sampledata/sample-data.json&quot; context=&quot;text&quot;  tag=&quot;two&quot;>\r\n\
		<span>Without context: {{one:text.hello}}</span><br/>\r\n\
		<span>With context: {{two:hello}}</span><br/>\r\n\
	</data-bind>\r\n\
</data-bind>\r\n'},
				{title:"Binding Repeater / iterator",sample:
'<!-- A tag can use a context to specify where in the data you want to start -->\r\n\
<!-- If this JSONPath gives several results, then content is repeated with a -->\r\n\
<!-- new data context for each repeat. #index and #length can be used -->\r\n\
<data-bind datafile=&quot;sampledata/sample-data.json&quot; context=&quot;text.*&quot;>\r\n\
	<span>Row ({{#index}}/{{#length}}): {{.}} </span><br/>\r\n\
</data-bind>\r\n'},
				{title:"Binding with context using template",sample:
'<!-- A template can be used instead of repeating the content inside the tag -->\r\n\
<!-- The template attribute is the id of the template you want to use -->\r\n\
<data-bind datafile=&quot;sampledata/sample-data.json&quot; context=&quot;text.*&quot; template=&quot;myTemplate&quot; >\r\n\
</data-bind>\r\n\
<template id=&quot;myTemplate&quot;>\r\n\
	<span>Row ({{#index}}/{{#length}}): {{.}} </span><br/>\r\n\
</template>\r\n'},
				{title:"Binding shadow attributes",sample:
'<!-- You can replace an attribute while still showing the default value -->\r\n\
<!-- in an editor, by using another attribute with the same name but ending  -->\r\n\
<!-- with _shadow that you use for binding -->\r\n\
<data-bind datafile=&quot;sampledata/sample-data.json&quot;>\r\n\
	<img src=\'sampledata/yawning-cat.jpg\'\r\n\
		src_shadow=\'sampledata/{{img.img1}}\' ><br/>\r\n\
</data-bind>\r\n'},
				{title:"Binding inline javascript",sample:
'<!-- A binding can be used to enter inline javascript -->\r\n\
<!-- The javascript bind looks like this {{=JAVASCRIPT}} -->\r\n\
<!-- By nesting binds you can also use javascript on bound items -->\r\n\
<data-bind>\r\n\
		<span>Today: {{=new Date().toLocaleString();}}</span><br/>\r\n\
</data-bind>\r\n'},
			]
	}
}
