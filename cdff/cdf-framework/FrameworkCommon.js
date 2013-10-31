
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
        var width = rowData.length * 9;

        $("<td class='spark'>&nbsp;<div id='chart" + prefix + index + "'></div></td>").appendTo($(element));

        

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
                $('#chart' + prefix + index).parent().width(width * 2);
                vis.render();
            }
    });
}; 

var render_arrow =  function(el, prefix) {
    $(el).find('tr').each(function(index, element) {
        var last = null;
        var first = true;
        $(element).find('td.numeric').each(function(i,data) {
            var val = $(data).text().replace(",","");
            var isEmpty = !(typeof val != "undefined" && val != "" && val != null && val  != "undefined");
            val = !isEmpty ? parseFloat(val) : 0;
            if ( (isEmpty) || (!first && last == val)) {
                $(data).addClass('arrow_none');
            } else {
                if (val > last) {
                    $(data).addClass('arrow_up');
                } else if (val < last) {
                    $(data).addClass('arrow_down');
                }
                last = val;
                first = false;
            }
        });
    });
}; 

var showDetails = function(event) {
    var h = $(event.currentTarget);
    var r = h.attr('rel');
    if (h.hasClass('expanded')) {
        h.parent().parent().find('tr[rel="' + r + '"].groupdetails').hide();
        h.removeClass('expanded');
        h.addClass('collapsed');
    } else {
        h.parent().parent().find('tr[rel="' + r + '"].groupdetails').show();
        h.addClass('expanded');
        h.removeClass('collapsed');
    }
    
};

var groupTable = function(component, column) {
    var table = component.ph;
    var grouping = null;
    var groupnr = 0;
    $(table).find('tbody td.' + column).each( function(index,element) {
        var text = $(element).text();
            if (grouping && grouping == text) {
                $(element).parent().addClass('groupdetails');
                $(element).parent().hide();
                $(element).text("");
            } else {
                $(element).parent().addClass('groupheader collapsed');
                grouping = text;
                groupnr++;
            }

            $(element).parent().attr('rel', 'group' + groupnr);
    });

    $(table).find('tr.groupheader').each(function(index,element) {
        var r = $(element).attr('rel');
        $(table).find('tr.groupheader[rel="' + r + '"] td.' + column).append(' <span class="badge pull-right">' + ($(table).find('tr.groupdetails[rel="' + r + '"]').length) + '</span>');
    });

    if (component.runCounter == 1) {

        $('<div class="btn-group span3 pull-left expand-btn-group"><button type="button" class="expandbtn collapsed btn btn-default">Expand Groups</button></div>')
            .insertBefore($(table));

        $('button.expandbtn').on('click', function() {
            if ($('button.expandbtn').hasClass('collapsed')) {
                $(table).find('.groupdetails').show();
                $(table).find('.groupheader').addClass('expanded');
                $(table).find('.groupheader').removeClass('collapsed');
                $('button.expandbtn').removeClass('collapsed').addClass('expanded').text('Collapse Groups');
            } else {
                $(table).find('.groupdetails').hide();
                $(table).find('.groupheader').removeClass('expanded');
                $(table).find('.groupheader').addClass('collapsed');    
                $('button.expandbtn').removeClass('expanded').addClass('collapsed').text('Expand Groups');
            }
            
        });
    }
    $(table).find('tr.groupheader').on('click', showDetails);
    $('button.expandbtn').removeClass('expanded').addClass('collapsed').text('Expand Groups');
};