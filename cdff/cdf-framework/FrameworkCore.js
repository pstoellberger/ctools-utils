var CdfFramework = {

    jsUrl       : "res/" + Dashboards.context.fullPath.replace(".wcdf",".cdff.js"),
    cssUrl      : "res/" + Dashboards.context.fullPath.replace(".wcdf",".cdff.css"),
    templateUrl : "res/" + Dashboards.context.fullPath.replace(".wcdf",".cdff.html"),

    init: function() {
            $("<link/>", {
               rel: "stylesheet",
               type: "text/css",
               href: this.cssUrl,
            }).appendTo("head");
            $("<script/>", {
               type: "text/javascript",
               src: this.jsUrl,
            }).appendTo("head");

/*
            var script = document.createElement('script');
                script.type = "text/javascript";
                script.src = this.jsUrl;
                document.getElementsByTagName('head')[0].appendChild(script);

            $.ajax({
              url: this.jsUrl,
              dataType: "script",
              async: false
            });

*/
            if (CdfFramework.dashboard) {
                if (CdfFramework.dashboard.templateUrl) {
                        CdfFramework.dashboard.templateHtml = this.getTemplate(CdfFramework.dashboard.templateUrl);    
                }
                if (!CdfFramework.dashboard.htmlContent) {
                    var url = (CdfFramework.dashboard.htmlContentUrl ? CdfFramework.dashboard.htmlContentUrl : this.templateUrl);
                    CdfFramework.dashboard.htmlContent = this.getTemplate(url);
                }

                if (CdfFramework.dashboard.templateHtml && CdfFramework.dashboard.templateHtml != "") {
                    $('#content').html(_.template(CdfFramework.dashboard.templateHtml, CdfFramework.dashboard));
                } else if (CdfFramework.dashboard.htmlContent && CdfFramework.dashboard.htmlContent != "") {
                    $('#content').html(_.template(CdfFramework.dashboard.htmlContent, CdfFramework.dashboard));
                } else {
                    Dashboards.log("Cannot find widget template or dashboard content - using default template content!");
                }
            }
    },

    getTemplate: function(url) {
        var templateHtml = null;
        try {
            if (!url) {
                return null;
            }
            var response = $.ajax({
                              url: url,
                              dataType: "script",
                              async: false
                          });

            if (response && response.responseText && response.status == 200) {
                Dashboards.log("Loaded template from " + url);
                templateHtml = response.responseText;    

                $(document).ready(function() {
                    $('<script type="text/x-jquery-tmpl" id="' + url + '"></script>')
                        .html(templateHtml)
                        .appendTo("body");
                });

            } else {
                Dashboards.error("Failed to load template from " + url);
            }
        } catch(e) {
            Dashboards.error("Failed to load template" , e);
        }
        return templateHtml;
    }
};


var preInit = (Dashboards.preInit  ? Dashboards.preInit : null);

Dashboards.preInit = function () {
    if (preInit) {
        preInit();
    }
    CdfFramework.init();
    
    _.each(Dashboards.components, function(component) {
        if (component.type.indexOf("ccc") > -1) {
            if (component.name in ChartTemplates) {
                Dashboards.log("Found template for chart " + component.name);
                var ct = ChartTemplates[component.name];
                component.cccType = ct.cccType;
                ct.chartDefinition.extensionPoints = _.extend(component.chartDefinition.extensionPoints);
                component.chartDefinition = _.extend(component.chartDefinition, ct.chartDefinition);
            }
        } else if (component.type == "Table") {
            Dashboards.log("found table");

            component.extraOptions = _.union(component.extraOptions, [["sSortable","header"],["sPaginationType","bootstrap"],["sSortAsc","header headerSortUp"],["sSortDesc","header headerSortDown"]]);
            var previousPostExec = null;
            if (component.postExecution) {
                previousPostExec = component.postExecution;
            } else {
                previousPostExec = function() { return true; };
            }
            var bootstrapTable = function() {
                    component.ph.find('.tableComponent').addClass('form-inline table table-striped table-bordered');
                    component.ph.find('.dataTables_paginate ul').addClass('pagination');
                    component.ph.find('.dataTables_filter input').addClass('form-control');
                    var sparkO = (_.find(component.extraOptions, function(e) { return e[0] == "spark";}));
                    if (sparkO && sparkO[1]) {
                        Dashboards.log("render spark for " + component.name  + " : " + sparkO[1]);
                        render_row_viz(component.ph, sparkO[1], component.name);
                    }
                    var arrow = (_.find(component.extraOptions, function(e) { return e[0] == "arrow";}));
                    if (arrow) {
                        Dashboards.log("render arrow for " + component.name );
                        render_arrow(component.ph, component.name);
                    }
                    var group = (_.find(component.extraOptions, function(e) { return e[0] == "group";}));
                    if (group && group[1]) {
                        Dashboards.log("group table by " + group[1] + " for " + component.name );
                        groupTable(component, group[1]);
                    }
            };
            component.postExecution =  function() {

                try {
                    bootstrapTable();
                        if (previousPostExec) {                            
                                previousPostExec();
                        }
                    } catch(e) {
                            Dashboards.log("Error: " + e);
                    }

                    return true;
            };
        }
    });
};


