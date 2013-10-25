CdfFramework.dashboard = {
	title    		  : "TEMPLATE Teilnehmner Zählung",
	templateUrl		  : "res/cdf-framework/templates/Single.html", // optional
	templateHtml	  : null,								   // optional, if templateUrl set, the framework will try to load that
	htmlContentUrl	  : null,								   // optional, 1) htmlContent 2) <dashboard name>.html in same directory, then htmlContentUrl
	htmlContent		  : null
	/* could look like this   
						'	    <div id="table" class="table clearfix"/>'
						+ ' 	<div class="hide">'
						+ '    		<div style="float:left;" id="detailObject">'
						+ '				<b>Details:</b>'
						+ '	    		<div id="chartDetails"></div>'
						+ '	    		<div id="tableDetails"></div>'
						+ '			</div> '
						+ '		</div>'
	*/
};
