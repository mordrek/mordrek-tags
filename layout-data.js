testdata =
{
	dockpanel :
	[
		 
		{
			name : "Standard Docking",
			selected : true,
			value : '\
<style>\r\n\
  .red1{background-color:#ff0000;} .red2{background-color:#ff4400;}\r\n\
  .red3{background-color:#ff8800;} .red4{background-color:#ffbb00;}\r\n\
  .red5{background-color:#ffdd00;}\r\n\
</style>\r\n\
<dock-panel>\r\n\
   <dock-panel dock="top"    size="40px" class="red1">Top</dock-panel>\r\n\
   <dock-panel dock="left"   size="40px" class="red2">Left</dock-panel>\r\n\
   <dock-panel dock="bottom" size="20%"  class="red3">Bottom</dock-panel>\r\n\
   <dock-panel dock="right"  size="20%"  class="red4">Right</dock-panel>\r\n\
   <dock-panel dock="fill" class="red5">Fill</dock-panel>\r\n\
</dock-panel>'
			
		},{
			name : "Panels within panels",
			value :  '\
<style>\r\n\
  .red1{background-color:#ff0000;} .red2{background-color:#ff4400;}\r\n\
  .red3{background-color:#ff8800;} .red4{background-color:#ffbb00;}\r\n\
  .red5{background-color:#ffdd00;} .blue1{background-color:#0000ff;}\r\n\
  .blue2{background-color:#4444ff;} .blue3{background-color:#8888ff;}\r\n\
  .blue4{background-color:#bbbbff;} .blue5{background-color:#ddddff;}\r\n\
</style>\r\n\
<dock-panel>\r\n\
   <dock-panel dock="top"    size="40px" class="red1">Top</dock-panel>\r\n\
   <dock-panel dock="left"   size="40px" class="red2">Left</dock-panel>\r\n\
   <dock-panel dock="bottom" size="20%"  class="red3">Bottom</dock-panel>\r\n\
   <dock-panel dock="right"  size="20%"  class="red4">Right</dock-panel>\r\n\
   <dock-panel dock="fill" class="red5">\r\n\
	   <dock-panel dock="top"    size="40px" class="blue1">T</dock-panel>\r\n\
	   <dock-panel dock="left"   size="40px" class="blue2">L</dock-panel>\r\n\
	   <dock-panel dock="bottom" size="20%"  class="blue3">B</dock-panel>\r\n\
	   <dock-panel dock="right"  size="20%"  class="blue4">R</dock-panel>\r\n\
	   <dock-panel dock="fill" class="blue5">F</dock-panel>\r\n\
   </dock-panel>\r\n\
</dock-panel>'
		},
	]
}
