define(function (require, exports, module) {
  'use strict';

  var CodeMirror = brackets.getModule("thirdparty/CodeMirror2/lib/codemirror");

  var Document = brackets.getModule("document/Document");
  var documentManager = brackets.getModule("document/DocumentManager");
  var editorManager = brackets.getModule("editor/EditorManager");

  var refreshing = false;
  $(documentManager).on('currentDocumentChange', function (e, newDocument, oldDocument) {
    try {
      refreshing = false;
      if (oldDocument) {
        $(oldDocument).off('change', documentValueChanged);
      }
      $(newDocument).on('change', documentValueChanged);
      documentValueChanged();
    } catch (ex) {
      console.error(ex.stack);
    }
  });

  var functionNames = [];
  var lastText = '';
  function documentValueChanged() {
    try {
      if (!documentManager.getCurrentDocument() ||
          !documentManager.getCurrentDocument().getLanguage() ||
          documentManager.getCurrentDocument().getLanguage().getId() !== 'javascript') {
        return;
      }
      var text = documentManager.getCurrentDocument().getText();
      if (text === lastText) return;
      lastText = text;
      var before = functionNames;
      functionNames = [];
      var names = [];
      var nameCount = {};
      text.replace(/\bfunction\s+([a-zA-Z_$][\w$]*)\s*\(/g, function (_, name) {
        nameCount[name] = nameCount[name] || 0;
        nameCount[name]++;
        names.push(name);
      });
      names = names.sort().filter(function (name, i) {
        return names.indexOf(name) === i;
      });
      var namesChanged = names.length !== before.length || names.some(function (n, i) {
        return n !== before[i];
      });
      functionNames = names;
      if (namesChanged) {
        refreshDocument();
      }
    } catch (ex) {
      console.error(ex.stack || ex);
    }
  }

  function refreshDocument() {
    if (refreshing) return;
    refreshing = true;
    setTimeout(function () {
      if (!refreshing) return;
      refreshing = false;
      // do full refresh
      var editor = editorManager.getCurrentFullEditor();
      var cursor = editor.getCursorPos();
      var scroll = editor.getScrollPos();
      var isDirty = editor.document.isDirty;
      // todo: this adds an item to the undo/redo queue, and is quite slow
      editor.document.setText(editor.document.getText());
      editor.setCursorPos(cursor);
      editor.setScrollPos(scroll.x, scroll.y);
      if (!isDirty) {
        // todo: this is a private API call
        editor.document._markClean();
      }
    }, 500);
  }

  function insertCss(css) {
    var elem = document.createElement('style');
    elem.setAttribute('type', 'text/css');

    if ('textContent' in elem) {
      elem.textContent = css;
    } else {
      elem.styleSheet.cssText = css;
    }

    var head = document.getElementsByTagName('head')[0];
    head.appendChild(elem);
  };

  var ecmaIdentifiers = [
    'Array',
    'Boolean',
    'Date',
    'decodeURI',
    'decodeURIComponent',
    'encodeURI',
    'encodeURIComponent',
    'Error',
    'eval',
    'EvalError',
    'Function',
    'hasOwnProperty',
    'isFinite',
    'isNaN',
    'JSON',
    'Math',
    'Map',
    'Number',
    'Object',
    'parseInt',
    'parseFloat',
    'RangeError',
    'ReferenceError',
    'RegExp',
    'Set',
    'String',
    'SyntaxError',
    'TypeError',
    'URIError',
    'WeakMap'
  ];

  var browserGlobals = [
    'Audio',
    'Blob',
    'addEventListener',
    'applicationCache',
    'atob',
    'blur',
    'btoa',
    'clearInterval',
    'clearTimeout',
    'close',
    'closed',
    'CustomEvent',
    'DOMParser',
    'defaultStatus',
    'document',
    'Element',
    'ElementTimeControl',
    'event',
    'FileReader',
    'FormData',
    'focus',
    'frames',
    'getComputedStyle',
    'HTMLElement',
    'HTMLAnchorElement',
    'HTMLBaseElement',
    'HTMLBlockquoteElement',
    'HTMLBodyElement',
    'HTMLBRElement',
    'HTMLButtonElement',
    'HTMLCanvasElement',
    'HTMLDirectoryElement',
    'HTMLDivElement',
    'HTMLDListElement',
    'HTMLFieldSetElement',
    'HTMLFontElement',
    'HTMLFormElement',
    'HTMLFrameElement',
    'HTMLFrameSetElement',
    'HTMLHeadElement',
    'HTMLHeadingElement',
    'HTMLHRElement',
    'HTMLHtmlElement',
    'HTMLIFrameElement',
    'HTMLImageElement',
    'HTMLInputElement',
    'HTMLIsIndexElement',
    'HTMLLabelElement',
    'HTMLLayerElement',
    'HTMLLegendElement',
    'HTMLLIElement',
    'HTMLLinkElement',
    'HTMLMapElement',
    'HTMLMenuElement',
    'HTMLMetaElement',
    'HTMLModElement',
    'HTMLObjectElement',
    'HTMLOListElement',
    'HTMLOptGroupElement',
    'HTMLOptionElement',
    'HTMLParagraphElement',
    'HTMLParamElement',
    'HTMLPreElement',
    'HTMLQuoteElement',
    'HTMLScriptElement',
    'HTMLSelectElement',
    'HTMLStyleElement',
    'HTMLTableCaptionElement',
    'HTMLTableCellElement',
    'HTMLTableColElement',
    'HTMLTableElement',
    'HTMLTableRowElement',
    'HTMLTableSectionElement',
    'HTMLTextAreaElement',
    'HTMLTitleElement',
    'HTMLUListElement',
    'HTMLVideoElement',
    'history',
    'Image',
    'length',
    'localStorage',
    'location',
    'MessageChannel',
    'MessageEvent',
    'MessagePort',
    'MouseEvent',
    'moveBy',
    'moveTo',
    'MutationObserver',
    'name',
    'Node',
    'NodeFilter',
    'navigator',
    'onbeforeunload',
    'onblur',
    'onerror',
    'onfocus',
    'onload',
    'onresize',
    'onunload',
    'open',
    'openDatabase',
    'opener',
    'Option',
    'parent',
    'print',
    'removeEventListener',
    'resizeBy',
    'resizeTo',
    'screen',
    'scroll',
    'scrollBy',
    'scrollTo',
    'sessionStorage',
    'setInterval',
    'setTimeout',
    'SharedWorker',
    'status',
    'SVGAElement',
    'SVGAltGlyphDefElement',
    'SVGAltGlyphElement',
    'SVGAltGlyphItemElement',
    'SVGAngle',
    'SVGAnimateColorElement',
    'SVGAnimateElement',
    'SVGAnimateMotionElement',
    'SVGAnimateTransformElement',
    'SVGAnimatedAngle',
    'SVGAnimatedBoolean',
    'SVGAnimatedEnumeration',
    'SVGAnimatedInteger',
    'SVGAnimatedLength',
    'SVGAnimatedLengthList',
    'SVGAnimatedNumber',
    'SVGAnimatedNumberList',
    'SVGAnimatedPathData',
    'SVGAnimatedPoints',
    'SVGAnimatedPreserveAspectRatio',
    'SVGAnimatedRect',
    'SVGAnimatedString',
    'SVGAnimatedTransformList',
    'SVGAnimationElement',
    'SVGCSSRule',
    'SVGCircleElement',
    'SVGClipPathElement',
    'SVGColor',
    'SVGColorProfileElement',
    'SVGColorProfileRule',
    'SVGComponentTransferFunctionElement',
    'SVGCursorElement',
    'SVGDefsElement',
    'SVGDescElement',
    'SVGDocument',
    'SVGElement',
    'SVGElementInstance',
    'SVGElementInstanceList',
    'SVGEllipseElement',
    'SVGExternalResourcesRequired',
    'SVGFEBlendElement',
    'SVGFEColorMatrixElement',
    'SVGFEComponentTransferElement',
    'SVGFECompositeElement',
    'SVGFEConvolveMatrixElement',
    'SVGFEDiffuseLightingElement',
    'SVGFEDisplacementMapElement',
    'SVGFEDistantLightElement',
    'SVGFEFloodElement',
    'SVGFEFuncAElement',
    'SVGFEFuncBElement',
    'SVGFEFuncGElement',
    'SVGFEFuncRElement',
    'SVGFEGaussianBlurElement',
    'SVGFEImageElement',
    'SVGFEMergeElement',
    'SVGFEMergeNodeElement',
    'SVGFEMorphologyElement',
    'SVGFEOffsetElement',
    'SVGFEPointLightElement',
    'SVGFESpecularLightingElement',
    'SVGFESpotLightElement',
    'SVGFETileElement',
    'SVGFETurbulenceElement',
    'SVGFilterElement',
    'SVGFilterPrimitiveStandardAttributes',
    'SVGFitToViewBox',
    'SVGFontElement',
    'SVGFontFaceElement',
    'SVGFontFaceFormatElement',
    'SVGFontFaceNameElement',
    'SVGFontFaceSrcElement',
    'SVGFontFaceUriElement',
    'SVGForeignObjectElement',
    'SVGGElement',
    'SVGGlyphElement',
    'SVGGlyphRefElement',
    'SVGGradientElement',
    'SVGHKernElement',
    'SVGICCColor',
    'SVGImageElement',
    'SVGLangSpace',
    'SVGLength',
    'SVGLengthList',
    'SVGLineElement',
    'SVGLinearGradientElement',
    'SVGLocatable',
    'SVGMPathElement',
    'SVGMarkerElement',
    'SVGMaskElement',
    'SVGMatrix',
    'SVGMetadataElement',
    'SVGMissingGlyphElement',
    'SVGNumber',
    'SVGNumberList',
    'SVGPaint',
    'SVGPathElement',
    'SVGPathSeg',
    'SVGPathSegArcAbs',
    'SVGPathSegArcRel',
    'SVGPathSegClosePath',
    'SVGPathSegCurvetoCubicAbs',
    'SVGPathSegCurvetoCubicRel',
    'SVGPathSegCurvetoCubicSmoothAbs',
    'SVGPathSegCurvetoCubicSmoothRel',
    'SVGPathSegCurvetoQuadraticAbs',
    'SVGPathSegCurvetoQuadraticRel',
    'SVGPathSegCurvetoQuadraticSmoothAbs',
    'SVGPathSegCurvetoQuadraticSmoothRel',
    'SVGPathSegLinetoAbs',
    'SVGPathSegLinetoHorizontalAbs',
    'SVGPathSegLinetoHorizontalRel',
    'SVGPathSegLinetoRel',
    'SVGPathSegLinetoVerticalAbs',
    'SVGPathSegLinetoVerticalRel',
    'SVGPathSegList',
    'SVGPathSegMovetoAbs',
    'SVGPathSegMovetoRel',
    'SVGPatternElement',
    'SVGPoint',
    'SVGPointList',
    'SVGPolygonElement',
    'SVGPolylineElement',
    'SVGPreserveAspectRatio',
    'SVGRadialGradientElement',
    'SVGRect',
    'SVGRectElement',
    'SVGRenderingIntent',
    'SVGSVGElement',
    'SVGScriptElement',
    'SVGSetElement',
    'SVGStopElement',
    'SVGStringList',
    'SVGStylable',
    'SVGStyleElement',
    'SVGSwitchElement',
    'SVGSymbolElement',
    'SVGTRefElement',
    'SVGTSpanElement',
    'SVGTests',
    'SVGTextContentElement',
    'SVGTextElement',
    'SVGTextPathElement',
    'SVGTextPositioningElement',
    'SVGTitleElement',
    'SVGTransform',
    'SVGTransformList',
    'SVGTransformable',
    'SVGURIReference',
    'SVGUnitTypes',
    'SVGUseElement',
    'SVGVKernElement',
    'SVGViewElement',
    'SVGViewSpec',
    'SVGZoomAndPan',
    'TimeEvent',
    'top',
    'WebSocket',
    'window',
    'Worker',
    'XMLHttpRequest',
    'XMLSerializer',
    'XPathEvaluator',
    'XPathException',
    'XPathExpression',
    'XPathNamespace',
    'XPathNSResolver',
    'XPathResult'
  ];

  var developmentGlobals = [
    "alert",
    "confirm",
    "console",
    "Debug",
    "prompt"
  ];

  var workerGlobals = [
    "importScripts",
    "postMessage",
    "self"
  ];

  var nodeGlobals = [
    '__filename',
    '__dirname',
    'Buffer',
    'console',
    'exports',
    'GLOBAL',
    'global',
    'module',
    'process',
    'require',
    'setTimeout',
    'clearTimeout',
    'setInterval',
    'clearInterval',
    'setImmediate',
    'clearImmediate'
  ];


  var jquery = [
    '$',
    'jQuery'
  ];

  var globals = {};
  ecmaIdentifiers.concat(browserGlobals).concat(developmentGlobals).concat(workerGlobals).concat(nodeGlobals).concat(jquery).forEach(function (name) {
    globals[name] = true;
  });

  insertCss('.cm-global-variable { color: red; text-decoration: underline; }');

  CodeMirror.extendMode('javascript', {
    startState: function (baseColumn) {
      var state = this._startState.apply(this, arguments);
      if (!state.localVars && !state.context) {
        var defaultVars = {};
        state.localVars = defaultVars;
        state.context = {vars: defaultVars};
      }
      return state;
    },
    token: function (stream, state) {
      var st = JSON.parse(JSON.stringify(state));
      var res = this._token.apply(this, arguments);
      if (res === 'variable') {
        var inGlobals = globals[stream.current()];
        var inFunctionNames = functionNames.indexOf(stream.current()) !== -1;
        if (documentManager.getCurrentDocument().getLanguage().getId() === 'javascript') {
          return (inGlobals || inFunctionNames) ? 'variable-2' : 'global-variable';
        }
      }
      return res;
    }
  });
});
