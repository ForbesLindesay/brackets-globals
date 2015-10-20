define(function (require, exports, module) {
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
    'NaN',
    'Number',
    'Object',
    'parseInt',
    'parseFloat',
    'Promise',
    'RangeError',
    'ReferenceError',
    'RegExp',
    'Set',
    'String',
    'SyntaxError',
    'Symbol',
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

  var mocha = [
    'describe',
    'it'
  ];

  var brackets = [
    'define',
    'brackets'
  ];

  var globals = {};
  ecmaIdentifiers.concat(browserGlobals).concat(developmentGlobals).concat(workerGlobals).concat(nodeGlobals).concat(jquery).concat(mocha).concat(brackets).forEach(function (name) {
    globals[name] = true;
  });
  module.exports = globals;
});
