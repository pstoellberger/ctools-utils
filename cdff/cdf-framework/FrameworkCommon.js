
jQuery.fn.dataTableExt.oSort['number-asc'] = function(a,b) {
    var x = a.match(/\\d/) ? a.replace( /[^\\d\\-\\.]/g, '\\' ) : 0;
    var y = b.match(/\\d/) ? b.replace( /[^\\d\\-\\.]/g, '\\' ) : 0;
    
    return parseFloat(x) - parseFloat(y);
};
  
jQuery.fn.dataTableExt.oSort['number-desc'] = function(a,b) {
    var x = a.match(/\\d/) ? a.replace( /[^\\d\\-\\.]/g, '\\' ) : 0;
    var y = b.match(/\\d/) ? b.replace( /[^\\d\\-\\.]/g, '\\' ) : 0;      
    return parseFloat(y) - parseFloat(x);
};
jQuery.fn.dataTableExt.oSort['total-asc'] = function(a,b) {
    return parseFloat(a) - parseFloat(b);
};
  
jQuery.fn.dataTableExt.oSort['total-desc'] = function(a,b) {
    return parseFloat(b) - parseFloat(a);
};
 
var render_row_viz =  function(el, type, prefix) {
    $(el).find('tr').each(function(index, element) {
        var rowData = [];
        $(element).find('td.numeric').each(function(i,data) {
            var val = $(data).text().replace(",","");
            val = (typeof val != "undefined" && val != "" && val != null && val  != "undefined") ? parseFloat(val) : 0;
            rowData.push(val);
        });
        
        $("<td class='spark'>&nbsp;<div id='chart" + prefix + index + "'></div></td>").appendTo($(element));

        var width = rowData.length * 9;

            if (rowData.length > 0) {
                var vis = new pv.Panel()
                    .canvas('chart' + prefix + index)
                    .height(12)
                    .width(width)
                    .margin(0);

                if (type == "spark_bar") {
                    vis.add(pv.Bar)
                        .data(rowData)
                        .left(pv.Scale.linear(0, rowData.length).range(0, width).by(pv.index))
                        .height(pv.Scale.linear(0,_.max(rowData)).range(0, 12))
                        .width(6)
                        .bottom(0);        
                } else if (type == "spark_line") {
                    width = width / 2;
                    vis.width(width);
                    vis.add(pv.Line)
                        .data(rowData)
                        .left(pv.Scale.linear(0, rowData.length - 1).range(0, width).by(pv.index))
                        .bottom(pv.Scale.linear(rowData).range(0, 12))
                        .strokeStyle("#000")
                        .lineWidth(1);        
                }
                vis.render();
            }
    });
}; 

var render_arrow =  function(el, prefix) {
    $(el).find('tr').each(function(index, element) {
        var last = null;
        $(element).find('td.numeric').each(function(i,data) {
            var val = $(data).text().replace(",","");
            val = (typeof val != "undefined" && val != "" && val != null && val  != "undefined") ? parseFloat(val) : 0;
            if (last == val) {
                $(data).addClass('arrow_none');
            } else if (val > last) {
                $(data).addClass('arrow_up');
            } else if (val < last) {
                $(data).addClass('arrow_down');
            }
            last = val;
        });
    });
}; 
