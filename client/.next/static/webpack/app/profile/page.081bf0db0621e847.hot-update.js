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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useUserData: () => (/* binding */ useUserData)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _app_firebase_FirebaseProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app/firebase/FirebaseProvider */ \"(app-pages-browser)/./src/app/firebase/FirebaseProvider.tsx\");\n/* provided dependency */ var process = __webpack_require__(/*! process */ \"(app-pages-browser)/./node_modules/next/dist/build/polyfills/process.js\");\n\n\nconst useUserData = ()=>{\n    const { auth } = (0,_app_firebase_FirebaseProvider__WEBPACK_IMPORTED_MODULE_1__.useFirebase)();\n    const [userData, setUserData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);\n    const fetchUserData = async (currentUser)=>{\n        try {\n            setLoading(true);\n            const token = await currentUser.getIdToken();\n            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';\n            console.log('Fetching from:', \"\".concat(apiUrl, \"/api/users/\").concat(currentUser.uid));\n            const response = await fetch(\"\".concat(apiUrl, \"/api/users/\").concat(currentUser.uid), {\n                headers: {\n                    'Authorization': \"Bearer \".concat(token),\n                    'Content-Type': 'application/json'\n                }\n            });\n            if (!response.ok) {\n                throw new Error(\"API error: \".concat(response.status));\n            }\n            const data = await response.json();\n            setUserData(data);\n        } catch (error) {\n            console.error('Error fetching user data:', error);\n            setUserData(null);\n        } finally{\n            setLoading(false);\n        }\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)({\n        \"useUserData.useEffect\": ()=>{\n            const unsubscribe = auth.onAuthStateChanged({\n                \"useUserData.useEffect.unsubscribe\": (user)=>{\n                    if (user) {\n                        fetchUserData(user);\n                    } else {\n                        setUserData(null);\n                        setLoading(false);\n                    }\n                }\n            }[\"useUserData.useEffect.unsubscribe\"]);\n            return ({\n                \"useUserData.useEffect\": ()=>unsubscribe()\n            })[\"useUserData.useEffect\"];\n        }\n    }[\"useUserData.useEffect\"], [\n        auth\n    ]);\n    const addMaterial = async (materialData, topicId)=>{\n        try {\n            const user = auth.currentUser;\n            if (!user) throw new Error('No user logged in');\n            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';\n            const endpoint = \"\".concat(apiUrl, \"/api/users/\").concat(user.uid, \"/topics/\").concat(topicId, \"/materials\");\n            console.log('Adding material:', {\n                payload: materialData,\n                topicId,\n                url: endpoint\n            });\n            const token = await user.getIdToken();\n            const response = await fetch(endpoint, {\n                method: 'POST',\n                headers: {\n                    'Authorization': \"Bearer \".concat(token),\n                    'Content-Type': 'application/json'\n                },\n                body: JSON.stringify(materialData)\n            });\n            if (!response.ok) {\n                const errorText = await response.text();\n                console.error('Server error response:', errorText);\n                throw new Error(\"Failed to add material: \".concat(response.status));\n            }\n            const updatedUser = await response.json();\n            setUserData(updatedUser);\n            return true;\n        } catch (error) {\n            console.error('Error adding material:', error);\n            return false;\n        }\n    };\n    const updateProfile = async (data)=>{\n        try {\n            const user = auth.currentUser;\n            if (!user) throw new Error('No user logged in');\n            const token = await user.getIdToken();\n            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';\n            console.log('Updating profile with data:', data);\n            console.log('Sending request to:', \"\".concat(apiUrl, \"/api/users/\").concat(user.uid, \"/profile\"));\n            const response = await fetch(\"\".concat(apiUrl, \"/api/users/\").concat(user.uid, \"/profile\"), {\n                method: 'PUT',\n                headers: {\n                    'Authorization': \"Bearer \".concat(token),\n                    'Content-Type': 'application/json'\n                },\n                body: JSON.stringify(data)\n            });\n            if (!response.ok) {\n                const errorData = await response.json();\n                console.error('Error response:', errorData);\n                throw new Error(errorData.error || 'Failed to update profile');\n            }\n            const updatedUser = await response.json();\n            console.log('Updated user data:', updatedUser);\n            setUserData(updatedUser);\n            return true;\n        } catch (error) {\n            console.error('Error updating profile:', error);\n            return false;\n        }\n    };\n    const updateTopicName = async (topicId, name)=>{\n        try {\n            const user = auth.currentUser;\n            if (!user) throw new Error('No user logged in');\n            const token = await user.getIdToken();\n            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';\n            console.log('Updating topic:', {\n                topicId,\n                name,\n                url: \"\".concat(apiUrl, \"/api/users/\").concat(user.uid, \"/topics/\").concat(topicId)\n            });\n            const response = await fetch(\"\".concat(apiUrl, \"/api/users/\").concat(user.uid, \"/topics/\").concat(topicId), {\n                method: 'PUT',\n                headers: {\n                    'Authorization': \"Bearer \".concat(token),\n                    'Content-Type': 'application/json'\n                },\n                body: JSON.stringify({\n                    name\n                })\n            });\n            if (!response.ok) {\n                const contentType = response.headers.get('content-type');\n                if (contentType && contentType.includes('application/json')) {\n                    const errorData = await response.json();\n                    throw new Error(errorData.error || 'Failed to update topic name');\n                } else {\n                    const text = await response.text();\n                    console.error('Unexpected response:', text);\n                    throw new Error(\"Server error: \".concat(response.status));\n                }\n            }\n            const updatedUser = await response.json();\n            setUserData(updatedUser);\n            return true;\n        } catch (error) {\n            console.error('Error updating topic name:', error);\n            return false;\n        }\n    };\n    const addTopic = async (name)=>{\n        try {\n            const user = auth.currentUser;\n            if (!user) throw new Error('No user logged in');\n            const token = await user.getIdToken();\n            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';\n            console.log('Sending request to:', \"\".concat(apiUrl, \"/api/users/\").concat(user.uid, \"/topics\"));\n            const response = await fetch(\"\".concat(apiUrl, \"/api/users/\").concat(user.uid, \"/topics\"), {\n                method: 'POST',\n                headers: {\n                    'Authorization': \"Bearer \".concat(token),\n                    'Content-Type': 'application/json'\n                },\n                body: JSON.stringify({\n                    name\n                })\n            });\n            if (!response.ok) {\n                const contentType = response.headers.get('content-type');\n                if (contentType && contentType.includes('application/json')) {\n                    const errorData = await response.json();\n                    throw new Error(errorData.error || 'Failed to add topic');\n                } else {\n                    const text = await response.text();\n                    console.error('Unexpected response:', text);\n                    throw new Error(\"Server error: \".concat(response.status));\n                }\n            }\n            const updatedUser = await response.json();\n            setUserData(updatedUser);\n            return true;\n        } catch (error) {\n            console.error('Error adding topic:', error);\n            return false;\n        }\n    };\n    const getContributionData = ()=>{\n        if (!(userData === null || userData === void 0 ? void 0 : userData.contributions)) return [];\n        return userData.contributions.map((contribution)=>({\n                date: contribution.date,\n                count: contribution.count\n            }));\n    };\n    return {\n        userData,\n        loading,\n        fetchUserData,\n        addMaterial,\n        updateProfile,\n        addTopic,\n        updateTopicName,\n        getContributionData\n    };\n};\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9ob29rcy91c2VVc2VyRGF0YS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUE0QztBQUVtQjtBQXlCeEQsTUFBTUcsY0FBYztJQUN6QixNQUFNLEVBQUVDLElBQUksRUFBRSxHQUFHRiwyRUFBV0E7SUFDNUIsTUFBTSxDQUFDRyxVQUFVQyxZQUFZLEdBQUdOLCtDQUFRQSxDQUFjO0lBQ3RELE1BQU0sQ0FBQ08sU0FBU0MsV0FBVyxHQUFHUiwrQ0FBUUEsQ0FBQztJQUV2QyxNQUFNUyxnQkFBZ0IsT0FBT0M7UUFDM0IsSUFBSTtZQUNGRixXQUFXO1lBQ1gsTUFBTUcsUUFBUSxNQUFNRCxZQUFZRSxVQUFVO1lBQzFDLE1BQU1DLFNBQVNDLE9BQU9BLENBQUNDLEdBQUcsQ0FBQ0MsbUJBQW1CLElBQUk7WUFFbERDLFFBQVFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBdUJSLE9BQXBCRyxRQUFPLGVBQTZCLE9BQWhCSCxZQUFZUyxHQUFHO1lBRXBFLE1BQU1DLFdBQVcsTUFBTUMsTUFBTSxHQUF1QlgsT0FBcEJHLFFBQU8sZUFBNkIsT0FBaEJILFlBQVlTLEdBQUcsR0FBSTtnQkFDckVHLFNBQVM7b0JBQ1AsaUJBQWlCLFVBQWdCLE9BQU5YO29CQUMzQixnQkFBZ0I7Z0JBQ2xCO1lBQ0Y7WUFFQSxJQUFJLENBQUNTLFNBQVNHLEVBQUUsRUFBRTtnQkFDaEIsTUFBTSxJQUFJQyxNQUFNLGNBQThCLE9BQWhCSixTQUFTSyxNQUFNO1lBQy9DO1lBRUEsTUFBTUMsT0FBTyxNQUFNTixTQUFTTyxJQUFJO1lBQ2hDckIsWUFBWW9CO1FBQ2QsRUFBRSxPQUFPRSxPQUFPO1lBQ2RYLFFBQVFXLEtBQUssQ0FBQyw2QkFBNkJBO1lBQzNDdEIsWUFBWTtRQUNkLFNBQVU7WUFDUkUsV0FBVztRQUNiO0lBQ0Y7SUFFQVAsZ0RBQVNBO2lDQUFDO1lBQ1IsTUFBTTRCLGNBQWN6QixLQUFLMEIsa0JBQWtCO3FEQUFDLENBQUNDO29CQUMzQyxJQUFJ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LFlBQVlzQztZQUNaLE9BQU87UUFDVCxFQUFFLE9BQU9oQixPQUFPO1lBQ2RYLFFBQVFXLEtBQUssQ0FBQyx1QkFBdUJBO1lBQ3JDLE9BQU87UUFDVDtJQUNGO0lBRUEsTUFBTXlCLHNCQUFzQjtRQUMxQixJQUFJLEVBQUNoRCxxQkFBQUEsK0JBQUFBLFNBQVVpRCxhQUFhLEdBQUUsT0FBTyxFQUFFO1FBRXZDLE9BQU9qRCxTQUFTaUQsYUFBYSxDQUFDQyxHQUFHLENBQUNDLENBQUFBLGVBQWlCO2dCQUNqREMsTUFBTUQsYUFBYUMsSUFBSTtnQkFDdkJDLE9BQU9GLGFBQWFFLEtBQUs7WUFDM0I7SUFDRjtJQUVBLE9BQU87UUFDTHJEO1FBQ0FFO1FBQ0FFO1FBQ0F1QjtRQUNBYTtRQUNBTztRQUNBTDtRQUNBTTtJQUNGO0FBQ0YsRUFBRSIsInNvdXJjZXMiOlsiL1VzZXJzL2pvcmRhbnd1L0RvY3VtZW50cy9HaXRIdWIvc3R1ZHlsaXN0L2NsaWVudC9zcmMvaG9va3MvdXNlVXNlckRhdGEudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi90eXBlcy9Vc2VyJztcbmltcG9ydCB7IHVzZUZpcmViYXNlIH0gZnJvbSAnLi4vYXBwL2ZpcmViYXNlL0ZpcmViYXNlUHJvdmlkZXInO1xuXG50eXBlIE1hdGVyaWFsVHlwZSA9ICd3ZWJwYWdlJyB8ICdib29rJyB8ICd2aWRlbycgfCAncG9kY2FzdCc7XG5cbmludGVyZmFjZSBNYXRlcmlhbFBheWxvYWQge1xuICB0eXBlOiBNYXRlcmlhbFR5cGU7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHVybDogc3RyaW5nIHwgbnVsbDtcbiAgcmF0aW5nOiBudW1iZXI7XG4gIGRhdGVBZGRlZDogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgTWF0ZXJpYWxJbnB1dCB7XG4gIHR5cGU6IE1hdGVyaWFsVHlwZTtcbiAgdGl0bGU6IHN0cmluZztcbiAgdXJsPzogc3RyaW5nO1xuICByYXRpbmc/OiBudW1iZXI7XG4gIGRhdGVBZGRlZD86IERhdGU7XG59XG5cbmludGVyZmFjZSBDb250cmlidXRpb25EYXRhIHtcbiAgZGF0ZTogc3RyaW5nO1xuICBjb3VudDogbnVtYmVyO1xufVxuXG5leHBvcnQgY29uc3QgdXNlVXNlckRhdGEgPSAoKSA9PiB7XG4gIGNvbnN0IHsgYXV0aCB9ID0gdXNlRmlyZWJhc2UoKTtcbiAgY29uc3QgW3VzZXJEYXRhLCBzZXRVc2VyRGF0YV0gPSB1c2VTdGF0ZTxVc2VyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuXG4gIGNvbnN0IGZldGNoVXNlckRhdGEgPSBhc3luYyAoY3VycmVudFVzZXI6IGFueSkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgY29uc3QgdG9rZW4gPSBhd2FpdCBjdXJyZW50VXNlci5nZXRJZFRva2VuKCk7XG4gICAgICBjb25zdCBhcGlVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19BUElfVVJMIHx8ICdodHRwOi8vbG9jYWxob3N0OjUwMDEnO1xuICAgICAgXG4gICAgICBjb25zb2xlLmxvZygnRmV0Y2hpbmcgZnJvbTonLCBgJHthcGlVcmx9L2FwaS91c2Vycy8ke2N1cnJlbnRVc2VyLnVpZH1gKTtcbiAgICAgIFxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHthcGlVcmx9L2FwaS91c2Vycy8ke2N1cnJlbnRVc2VyLnVpZH1gLCB7XG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHt0b2tlbn1gLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBBUEkgZXJyb3I6ICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgc2V0VXNlckRhdGEoZGF0YSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIHVzZXIgZGF0YTonLCBlcnJvcik7XG4gICAgICBzZXRVc2VyRGF0YShudWxsKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgdW5zdWJzY3JpYmUgPSBhdXRoLm9uQXV0aFN0YXRlQ2hhbmdlZCgodXNlcikgPT4ge1xuICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgZmV0Y2hVc2VyRGF0YSh1c2VyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFVzZXJEYXRhKG51bGwpO1xuICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiAoKSA9PiB1bnN1YnNjcmliZSgpO1xuICB9LCBbYXV0aF0pO1xuXG4gIGNvbnN0IGFkZE1hdGVyaWFsID0gYXN5bmMgKG1hdGVyaWFsRGF0YTogTWF0ZXJpYWxJbnB1dCwgdG9waWNJZDogc3RyaW5nKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHVzZXIgPSBhdXRoLmN1cnJlbnRVc2VyO1xuICAgICAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoJ05vIHVzZXIgbG9nZ2VkIGluJyk7XG5cbiAgICAgIGNvbnN0IGFwaVVybCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0FQSV9VUkwgfHwgJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMSc7XG4gICAgICBjb25zdCBlbmRwb2ludCA9IGAke2FwaVVybH0vYXBpL3VzZXJzLyR7dXNlci51aWR9L3RvcGljcy8ke3RvcGljSWR9L21hdGVyaWFsc2A7XG4gICAgICBcbiAgICAgIGNvbnNvbGUubG9nKCdBZGRpbmcgbWF0ZXJpYWw6Jywge1xuICAgICAgICBwYXlsb2FkOiBtYXRlcmlhbERhdGEsXG4gICAgICAgIHRvcGljSWQsXG4gICAgICAgIHVybDogZW5kcG9pbnRcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCB0b2tlbiA9IGF3YWl0IHVzZXIuZ2V0SWRUb2tlbigpO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChlbmRwb2ludCwge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke3Rva2VufWAsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShtYXRlcmlhbERhdGEpXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICBjb25zdCBlcnJvclRleHQgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1NlcnZlciBlcnJvciByZXNwb25zZTonLCBlcnJvclRleHQpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBhZGQgbWF0ZXJpYWw6ICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB1cGRhdGVkVXNlciA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIHNldFVzZXJEYXRhKHVwZGF0ZWRVc2VyKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBhZGRpbmcgbWF0ZXJpYWw6JywgZXJyb3IpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCB1cGRhdGVQcm9maWxlID0gYXN5bmMgKGRhdGE6IHsgbmFtZTogc3RyaW5nOyBiaW86IHN0cmluZzsgcGhvdG9VUkw/OiBzdHJpbmcgfSkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB1c2VyID0gYXV0aC5jdXJyZW50VXNlcjtcbiAgICAgIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKCdObyB1c2VyIGxvZ2dlZCBpbicpO1xuXG4gICAgICBjb25zdCB0b2tlbiA9IGF3YWl0IHVzZXIuZ2V0SWRUb2tlbigpO1xuICAgICAgY29uc3QgYXBpVXJsID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQVBJX1VSTCB8fCAnaHR0cDovL2xvY2FsaG9zdDo1MDAxJztcbiAgICAgIFxuICAgICAgY29uc29sZS5sb2coJ1VwZGF0aW5nIHByb2ZpbGUgd2l0aCBkYXRhOicsIGRhdGEpO1xuICAgICAgY29uc29sZS5sb2coJ1NlbmRpbmcgcmVxdWVzdCB0bzonLCBgJHthcGlVcmx9L2FwaS91c2Vycy8ke3VzZXIudWlkfS9wcm9maWxlYCk7XG4gICAgICBcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICAgIGAke2FwaVVybH0vYXBpL3VzZXJzLyR7dXNlci51aWR9L3Byb2ZpbGVgLFxuICAgICAgICB7XG4gICAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHt0b2tlbn1gLFxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSlcbiAgICAgICAgfVxuICAgICAgKTtcblxuICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICBjb25zdCBlcnJvckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHJlc3BvbnNlOicsIGVycm9yRGF0YSk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvckRhdGEuZXJyb3IgfHwgJ0ZhaWxlZCB0byB1cGRhdGUgcHJvZmlsZScpO1xuICAgICAgfVxuICAgICAgXG4gICAgICBjb25zdCB1cGRhdGVkVXNlciA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIGNvbnNvbGUubG9nKCdVcGRhdGVkIHVzZXIgZGF0YTonLCB1cGRhdGVkVXNlcik7XG4gICAgICBzZXRVc2VyRGF0YSh1cGRhdGVkVXNlcik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgdXBkYXRpbmcgcHJvZmlsZTonLCBlcnJvcik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHVwZGF0ZVRvcGljTmFtZSA9IGFzeW5jICh0b3BpY0lkOiBzdHJpbmcsIG5hbWU6IHN0cmluZykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB1c2VyID0gYXV0aC5jdXJyZW50VXNlcjtcbiAgICAgIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKCdObyB1c2VyIGxvZ2dlZCBpbicpO1xuXG4gICAgICBjb25zdCB0b2tlbiA9IGF3YWl0IHVzZXIuZ2V0SWRUb2tlbigpO1xuICAgICAgY29uc3QgYXBpVXJsID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQVBJX1VSTCB8fCAnaHR0cDovL2xvY2FsaG9zdDo1MDAxJztcbiAgICAgIFxuICAgICAgY29uc29sZS5sb2coJ1VwZGF0aW5nIHRvcGljOicsIHtcbiAgICAgICAgdG9waWNJZCxcbiAgICAgICAgbmFtZSxcbiAgICAgICAgdXJsOiBgJHthcGlVcmx9L2FwaS91c2Vycy8ke3VzZXIudWlkfS90b3BpY3MvJHt0b3BpY0lkfWBcbiAgICAgIH0pO1xuICAgICAgXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgICBgJHthcGlVcmx9L2FwaS91c2Vycy8ke3VzZXIudWlkfS90b3BpY3MvJHt0b3BpY0lkfWAsXG4gICAgICAgIHtcbiAgICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke3Rva2VufWAsXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgfSxcbiAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IG5hbWUgfSlcbiAgICAgICAgfVxuICAgICAgKTtcblxuICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICBjb25zdCBjb250ZW50VHlwZSA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKTtcbiAgICAgICAgaWYgKGNvbnRlbnRUeXBlICYmIGNvbnRlbnRUeXBlLmluY2x1ZGVzKCdhcHBsaWNhdGlvbi9qc29uJykpIHtcbiAgICAgICAgICBjb25zdCBlcnJvckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yRGF0YS5lcnJvciB8fCAnRmFpbGVkIHRvIHVwZGF0ZSB0b3BpYyBuYW1lJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgdGV4dCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdVbmV4cGVjdGVkIHJlc3BvbnNlOicsIHRleHQpO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgU2VydmVyIGVycm9yOiAke3Jlc3BvbnNlLnN0YXR1c31gKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgXG4gICAgICBjb25zdCB1cGRhdGVkVXNlciA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIHNldFVzZXJEYXRhKHVwZGF0ZWRVc2VyKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciB1cGRhdGluZyB0b3BpYyBuYW1lOicsIGVycm9yKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgYWRkVG9waWMgPSBhc3luYyAobmFtZTogc3RyaW5nKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHVzZXIgPSBhdXRoLmN1cnJlbnRVc2VyO1xuICAgICAgaWYgKCF1c2VyKSB0aHJvdyBuZXcgRXJyb3IoJ05vIHVzZXIgbG9nZ2VkIGluJyk7XG5cbiAgICAgIGNvbnN0IHRva2VuID0gYXdhaXQgdXNlci5nZXRJZFRva2VuKCk7XG4gICAgICBjb25zdCBhcGlVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19BUElfVVJMIHx8ICdodHRwOi8vbG9jYWxob3N0OjUwMDEnO1xuICAgICAgXG4gICAgICBjb25zb2xlLmxvZygnU2VuZGluZyByZXF1ZXN0IHRvOicsIGAke2FwaVVybH0vYXBpL3VzZXJzLyR7dXNlci51aWR9L3RvcGljc2ApO1xuICAgICAgXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgICBgJHthcGlVcmx9L2FwaS91c2Vycy8ke3VzZXIudWlkfS90b3BpY3NgLFxuICAgICAgICB7XG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7dG9rZW59YCxcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICB9LFxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgbmFtZSB9KVxuICAgICAgICB9XG4gICAgICApO1xuXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIGNvbnN0IGNvbnRlbnRUeXBlID0gcmVzcG9uc2UuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpO1xuICAgICAgICBpZiAoY29udGVudFR5cGUgJiYgY29udGVudFR5cGUuaW5jbHVkZXMoJ2FwcGxpY2F0aW9uL2pzb24nKSkge1xuICAgICAgICAgIGNvbnN0IGVycm9yRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JEYXRhLmVycm9yIHx8ICdGYWlsZWQgdG8gYWRkIHRvcGljJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgdGV4dCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdVbmV4cGVjdGVkIHJlc3BvbnNlOicsIHRleHQpO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgU2VydmVyIGVycm9yOiAke3Jlc3BvbnNlLnN0YXR1c31gKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCB1cGRhdGVkVXNlciA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIHNldFVzZXJEYXRhKHVwZGF0ZWRVc2VyKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBhZGRpbmcgdG9waWM6JywgZXJyb3IpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBnZXRDb250cmlidXRpb25EYXRhID0gKCk6IENvbnRyaWJ1dGlvbkRhdGFbXSA9PiB7XG4gICAgaWYgKCF1c2VyRGF0YT8uY29udHJpYnV0aW9ucykgcmV0dXJuIFtdO1xuICAgIFxuICAgIHJldHVybiB1c2VyRGF0YS5jb250cmlidXRpb25zLm1hcChjb250cmlidXRpb24gPT4gKHtcbiAgICAgIGRhdGU6IGNvbnRyaWJ1dGlvbi5kYXRlLFxuICAgICAgY291bnQ6IGNvbnRyaWJ1dGlvbi5jb3VudFxuICAgIH0pKTtcbiAgfTtcblxuICByZXR1cm4geyBcbiAgICB1c2VyRGF0YSwgXG4gICAgbG9hZGluZywgXG4gICAgZmV0Y2hVc2VyRGF0YSwgXG4gICAgYWRkTWF0ZXJpYWwsXG4gICAgdXBkYXRlUHJvZmlsZSxcbiAgICBhZGRUb3BpYyxcbiAgICB1cGRhdGVUb3BpY05hbWUsXG4gICAgZ2V0Q29udHJpYnV0aW9uRGF0YVxuICB9O1xufTsiXSwibmFtZXMiOlsidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJ1c2VGaXJlYmFzZSIsInVzZVVzZXJEYXRhIiwiYXV0aCIsInVzZXJEYXRhIiwic2V0VXNlckRhdGEiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsImZldGNoVXNlckRhdGEiLCJjdXJyZW50VXNlciIsInRva2VuIiwiZ2V0SWRUb2tlbiIsImFwaVVybCIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19BUElfVVJMIiwiY29uc29sZSIsImxvZyIsInVpZCIsInJlc3BvbnNlIiwiZmV0Y2giLCJoZWFkZXJzIiwib2siLCJFcnJvciIsInN0YXR1cyIsImRhdGEiLCJqc29uIiwiZXJyb3IiLCJ1bnN1YnNjcmliZSIsIm9uQXV0aFN0YXRlQ2hhbmdlZCIsInVzZXIiLCJhZGRNYXRlcmlhbCIsIm1hdGVyaWFsRGF0YSIsInRvcGljSWQiLCJlbmRwb2ludCIsInBheWxvYWQiLCJ1cmwiLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImVycm9yVGV4dCIsInRleHQiLCJ1cGRhdGVkVXNlciIsInVwZGF0ZVByb2ZpbGUiLCJlcnJvckRhdGEiLCJ1cGRhdGVUb3BpY05hbWUiLCJuYW1lIiwiY29udGVudFR5cGUiLCJnZXQiLCJpbmNsdWRlcyIsImFkZFRvcGljIiwiZ2V0Q29udHJpYnV0aW9uRGF0YSIsImNvbnRyaWJ1dGlvbnMiLCJtYXAiLCJjb250cmlidXRpb24iLCJkYXRlIiwiY291bnQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/hooks/useUserData.ts\n"));

/***/ })

});