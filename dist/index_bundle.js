/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["myModule"] = factory();
	else
		root["myModule"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/addDomContent.js":
/*!******************************!*\
  !*** ./src/addDomContent.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addDOMContent\": () => (/* binding */ addDOMContent),\n/* harmony export */   \"appendDOMChild\": () => (/* binding */ appendDOMChild)\n/* harmony export */ });\nfunction findDomContent(id) {\n  var dom = document.getElementById(id);\n  return dom ? dom : null;\n}\n\nfunction addDOMContent(contents) {\n  var parent = contents.parent,\n      element = contents.element,\n      id = contents.id,\n      styles = contents.styles,\n      content = contents.content,\n      children = contents.children;\n  var dom = findDomContent(parent);\n  var node = document.createElement(element);\n  node.id = id;\n  node.className = styles;\n  node.innerText = content;\n  dom ? dom.appendChild(node) : document.body.appendChild(node);\n}\n\nfunction appendDOMChild(contents) {\n  var parent = contents.parent,\n      element = contents.element,\n      id = contents.id,\n      styles = contents.styles,\n      content = contents.content,\n      children = contents.children;\n  var dom = document.getElementById(parent);\n  dom ? dom.insertAdjacentHTML(\"beforeend\", children) : document.body.insertAdjacentHTML(\"beforeend\", children);\n}\n\n\n\n//# sourceURL=webpack://myModule/./src/addDomContent.js?");

/***/ }),

/***/ "./src/capital.js":
/*!************************!*\
  !*** ./src/capital.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction capital(string) {\n  var capitalizedString = string.substring(0, 1).toUpperCase() + string.substring(1);\n  return capitalizedString;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (capital);\n\n//# sourceURL=webpack://myModule/./src/capital.js?");

/***/ }),

/***/ "./src/components/cart/cart.js":
/*!*************************************!*\
  !*** ./src/components/cart/cart.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _removeDomContent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../removeDomContent */ \"./src/removeDomContent.js\");\n/* harmony import */ var _data_deliveryRule_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../data/deliveryRule.json */ \"./src/data/deliveryRule.json\");\n/* harmony import */ var _cart_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cart.css */ \"./src/components/cart/cart.css\");\n\n\n\n\nvar checkoutCalculations = function checkoutCalculations(cart) {\n  var result = {\n    delivery: 0,\n    total: 0,\n    discount: 0\n  };\n  Object.keys(cart).forEach(function (key) {\n    //    console.log(cart[key])\n    cart[key].total = cart[key].qty * cart[key].price; // Check Multiple Offer With Quantity, Offer text \n\n    var offerQty = 0;\n    var offerPer = 0;\n    var calculateTotalQty = 0;\n\n    if (cart[key].offer) {\n      cart[key].discountedTotal = 0;\n\n      for (var i = 0; i < cart[key].offer.length; i++) {\n        offerQty = cart[key].offer[i][0];\n        var calculateQty = cart[key].qty > offerQty - 1 ? offerQty - 1 + calculateTotalQty : cart[key].qty; // current calculation will be\n\n        calculateTotalQty += calculateQty; // update total quantity calculations\n\n        cart[key].discountedTotal += calculateQty * (cart[key].price * (offerPer ? offerPer / 100 : 1));\n        offerPer = cart[key].offer[i][1]; // update offer percentage for remaining quantity\n      }\n\n      if (cart[key].qty > calculateTotalQty) {\n        // remain quantity calculation\n        var remainQty = cart[key].qty - calculateTotalQty;\n        cart[key].discountedTotal += remainQty * (cart[key].price * (offerPer ? offerPer / 100 : 1));\n      }\n    }\n\n    var discountAmount = cart[key].total - cart[key].discountedTotal;\n\n    if (discountAmount) {\n      result.total += cart[key].discountedTotal;\n      result.discount += discountAmount;\n      cart[key]['discount'] = discountAmount;\n      cart[key]['discountText'] = \"you will get \".concat(offerPer, \"% on next \").concat(cart[key].name);\n    } else {\n      result.total += cart[key].total;\n\n      if (cart[key].offer) {\n        cart[key]['discountText'] = \"you need buy  \".concat(offerQty - cart[key].qty, \" more  \").concat(cart[key].name, \" to get\").concat(offerPer, \"% \");\n      }\n    }\n  }); // Check Delivery Charges\n\n  var deliveryAmountList = Object.keys(_data_deliveryRule_json__WEBPACK_IMPORTED_MODULE_1__);\n\n  for (var i = 0; i < deliveryAmountList.length; i++) {\n    var compareVal = parseInt(deliveryAmountList[i]);\n\n    if (result.total <= compareVal) {\n      result.delivery = _data_deliveryRule_json__WEBPACK_IMPORTED_MODULE_1__[deliveryAmountList[i]];\n      break;\n    }\n  }\n\n  return result;\n};\n\nvar cartHeaderLayout = function cartHeaderLayout() {\n  return \"\\n            <div class=\\\"header-sub-title\\\" id=\\\"cart-header\\\"> Cart Items </div>\\n            \\n    \";\n};\n\nvar cartItemHeadr = function cartItemHeadr() {\n  return \"<div class=\\\"cart-items-header\\\" id=\\\"cart-items-header\\\"> \\n            <div class=\\\"cart-item cart-item-header\\\"> \\n                <div class=\\\"cart-item-name\\\">NAME </div>\\n                <div class=\\\"cart-item-qty\\\"> QTY </div>\\n                <div class=\\\"cart-item-price-header\\\"> PRICE </div>\\n            </div>\\n        </div>\\n        \";\n};\n\nvar emptyCart = function emptyCart() {\n  return \"\\n    <div class=\\\"empty-cart-container\\\"> \\n      <div class=\\\"empty-cart\\\"> Cart is Empty !</div>\\n    <div>\\n\\n    \";\n};\n\nvar cartCardLayout = function cartCardLayout(item) {\n  return \"\\n       <div class=\\\"cart-item-container\\\"> \\n            <div class=\\\"cart-item\\\"> \\n            <div class=\\\"cart-item-name\\\">\".concat(item.name, \" </div>\\n            <div class=\\\"cart-item-qty\\\"> \").concat(item.qty, \" </div>\\n            <div class=\\\"cart-item-price-container\\\"> \\n                    <div class=\\\"cart-item-price-strike\\\"> \\n                        \").concat(item.discount ? \"$ \".concat(item.total.toFixed(2), \" \") : '', \"\\n                        \\n                    </div>\\n                    <div class=\\\"cart-item-price\\\"> $ \").concat((item.discountedTotal ? item.discountedTotal : item.total).toFixed(2), \" </div>\\n            </div>\\n            </div>\\n            \").concat(item.discountText ? \"\\n                  <div class=\\\"cart-offer-text\\\"> OFFER :  \".concat(item.discountText, \"</div>\\n                 \") : '', \"\\n        </div>\\n    \");\n};\n\nvar checkOutInfo = function checkOutInfo(obj) {\n  var delivery = obj.delivery,\n      total = obj.total,\n      discount = obj.discount;\n  return \"\\n        <div id=\\\"delivery-charge\\\" class=\\\"delivery-charge\\\">\\n         <div class=\\\"delivery-charge-text\\\"> Delivery Charge : </div>\\n         <div class=\\\"delivery-charge-amount\\\"> $ \".concat(delivery, \" </div>\\n        </div>\\n        <div id=\\\"total-amount-conatiner\\\" class=\\\"total-amount-container\\\"> \\n          <div class=\\\"total-amount-text text-bold\\\"> Total Amount : </div>\\n          <div class=\\\"amount-container\\\">\\n            <div class=\\\"total-amount text-bold\\\">\\n              \").concat(discount ? \"$ \".concat((total + discount + delivery).toFixed(2)) : '', \"\\n            </div>\\n            <div class=\\\"after-discount text-bold\\\">$   \").concat((total + delivery).toFixed(2), \"</div>\\n        </div>\\n        </div>\\n        <div id=\\\"checkout\\\" class=\\\"checkout\\\"> \\n            <button class=\\\"checkout-btn text-bold\\\" id=\\\"checkout-btn\\\"> Checkout </button>\\n        </div>\\n    \");\n};\n\nvar cartLayout = function cartLayout(cart) {\n  var tempLayout = cartHeaderLayout();\n  var cartKeys = Object.keys(cart);\n  (0,_removeDomContent__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('cart'); // Remove Previous all cart childrn elements \n\n  if (cartKeys.length) {\n    var checkoutAmount = checkoutCalculations(cart);\n    tempLayout += cartItemHeadr();\n    cartKeys.forEach(function (element) {\n      tempLayout += cartCardLayout(cart[element]);\n    });\n    tempLayout += checkOutInfo(checkoutAmount);\n  } else {\n    tempLayout += emptyCart();\n  }\n\n  return tempLayout;\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cartLayout);\n\n//# sourceURL=webpack://myModule/./src/components/cart/cart.js?");

/***/ }),

/***/ "./src/components/items/items.js":
/*!***************************************!*\
  !*** ./src/components/items/items.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _items_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./items.css */ \"./src/components/items/items.css\");\n\n\nvar cardHeader = function cardHeader() {\n  return \"\\n        <div class=\\\"card\\\" id=\\\"card-header\\\" > \\n            <div class=\\\"card-img card-header\\\" >  Plate Image </div>\\n            <div class=\\\"card-name card-header\\\"> Plate Name </div>\\n            <div class=\\\"card-name card-header\\\"> Plate Price </div>\\n        </div>\\n    \";\n};\n\nvar cardLayout = function cardLayout(item) {\n  return \"\\n        <div class=\\\"card\\\" id=\\\"\".concat(item.id, \"\\\" onClick={}> \\n            <div class=\\\"card-img\\\" style=\\\"background-color:\").concat(item.image, \"\\\"> </div>\\n            <div class=\\\"card-name\\\"> \").concat(item.name, \" </div>\\n            <div class=\\\"card-name\\\">$ \").concat(item.price, \" </div>\\n            <button  class=\\\"card-action\\\" id=\\\"action-\").concat(item.id, \"\\\"> Add </div>\\n        </div>\\n    \");\n};\n\nvar itemsLayout = function itemsLayout(contents) {\n  var tempLayout = cardHeader();\n  contents.forEach(function (item) {\n    tempLayout += cardLayout(item);\n  });\n  return tempLayout;\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (itemsLayout);\n\n//# sourceURL=webpack://myModule/./src/components/items/items.js?");

/***/ }),

/***/ "./src/components/lauout/layout.js":
/*!*****************************************!*\
  !*** ./src/components/lauout/layout.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _addDomContent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../addDomContent */ \"./src/addDomContent.js\");\n/* harmony import */ var _items_items__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../items/items */ \"./src/components/items/items.js\");\n/* harmony import */ var _cart_cart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../cart/cart */ \"./src/components/cart/cart.js\");\n/* harmony import */ var _layout_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./layout.css */ \"./src/components/lauout/layout.css\");\n/* harmony import */ var _data_plates_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../data/plates.json */ \"./src/data/plates.json\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\nvar cart = {};\n/* Create Main Layout HTML */\n\nvar mainLayout = function mainLayout() {\n  return \"<div>\\n    <div id=\\\"header\\\" class=\\\"header\\\">\\n        <div class=\\\"header-title\\\"> Case Study</div>\\n    </div>\\n    <div id =\\\"main\\\" class=\\\"main\\\" > \\n        <div id =\\\"items\\\" class=\\\"items\\\"> \\n            <div class=\\\"header-sub-title\\\" id=\\\"items-header\\\"> Order Food Online </div>\\n        </div> \\n        <div id =\\\"cart\\\" class=\\\"cart\\\"> \\n            \\n        </div>\\n    </div>\\n    </div>\";\n};\n\nvar manageCart = function manageCart(id) {\n  if (cart[id]) {\n    cart[id].qty += 1;\n  } else {\n    var findPlate = _data_plates_json__WEBPACK_IMPORTED_MODULE_4__.filter(function (plate) {\n      return plate.id === id;\n    });\n    cart[id] = _objectSpread(_objectSpread({}, findPlate[0]), {}, {\n      qty: 1\n    });\n  }\n\n  createCartLayout(); // Update the Cart Layout\n};\n\nvar itemDynamicClickEvents = function itemDynamicClickEvents(className) {\n  var checkout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;\n  var elements = document.getElementsByClassName(className);\n\n  for (var i = 0; i < elements.length; i++) {\n    var element = elements[i];\n    element.addEventListener('click', function (e) {\n      e.preventDefault();\n      e.stopPropagation();\n\n      if (checkout) {\n        cart = {};\n        createCartLayout();\n      } else {\n        var id = e.target.id;\n        manageCart(id.split(\"-\")[1]);\n      }\n    });\n  }\n};\n\nvar createItemsLayout = function createItemsLayout() {\n  /* Create Item Layout Object */\n  var itemsObj = {\n    parent: 'items',\n    children: (0,_items_items__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_data_plates_json__WEBPACK_IMPORTED_MODULE_4__)\n  };\n  /* Create Main Layout */\n\n  (0,_addDomContent__WEBPACK_IMPORTED_MODULE_0__.appendDOMChild)(itemsObj);\n  itemDynamicClickEvents('card-action');\n};\n\nvar createCartLayout = function createCartLayout() {\n  /* Create Cart Layout Object */\n  var cartObj = {\n    parent: 'cart',\n    children: (0,_cart_cart__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(cart)\n  };\n  /* Create cart Layout */\n\n  (0,_addDomContent__WEBPACK_IMPORTED_MODULE_0__.appendDOMChild)(cartObj);\n  itemDynamicClickEvents('checkout-btn', true);\n};\n\nvar Layout = function Layout() {\n  /* Create Main Layout Object */\n  var mainObj = {\n    parent: 'root',\n    children: mainLayout()\n  };\n  /* Create Main Layout */\n\n  (0,_addDomContent__WEBPACK_IMPORTED_MODULE_0__.appendDOMChild)(mainObj);\n  createItemsLayout(); // Create Item Layouts\n\n  createCartLayout(); // Create cart layouts\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layout);\n\n//# sourceURL=webpack://myModule/./src/components/lauout/layout.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"capital\": () => (/* reexport safe */ _capital__WEBPACK_IMPORTED_MODULE_0__[\"default\"]),\n/* harmony export */   \"index\": () => (/* binding */ index)\n/* harmony export */ });\n/* harmony import */ var _capital__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./capital */ \"./src/capital.js\");\n/* harmony import */ var _components_lauout_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/lauout/layout */ \"./src/components/lauout/layout.js\");\n // import addDOMContent from \"./addDOMContent\"\n\n // import './styles.css'\n\nvar index = function index() {\n  console.log();\n  (0,_components_lauout_layout__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n};\n\n\n\n//# sourceURL=webpack://myModule/./src/index.js?");

/***/ }),

/***/ "./src/removeDomContent.js":
/*!*********************************!*\
  !*** ./src/removeDomContent.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar removeDomContent = function removeDomContent(id) {\n  var myNode = document.getElementById(id);\n  myNode.innerHTML = '';\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (removeDomContent);\n\n//# sourceURL=webpack://myModule/./src/removeDomContent.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/components/cart/cart.css":
/*!****************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/components/cart/cart.css ***!
  \****************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \".empty-cart-container{\\n    width: 100%;\\n}\\n.empty-cart{\\n    padding: 22px 0;\\n    text-align: center;\\n    font-size: 40px;\\n}\\n.cart-item-header{\\n    border-bottom: 1px solid #b8babb;\\n}\\n.cart-item-container {\\n    border-bottom: 0.5px dotted #0000006b\\n}\\n.cart-item-price-header {\\n    width: 45%;\\n    text-align: right;\\n}\\n.cart-item , .delivery-charge, .total-amount-container, .amount-container, .cart-item-price-container {\\n display: flex;\\n}\\n.cart-item {\\n    font-size: 18px;\\n}\\n.delivery-charge-text, .delivery-charge-amount ,.total-amount-text , .amount-container ,.total-amount,.after-discount, .cart-item-price-strike, .cart-item-price{\\n    width:50%;\\n    font-size: 18px;\\n}\\n.delivery-charge, .text-bold {\\n    font-weight: 800;\\n}\\n\\n.cart-item-name {\\n width: 35%\\n}\\n\\n.cart-item-qty {\\n width: 20%;\\n text-align: center;\\n}\\n\\n.cart-item-price-container {\\n   width: 45%;\\n}\\n\\n.cart-item-price-strike, .total-amount {\\n    text-decoration: line-through;\\n}\\n.amount-container ,.delivery-charge, .cart-item-price-container, .total-amount-text {\\n    text-align: right;\\n}\\n\\n.cart-item , .delivery-charge , .total-amount-container {\\n    padding: 12px 0;\\n}\\n.cart-offer-text {\\n    color: #ff0000b0;\\n    font-size: 13px;\\n}\\n\\n\\n.checkout-btn {\\n    font-size: 20px;\\n    padding: 10px;\\n    width: 100%;\\n    margin: 10px;\\n    cursor: pointer;\\n}\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://myModule/./src/components/cart/cart.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/components/items/items.css":
/*!******************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/components/items/items.css ***!
  \******************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \".card {\\n    display: flex;\\n    border-bottom: 1px dotted #00000024;\\n    padding: 10px 0px;\\n}\\n.card-header {\\n    font-size: 19px;\\n    font-weight: 600;\\n}\\n\\n.card-img {\\n  width: 30%;\\n  height:32px;\\n}\\n\\n.card-name {\\n    font-size: 22px;\\n    width: 30%;\\n    text-align: center;\\n    padding: 4px 10px;\\n}\\n\\n.card-action {\\n    width:10%;\\n    cursor: pointer;\\n}\\n\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://myModule/./src/components/items/items.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/components/lauout/layout.css":
/*!********************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/components/lauout/layout.css ***!
  \********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \".header {\\n    width:100%;\\n    height:60px;\\n    background-color: rgba(136, 137, 139, 0.198);\\n}\\n.header-title {\\n    font-weight: 800;\\n    padding: 20px;\\n    font-size: 18px;\\n}\\n.main {\\n    display:flex;\\n    padding: 10px 20px;\\n}\\n.items {\\n    padding: 10px;\\n    /* border-right: 1px solid #0000005c; */\\n    width: 70%;\\n}\\n.cart {\\n    padding: 10px;\\n    border-left: 1px solid #00000059;\\n    width: 30%;\\n}\\n.header-sub-title {\\n    width: 100%;\\n    text-align: center;\\n    font-size: 24px;\\n    font-weight: 800;\\n    background: #b3b7ba8a;\\n    padding: 10px 0;\\n    margin-bottom: 10px;\\n}\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://myModule/./src/components/lauout/layout.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n\n      content += cssWithMappingToString(item);\n\n      if (needLayer) {\n        content += \"}\";\n      }\n\n      if (item[2]) {\n        content += \"}\";\n      }\n\n      if (item[4]) {\n        content += \"}\";\n      }\n\n      return content;\n    }).join(\"\");\n  }; // import a list of modules into the list\n\n\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://myModule/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://myModule/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/components/cart/cart.css":
/*!**************************************!*\
  !*** ./src/components/cart/cart.css ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_cart_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./cart.css */ \"./node_modules/css-loader/dist/cjs.js!./src/components/cart/cart.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_cart_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_cart_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_cart_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_cart_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://myModule/./src/components/cart/cart.css?");

/***/ }),

/***/ "./src/components/items/items.css":
/*!****************************************!*\
  !*** ./src/components/items/items.css ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_items_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./items.css */ \"./node_modules/css-loader/dist/cjs.js!./src/components/items/items.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_items_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_items_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_items_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_items_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://myModule/./src/components/items/items.css?");

/***/ }),

/***/ "./src/components/lauout/layout.css":
/*!******************************************!*\
  !*** ./src/components/lauout/layout.css ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_layout_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./layout.css */ \"./node_modules/css-loader/dist/cjs.js!./src/components/lauout/layout.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_layout_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_layout_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_layout_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_layout_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://myModule/./src/components/lauout/layout.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n\n  return updater;\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://myModule/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n/* istanbul ignore next  */\n\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n\n    memo[target] = styleTarget;\n  }\n\n  return memo[target];\n}\n/* istanbul ignore next  */\n\n\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n\n  target.appendChild(style);\n}\n\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://myModule/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\n\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://myModule/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\n\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://myModule/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n\n  var needLayer = typeof obj.layer !== \"undefined\";\n\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n\n  css += obj.css;\n\n  if (needLayer) {\n    css += \"}\";\n  }\n\n  if (obj.media) {\n    css += \"}\";\n  }\n\n  if (obj.supports) {\n    css += \"}\";\n  }\n\n  var sourceMap = obj.sourceMap;\n\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  options.styleTagTransform(css, styleElement, options.options);\n}\n\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n\n  styleElement.parentNode.removeChild(styleElement);\n}\n/* istanbul ignore next  */\n\n\nfunction domAPI(options) {\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\n\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://myModule/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\n\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://myModule/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/data/deliveryRule.json":
/*!************************************!*\
  !*** ./src/data/deliveryRule.json ***!
  \************************************/
/***/ ((module) => {

eval("module.exports = JSON.parse('{\"50\":4.95,\"90\":2.95,\"91\":0}');\n\n//# sourceURL=webpack://myModule/./src/data/deliveryRule.json?");

/***/ }),

/***/ "./src/data/plates.json":
/*!******************************!*\
  !*** ./src/data/plates.json ***!
  \******************************/
/***/ ((module) => {

eval("module.exports = JSON.parse('[{\"name\":\"Red Plate\",\"id\":\"R01\",\"price\":32.95,\"offer\":[[2,50]],\"image\":\"#f44336\"},{\"name\":\"Green Plate\",\"id\":\"G01\",\"price\":24.95,\"offer\":[[4,30]],\"image\":\"#8bc34a\"},{\"name\":\"Blue Plate\",\"id\":\"B01\",\"price\":7.95,\"image\":\"#1099dc\"}]');\n\n//# sourceURL=webpack://myModule/./src/data/plates.json?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});