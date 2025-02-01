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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useUserData: () => (/* binding */ useUserData)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _app_firebase_FirebaseProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app/firebase/FirebaseProvider */ \"(app-pages-browser)/./src/app/firebase/FirebaseProvider.tsx\");\n/* provided dependency */ var process = __webpack_require__(/*! process */ \"(app-pages-browser)/./node_modules/next/dist/build/polyfills/process.js\");\n\n\nconst useUserData = ()=>{\n    const { auth } = (0,_app_firebase_FirebaseProvider__WEBPACK_IMPORTED_MODULE_1__.useFirebase)();\n    const [userData, setUserData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)({\n        \"useUserData.useEffect\": ()=>{\n            const fetchData = {\n                \"useUserData.useEffect.fetchData\": async ()=>{\n                    if (auth.currentUser) {\n                        await fetchUserData(auth.currentUser);\n                    }\n                }\n            }[\"useUserData.useEffect.fetchData\"];\n            fetchData();\n            // Listen for auth state changes\n            const unsubscribe = auth.onAuthStateChanged({\n                \"useUserData.useEffect.unsubscribe\": (user)=>{\n                    if (user) {\n                        fetchUserData(user);\n                    } else {\n                        setUserData(null);\n                        setLoading(false);\n                    }\n                }\n            }[\"useUserData.useEffect.unsubscribe\"]);\n            return ({\n                \"useUserData.useEffect\": ()=>unsubscribe()\n            })[\"useUserData.useEffect\"];\n        }\n    }[\"useUserData.useEffect\"], [\n        auth\n    ]);\n    const fetchUserData = async (currentUser)=>{\n        try {\n            if (!currentUser) {\n                setUserData(null);\n                return;\n            }\n            const token = await currentUser.getIdToken();\n            const response = await fetch(\"\".concat(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001', \"/api/users/\").concat(currentUser.uid), {\n                headers: {\n                    'Authorization': \"Bearer \".concat(token)\n                }\n            });\n            if (!response.ok) throw new Error('Failed to fetch user data');\n            const data = await response.json();\n            setUserData(data);\n            localStorage.setItem('userData', JSON.stringify(data));\n        } catch (error) {\n            console.error('Error fetching user data:', error);\n            const storedData = localStorage.getItem('userData');\n            if (storedData) {\n                setUserData(JSON.parse(storedData));\n            }\n        } finally{\n            setLoading(false);\n        }\n    };\n    const addMaterial = async (materialData)=>{\n        try {\n            const user = auth.currentUser;\n            if (!user) throw new Error('No user logged in');\n            // Validate required fields before sending\n            if (!materialData.type || !materialData.title) {\n                throw new Error('Missing required fields');\n            }\n            const token = await user.getIdToken();\n            const response = await fetch(\"\".concat(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001', \"/api/users/\").concat(user.uid, \"/materials\"), {\n                method: 'POST',\n                headers: {\n                    'Authorization': \"Bearer \".concat(token),\n                    'Content-Type': 'application/json',\n                    'Accept': 'application/json'\n                },\n                credentials: 'include',\n                body: JSON.stringify({\n                    type: materialData.type,\n                    title: materialData.title,\n                    url: materialData.url || '',\n                    rating: materialData.rating || 5,\n                    dateAdded: new Date()\n                })\n            });\n            if (!response.ok) {\n                const errorData = await response.json();\n                throw new Error(errorData.error || 'Failed to add material');\n            }\n            // Refresh user data after adding material\n            await fetchUserData(user);\n            return true;\n        } catch (error) {\n            console.error('Error adding material:', error);\n            return false;\n        }\n    };\n    return {\n        userData,\n        loading,\n        fetchUserData,\n        addMaterial\n    };\n};\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9ob29rcy91c2VVc2VyRGF0YS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUE0QztBQUVtQjtBQUV4RCxNQUFNRyxjQUFjO0lBQ3pCLE1BQU0sRUFBRUMsSUFBSSxFQUFFLEdBQUdGLDJFQUFXQTtJQUM1QixNQUFNLENBQUNHLFVBQVVDLFlBQVksR0FBR04sK0NBQVFBLENBQWM7SUFDdEQsTUFBTSxDQUFDTyxTQUFTQyxXQUFXLEdBQUdSLCtDQUFRQSxDQUFDO0lBRXZDQyxnREFBU0E7aUNBQUM7WUFDUixNQUFNUTttREFBWTtvQkFDaEIsSUFBSUwsS0FBS00sV0FBVyxFQUFFO3dCQUNwQixNQUFNQyxjQUFjUCxLQUFLTSxXQUFXO29CQUN0QztnQkFDRjs7WUFFQUQ7WUFFQSxnQ0FBZ0M7WUFDaEMsTUFBTUcsY0FBY1IsS0FBS1Msa0JBQWtCO3FEQUFDLENBQUNDO29CQUMzQyxJQUFJQSxNQUFNO3dCQUNSSCxjQUFjRztvQkFDaEIsT0FBTzt3QkFDTFIsWUFBWTt3QkFDWkUsV0FBVztvQkFDYjtnQkFDRjs7WUFFQTt5Q0FBTyxJQUFNSTs7UUFDZjtnQ0FBRztRQUFDUjtLQUFLO0lBRVQsTUFBTU8sZ0JBQWdCLE9BQU9EO1FBQzNCLElBQUk7WUFDRixJQUFJLENBQUNBLGFBQWE7Z0JBQ2hCSixZQUFZO2dCQUNaO1lBQ0Y7WUFFQSxNQUFNUyxRQUFRLE1BQU1MLFlBQVlNLFVBQVU7WUFDMUMsTUFBTUMsV0FBVyxNQUFNQyxNQUFNLEdBQTJFUixPQUF4RVMsT0FBT0EsQ0FBQ0MsR0FBRyxDQUFDQyxtQkFBbUIsSUFBSSx5QkFBd0IsZUFBNkIsT0FBaEJYLFlBQVlZLEdBQUcsR0FBSTtnQkFDekhDLFNBQVM7b0JBQ1AsaUJBQWlCLFVBQWdCLE9BQU5SO2dCQUM3QjtZQUNGO1lBRUEsSUFBSSxDQUFDRSxTQUFTTyxFQUFFLEVBQUUsTUFBTSxJQUFJQyxNQUFNO1lBQ2xDLE1BQU1DLE9BQWEsTUFBTVQsU0FBU1UsSUFBSTtZQUN0Q3JCLFlBQVlvQjtZQUNaRSxhQUFhQyxPQUFPLENBQUMsWUFBWUMsS0FBS0MsU0FBUyxDQUFDTDtRQUNsRCxFQUFFLE9BQU9NLE9BQU87WUFDZEMsUUFBUUQsS0FBSyxDQUFDLDZCQUE2QkE7WUFDM0MsTUFBTUUsYUFBYU4sYUFBYU8sT0FBTyxDQUFDO1lBQ3hDLElBQUlELFlBQVk7Z0JBQ2Q1QixZQUFZd0IsS0FBS00sS0FBSyxDQUFDRjtZQUN6QjtRQUNGLFNBQVU7WUFDUjFCLFdBQVc7UUFDYjtJQUNGO0lBRUEsTUFBTTZCLGNBQWMsT0FBT0M7UUFDekIsSUFBSTtZQUNGLE1BQU14QixPQUFPVixLQUFLTSxXQUFXO1lBQzdCLElBQUksQ0FBQ0ksTUFBTSxNQUFNLElBQUlXLE1BQU07WUFFM0IsMENBQTBDO1lBQzFDLElBQUksQ0FBQ2EsYUFBYUMsSUFBSSxJQUFJLENBQUNELGFBQWFFLEtBQUssRUFBRTtnQkFDN0MsTUFBTSxJQUFJZixNQUFNO1lBQ2xCO1lBRUEsTUFBTVYsUUFBUSxNQUFNRCxLQUFLRSxVQUFVO1lBQ25DLE1BQU1DLFdBQVcsTUFBTUMsTUFBTSxHQUEyRUosT0FBeEVLLE9BQU9BLENBQUNDLEdBQUcsQ0FBQ0MsbUJBQW1CLElBQUkseUJBQXdCLGVBQXNCLE9BQVRQLEtBQUtRLEdBQUcsRUFBQyxlQUFhO2dCQUM1SG1CLFFBQVE7Z0JBQ1JsQixTQUFTO29CQUNQLGlCQUFpQixVQUFnQixPQUFOUjtvQkFDM0IsZ0JBQWdCO29CQUNoQixVQUFVO2dCQUNaO2dCQUNBMkIsYUFBYTtnQkFDYkMsTUFBTWIsS0FBS0MsU0FBUyxDQUFDO29CQUNuQlEsTUFBTUQsYUFBYUMsSUFBSTtvQkFDdkJDLE9BQU9GLGFBQWFFLEtBQUs7b0JBQ3pCSSxLQUFLTixhQUFhTSxHQUFHLElBQUk7b0JBQ3pCQyxRQUFRUCxhQUFhTyxNQUFNLElBQUk7b0JBQy9CQyxXQUFXLElBQUlDO2dCQUNqQjtZQUNGO1lBRUEsSUFBSSxDQUFDOUIsU0FBU08sRUFBRSxFQUFFO2dCQUNoQixNQUFNd0IsWUFBWSxNQUFNL0IsU0FBU1UsSUFBSTtnQkFDckMsTUFBTSxJQUFJRixNQUFNdUIsVUFBVWhCLEtBQUssSUFBSTtZQUNyQztZQUVBLDBDQUEwQztZQUMxQyxNQUFNckIsY0FBY0c7WUFDcEIsT0FBTztRQUNULEVBQUUsT0FBT2tCLE9BQU87WUFDZEMsUUFBUUQsS0FBSyxDQUFDLDBCQUEwQkE7WUFDeEMsT0FBTztRQUNUO0lBQ0Y7SUFFQSxPQUFPO1FBQUUzQjtRQUFVRTtRQUFTSTtRQUFlMEI7SUFBWTtBQUN6RCxFQUFFIiwic291cmNlcyI6WyIvVXNlcnMvam9yZGFud3UvRG9jdW1lbnRzL0dpdEh1Yi9zdHVkeWxpc3QvY2xpZW50L3NyYy9ob29rcy91c2VVc2VyRGF0YS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL3R5cGVzL1VzZXInO1xuaW1wb3J0IHsgdXNlRmlyZWJhc2UgfSBmcm9tICcuLi9hcHAvZmlyZWJhc2UvRmlyZWJhc2VQcm92aWRlcic7XG5cbmV4cG9ydCBjb25zdCB1c2VVc2VyRGF0YSA9ICgpID0+IHtcbiAgY29uc3QgeyBhdXRoIH0gPSB1c2VGaXJlYmFzZSgpO1xuICBjb25zdCBbdXNlckRhdGEsIHNldFVzZXJEYXRhXSA9IHVzZVN0YXRlPFVzZXIgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBmZXRjaERhdGEgPSBhc3luYyAoKSA9PiB7XG4gICAgICBpZiAoYXV0aC5jdXJyZW50VXNlcikge1xuICAgICAgICBhd2FpdCBmZXRjaFVzZXJEYXRhKGF1dGguY3VycmVudFVzZXIpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBmZXRjaERhdGEoKTtcbiAgICBcbiAgICAvLyBMaXN0ZW4gZm9yIGF1dGggc3RhdGUgY2hhbmdlc1xuICAgIGNvbnN0IHVuc3Vic2NyaWJlID0gYXV0aC5vbkF1dGhTdGF0ZUNoYW5nZWQoKHVzZXIpID0+IHtcbiAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgIGZldGNoVXNlckRhdGEodXNlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRVc2VyRGF0YShudWxsKTtcbiAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gKCkgPT4gdW5zdWJzY3JpYmUoKTtcbiAgfSwgW2F1dGhdKTtcblxuICBjb25zdCBmZXRjaFVzZXJEYXRhID0gYXN5bmMgKGN1cnJlbnRVc2VyOiBhbnkpID0+IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFjdXJyZW50VXNlcikge1xuICAgICAgICBzZXRVc2VyRGF0YShudWxsKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB0b2tlbiA9IGF3YWl0IGN1cnJlbnRVc2VyLmdldElkVG9rZW4oKTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7cHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQVBJX1VSTCB8fCAnaHR0cDovL2xvY2FsaG9zdDo1MDAxJ30vYXBpL3VzZXJzLyR7Y3VycmVudFVzZXIudWlkfWAsIHtcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke3Rva2VufWBcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGZldGNoIHVzZXIgZGF0YScpO1xuICAgICAgY29uc3QgZGF0YTogVXNlciA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIHNldFVzZXJEYXRhKGRhdGEpO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXJEYXRhJywgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyB1c2VyIGRhdGE6JywgZXJyb3IpO1xuICAgICAgY29uc3Qgc3RvcmVkRGF0YSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyRGF0YScpO1xuICAgICAgaWYgKHN0b3JlZERhdGEpIHtcbiAgICAgICAgc2V0VXNlckRhdGEoSlNPTi5wYXJzZShzdG9yZWREYXRhKSk7XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBhZGRNYXRlcmlhbCA9IGFzeW5jIChtYXRlcmlhbERhdGE6IHsgdHlwZTogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyB1cmw/OiBzdHJpbmc7IHJhdGluZz86IG51bWJlciB9KSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHVzZXIgPSBhdXRoLmN1cnJlbnRVc2VyO1xuICAgICAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoJ05vIHVzZXIgbG9nZ2VkIGluJyk7XG5cbiAgICAgIC8vIFZhbGlkYXRlIHJlcXVpcmVkIGZpZWxkcyBiZWZvcmUgc2VuZGluZ1xuICAgICAgaWYgKCFtYXRlcmlhbERhdGEudHlwZSB8fCAhbWF0ZXJpYWxEYXRhLnRpdGxlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyByZXF1aXJlZCBmaWVsZHMnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdG9rZW4gPSBhd2FpdCB1c2VyLmdldElkVG9rZW4oKTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7cHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQVBJX1VSTCB8fCAnaHR0cDovL2xvY2FsaG9zdDo1MDAxJ30vYXBpL3VzZXJzLyR7dXNlci51aWR9L21hdGVyaWFsc2AsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHt0b2tlbn1gLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgdHlwZTogbWF0ZXJpYWxEYXRhLnR5cGUsXG4gICAgICAgICAgdGl0bGU6IG1hdGVyaWFsRGF0YS50aXRsZSxcbiAgICAgICAgICB1cmw6IG1hdGVyaWFsRGF0YS51cmwgfHwgJycsIC8vIE1ha2UgVVJMIG9wdGlvbmFsXG4gICAgICAgICAgcmF0aW5nOiBtYXRlcmlhbERhdGEucmF0aW5nIHx8IDUsXG4gICAgICAgICAgZGF0ZUFkZGVkOiBuZXcgRGF0ZSgpXG4gICAgICAgIH0pXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICBjb25zdCBlcnJvckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvckRhdGEuZXJyb3IgfHwgJ0ZhaWxlZCB0byBhZGQgbWF0ZXJpYWwnKTtcbiAgICAgIH1cblxuICAgICAgLy8gUmVmcmVzaCB1c2VyIGRhdGEgYWZ0ZXIgYWRkaW5nIG1hdGVyaWFsXG4gICAgICBhd2FpdCBmZXRjaFVzZXJEYXRhKHVzZXIpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGFkZGluZyBtYXRlcmlhbDonLCBlcnJvcik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7IHVzZXJEYXRhLCBsb2FkaW5nLCBmZXRjaFVzZXJEYXRhLCBhZGRNYXRlcmlhbCB9O1xufTsiXSwibmFtZXMiOlsidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJ1c2VGaXJlYmFzZSIsInVzZVVzZXJEYXRhIiwiYXV0aCIsInVzZXJEYXRhIiwic2V0VXNlckRhdGEiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsImZldGNoRGF0YSIsImN1cnJlbnRVc2VyIiwiZmV0Y2hVc2VyRGF0YSIsInVuc3Vic2NyaWJlIiwib25BdXRoU3RhdGVDaGFuZ2VkIiwidXNlciIsInRva2VuIiwiZ2V0SWRUb2tlbiIsInJlc3BvbnNlIiwiZmV0Y2giLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfQVBJX1VSTCIsInVpZCIsImhlYWRlcnMiLCJvayIsIkVycm9yIiwiZGF0YSIsImpzb24iLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiSlNPTiIsInN0cmluZ2lmeSIsImVycm9yIiwiY29uc29sZSIsInN0b3JlZERhdGEiLCJnZXRJdGVtIiwicGFyc2UiLCJhZGRNYXRlcmlhbCIsIm1hdGVyaWFsRGF0YSIsInR5cGUiLCJ0aXRsZSIsIm1ldGhvZCIsImNyZWRlbnRpYWxzIiwiYm9keSIsInVybCIsInJhdGluZyIsImRhdGVBZGRlZCIsIkRhdGUiLCJlcnJvckRhdGEiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/hooks/useUserData.ts\n"));

/***/ })

});