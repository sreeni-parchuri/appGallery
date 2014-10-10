/* global angular*/
var ckEditorModule = angular.module('IdxCKEditorModule',[]);

ckEditorModule.run(['$q','$timeout','ckEditorConfig', function($q,$timeout,ckEditorConfig) {
    "use strict";
    ckEditorConfig.ckDefer = $q.defer();

    if (angular.isUndefined(CKEDITOR)) {
        throw new error('CKEDITOR not found');
    }
    CKEDITOR.basePath = '/indexing-service/admin-app/resources/js/ckeditor/';
    CKEDITOR.disableAutoInline = true;
    function checkLoaded() {
        if (CKEDITOR.status == 'loaded') {
            ckEditorConfig.ckEditorLoaded = true;
            ckEditorConfig.ckDefer.resolve();
        } else {
            checkLoaded();
        }
    }
    CKEDITOR.on('loaded', checkLoaded);
    $timeout(checkLoaded, 100);
}]);

ckEditorModule.factory('ckEditorConfig', function () {
    "use strict";
    var ckEditorConfig = {};
    ckEditorConfig.ckDefer = null;
    ckEditorConfig.ckEditorLoaded = false;
    ckEditorConfig.config  = {
        "basic" : {
            "toolbarGroups" : [
                { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
                { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
                { name: 'links' },
                { name: 'insert' },
                { name: 'forms' },
                { name: 'tools' },
                { name: 'document',    groups: [ 'mode', 'document', 'doctools' ] },
                { name: 'others' },
                '/',
                { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat' ] },
                { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
                { name: 'styles' },
                { name: 'colors' },
                { name: 'about' }
            ],
            "toolbar": [
                { name: 'document', groups: [ 'mode', 'document', 'doctools' ], items: [ 'Source', '-', 'Save', 'NewPage', 'Preview', 'Print', '-', 'Templates' ] },
                { name: 'clipboard', groups: [ 'clipboard', 'undo' ], items: [ 'Cut', 'Copy', 'Paste', 'PasteText', '-', 'Undo', 'Redo' ] },
                { name: 'editing', groups: [ 'find', 'selection', 'spellchecker' ], items: [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ] },
                { name: 'forms', items: [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
                { name: 'styles', items: [ 'Format', 'Font', 'FontSize' ] },//'Styles',
                { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
                { name: 'tools', items: [ 'Maximize', 'ShowBlocks' ] },
                { name: 'others', items: [ '-' ] },
                { name: 'about', items: [ 'About' ] },
                '/',
                { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic', 'Underline', 'Subscript', 'Superscript', '-', 'RemoveFormat' ] },
                { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ], items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl' ] },
                { name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
                { name: 'insert', items: [ 'Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe' ] }
            ],
            "removeButtons" : 'Underline,Subscript,Superscript',
            "format_tags" : 'h1;h2;h3;h4;h5;div',
            "disableNativeSpellChecker" : false,
            "forcePasteAsPlainText" : true,
            "format_h1" : { element: 'h1', attributes: { 'class': 'contentH1Class' } },
            "format_h2" : { element: 'h2', attributes: { 'class': 'contentH2Class' } },
            "format_h3" : { element: 'h3', attributes: { 'class': 'contentH3Class' } },
            "format_h4" : { element: 'h4', attributes: { 'class': 'contentH4Class' } },
            "format_h5" : { element: 'h5', attributes: { 'class': 'contentSubHead' } },
            "format_div" : { element: 'div', attributes: { 'class': 'contentBody' } },
            "extraPlugins" : 'divarea,format,image2,justify',
            "customConfig": ''
        }
    };
    return ckEditorConfig;
});

ckEditorModule.directive('idxCkEditor',['$timeout','$q','ckEditorConfig',function($timeout,$q,ckEditorConfig) {
    var directiveDefinition;
    directiveDefinition = {
        restrict: 'A',
        scope: {
            config:'@',
            editorid:'@',
            contents: '=',
            editorDataLoad: '=editorDataLoad'
        },
        template: "<textarea name='ckeditor'  rows='10' cols='80' ng-model='contents' id='editorid'></textarea>",
        link: function(scope,element,attrs,ctrls) {
            var EMPTY_HTML = '<p></p>',
                data = [],
                isReady = false;

            var onLoad = function () {
                var editorId = scope.editorid;
                $(element).find('textarea').attr('id',editorId);
                //Initialize CK Editor
                var editorInstance = CKEDITOR.replace(editorId,ckEditorConfig.config[scope.config]);
                var configLoaderDef = $q.defer();
                element.bind('$destroy', function () {
                    editorInstance.destroy(
                        false //If the instance is replacing a DOM element, this parameter indicates whether or not to update the element with the instance contents.
                    );
                });
                var setModelData = function() {
                    if (scope.editorDataLoad !== undefined) {
                        scope.editorDataLoad = true;
                    }
                    var data = editorInstance.getData();
                    if (data == EMPTY_HTML) {
                        data = null;
                    }
                    $timeout(function () { // for key up event
                        scope.contents = data;
                    }, 0);
                };
                var onUpdateModelData = function() {
                    if (!scope.contents || !scope.contents.length) { return; }

                    var item = scope.contents || EMPTY_HTML;
                    isReady = false;
                    editorInstance.setData(item, function () {
                        setModelData();
                        isReady = true;
                    });
                };
                //instance.on('pasteState',   setModelData);
                editorInstance.on('change',       setModelData);
                editorInstance.on('blur',         setModelData);
                editorInstance.on('key',          setModelData); // for source view

                editorInstance.on('instanceReady', function() {
                    scope.$apply(function() {
                        onUpdateModelData();
                    });
                });

                editorInstance.on('customConfigLoaded', function() {
                    configLoaderDef.resolve();
                });

                CKEDITOR.on('dialogDefinition', function ( ev ){
                   if(ev.data.name == 'link'){
                     ev.data.definition.getContents('target').get('linkTargetType')['default']='_blank';
                    }
                });

                scope.$watch('contents', function (value) {
                    if (value === "") {
                        editorInstance.setData(EMPTY_HTML);
                    }
                    else if (!scope.editorDataLoad && scope.editorDataLoad !== undefined) {
                        editorInstance.setData(value);
                    }
                });

            }
            if (CKEDITOR.status == 'loaded') {
                ckEditorConfig.ckEditorLoaded = true;
            }
            if (ckEditorConfig.ckEditorLoaded) {
                onLoad();
            } else {
                ckEditorConfig.ckDefer.promise.then(onLoad);
            }
        }
    };

    return directiveDefinition;
}]);