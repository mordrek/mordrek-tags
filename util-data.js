testdata =
{
	texttranslate :
	[
		 
		{
			name : "Standard translation",
			selected : true,
			value : '\
<!-- The following is already declared on this page:\r\n\
<script>\r\n\
lang_en = { "title"				:"Hello world",\r\n\
			"welcome_message" 	: "Welcome"	};\r\n\
lang_sv = { "title"				:"Hej värld",\r\n\
			"welcome_message" 	: "Välkommen"};\r\n\
</script>-->\r\n\
<text-translate id="intro" dictionary="lang_en">\r\n\
		<h1><span>title</span></h1>\r\n\
		<span>welcome_message</span>\r\n\
		<span>text without valid key</span>\r\n\
</text-translate><br/>\r\n\
<button onclick="intro.dictionary=\'lang_sv\';">Click for swedish</button>\r\n\
<button onclick="intro.dictionary=\'lang_en\';">Click for english</button>\r\n\
'
		}
	],
	xmldata : 
	[
		{
			name : "Direct data setting from file",
			selected : true,
			value : '\
<!-- Double brackets contains the xpath acting on the data -->\r\n\
<xml-data datafile="util-data.xml">\r\n\
	<span>Some text with {{./data/text/text2}}</span>\r\n\
</xml-data>\r\n\
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
	<span>Some text with {{./data/text/text2}}</span>\r\n\
</xml-data>\r\n\
',
		},
		{
			name : "Setting data with default value",
			selected : false,
			value : '\
<!-- Any attribute that has a "shadow"-value ending in _xml gets changed -->\r\n\
<!-- while still having a nice default value when no data or datafile is set -->\r\n\
<xml-data datafile="util-data.xml">\r\n\
	<img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSYNKCLMx3l-w-vaVaLkVe3il2eKuwY9qnrDMSWhcFtAcQ4eOTrdBZzjdNB" \r\n\
	     src_xml="{{./data/img/img1}}"></span>\r\n\
</xml-data>\r\n\
'
		},
		{
			name : "Using template and context path",
			selected : false,
			value : '\
<!-- Templates may be used instead of sub-tags -->\r\n\
<!-- The context is iterated through, multiplying the acting template -->\r\n\
<xml-data datafile="util-data.xml" context="/data/text/*" template="templateId" />\r\n\
<template id="templateId">\r\n\
	<span>{{./}}</span>\r\n\
</template>\r\n\
			'
		},
	]
}
