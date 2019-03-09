(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _browser_test_rust_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @browser/test-rust-wasm */ \"./pkg/test_rust_wasm.js\");\nmsg('##rust##');\n\n\n\nfunction main() {\n    let iter = 10;\n    let num = 100000000;\n    let array = initArray(num);\n    let jsResult = jsSumInt(array, num);\n    let wsResult = _browser_test_rust_wasm__WEBPACK_IMPORTED_MODULE_0__[\"sum_array_in_rust\"](array);\n    let inlineJsResult = inlineJsSumInt(array, num, iter);\n    let inlineWsResult = _browser_test_rust_wasm__WEBPACK_IMPORTED_MODULE_0__[\"inline_sum_array_in_rust\"](iter, array);\n\n    if(jsResult !== wsResult) {\n        throw new Error(`1.결과다름: ${jsResult}, ${wsResult}`);\n    }\n\n    if(inlineJsResult !== inlineWsResult) {\n        throw new Error(`2.결과다름: ${inlineJsResult}, ${inlineWsResult}`);\n    }\n\n    if(jsResult * iter !== inlineJsResult) {\n        throw new Error(`3.결과다름: ${(jsResult * iter)}, ${inlineJsResult}`);\n    }\n\n    run('JS - sumInt', iter, () => jsSumInt(array, num) === jsResult);\n    run('JS - inlineSumInt', 1, () => inlineJsSumInt(array, num, iter) === inlineJsResult);\n    run('Ws - sumWs', iter, () => _browser_test_rust_wasm__WEBPACK_IMPORTED_MODULE_0__[\"sum_array_in_rust\"](array) === jsResult);\n    run('Ws - inlineSumWs', 1, () => _browser_test_rust_wasm__WEBPACK_IMPORTED_MODULE_0__[\"inline_sum_array_in_rust\"](iter, array) === inlineJsResult);\n}\n\nfunction initArray(num) {\n    let array = new Int32Array(num);\n    for (let i = 0, len = array.length; i < len; i++) {\n        array[i] = ((Math.random() * 20000) | 0) - 10000;\n    }\n    return array;\n}\n\nfunction run(message, iter, cb) {\n    let d = Date.now();\n    for (let i = 0; i < iter; i++) {\n        let ret = cb();\n        if (ret !== true) throw new Error(cb.toString());\n    }\n    msg([message, Date.now() - d].join(\", \"));\n}\n\nfunction jsSumInt(array, n) {\n    var s = 0;\n    for (var i = 0; i < n; i++) {\n        s += array[i];\n    }\n    return s;\n}\n\nfunction inlineJsSumInt(array, n, iter) {\n    var s = 0;\n    for (var i = 0; i < iter; i++) {\n        s += jsSumInt(array, n);\n    }\n    return s;\n}\n\nfunction msg(msg) {\n    console.log(msg);\n    let div = document.createElement(\"div\");\n    div.innerText = msg;\n    document.body.appendChild(div);\n}\n\nsetTimeout(main, 0);\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./pkg/test_rust_wasm.js":
/*!*******************************!*\
  !*** ./pkg/test_rust_wasm.js ***!
  \*******************************/
/*! exports provided: sum_array_in_rust, inline_sum_array_in_rust, __wbindgen_object_drop_ref */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sum_array_in_rust\", function() { return sum_array_in_rust; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"inline_sum_array_in_rust\", function() { return inline_sum_array_in_rust; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_object_drop_ref\", function() { return __wbindgen_object_drop_ref; });\n/* harmony import */ var _test_rust_wasm_bg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./test_rust_wasm_bg */ \"./pkg/test_rust_wasm_bg.wasm\");\n/* tslint:disable */\n\n\nlet cachegetUint32Memory = null;\nfunction getUint32Memory() {\n    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== _test_rust_wasm_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetUint32Memory = new Uint32Array(_test_rust_wasm_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetUint32Memory;\n}\n\nlet WASM_VECTOR_LEN = 0;\n\nfunction passArray32ToWasm(arg) {\n    const ptr = _test_rust_wasm_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_malloc\"](arg.length * 4);\n    getUint32Memory().set(arg, ptr / 4);\n    WASM_VECTOR_LEN = arg.length;\n    return ptr;\n}\n/**\n* @param {Int32Array} arg0\n* @returns {number}\n*/\nfunction sum_array_in_rust(arg0) {\n    const ptr0 = passArray32ToWasm(arg0);\n    const len0 = WASM_VECTOR_LEN;\n    try {\n        return _test_rust_wasm_bg__WEBPACK_IMPORTED_MODULE_0__[\"sum_array_in_rust\"](ptr0, len0);\n\n    } finally {\n        _test_rust_wasm_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_free\"](ptr0, len0 * 4);\n\n    }\n\n}\n\n/**\n* @param {number} arg0\n* @param {Int32Array} arg1\n* @returns {number}\n*/\nfunction inline_sum_array_in_rust(arg0, arg1) {\n    const ptr1 = passArray32ToWasm(arg1);\n    const len1 = WASM_VECTOR_LEN;\n    try {\n        return _test_rust_wasm_bg__WEBPACK_IMPORTED_MODULE_0__[\"inline_sum_array_in_rust\"](arg0, ptr1, len1);\n\n    } finally {\n        _test_rust_wasm_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_free\"](ptr1, len1 * 4);\n\n    }\n\n}\n\nconst heap = new Array(32);\n\nheap.fill(undefined);\n\nheap.push(undefined, null, true, false);\n\nlet heap_next = heap.length;\n\nfunction dropObject(idx) {\n    if (idx < 36) return;\n    heap[idx] = heap_next;\n    heap_next = idx;\n}\n\nfunction __wbindgen_object_drop_ref(i) { dropObject(i); }\n\n\n\n//# sourceURL=webpack:///./pkg/test_rust_wasm.js?");

/***/ }),

/***/ "./pkg/test_rust_wasm_bg.wasm":
/*!************************************!*\
  !*** ./pkg/test_rust_wasm_bg.wasm ***!
  \************************************/
/*! exports provided: memory, sum_array_in_rust, inline_sum_array_in_rust, __wbindgen_malloc, __wbindgen_free */
/***/ (function(module, exports, __webpack_require__) {

eval("\"use strict\";\n// Instantiate WebAssembly module\nvar wasmExports = __webpack_require__.w[module.i];\n__webpack_require__.r(exports);\n// export exports from WebAssembly module\nfor(var name in wasmExports) if(name != \"__webpack_init__\") exports[name] = wasmExports[name];\n// exec imports from WebAssembly module (for esm order)\n\n\n// exec wasm module\nwasmExports[\"__webpack_init__\"]()\n\n//# sourceURL=webpack:///./pkg/test_rust_wasm_bg.wasm?");

/***/ })

}]);