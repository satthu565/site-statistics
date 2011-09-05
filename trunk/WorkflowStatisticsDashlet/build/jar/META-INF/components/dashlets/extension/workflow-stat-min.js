(function(){var Dom=YAHOO.util.Dom,Event=YAHOO.util.Event;var $html=Alfresco.util.encodeHTML,$combine=Alfresco.util.combinePaths;Alfresco.dashlet.WorkflowStatistics=function WorkflowStatistics_constructor(htmlId){return Alfresco.dashlet.WorkflowStatistics.superclass.constructor.call(this,"Alfresco.dashlet.WorkflowStatistics",htmlId,["animation"]);};YAHOO.extend(Alfresco.dashlet.WorkflowStatistics,Alfresco.component.Base,{options:{componentId:"",userId:Alfresco.constants.USERNAME,startYear:"",endYear:""},onReady:function WorkflowStatistics_onReady(){Event.addListener(this.id+"-configure-link","click",this.onConfigClick,this,true);var date=new Date();this.options.startYear=date.getFullYear();this.options.endYear=date.getFullYear();this.refreshTitle();this.chartHandler();},onConfigClick:function WorkflowStatistics_onConfigClick(e){var actionUrl=Alfresco.constants.URL_SERVICECONTEXT+"modules/dashlets/workflow-stat/config/"+encodeURIComponent(this.options.componentId);Event.stopEvent(e);if(!this.configDialog){this.configDialog=new Alfresco.module.SimpleDialog(this.id+"-configDialog");this.configDialog.setOptions({width:"30em",templateUrl:Alfresco.constants.URL_SERVICECONTEXT+"modules/dashlets/workflow-stat/config",actionUrl:actionUrl,onSuccess:{fn:function WorkflowStatistics_onConfigFeed_callback(response){if(response.json.data.userId==""||response.json.data.userId=="*"){response.json.data.userId="ALL";}if(response.json.data.yearRangeCheck!="on"){response.json.data.endYear=response.json.data.startYear;}if(this.options.userId!=response.json.data.userId||this.options.startYear!=response.json.data.startYear||this.options.endYear!=response.json.data.endYear){this.options.userId=response.json.data.userId;this.options.startYear=response.json.data.startYear;this.options.endYear=response.json.data.endYear;this.refreshTitle();this.chartHandler();}},scope:this},onFailure:{fn:function WorkflowStatistics_onConfigFeed_failure(response){Alfresco.util.PopupManager.displayMessage({text:this.msg("Unable to Process Request")});},scope:this},doSetupFormsValidation:{fn:function SiteStatistics_doSetupForm_callback(form){this.configDialog.form.addValidation("userId",Alfresco.forms.validation.mandatory,null,"keyup");this.configDialog.form.addValidation(this.configDialog.id+"-range-start-menu",this.startyearValidation,{endYearContainerEl:Dom.get(this.configDialog.id+"-range-end-menu"),rangeCheckContainerEl:Dom.get("rangeCheck")},"change");this.configDialog.form.addValidation(this.configDialog.id+"-range-end-menu",this.endyearValidation,{endYearContainerEl:Dom.get(this.configDialog.id+"-range-start-menu"),rangeCheckContainerEl:Dom.get("rangeCheck")},"change");this.configDialog.form.addValidation("rangeCheck",this.dataValidation,{endYearContainerEl:Dom.get(this.configDialog.id+"-range-end-menu"),strtYearContainerEl:Dom.get(this.configDialog.id+"-range-start-menu"),},"change");this.configDialog.form.setShowSubmitStateDynamically(true,false);},scope:this}});}else{this.configDialog.setOptions({actionUrl:actionUrl});}this.configDialog.show();},refreshTitle:function WorkflowStatistics_refreshTitle(){Dom.get("userName").innerHTML=this.options.userId;Dom.get("yearRange").innerHTML=this.options.startYear+"-"+this.options.endYear;},chartHandler:function WorkflowStatistics_chartHandler(){YAHOO.widget.Chart.SWFURL=Alfresco.constants.URL_CONTEXT+"res/yui/charts/assets/charts.swf";var wscriptUrl=Alfresco.constants.PROXY_URI+"ui/workflow-statistics?userId="+this.options.userId+"&startYear="+this.options.startYear+"&endYear="+this.options.endYear;var wfDataSource=new YAHOO.util.DataSource(wscriptUrl);wfDataSource.responseType=YAHOO.util.DataSource.TYPE_JSARRAY;wfDataSource.responseSchema={fields:["year","CompletedWorkflows","ActiveWorkflows"]};var taskSeriesDef=[{displayName:"ActiveWorkflows",yField:"ActiveWorkflows",showInLegend:true,style:{borderColor:47295,fillColor:47295}},{displayName:"CompletedWorkflows",yField:"CompletedWorkflows",showInLegend:true,style:{borderColor:16754984,fillColor:16754984}}];YAHOO.example.getDataTipText=function(item,index,series){var toolTipText=series.displayName+" for "+item.year;toolTipText+="\n #"+item[series.yField];return toolTipText;};YAHOO.example.getLegendLabelText=function(value){return value;};var styleDef={font:{color:3355443,name:"Arial",size:12},xAxis:{titleFont:{name:"Arial",color:"0x333333",size:13},labelRotation:-90},yAxis:{titleFont:{name:"Arial",color:"0x333333",size:13},titleRotation:-90},legend:{display:"bottom",padding:10,spacing:1,font:{color:3355443,family:"Arial",size:11}}};var wfNumericAxis=new YAHOO.widget.NumericAxis();wfNumericAxis.minimum=0;wfNumericAxis.title="Workflow Task";wfNumericAxis.stackingEnabled=true;var yearAxis=new YAHOO.widget.CategoryAxis();yearAxis.title="Time Period";var wfStatChart=new YAHOO.widget.StackedColumnChart("taskBarChart",wfDataSource,{wmode:"transparent",series:taskSeriesDef,xField:"year",xAxis:yearAxis,yAxis:wfNumericAxis,style:styleDef,dataTipFunction:YAHOO.example.getDataTipText,legendLabelFunction:YAHOO.example.getLegendLabelText});},dataValidation:function mandatory(field,args,event,form,silent,message){if(field.checked==true){if(args.strtYearContainerEl.value>args.endYearContainerEl.value){return false;}else{return true;}}else{return true;}},startyearValidation:function mandatory(field,args,event,form,silent,message){if(args.rangeCheckContainerEl.checked==true){if(field.value>args.endYearContainerEl.value){return false;}else{return true;}}else{return true;}},endyearValidation:function mandatory(field,args,event,form,silent,message){if(args.rangeCheckContainerEl.checked==true){if(field.value<args.endYearContainerEl.value){return false;}else{return true;}}else{return true;}}});})();