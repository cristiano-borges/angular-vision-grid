"use strict";var GridColumn=function(a,b,c){this.headerText=a,this.fieldName=b,this.sortable=!0,this.labelFunction=void 0,this.headerRenderer=void 0,this.itemRenderer=void 0,this.itemEditor=void 0,this.width=c,this.headerTextAlign="left",this.textAlign="left",this.visible=!0},GridColumnDecimal=function(a,b,c){GridColumn.call(this,a,b,c),this.textAlign="right",this.centsLimit=2,this.centsSeparator=",",this.thousandsSeparator=".",this.useSymbol=!1};GridColumnDecimal.prototype=new GridColumn;var GridColumnDate=function(a,b,c){GridColumn.call(this,a,b,c),this.format="dd/MM/yyyy"};GridColumnDate.prototype=new GridColumn;var GridColumnEnum=function(a,b,c){GridColumn.call(this,a,b,c),this.labelField=void 0,this.labelValue=void 0,this.provider=[]};GridColumnEnum.prototype=new GridColumn,angular.module("vision.grid",["vision.grid.util"]).directive("columnSort",[function(){return{require:"^grid",restrict:"E",templateUrl:"template/vision/grid/column-sort.html"}}]).directive("visionGrid",["vsGridUtil","$filter","$timeout","$window","$animate",function(a,b,c,d,e){return{restrict:"E",replace:!0,templateUrl:"template/vision/grid/vision-grid.html",transclude:!0,scope:{init:"&",provider:"=?",onSelect:"&",itemDoubleClick:"&",height:"@",selectionMode:"@",headerHeight:"@",rowHeight:"@",rowColorFunction:"&",rowColorField:"@",scrollOffset:"@",headerBar:"@",footerBar:"@",expandRowUrl:"@",expandColumnHeader:"@",expandColumnRenderer:"@",toggleExpandRow:"=?",virtualScrollEnabled:"=?",minRows:"@"},controller:["$scope",function(a){this.addColumn=function(b){this.addColumnAt(a.columns.length,b)},this.addColumnAt=function(b,c){if(!angular.isDefined(c.fieldName))throw"When adding gridColumn, fieldName is required!";a.addColumnAt(b,c)},this.getColumnByFieldName=function(b){for(var c=0;c<a.columns.length;c++)if(a.columns[c].fieldName==b)return a.columns[c]},this.getColumn=function(b){return a.columns[b]},this.getColumns=function(){return a.columns},this.setProvider=function(b){a.provider=b},this.getSelectedItem=function(){return a.selectedItem},this.getColumnSelected=function(){return a.columnSelected},this.setHeight=function(b){a.updateHeight(b)},this.getGridName=function(){return a.gridName},this.setExpandRowUrl=function(b){a.setExpandRowUrl(b)},this.setOuterScope=function(b){a.outerScope=b}}],link:function(f,g,h,i){var j=d.navigator.userAgent.toLowerCase(),k=j.indexOf("firefox")>-1,l=j.indexOf("opera")>-1,m=k?224:l?17:91;f.outerScope=f.$parent,f.toggleExpandRow=a.getDefined(f.toggleExpandRow,!0),f.gridName=a.getDefined(h.name,"grid"),angular.element(g[0].parentElement).scope()[f.gridName]=i,f.gridProvider=[],f.renderedProvider=[],f.viewPortStyle={},f.tablePortStyle={},f.tablePortStyle.position="relative",f.columns=[];var n,o,p,q,r;f.minRows=a.getDefined(f.minRows,"0"),n=Number(f.minRows),f.headerHeight=a.getDefined(f.headerHeight,"30px"),o=Number(f.headerHeight.replace("px","")),f.headerStyle={},f.headerStyle.height=f.headerHeight,f.headerStyle.lineHeight=f.headerHeight,h.rowHeight=a.getDefined(f.rowHeight,"30px"),q=Number(h.rowHeight.replace("px","")),h.height=a.getDefined(h.height,"300px"),p=Number(h.height.replace("px","")),f.styleContainer={},f.styleContainerInner={},f.virtualScrollEnabled&&(f.styleContainer.height=h.height,f.styleContainerInner.height=p-o+"px");var s,t,u=g.find(".fixed-table-container-inner"),v=null,w=null,x=g.find(".table-header"),y=g.find("#vs-grid-spinner"),z=u[0];u.scroll(function(){null==v&&null==w?(v=g.find(".vs-header-bar"),w=g.find(".vs-footer-bar")):(v.offset({left:-1*this.scrollLeft+u.offset().left}),w.offset({left:-1*this.scrollLeft+u.offset().left})),x.offset({left:-1*this.scrollLeft+u.offset().left}),f.virtualScrollEnabled&&(s=Math.ceil(z.scrollTop/q),t=Math.ceil((z.scrollTop+z.offsetHeight)/q),z.scrollTop+z.offsetHeight<=r&&(f.tablePortStyle.top=z.scrollTop+"px",f.$apply(f.renderProvider(f.gridProvider.slice(s,t)))))});var A=function(){return f.virtualScrollEnabled?Math.ceil((p-o)/q):f.gridProvider.length};f.updateHeight=function(a){p=a,f.styleContainer.height=p+"px",f.styleContainerInner.height=p-o+"px",f.renderProvider(f.gridProvider,A()),f.$apply()},f.renderProvider=function(a,b){void 0==b&&(b=a.length),f.renderedProvider.length=b;for(var c=0;b>c||n>c;c++)f.renderedProvider[c]=angular.isDefined(a[c])?a[c]:{}},f.$watch("provider",function(a,b){G(),f.gridProvider=[],null!=f.provider&&void 0!=f.provider&&angular.extend(f.gridProvider,f.provider),f.virtualScrollEnabled&&angular.isDefined(a)&&a.length>0&&(r=a.length*q,f.viewPortStyle.height=r+"px"),(void 0==b||void 0==a||a.length!=b.length)&&c(function(){z.scrollTop=0,u.scroll()})},!0),f.$watch("gridProvider",function(){f.renderProvider(f.gridProvider,A()),(null==f.gridProvider||f.gridProvider.length>0)&&e.leave(y)}),f.getRowStyle=function(b){var c={};if(c.height=f.rowHeight,angular.isDefined(f.rowColorField)){var d=a.evaluate(b,f.rowColorField);angular.isDefined(d)&&(c.backgroundColor=d)}if(angular.isDefined(h.rowColorFunction)){var d=f.rowColorFunction({$item:b});angular.isDefined(d)&&(c.backgroundColor=d)}return c},f.getColumnStyle=function(a,b){var c={};return c.textAlign="header"==b?a.headerTextAlign:a.textAlign,angular.isDefined(a.width)?c.width=a.width:(c.minWidth="80px",c.width="auto !important"),c},f.addColumnAt=function(b,c){c instanceof GridColumnDecimal&&!angular.isDefined(c.labelFunction)&&(c.labelFunction=a.formatDecimal),c instanceof GridColumnDate&&!angular.isDefined(c.labelFunction)&&(c.labelFunction=a.formatDate),c instanceof GridColumnEnum&&!angular.isDefined(c.labelFunction)&&(c.labelFunction=a.formatEnum),f.$emit("grid:addColumn",c),f.columns.splice(b,0,c)},f.getItem=function(b,c,d){var e;return e=angular.isFunction(d.labelFunction)?d.labelFunction(c,d,b):a.evaluate(c,d.fieldName),void 0!=e?e.toString():""},f.isHeaderRenderer=function(a){return angular.isDefined(a.headerRenderer)},f.isItemRenderer=function(a,b){return angular.isDefined(b.itemRenderer)},f.selectItemDblclick=function(a,b){f.selectItem(a,b),h.itemDoubleClick&&f.itemDoubleClick({$data:F()}),f.$emit(f.gridName+":itemDoubleClick",F())},f.selectedItems=[],h.selectionMode=a.getDefined(f.selectionMode,"single");var B,C,D,E=-1;f.selectItem=function(a,b){if(f.columnSelected=b,angular.isDefined(a)){if(f.selectedIndex=f.provider.indexOf(a),D=f.gridProvider.indexOf(a),f.selectedItem=a,f.shiftKey)-1==E&&(E=D,f.selectedItems=[]),D>E?(B=E,C=D):(B=D,C=E),f.selectedItems=f.gridProvider.slice(B,C+1);else if(f.ctrlKey){if(-1==f.selectedItems.indexOf(a))f.selectedItems.push(a);else{var c=f.selectedItems.indexOf(a);f.selectedItems.splice(c,1)}E=D}else E=D,f.selectedItems=[a];angular.isDefined(h.onSelect)&&f.onSelect({$data:F()}),f.$emit(f.gridName+":onSelect",F())}};var F=function(){var a={};return a.selectedIndex=f.selectedIndex,a.selectedItem=f.selectedItem,a.columnSelected=f.columnSelected,a.selectedItems=f.selectedItems,a},G=function(){f.selectedItems=[],f.selectedItem=null,f.selectedIndex=null,f.selectedColumn=null};f.selectClass=function(a){return a==f.selectedItem&&"single"==f.selectionMode||-1!=f.selectedItems.indexOf(a)&&"multiple"==f.selectionMode?"selected-item":""},f.onKeyDown=function(a){(38==a.keyCode||40==a.keyCode)&&(void 0==D&&(D=-1),38==a.keyCode&&(0>D?D=0:D>0&&D--),40==a.keyCode&&(D>f.gridProvider.length?D=f.gridProvider.length:D<f.gridProvider.length&&D++),f.selectItem(f.gridProvider[D],f.selectedColumn)),"multiple"==f.selectionMode&&(f.shiftKey=a.shiftKey,f.ctrlKey=a.ctrlKey||a.keyCode==m),f.$emit(f.gridName+":onKeyDown",a)},f.onKeyUp=function(a){"multiple"==f.selectionMode&&(f.shiftKey=a.shiftKey,f.ctrlKey=a.ctrlKey,a.keyCode==m&&(f.ctrlKey=!1)),f.$emit(f.gridName+":onKeyUp",a)},f.sort={sortingField:"id",reverse:!1},f.selectSorterClass=function(a){return a==f.sort.sortingField?"glyphicon glyphicon-chevron-"+(f.sort.reverse?"down":"up"):""},f.sortBy=function(a){f.sort.sortingField==a&&(f.sort.reverse=!f.sort.reverse),f.sort.sortingField=a,f.gridProvider=b("orderBy")(f.provider,f.sort.sortingField,f.sort.reverse)},f.hasHeaderBar=function(){return angular.isDefined(h.headerBar)},f.hasFooterBar=function(){return angular.isDefined(h.footerBar)};var H={};f.getHeaderFooterStyle=function(){return H.width=u[0].scrollWidth,H},f.openCloseExpandRow=function(a){a.expandRowOpened=!a.expandRowOpened,f.toggleExpandRow&&angular.forEach(f.renderedProvider,function(b){b!=a&&(b.expandRowOpened=!1)})},f.expandRow=void 0,f.setExpandRowUrl=function(b){f.expandRow=b,h.expandColumnRenderer=a.getDefined(f.expandColumnRenderer,"template/vision/grid/expandColumnRenderer.html");var c=new GridColumn;c.fieldName="expandColumn",c.width="70px",c.textAlign="center",c.itemRenderer=h.expandColumnRenderer,angular.isDefined(f.expandColumnHeader)&&(c.headerText=f.expandColumnHeader),f.addColumnAt(0,c)},angular.isDefined(f.expandRowUrl)&&f.setExpandRowUrl(f.expandRowUrl),angular.isDefined(h.init)&&(f.init({$ctrl:i}),f.$emit(f.gridName+":init",{$ctrl:i}))}}}]).run(["$templateCache",function(a){a.put("template/vision/grid/vision-grid.html",'<div class="row">\n    <div class="vs-grid col-sm-12">\n        <div class="header-footer" ng-if="hasFooterBar()">\n            <div class="vs-header-bar" ng-include="headerBar" ng-style="getHeaderFooterStyle()"></div>\n        </div>\n        <div class="fixed-table-container" ng-style="styleContainer" class="table table-bordered" tabindex="0" ng-keydown="onKeyDown($event)" ng-keyup="onKeyUp($event)">\n            <div class="table-header">\n                <table class="table table-vision">\n                    <thead>\n                        <tr>\n                           <th ng-repeat="column in columns track by $index"\n                               class="vs-grid-column"\n                               ng-show="column.visible"\n                               ng-style="getColumnStyle(column, \'header\')"\n                               ng-class="{first: $first}">\n                                   <div ng-style="headerStyle" ng-show="isHeaderRenderer(column)" ng-include="column.headerRenderer"></div>\n                                   <div ng-style="headerStyle" ng-show="!isHeaderRenderer(column)">\n                                       <span ng-show="!column.sortable" ng-bind="column.headerText"></span>\n                                       <column-sort></column-sort>\n                                   </div>\n                            </th>\n                         </tr>\n                    </thead>\n               </table>\n            </div>\n            <div class="fixed-table-container-inner" scrollbar ng-style="styleContainerInner">\n                <div ng-style="viewPortStyle" style="position: relative; display: block;">\n                    <table class="table table-vision" ng-style="tablePortStyle">\n                        <tbody>\n                           <!--tabindex="{{$parent.$parent.$index}}{{$index+1}}"-->\n                           <tr ng-repeat-start="item in renderedProvider track by $index"\n                               ng-class="{rendered:item.isRendered}"\n                               ng-style="getRowStyle(item)">\n                               <td ng-repeat="column in columns track by $index"\n                                   ng-show="column.visible"\n                                   ng-mousedown="selectItem(item, column)"\n                                   ng-dblclick="selectItemDblclick(item, column)"\n                                   ng-class="selectClass(item)"\n                                   ng-style="getColumnStyle(column)">\n                                     <span ng-show="!isItemRenderer(item, column)" ng-bind-html="getItem($parent.$index, item, column)"></span>\n                                     <div ng-show="isItemRenderer(item, column)" ng-include="column.itemRenderer"></div>\n                               </td>\n                           </tr>\n                           <tr class="actions text-left" ng-show="item.expandRowOpened" ng-repeat-end>\n                               <td ng-include="expandRow" colspan="{{columns.length}}" ></td>\n                           </tr>\n                       </tbody>\n                   </table>\n               </div>\n           </div>\n       </div>\n       <div class="header-footer" ng-if="hasFooterBar()">\n           <div class="vs-footer-bar" ng-include="footerBar" ng-style="getHeaderFooterStyle()"></div>\n       </div>\n   </div>\n</div>'),a.put("template/vision/grid/column-sort.html",'<a ng-if="column.sortable" ng-click="sortBy(column.fieldName)">\n   <span ng-bind="column.headerText"></span>\n   <i ng-class="selectSorterClass(column.fieldName)"></i>\n</a>'),a.put("template/vision/grid/expandColumnRenderer.html",'<a class="expand-row" ng-click="openCloseExpandRow(item)">\n   <i class="fa" ng-class="{\'fa-chevron-right\': !item.expandRowOpened, \'fa-chevron-down\': item.expandRowOpened}"></i>\n</a>')}]),angular.module("vision.grid.util",[]).factory("vsGridUtil",["$filter","$locale",function(a,b){var c=function(a,c,d,e,f){var g="";a&&(g=b.NUMBER_FORMATS.CURRENCY_SYM+" "),void 0==f&&(f=b.NUMBER_FORMATS.GROUP_SEP),void 0==e&&(e=b.NUMBER_FORMATS.DECIMAL_SEP);var h,i=c,j=isNaN(d)?2:Math.abs(d),k=e||".",l="undefined"==typeof f?",":f,m=0>i?"-":"",n=parseInt(i=Math.abs(i).toFixed(j))+"";return h=(h=n.length)>3?h%3:0,g+m+(h?n.substr(0,h)+l:"")+n.substr(h).replace(/(\d{3})(?=\d)/g,"$1"+l)+(j?k+Math.abs(i-n).toFixed(j).slice(2):"")},d=function(){};return d.getValueOfLabelField=function(a,b,c,e){if(null!=e){var f=d.getItemByPropertyValue(a,c,e);return d.evaluate(f,b)}return null},d.getItemByPropertyValue=function(a,b,c){var e=d.getItemIndexByPropertyValue(a,b,c);return-1==e?null:a[e]},d.getItemIndexByPropertyValue=function(a,b,c){if(Util.isValorPreenchido(c)&&null!=a)for(var e,f,g=0;g<a.length;g++)if(f=a[g],e=d.evaluate(f,b),e=null!=e?String(e).toLowerCase():null,c=String(c).toLowerCase(),e==c)return g;return-1},d.getDefined=function(a,b){return angular.isDefined(a)?a:b},d.evaluate=function(a,b){var c=b.split("."),d=a;for(var e in c)null!=d&&(d=d[c[e]]);return d},d.formatDecimal=function(a,b){var e=d.evaluate(a,b.fieldName);return angular.isDefined(e)?c(b.useSymbol,e,b.centsLimit,b.decimalSeparator,b.thousandsSeparator):""},d.formatDate=function(b,c){var e=d.evaluate(b,c.fieldName);return"string"==typeof e&&(e=new Date(e)),a("date")(e,c.format)},d.formatEnum=function(a,b){var c=d.evaluate(a,b.fieldName);return c=d.getValueOfLabelField(b.provider,b.labelField,b.labelValue,c),null==c?"":String(c)},d.formatEntity=function(a,b){return d.evaluate(a,[b.fieldName.split(".")[0],b.labelField].join("."))},d}]);