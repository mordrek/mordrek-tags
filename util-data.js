testdata =
{

	xmldata : 
	[
		{
			name : "Direct data setting from file",
			selected : true,
			value : '\
<!-- Basic form is {{xml:XPATH}} acting on the datafile -->\r\n\
<xml-data datafile="util-data.xml">\r\n\
	<span>This page says {{xml:./data/text/hello}}</span>\r\n\
</xml-data>\r\n\
'
		},
		{
			name : "Swapping data source (for example language)",
			selected : false,
			value : '\
<xml-data id="data" datafile="util-data.xml">\r\n\
	<span>This page says {{xml:./data/text/hello}}</span>\r\n\
</xml-data><br/>\r\n\
<button onclick="data.datafile=\'util-data-se.xml\';">Click for swedish</button>\r\n\
<button onclick="data.datafile=\'util-data.xml\';">Click for english</button>\r\n\
'
		},		
		{
			name : "Direct data setting from data",
			selected : false,
			value : '\
<!-- For debugging or setting from javascript -->\r\n\
<xml-data data=\r\n\
	"<data>\r\n\
		<text>\r\n\
			<text1>This is text1</text1>\r\n\
			<text2>This is text2</text2>\r\n\
		</text>\r\n\
	</data>">\r\n\
	<span>Here we display: {{xml:./data/text/text2}}</span>\r\n\
</xml-data>\r\n\
',
		},
		{
			name : "Nested binding",
			selected : false,
			value : '\
<!-- Nested binding is done from inside and out -->\r\n\
<xml-data datafile="util-data.xml">\r\n\
	<span>This page says {{xml:./data/text/{{xml:./data/text/link}}}}</span>\r\n\
</xml-data>\r\n\
'
		},

		{
			name : "Setting data with default value",
			selected : false,
			value : '\
<!-- Any attribute that has a "shadow"-value ending in _shadow gets changed -->\r\n\
<!-- while still having a nice default value when no data or datafile is set -->\r\n\
<xml-data datafile="util-data.xml">\r\n\
	<img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSYNKCLMx3l-w-vaVaLkVe3il2eKuwY9qnrDMSWhcFtAcQ4eOTrdBZzjdNB" \r\n\
	     src_shadow="{{xml:./data/img/img1}}"></span>\r\n\
</xml-data>\r\n\
'
		},
		{
			name : "Setting data with single context",
			selected : false,
			value : '\
<!-- The context acts is an xpath to the node in the xml used as starting point -->\r\n\
<xml-data datafile="util-data.xml" context="./data/text">\r\n\
	<span>This page says {{xml:./hello}}</span>\r\n\
</xml-data>\r\n\
'
		},
		{
			name : "Setting data with multiple contexts",
			selected : false,
			value : '\
<!-- If the context finds many elements, these are iterated through and the content is repeated -->\r\n\
<!-- Special tokens #index and #length is added to help the iteration handling -->\r\n\
<xml-data datafile="util-data.xml" context="./data/text/*">\r\n\
	<span>This page ({{xml:#index}}/{{xml:#length}}) says {{xml:.}}</span><br/>\r\n\
</xml-data>\r\n\
'
		},
		{
			name : "Using template and multiple contexts",
			selected : false,
			value : '\
<!-- Templates may be used instead of sub-tags -->\r\n\
<!-- The context is iterated through, multiplying the acting template -->\r\n\
<!-- Special tokens #index and #length is added to help the iteration handling -->\r\n\
<template id="templateId">\r\n\
	<span>This page ({{xml:#index}}/{{xml:#length}}) says {{xml:.}}</span><br/>\r\n\
</template>\r\n\
<xml-data datafile="util-data.xml" context="/data/text/*" template="templateId" ></xml-data>\r\n\
			'
		},
	]
}
