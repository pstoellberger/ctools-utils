CdfFramework.dashboard = {
	title    		  : "CDFF Sample1",
	templateUrl		  : "res/cdf-framework/templates/Single.html", // optional
	templateHtml	  : null,								   // optional, if templateUrl set, the framework will try to load that
	htmlContentUrl	  : null,								   // optional, 1) htmlContent 2) <dashboard name>.html in same directory, then htmlContentUrl
	htmlContent		  : null // I could be using this but instead we will load it via the <dashboard name>.html 
	/*
	'		<div id="chart" />' +
						'	    <div id="table" class="table"/>' +
						'		<div id="legend" />'
	*/
};

// We could include some global chart definitions somwehere accessible for all charts and make the one for this chart inherit
GlobalChartDefinitions = {
	titleFont: "14px Arial"
};

// Chart definition for the component "bar" => "render_bar" in the Dashboards.components
// anything defined here will override the properties defined in the CDE editor
// usually i would recommend only defining the canvas and width if you want in the CDE editor, or define it all in here

ChartTemplates.render_bar = {
	cccType: pvc.HeatGridChart, // needs to match a protovis constructor being used
	chartDefinition: _.extend(
		cccOptionsDefault.Base, // CDFF comes with defaults for all charts
        cccOptionsDefault.HeatGridChart,  // and for heatgrid chart - for all defaults look at solution/cdf-framework/FrameworkTemplates.js
	    {
			canvas: "chart",
			width: 900,
			height: 500
		}, GlobalChartDefinitions) // GlobalChartDefinition would override all properties that need to be enforced over all charts for a common look

};