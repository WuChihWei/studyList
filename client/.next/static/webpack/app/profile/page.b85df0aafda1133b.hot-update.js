"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/profile/page",{

/***/ "(app-pages-browser)/./src/hooks/useUserData.ts":
/*!**********************************!*\
  !*** ./src/hooks/useUserData.ts ***!
  \**********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useUserData: () => (/* binding */ useUserData)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _app_firebase_firebaseConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app/firebase/firebaseConfig */ \"(app-pages-browser)/./src/app/firebase/firebaseConfig.ts\");\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/auth */ \"(app-pages-browser)/../node_modules/firebase/auth/dist/esm/index.esm.js\");\n/* provided dependency */ var process = __webpack_require__(/*! process */ \"(app-pages-browser)/./node_modules/next/dist/build/polyfills/process.js\");\n\n\n\nconst useUserData = ()=>{\n    const [userData, setUserData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);\n    const fetchUserData = async (currentUser)=>{\n        try {\n            if (!currentUser) {\n                setUserData(null);\n                return;\n            }\n            const token = await currentUser.getIdToken();\n            const response = await fetch(\"http://localhost:5001/api/users/\".concat(currentUser.uid), {\n                headers: {\n                    'Authorization': \"Bearer \".concat(token)\n                }\n            });\n            if (!response.ok) throw new Error('Failed to fetch user data');\n            const data = await response.json();\n            setUserData(data);\n            // Store user data in localStorage\n            localStorage.setItem('userData', JSON.stringify(data));\n        } catch (error) {\n            console.error('Error fetching user data:', error);\n            // If there's an error, try to get data from localStorage\n            const storedData = localStorage.getItem('userData');\n            if (storedData) {\n                setUserData(JSON.parse(storedData));\n            }\n        } finally{\n            setLoading(false);\n        }\n    };\n    const addMaterial = async (materialData)=>{\n        try {\n            const user = _app_firebase_firebaseConfig__WEBPACK_IMPORTED_MODULE_1__.auth.currentUser;\n            if (!user) throw new Error('No user logged in');\n            const token = await user.getIdToken();\n            const response = await fetch(\"\".concat(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001', \"/api/users/\").concat(user.uid, \"/materials\"), {\n                method: 'POST',\n                headers: {\n                    'Authorization': \"Bearer \".concat(token),\n                    'Content-Type': 'application/json',\n                    'Accept': 'application/json'\n                },\n                credentials: 'include',\n                body: JSON.stringify(materialData)\n            });\n            if (!response.ok) {\n                const errorData = await response.json();\n                throw new Error(errorData.error || 'Failed to add material');\n            }\n            const { material, materials } = await response.json();\n            // Update local state with new materials\n            setUserData((prev)=>prev ? {\n                    ...prev,\n                    materials: materials\n                } : null);\n            // Update localStorage\n            const storedData = localStorage.getItem('userData');\n            if (storedData) {\n                const parsedData = JSON.parse(storedData);\n                localStorage.setItem('userData', JSON.stringify({\n                    ...parsedData,\n                    materials: materials\n                }));\n            }\n            return true;\n        } catch (error) {\n            console.error('Error adding material:', error);\n            return false;\n        }\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)({\n        \"useUserData.useEffect\": ()=>{\n            const unsubscribe = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.onAuthStateChanged)(_app_firebase_firebaseConfig__WEBPACK_IMPORTED_MODULE_1__.auth, {\n                \"useUserData.useEffect.unsubscribe\": (user)=>{\n                    if (user) {\n                        // User is signed in\n                        fetchUserData(user);\n                    } else {\n                        // User is signed out\n                        setUserData(null);\n                        localStorage.removeItem('userData');\n                        setLoading(false);\n                    }\n                }\n            }[\"useUserData.useEffect.unsubscribe\"]);\n            // Try to load data from localStorage on initial mount\n            const storedData = localStorage.getItem('userData');\n            if (storedData) {\n                setUserData(JSON.parse(storedData));\n                setLoading(false);\n            }\n            return ({\n                \"useUserData.useEffect\": ()=>unsubscribe()\n            })[\"useUserData.useEffect\"];\n        }\n    }[\"useUserData.useEffect\"], []);\n    return {\n        userData,\n        loading,\n        fetchUserData,\n        addMaterial\n    };\n};\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9ob29rcy91c2VVc2VyRGF0YS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBNEM7QUFDVTtBQUVIO0FBRTVDLE1BQU1JLGNBQWM7SUFDekIsTUFBTSxDQUFDQyxVQUFVQyxZQUFZLEdBQUdOLCtDQUFRQSxDQUFjO0lBQ3RELE1BQU0sQ0FBQ08sU0FBU0MsV0FBVyxHQUFHUiwrQ0FBUUEsQ0FBQztJQUV2QyxNQUFNUyxnQkFBZ0IsT0FBT0M7UUFDM0IsSUFBSTtZQUNGLElBQUksQ0FBQ0EsYUFBYTtnQkFDaEJKLFlBQVk7Z0JBQ1o7WUFDRjtZQUVBLE1BQU1LLFFBQVEsTUFBTUQsWUFBWUUsVUFBVTtZQUMxQyxNQUFNQyxXQUFXLE1BQU1DLE1BQU0sbUNBQW1ELE9BQWhCSixZQUFZSyxHQUFHLEdBQUk7Z0JBQ2pGQyxTQUFTO29CQUNQLGlCQUFpQixVQUFnQixPQUFOTDtnQkFDN0I7WUFDRjtZQUVBLElBQUksQ0FBQ0UsU0FBU0ksRUFBRSxFQUFFLE1BQU0sSUFBSUMsTUFBTTtZQUNsQyxNQUFNQyxPQUFhLE1BQU1OLFNBQVNPLElBQUk7WUFDdENkLFlBQVlhO1lBQ1osa0NBQWtDO1lBQ2xDRSxhQUFhQyxPQUFPLENBQUMsWUFBWUMsS0FBS0MsU0FBUyxDQUFDTDtRQUNsRCxFQUFFLE9BQU9NLE9BQU87WUFDZEMsUUFBUUQsS0FBSyxDQUFDLDZCQUE2QkE7WUFDM0MseURBQXlEO1lBQ3pELE1BQU1FLGFBQWFOLGFBQWFPLE9BQU8sQ0FBQztZQUN4QyxJQUFJRCxZQUFZO2dCQUNkckIsWUFBWWlCLEtBQUtNLEtBQUssQ0FBQ0Y7WUFDekI7UUFDRixTQUFVO1lBQ1JuQixXQUFXO1FBQ2I7SUFDRjtJQUVBLE1BQU1zQixjQUFjLE9BQU9DO1FBQ3pCLElBQUk7WUFDRixNQUFNQyxPQUFPOUIsOERBQUlBLENBQUNRLFdBQVc7WUFDN0IsSUFBSSxDQUFDc0IsTUFBTSxNQUFNLElBQUlkLE1BQU07WUFFM0IsTUFBTVAsUUFBUSxNQUFNcUIsS0FBS3BCLFVBQVU7WUFDbkMsTUFBTUMsV0FBVyxNQUFNQyxNQUFNLEdBQTJFa0IsT0FBeEVDLE9BQU9BLENBQUNDLEdBQUcsQ0FBQ0MsbUJBQW1CLElBQUkseUJBQXdCLGVBQXNCLE9BQVRILEtBQUtqQixHQUFHLEVBQUMsZUFBYTtnQkFDNUhxQixRQUFRO2dCQUNScEIsU0FBUztvQkFDUCxpQkFBaUIsVUFBZ0IsT0FBTkw7b0JBQzNCLGdCQUFnQjtvQkFDaEIsVUFBVTtnQkFDWjtnQkFDQTBCLGFBQWE7Z0JBQ2JDLE1BQU1mLEtBQUtDLFNBQVMsQ0FBQ087WUFDdkI7WUFFQSxJQUFJLENBQUNsQixTQUFTSSxFQUFFLEVBQUU7Z0JBQ2hCLE1BQU1zQixZQUFZLE1BQU0xQixTQUFTTyxJQUFJO2dCQUNyQyxNQUFNLElBQUlGLE1BQU1xQixVQUFVZCxLQUFLLElBQUk7WUFDckM7WUFFQSxNQUFNLEVBQUVlLFFBQVEsRUFBRUMsU0FBUyxFQUFFLEdBQUcsTUFBTTVCLFNBQVNPLElBQUk7WUFFbkQsd0NBQXdDO1lBQ3hDZCxZQUFZb0MsQ0FBQUEsT0FBUUEsT0FBTztvQkFDekIsR0FBR0EsSUFBSTtvQkFDUEQsV0FBV0E7Z0JBQ2IsSUFBSTtZQUVKLHNCQUFzQjtZQUN0QixNQUFNZCxhQUFhTixhQUFhTyxPQUFPLENBQUM7WUFDeEMsSUFBSUQsWUFBWTtnQkFDZCxNQUFNZ0IsYUFBYXBCLEtBQUtNLEtBQUssQ0FBQ0Y7Z0JBQzlCTixhQUFhQyxPQUFPLENBQUMsWUFBWUMsS0FBS0MsU0FBUyxDQUFDO29CQUM5QyxHQUFHbUIsVUFBVTtvQkFDYkYsV0FBV0E7Z0JBQ2I7WUFDRjtZQUVBLE9BQU87UUFDVCxFQUFFLE9BQU9oQixPQUFPO1lBQ2RDLFFBQVFELEtBQUssQ0FBQywwQkFBMEJBO1lBQ3hDLE9BQU87UUFDVDtJQUNGO0lBRUF4QixnREFBU0E7aUNBQUM7WUFDUixNQUFNMkMsY0FBY3pDLGlFQUFrQkEsQ0FBQ0QsOERBQUlBO3FEQUFFLENBQUM4QjtvQkFDNUMsSUFBSUEsTUFBTTt3QkFDUixvQkFBb0I7d0JBQ3BCdkIsY0FBY3VCO29CQUNoQixPQUFPO3dCQUNMLHFCQUFxQjt3QkFDckIxQixZQUFZO3dCQUNaZSxhQUFhd0IsVUFBVSxDQUFDO3dCQUN4QnJDLFdBQVc7b0JBQ2I7Z0JBQ0Y7O1lBRUEsc0RBQXNEO1lBQ3RELE1BQU1tQixhQUFhTixhQUFhTyxPQUFPLENBQUM7WUFDeEMsSUFBSUQsWUFBWTtnQkFDZHJCLFlBQVlpQixLQUFLTSxLQUFLLENBQUNGO2dCQUN2Qm5CLFdBQVc7WUFDYjtZQUVBO3lDQUFPLElBQU1vQzs7UUFDZjtnQ0FBRyxFQUFFO0lBRUwsT0FBTztRQUFFdkM7UUFBVUU7UUFBU0U7UUFBZXFCO0lBQVk7QUFDekQsRUFBRSIsInNvdXJjZXMiOlsiL1VzZXJzL2pvcmRhbnd1L0RvY3VtZW50cy9HaXRIdWIvc3R1ZHlsaXN0L2NsaWVudC9zcmMvaG9va3MvdXNlVXNlckRhdGEudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGF1dGggfSBmcm9tICcuLi9hcHAvZmlyZWJhc2UvZmlyZWJhc2VDb25maWcnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL3R5cGVzL1VzZXInO1xuaW1wb3J0IHsgb25BdXRoU3RhdGVDaGFuZ2VkIH0gZnJvbSAnZmlyZWJhc2UvYXV0aCc7XG5cbmV4cG9ydCBjb25zdCB1c2VVc2VyRGF0YSA9ICgpID0+IHtcbiAgY29uc3QgW3VzZXJEYXRhLCBzZXRVc2VyRGF0YV0gPSB1c2VTdGF0ZTxVc2VyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuXG4gIGNvbnN0IGZldGNoVXNlckRhdGEgPSBhc3luYyAoY3VycmVudFVzZXI6IGFueSkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIWN1cnJlbnRVc2VyKSB7XG4gICAgICAgIHNldFVzZXJEYXRhKG51bGwpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRva2VuID0gYXdhaXQgY3VycmVudFVzZXIuZ2V0SWRUb2tlbigpO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo1MDAxL2FwaS91c2Vycy8ke2N1cnJlbnRVc2VyLnVpZH1gLCB7XG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHt0b2tlbn1gXG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBmZXRjaCB1c2VyIGRhdGEnKTtcbiAgICAgIGNvbnN0IGRhdGE6IFVzZXIgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICBzZXRVc2VyRGF0YShkYXRhKTtcbiAgICAgIC8vIFN0b3JlIHVzZXIgZGF0YSBpbiBsb2NhbFN0b3JhZ2VcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyRGF0YScsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgdXNlciBkYXRhOicsIGVycm9yKTtcbiAgICAgIC8vIElmIHRoZXJlJ3MgYW4gZXJyb3IsIHRyeSB0byBnZXQgZGF0YSBmcm9tIGxvY2FsU3RvcmFnZVxuICAgICAgY29uc3Qgc3RvcmVkRGF0YSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyRGF0YScpO1xuICAgICAgaWYgKHN0b3JlZERhdGEpIHtcbiAgICAgICAgc2V0VXNlckRhdGEoSlNPTi5wYXJzZShzdG9yZWREYXRhKSk7XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBhZGRNYXRlcmlhbCA9IGFzeW5jIChtYXRlcmlhbERhdGEpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdXNlciA9IGF1dGguY3VycmVudFVzZXI7XG4gICAgICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcignTm8gdXNlciBsb2dnZWQgaW4nKTtcblxuICAgICAgY29uc3QgdG9rZW4gPSBhd2FpdCB1c2VyLmdldElkVG9rZW4oKTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7cHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQVBJX1VSTCB8fCAnaHR0cDovL2xvY2FsaG9zdDo1MDAxJ30vYXBpL3VzZXJzLyR7dXNlci51aWR9L21hdGVyaWFsc2AsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHt0b2tlbn1gLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShtYXRlcmlhbERhdGEpXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICBjb25zdCBlcnJvckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvckRhdGEuZXJyb3IgfHwgJ0ZhaWxlZCB0byBhZGQgbWF0ZXJpYWwnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgeyBtYXRlcmlhbCwgbWF0ZXJpYWxzIH0gPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICBcbiAgICAgIC8vIFVwZGF0ZSBsb2NhbCBzdGF0ZSB3aXRoIG5ldyBtYXRlcmlhbHNcbiAgICAgIHNldFVzZXJEYXRhKHByZXYgPT4gcHJldiA/IHtcbiAgICAgICAgLi4ucHJldixcbiAgICAgICAgbWF0ZXJpYWxzOiBtYXRlcmlhbHNcbiAgICAgIH0gOiBudWxsKTtcblxuICAgICAgLy8gVXBkYXRlIGxvY2FsU3RvcmFnZVxuICAgICAgY29uc3Qgc3RvcmVkRGF0YSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyRGF0YScpO1xuICAgICAgaWYgKHN0b3JlZERhdGEpIHtcbiAgICAgICAgY29uc3QgcGFyc2VkRGF0YSA9IEpTT04ucGFyc2Uoc3RvcmVkRGF0YSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyRGF0YScsIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAuLi5wYXJzZWREYXRhLFxuICAgICAgICAgIG1hdGVyaWFsczogbWF0ZXJpYWxzXG4gICAgICAgIH0pKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGFkZGluZyBtYXRlcmlhbDonLCBlcnJvcik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgdW5zdWJzY3JpYmUgPSBvbkF1dGhTdGF0ZUNoYW5nZWQoYXV0aCwgKHVzZXIpID0+IHtcbiAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgIC8vIFVzZXIgaXMgc2lnbmVkIGluXG4gICAgICAgIGZldGNoVXNlckRhdGEodXNlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBVc2VyIGlzIHNpZ25lZCBvdXRcbiAgICAgICAgc2V0VXNlckRhdGEobnVsbCk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd1c2VyRGF0YScpO1xuICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIFRyeSB0byBsb2FkIGRhdGEgZnJvbSBsb2NhbFN0b3JhZ2Ugb24gaW5pdGlhbCBtb3VudFxuICAgIGNvbnN0IHN0b3JlZERhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlckRhdGEnKTtcbiAgICBpZiAoc3RvcmVkRGF0YSkge1xuICAgICAgc2V0VXNlckRhdGEoSlNPTi5wYXJzZShzdG9yZWREYXRhKSk7XG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4gdW5zdWJzY3JpYmUoKTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiB7IHVzZXJEYXRhLCBsb2FkaW5nLCBmZXRjaFVzZXJEYXRhLCBhZGRNYXRlcmlhbCB9O1xufTsiXSwibmFtZXMiOlsidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJhdXRoIiwib25BdXRoU3RhdGVDaGFuZ2VkIiwidXNlVXNlckRhdGEiLCJ1c2VyRGF0YSIsInNldFVzZXJEYXRhIiwibG9hZGluZyIsInNldExvYWRpbmciLCJmZXRjaFVzZXJEYXRhIiwiY3VycmVudFVzZXIiLCJ0b2tlbiIsImdldElkVG9rZW4iLCJyZXNwb25zZSIsImZldGNoIiwidWlkIiwiaGVhZGVycyIsIm9rIiwiRXJyb3IiLCJkYXRhIiwianNvbiIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJKU09OIiwic3RyaW5naWZ5IiwiZXJyb3IiLCJjb25zb2xlIiwic3RvcmVkRGF0YSIsImdldEl0ZW0iLCJwYXJzZSIsImFkZE1hdGVyaWFsIiwibWF0ZXJpYWxEYXRhIiwidXNlciIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19BUElfVVJMIiwibWV0aG9kIiwiY3JlZGVudGlhbHMiLCJib2R5IiwiZXJyb3JEYXRhIiwibWF0ZXJpYWwiLCJtYXRlcmlhbHMiLCJwcmV2IiwicGFyc2VkRGF0YSIsInVuc3Vic2NyaWJlIiwicmVtb3ZlSXRlbSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/hooks/useUserData.ts\n"));

/***/ })

});