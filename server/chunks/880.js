"use strict";
exports.id = 880;
exports.ids = [880];
exports.modules = {

/***/ 5880:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "W": () => (/* binding */ firebaseContext),
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3745);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(401);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1492);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_app__WEBPACK_IMPORTED_MODULE_2__, firebase_auth__WEBPACK_IMPORTED_MODULE_3__, firebase_firestore__WEBPACK_IMPORTED_MODULE_4__]);
([firebase_app__WEBPACK_IMPORTED_MODULE_2__, firebase_auth__WEBPACK_IMPORTED_MODULE_3__, firebase_firestore__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);

// Import the functions you need from the SDKs you need





const firebaseConfig = {
    apiKey: "AIzaSyAXVt8o7qCAWhjT2nf6kE3s6ZRHlUueR3Y",
    authDomain: "buycar-b880d.firebaseapp.com",
    projectId: "buycar-b880d",
    storageBucket: "buycar-b880d.appspot.com",
    messagingSenderId: "607153380170",
    appId: "1:607153380170:web:4749ad1866166682253fb3"
};
const firebaseContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();
const Firebase = ({ children  })=>{
    // Initialize Firebase
    const app = (0,firebase_app__WEBPACK_IMPORTED_MODULE_2__.initializeApp)(firebaseConfig);
    //Initialize authentication
    const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_3__.getAuth)(app);
    //Initialize database
    const db = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.getFirestore)(app);
    const { 0: userConnect , 1: setUserConnect  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: uid1 , 1: setUid  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: isLoading , 1: setIsLoading  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    //Sign Up fnction
    const signup = (email, password)=>(0,firebase_auth__WEBPACK_IMPORTED_MODULE_3__.createUserWithEmailAndPassword)(auth, email, password)
    ;
    //Sign In function
    const signin = (email, password)=>(0,firebase_auth__WEBPACK_IMPORTED_MODULE_3__.signInWithEmailAndPassword)(auth, email, password)
    ;
    //Verification connexion
    const stateConnection = (userFunction)=>(0,firebase_auth__WEBPACK_IMPORTED_MODULE_3__.onAuthStateChanged)(auth, userFunction)
    ;
    //Reset Password
    const resetPassword = (email)=>(0,firebase_auth__WEBPACK_IMPORTED_MODULE_3__.sendPasswordResetEmail)(auth, email)
    ;
    //Sign out connexion
    const signout = ()=>(0,firebase_auth__WEBPACK_IMPORTED_MODULE_3__.signOut)(auth)
    ;
    //Connection database
    const user = (uid)=>(0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.doc)(db, `/users/${uid}`)
    ;
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(firebaseContext.Provider, {
        value: {
            db,
            signup,
            signin,
            stateConnection,
            resetPassword,
            signout,
            userConnect,
            setUserConnect,
            user,
            uid: uid1,
            setUid,
            isLoading,
            setIsLoading
        },
        children: children
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Firebase);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;