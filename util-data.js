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
	]
}
