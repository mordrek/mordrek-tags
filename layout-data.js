testdata =
{
	dockpanel :
	[
		{
			name : "Select demo here",
			selected : true,
			value : ''
		},
		{
			name : "Standard Docking",
			value : '\
<style>\n\
  .red1{background-color:#ff0000;},.red2{background-color:#ff4400;}\n\
  .red3{background-color:#ff8800;},.red4{background-color:#ffbb00;}\n\
  .red5{background-color:#ffdd00;}\n\
</style>\n\
<dock-panel>\n\
   <dock-panel dock="top"    size="80px" class="red1">Top</dock-panel>\n\
   <dock-panel dock="left"   size="80px" class="red2">Left</dock-panel>\n\
   <dock-panel dock="bottom" size="20%"  class="red3">Bottom</dock-panel>\n\
   <dock-panel dock="right"  size="20%"  class="red4">Right</dock-panel>\n\
   <dock-panel dock="fill" class="red5">Fill</dock-panel>\n\
</dock-panel>'
			
		},
	]
}
