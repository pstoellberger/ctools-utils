var cccOptionsDefault = {
        Base: {
            animate: false,
            selectable: true,
            valuesVisible: false,
            legend:  true,
            legendPosition: "top",
            legendAlign: "right",
            legendSizeMax: "30%",
            axisSizeMax: "40%",
            plotFrameVisible : false,
            orthoAxisMinorTicks : false,
            colors: ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5" ]
        },
        
        HeatGridChart: {
            orientation: "horizontal",
            useShapes: true,
            shape: "circle",
            nullShape: "cross",
            colorNormByCategory: false,
            sizeRole: "value",
            legend: false,
            hoverable: true,
            axisComposite: true,
            colors: ["red", "yellow", "lightgreen", "darkgreen"],
            xAxisSize: 130,
            yAxisSize: 130
        },
        
        WaterfallChart: {
            orientation: "horizontal"
        },
        
        PieChart: {
            multiChartColumnsMax: 3,
            multiChartMax: 30,
            smallTitleFont: "bold 14px sans-serif",
            valuesVisible: true,
            valuesMask: "{value.percent}",
            explodedSliceRadius: "10%",
            extensionPoints: {
                slice_innerRadiusEx: '40%',
                 slice_offsetRadius: function(scene) {
                       return scene.isSelected() ? '10%' : 0;
                }
            },
            clickable: true
        },
        
        LineChart: {
            extensionPoints: {
                area_interpolate: "monotone", // cardinal
                line_interpolate: "monotone"
            }
        },
        
        StackedAreaChart: {
            extensionPoints: {
                area_interpolate: "monotone",
                line_interpolate: "monotone"
            }
        }
};

var ChartTemplates = {
    "render_subscriberDetails" : {
        chartDefinition : _.extend(cccOptionsDefault.Base, 
                                    cccOptionsDefault.StackedAreaChart, 
                                        { 
                                            orientation : "vertical",
                                            animate: false,
                                            stacked: true
                                        }),
        cccType:  pvc.StackedAreaChart
    }
};
