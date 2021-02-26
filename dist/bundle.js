(() => {
  var t = {
    669 : (t, e, r) => { t.exports = r(609) },
    448 : (t, e, r) => {
      "use strict";
      var n = r(867), o = r(26), i = r(372), a = r(327), s = r(97), u = r(109),
          c = r(985), f = r(61);
      t.exports = function(t) {
        return new Promise((function(e, r) {
          var l = t.data, p = t.headers;
          n.isFormData(l) && delete p["Content-Type"];
          var h = new XMLHttpRequest;
          if (t.auth) {
            var d = t.auth.username || "",
                y = t.auth.password
                        ? unescape(encodeURIComponent(t.auth.password))
                        : "";
            p.Authorization = "Basic " + btoa(d + ":" + y)
          }
          var m = s(t.baseURL, t.url);
          if (h.open(t.method.toUpperCase(), a(m, t.params, t.paramsSerializer),
                     !0),
              h.timeout = t.timeout,
              h.onreadystatechange =
                  function() {
                    if (h && 4 === h.readyState &&
                        (0 !== h.status ||
                         h.responseURL &&
                             0 === h.responseURL.indexOf("file:"))) {
                      var n = "getAllResponseHeaders" in h
                                  ? u(h.getAllResponseHeaders())
                                  : null,
                          i = {
                            data : t.responseType && "text" !== t.responseType
                                       ? h.response
                                       : h.responseText,
                            status : h.status,
                            statusText : h.statusText,
                            headers : n,
                            config : t,
                            request : h
                          };
                      o(e, r, i), h = null
                    }
                  },
              h.onabort =
                  function() {
                    h && (r(f("Request aborted", t, "ECONNABORTED", h)),
                          h = null)
                  },
              h.onerror =
                  function() { r(f("Network Error", t, null, h)), h = null },
              h.ontimeout =
                  function() {
                    var e = "timeout of " + t.timeout + "ms exceeded";
                    t.timeoutErrorMessage && (e = t.timeoutErrorMessage),
                        r(f(e, t, "ECONNABORTED", h)), h = null
                  },
              n.isStandardBrowserEnv()) {
            var v = (t.withCredentials || c(m)) && t.xsrfCookieName
                        ? i.read(t.xsrfCookieName)
                        : void 0;
            v && (p[t.xsrfHeaderName] = v)
          }
          if ("setRequestHeader" in h &&
                  n.forEach(p, (function(t, e) {
                              void 0 === l && "content-type" === e.toLowerCase()
                                  ? delete p[e]
                                  : h.setRequestHeader(e, t)
                            })),
              n.isUndefined(t.withCredentials) ||
                  (h.withCredentials = !!t.withCredentials),
              t.responseType)
            try {
              h.responseType = t.responseType
            } catch (e) {
              if ("json" !== t.responseType)
                throw e
            }
          "function" == typeof t.onDownloadProgress &&
              h.addEventListener("progress", t.onDownloadProgress),
              "function" == typeof t.onUploadProgress && h.upload &&
                  h.upload.addEventListener("progress", t.onUploadProgress),
              t.cancelToken && t.cancelToken.promise.then((function(
                                   t) { h && (h.abort(), r(t), h = null) })),
              l || (l = null), h.send(l)
        }))
      }
    },
    609 : (t, e, r) => {
      "use strict";
      var n = r(867), o = r(849), i = r(321), a = r(185);
      function s(t) {
        var e = new i(t), r = o(i.prototype.request, e);
        return n.extend(r, i.prototype, e), n.extend(r, e), r
      }
      var u = s(r(655));
      u.Axios = i, u.create = function(t) { return s(a(u.defaults, t)) },
      u.Cancel = r(263), u.CancelToken = r(972), u.isCancel = r(502),
      u.all = function(t) { return Promise.all(t) }, u.spread = r(713),
      u.isAxiosError = r(268), t.exports = u, t.exports.default = u
    },
    263 : t => {
      "use strict";
      function e(t) { this.message = t }
      e.prototype.toString = function() {
        return "Cancel" + (this.message ? ": " + this.message : "")
      }, e.prototype.__CANCEL__ = !0, t.exports = e
    },
    972 : (t, e, r) => {
      "use strict";
      var n = r(263);
      function o(t) {
        if ("function" != typeof t)
          throw new TypeError("executor must be a function.");
        var e;
        this.promise = new Promise((function(t) { e = t }));
        var r = this;
        t((function(t) { r.reason || (r.reason = new n(t), e(r.reason)) }))
      }
      o.prototype.throwIfRequested = function() {
        if (this.reason)
          throw this.reason
      }, o.source = function() {
        var t;
        return {
          token: new o((function(e) { t = e })), cancel: t
        }
      }, t.exports = o
    },
    502 : t => {
      "use strict";
      t.exports = function(t) { return !(!t || !t.__CANCEL__) }
    },
    321 : (t, e, r) => {
      "use strict";
      var n = r(867), o = r(327), i = r(782), a = r(572), s = r(185);
      function u(t) {
        this.defaults = t, this.interceptors = {
          request : new i,
          response : new i
        }
      }
      u.prototype.request =
          function(t) {
        "string" == typeof t
            ? (t = arguments[1] || {}).url = arguments[0]
            : t = t || {},
                                   (t = s(this.defaults, t)).method
                                       ? t.method = t.method.toLowerCase()
                                       : this.defaults.method
                                             ? t.method = this.defaults.method
                                                              .toLowerCase()
                                             : t.method = "get";
        var e = [ a, void 0 ], r = Promise.resolve(t);
        for (this.interceptors.request.forEach(
                 (function(t) { e.unshift(t.fulfilled, t.rejected) })),
             this.interceptors.response.forEach(
                 (function(t) { e.push(t.fulfilled, t.rejected) }));
             e.length;)
          r = r.then(e.shift(), e.shift());
        return r
      },
      u.prototype.getUri =
          function(t) {
        return t = s(this.defaults, t),
               o(t.url, t.params, t.paramsSerializer).replace(/^\?/, "")
      },
      n.forEach([ "delete", "get", "head", "options" ], (function(t) {
                  u.prototype[t] = function(e, r) {
                    return this.request(s(
                        r || {}, {method : t, url : e, data : (r || {}).data}))
                  }
                })),
      n.forEach([ "post", "put", "patch" ], (function(t) {
                  u.prototype[t] = function(e, r, n) {
                    return this.request(
                        s(n || {}, {method : t, url : e, data : r}))
                  }
                })),
      t.exports = u
    },
    782 : (t, e, r) => {
      "use strict";
      var n = r(867);
      function o() { this.handlers = [] }
      o.prototype.use =
          function(t, e) {
        return this.handlers.push({fulfilled : t, rejected : e}),
               this.handlers.length - 1
      },
      o.prototype.eject = function(
          t) { this.handlers[t] && (this.handlers[t] = null) },
      o.prototype.forEach = function(
          t) { n.forEach(this.handlers, (function(e) { null !== e && t(e) })) },
      t.exports = o
    },
    97 : (t, e, r) => {
      "use strict";
      var n = r(793), o = r(303);
      t.exports = function(t, e) { return t && !n(e) ? o(t, e) : e }
    },
    61 : (t, e, r) => {
      "use strict";
      var n = r(481);
      t.exports = function(t, e, r, o, i) {
        var a = new Error(t);
        return n(a, e, r, o, i)
      }
    },
    572 : (t, e, r) => {
      "use strict";
      var n = r(867), o = r(527), i = r(502), a = r(655);
      function s(t) { t.cancelToken && t.cancelToken.throwIfRequested() }
      t.exports = function(t) {
        return s(t),
               t.headers = t.headers || {},
               t.data = o(t.data, t.headers, t.transformRequest),
               t.headers = n.merge(t.headers.common || {},
                                   t.headers[t.method] || {}, t.headers),
               n.forEach(
                   [
                     "delete", "get", "head", "post", "put", "patch", "common"
                   ],
                   (function(e) { delete t.headers[e] })),
               (t.adapter || a.adapter)(t).then(
                   (function(e) {
                     return s(t),
                            e.data = o(e.data, e.headers, t.transformResponse),
                            e
                   }),
                   (function(e) {
                     return i(e) || (s(t), e && e.response &&
                                               (e.response.data =
                                                    o(e.response.data,
                                                      e.response.headers,
                                                      t.transformResponse))),
                            Promise.reject(e)
                   }))
      }
    },
    481 : t => {
      "use strict";
      t.exports = function(t, e, r, n, o) {
        return t.config = e, r && (t.code = r), t.request = n, t.response = o,
               t.isAxiosError = !0, t.toJSON = function() {
                 return {
                   message: this.message, name: this.name,
                       description: this.description, number: this.number,
                       fileName: this.fileName, lineNumber: this.lineNumber,
                       columnNumber: this.columnNumber, stack: this.stack,
                       config: this.config, code: this.code
                 }
               }, t
      }
    },
    185 : (t, e, r) => {
      "use strict";
      var n = r(867);
      t.exports = function(t, e) {
        e = e || {};
        var r = {}, o = [ "url", "method", "data" ],
            i = [ "headers", "auth", "proxy", "params" ],
            a =
                [
                  "baseURL",
                  "transformRequest",
                  "transformResponse",
                  "paramsSerializer",
                  "timeout",
                  "timeoutMessage",
                  "withCredentials",
                  "adapter",
                  "responseType",
                  "xsrfCookieName",
                  "xsrfHeaderName",
                  "onUploadProgress",
                  "onDownloadProgress",
                  "decompress",
                  "maxContentLength",
                  "maxBodyLength",
                  "maxRedirects",
                  "transport",
                  "httpAgent",
                  "httpsAgent",
                  "cancelToken",
                  "socketPath",
                  "responseEncoding"
                ],
            s = [ "validateStatus" ];
        function u(t, e) {
          return n.isPlainObject(t) && n.isPlainObject(e)
                     ? n.merge(t, e)
                     : n.isPlainObject(e) ? n.merge({}, e)
                                          : n.isArray(e) ? e.slice() : e
        }
        function c(o) {
          n.isUndefined(e[o]) ? n.isUndefined(t[o]) || (r[o] = u(void 0, t[o]))
                              : r[o] = u(t[o], e[o])
        }
        n.forEach(
            o,
            (function(t) { n.isUndefined(e[t]) || (r[t] = u(void 0, e[t])) })),
            n.forEach(i, c),
            n.forEach(a, (function(o) {
                        n.isUndefined(e[o])
                            ? n.isUndefined(t[o]) || (r[o] = u(void 0, t[o]))
                            : r[o] = u(void 0, e[o])
                      })),
            n.forEach(s, (function(n) {
                        n in e ? r[n] = u(t[n], e[n])
                               : n in t && (r[n] = u(void 0, t[n]))
                      }));
        var f = o.concat(i).concat(a).concat(s),
            l = Object.keys(t)
                    .concat(Object.keys(e))
                    .filter((function(t) { return -1 === f.indexOf(t) }));
        return n.forEach(l, c), r
      }
    },
    26 : (t, e, r) => {
      "use strict";
      var n = r(61);
      t.exports = function(t, e, r) {
        var o = r.config.validateStatus;
        r.status && o && !o(r.status)
            ? e(n("Request failed with status code " + r.status, r.config, null,
                  r.request, r))
            : t(r)
      }
    },
    527 : (t, e, r) => {
      "use strict";
      var n = r(867);
      t.exports = function(
          t, e, r) { return n.forEach(r, (function(r) { t = r(t, e) })), t }
    },
    655 : (t, e, r) => {
      "use strict";
      var n = r(155), o = r(867), i = r(16),
          a = {"Content-Type" : "application/x-www-form-urlencoded"};
      function s(t, e) {
        !o.isUndefined(t) && o.isUndefined(t["Content-Type"]) &&
            (t["Content-Type"] = e)
      }
      var u, c = {
        adapter : (("undefined" != typeof XMLHttpRequest ||
                    void 0 !== n && "[object process]" ===
                                        Object.prototype.toString.call(n)) &&
                       (u = r(448)),
                   u),
        transformRequest : [ function(t, e) {
          return i(e, "Accept"), i(e, "Content-Type"),
                 o.isFormData(t) || o.isArrayBuffer(t) || o.isBuffer(t) ||
                         o.isStream(t) || o.isFile(t) || o.isBlob(t)
                     ? t
                     : o.isArrayBufferView(t)
                           ? t.buffer
                           : o.isURLSearchParams(t)
                                 ? (s(e,
                                      "application/x-www-form-urlencoded;charset=utf-8"),
                                    t.toString())
                                 : o.isObject(t)
                                       ? (s(e,
                                            "application/json;charset=utf-8"),
                                          JSON.stringify(t))
                                       : t
        } ],
        transformResponse : [ function(t) {
          if ("string" == typeof t)
            try {
              t = JSON.parse(t)
            } catch (t) {
            }
          return t
        } ],
        timeout : 0,
        xsrfCookieName : "XSRF-TOKEN",
        xsrfHeaderName : "X-XSRF-TOKEN",
        maxContentLength : -1,
        maxBodyLength : -1,
        validateStatus : function(t) { return t >= 200 && t < 300 },
        headers : {common : {Accept : "application/json, text/plain, */*"}}
      };
      o.forEach([ "delete", "get", "head" ],
                (function(t) { c.headers[t] = {} })),
          o.forEach([ "post", "put", "patch" ],
                    (function(t) { c.headers[t] = o.merge(a) })),
          t.exports = c
    },
    849 : t => {
      "use strict";
      t.exports = function(t, e) {
        return function() {
          for (var r = new Array(arguments.length), n = 0; n < r.length; n++)
            r[n] = arguments[n];
          return t.apply(e, r)
        }
      }
    },
    327 : (t, e, r) => {
      "use strict";
      var n = r(867);
      function o(t) {
        return encodeURIComponent(t)
            .replace(/%3A/gi, ":")
            .replace(/%24/g, "$")
            .replace(/%2C/gi, ",")
            .replace(/%20/g, "+")
            .replace(/%5B/gi, "[")
            .replace(/%5D/gi, "]")
      }
      t.exports = function(t, e, r) {
        if (!e)
          return t;
        var i;
        if (r)
          i = r(e);
        else if (n.isURLSearchParams(e))
          i = e.toString();
        else {
          var a = [];
          n.forEach(e, (function(t, e) {
                      null != t &&
                          (n.isArray(t) ? e += "[]" : t = [ t ],
                           n.forEach(t, (function(t) {
                                       n.isDate(t)
                                           ? t = t.toISOString()
                                           : n.isObject(t) &&
                                                 (t = JSON.stringify(t)),
                                             a.push(o(e) + "=" + o(t))
                                     })))
                    })),
              i = a.join("&")
        }
        if (i) {
          var s = t.indexOf("#");
          -1 !== s && (t = t.slice(0, s)),
              t += (-1 === t.indexOf("?") ? "?" : "&") + i
        }
        return t
      }
    },
    303 : t => {
      "use strict";
      t.exports = function(t, e) {
        return e ? t.replace(/\/+$/, "") + "/" + e.replace(/^\/+/, "") : t
      }
    },
    372 : (t, e, r) => {
      "use strict";
      var n = r(867);
      t.exports =
          n.isStandardBrowserEnv() ? {
            write : function(t, e, r, o, i, a) {
              var s = [];
              s.push(t + "=" + encodeURIComponent(e)),
                  n.isNumber(r) &&
                      s.push("expires=" + new Date(r).toGMTString()),
                  n.isString(o) && s.push("path=" + o),
                  n.isString(i) && s.push("domain=" + i),
                  !0 === a && s.push("secure"), document.cookie = s.join("; ")
            },
            read : function(t) {
              var e = document.cookie.match(
                  new RegExp("(^|;\\s*)(" + t + ")=([^;]*)"));
              return e ? decodeURIComponent(e[3]) : null
            },
            remove : function(t) { this.write(t, "", Date.now() - 864e5) }
          }
                                   : {
                                       write : function() {},
                                       read : function() { return null },
                                       remove : function() {}
                                     }
    },
    793 : t => {
      "use strict";
      t.exports = function(t) { return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(t) }
    },
    268 : t => {
      "use strict";
      t.exports = function(
          t) { return "object" == typeof t && !0 === t.isAxiosError }
    },
    985 : (t, e, r) => {
      "use strict";
      var n = r(867);
      t.exports = n.isStandardBrowserEnv() ? function() {
        var t, e = /(msie|trident)/i.test(navigator.userAgent),
               r = document.createElement("a");
        function o(t) {
          var n = t;
          return e && (r.setAttribute("href", n), n = r.href),
                 r.setAttribute("href", n), {
            href: r.href,
                protocol: r.protocol ? r.protocol.replace(/:$/, "") : "",
                host: r.host,
                search: r.search ? r.search.replace(/^\?/, "") : "",
                hash: r.hash ? r.hash.replace(/^#/, "") : "",
                hostname: r.hostname, port: r.port,
                pathname: "/" === r.pathname.charAt(0) ? r.pathname
                                                       : "/" + r.pathname
          }
        }
        return t = o(window.location.href), function(e) {
          var r = n.isString(e) ? o(e) : e;
          return r.protocol === t.protocol && r.host === t.host
        }
      }() : function() { return !0 }
    },
    16 : (t, e, r) => {
      "use strict";
      var n = r(867);
      t.exports = function(t, e) {
        n.forEach(t, (function(r, n) {
                    n !== e && n.toUpperCase() === e.toUpperCase() &&
                        (t[e] = r, delete t[n])
                  }))
      }
    },
    109 : (t, e, r) => {
      "use strict";
      var n = r(867), o = [
        "age", "authorization", "content-length", "content-type", "etag",
        "expires", "from", "host", "if-modified-since", "if-unmodified-since",
        "last-modified", "location", "max-forwards", "proxy-authorization",
        "referer", "retry-after", "user-agent"
      ];
      t.exports = function(t) {
        var e, r, i, a = {};
        return t ? (n.forEach(t.split("\n"), (function(t) {
                                if (i = t.indexOf(":"),
                                    e = n.trim(t.substr(0, i)).toLowerCase(),
                                    r = n.trim(t.substr(i + 1)), e) {
                                  if (a[e] && o.indexOf(e) >= 0)
                                    return;
                                  a[e] = "set-cookie" === e
                                             ? (a[e] ? a[e] : []).concat([ r ])
                                             : a[e] ? a[e] + ", " + r : r
                                }
                              })),
                    a)
                 : a
      }
    },
    713 : t => {
      "use strict";
      t.exports = function(t) { return function(e) { return t.apply(null, e) } }
    },
    867 : (t, e, r) => {
      "use strict";
      var n = r(849), o = Object.prototype.toString;
      function i(t) { return "[object Array]" === o.call(t) }
      function a(t) { return void 0 === t }
      function s(t) { return null !== t && "object" == typeof t }
      function u(t) {
        if ("[object Object]" !== o.call(t))
          return !1;
        var e = Object.getPrototypeOf(t);
        return null === e || e === Object.prototype
      }
      function c(t) { return "[object Function]" === o.call(t) }
      function f(t, e) {
        if (null != t)
          if ("object" != typeof t && (t = [ t ]), i(t))
            for (var r = 0, n = t.length; r < n; r++)
              e.call(null, t[r], r, t);
          else
            for (var o in t)
              Object.prototype.hasOwnProperty.call(t, o) &&
                  e.call(null, t[o], o, t)
      }
      t.exports = {
        isArray : i,
        isArrayBuffer : function(
            t) { return "[object ArrayBuffer]" === o.call(t) },
        isBuffer : function(t) {
          return null !== t && !a(t) && null !== t.constructor &&
                 !a(t.constructor) &&
                 "function" == typeof t.constructor.isBuffer &&
                 t.constructor.isBuffer(t)
        },
        isFormData : function(t) {
          return "undefined" != typeof FormData && t instanceof FormData
        },
        isArrayBufferView : function(t) {
          return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView
                     ? ArrayBuffer.isView(t)
                     : t && t.buffer && t.buffer instanceof ArrayBuffer
        },
        isString : function(t) { return "string" == typeof t },
        isNumber : function(t) { return "number" == typeof t },
        isObject : s,
        isPlainObject : u,
        isUndefined : a,
        isDate : function(t) { return "[object Date]" === o.call(t) },
        isFile : function(t) { return "[object File]" === o.call(t) },
        isBlob : function(t) { return "[object Blob]" === o.call(t) },
        isFunction : c,
        isStream : function(t) { return s(t) && c(t.pipe) },
        isURLSearchParams : function(t) {
          return "undefined" != typeof URLSearchParams && t instanceof
                                                              URLSearchParams
        },
        isStandardBrowserEnv : function() {
          return ("undefined" == typeof navigator ||
                  "ReactNative" !== navigator.product &&
                      "NativeScript" !== navigator.product &&
                      "NS" !== navigator.product) &&
                 "undefined" != typeof window && "undefined" != typeof document
        },
        forEach : f,
        merge : function t() {
          var e = {};
          function r(r, n) {
            u(e[n]) && u(r)
                ? e[n] = t(e[n], r)
                : u(r) ? e[n] = t({}, r) : i(r) ? e[n] = r.slice() : e[n] = r
          }
          for (var n = 0, o = arguments.length; n < o; n++)
            f(arguments[n], r);
          return e
        },
        extend : function(t, e, r) {
          return f(e, (function(e, o) {
                     t[o] = r && "function" == typeof e ? n(e, r) : e
                   })),
                 t
        },
        trim : function(t) { return t.replace(/^\s*/, "").replace(/\s*$/, "") },
        stripBOM : function(
            t) { return 65279 === t.charCodeAt(0) && (t = t.slice(1)), t }
      }
    },
    42 : (t, e, r) => {
      function n(t, e, r) {
        return (n = o() ? Reflect.construct : function(t, e, r) {
                 var n = [ null ];
                 n.push.apply(n, e);
                 var o = new (Function.bind.apply(t, n));
                 return r && i(o, r.prototype), o
               }).apply(null, arguments)
      }
      function o() {
        if ("undefined" == typeof Reflect || !Reflect.construct)
          return !1;
        if (Reflect.construct.sham)
          return !1;
        if ("function" == typeof Proxy)
          return !0;
        try {
          return Date.prototype.toString.call(
                     Reflect.construct(Date, [], (function() {}))),
                 !0
        } catch (t) {
          return !1
        }
      }
      function i(t, e) {
        return (i = Object.setPrototypeOf ||
                    function(t, e) { return t.__proto__ = e, t })(t, e)
      }
      function a(t) {
        return (a = "function" == typeof Symbol &&
                            "symbol" == typeof Symbol.iterator
                        ? function(t) { return typeof t }
                        : function(t) {
                            return t && "function" == typeof Symbol &&
                                           t.constructor === Symbol &&
                                           t !== Symbol.prototype
                                       ? "symbol"
                                       : typeof t
                          })(t)
      }
      function s(t, e) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function")
      }
      function u(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          n.enumerable = n.enumerable || !1, n.configurable = !0,
          "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
        }
      }
      function c(t, e, r) {
        return e in t ? Object.defineProperty(t, e, {
          value : r,
          enumerable : !0,
          configurable : !0,
          writable : !0
        })
                      : t[e] = r,
                        t
      }
      var f = r(123), l = r(265).GameClient, p = function() {
        function t() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0]
                                                                  : {};
          if (s(this, t), c(this, "type", "BattlelogClient"),
              e && "object" !== a(e))
            throw Error(
                "Parameter 'options' is required to be an object.  While it is "
                    .concat(f.getArticle(a(e)), " ")
                    .concat(a(e), "."))
        }
        var e, r;
        return e = t,
               (r = [ {
                  key : "game",
                  value : function() {
                    for (var t = arguments.length, e = new Array(t), r = 0;
                         r < t; r++)
                      e[r] = arguments[r];
                    return n(l, [ this ].concat(e))
                  }
                } ]) &&
                   u(e.prototype, r),
               t
      }();
      t.exports.BattlelogClient = p
    },
    417 : t => {
      function e(t) {
        return (e = "function" == typeof Symbol &&
                            "symbol" == typeof Symbol.iterator
                        ? function(t) { return typeof t }
                        : function(t) {
                            return t && "function" == typeof Symbol &&
                                           t.constructor === Symbol &&
                                           t !== Symbol.prototype
                                       ? "symbol"
                                       : typeof t
                          })(t)
      }
      function r(t, e) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function")
      }
      function n(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          n.enumerable = n.enumerable || !1, n.configurable = !0,
          "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
        }
      }
      function o(t, e, r) {
        return (
            o = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(t, e, r) {
              var n = function(t, e) {
                for (; !Object.prototype.hasOwnProperty.call(t, e) &&
                       null !== (t = f(t));)
                  ;
                return t
              }(t, e);
              if (n) {
                var o = Object.getOwnPropertyDescriptor(n, e);
                return o.get ? o.get.call(r) : o.value
              }
            })(t, e, r || t)
      }
      function i(t, r) {
        return !r || "object" !== e(r) && "function" != typeof r ? function(t) {
          if (void 0 === t)
            throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called");
          return t
        }(t) : r
      }
      function a(t) {
        var e = "function" == typeof Map ? new Map : void 0;
        return (a = function(t) {
          if (null === t || (r = t, -1 === Function.toString.call(r).indexOf(
                                               "[native code]")))
            return t;
          var r;
          if ("function" != typeof t)
            throw new TypeError(
                "Super expression must either be null or a function");
          if (void 0 !== e) {
            if (e.has(t))
              return e.get(t);
            e.set(t, n)
          }
          function n() { return s(t, arguments, f(this).constructor) }
          return n.prototype = Object.create(t.prototype, {
            constructor :
                {value : n, enumerable : !1, writable : !0, configurable : !0}
          }),
                 c(n, t)
        })(t)
      }
      function s(t, e, r) {
        return (s = u() ? Reflect.construct : function(t, e, r) {
                 var n = [ null ];
                 n.push.apply(n, e);
                 var o = new (Function.bind.apply(t, n));
                 return r && c(o, r.prototype), o
               }).apply(null, arguments)
      }
      function u() {
        if ("undefined" == typeof Reflect || !Reflect.construct)
          return !1;
        if (Reflect.construct.sham)
          return !1;
        if ("function" == typeof Proxy)
          return !0;
        try {
          return Date.prototype.toString.call(
                     Reflect.construct(Date, [], (function() {}))),
                 !0
        } catch (t) {
          return !1
        }
      }
      function c(t, e) {
        return (c = Object.setPrototypeOf ||
                    function(t, e) { return t.__proto__ = e, t })(t, e)
      }
      function f(t) {
        return (
            f = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
              return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
      }
      var l = function(t) {
        !function(t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
                "Super expression must either be null or a function");
          t.prototype = Object.create(
              e && e.prototype,
              {constructor : {value : t, writable : !0, configurable : !0}}),
          e && c(t, e)
        }(h, t);
        var e, a, s, l, p = (e = h, a = u(), function() {
                          var t, r = f(e);
                          if (a) {
                            var n = f(this).constructor;
                            t = Reflect.construct(r, arguments, n)
                          } else
                            t = r.apply(this, arguments);
                          return i(this, t)
                        });
        function h() { return r(this, h), p.apply(this, arguments) }
        return s = h,
               (l = [ {
                  key : "structureData",
                  value : function(t, e) {
                    if (o(f(h.prototype), "get", this).call(this, t)) {
                      for (var r, n = arguments.length,
                                  i = new Array(n > 2 ? n - 2 : 0), a = 2;
                           a < n; a++)
                        i[a - 2] = arguments[a];
                      (r = o(f(h.prototype), "get", this).call(this, t))
                          .structureData.apply(r, [ e ].concat(i))
                    } else
                      o(f(h.prototype), "set", this).call(this, t, e)
                  }
                } ]) &&
                   n(s.prototype, l),
               h
      }(a(Map));
      t.exports.BattlelogMap = l
    },
    265 : (t, e, r) => {
      function n(t, e) {
        var r = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(t);
          e && (n = n.filter((function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable
          }))),
              r.push.apply(r, n)
        }
        return r
      }
      function o(t) {
        for (var e = 1; e < arguments.length; e++) {
          var r = null != arguments[e] ? arguments[e] : {};
          e % 2 ? n(Object(r), !0).forEach((function(e) { s(t, e, r[e]) }))
                : Object.getOwnPropertyDescriptors
                      ? Object.defineProperties(
                            t, Object.getOwnPropertyDescriptors(r))
                      : n(Object(r)).forEach((function(e) {
                          Object.defineProperty(
                              t, e, Object.getOwnPropertyDescriptor(r, e))
                        }))
        }
        return t
      }
      function i(t) {
        return (i = "function" == typeof Symbol &&
                            "symbol" == typeof Symbol.iterator
                        ? function(t) { return typeof t }
                        : function(t) {
                            return t && "function" == typeof Symbol &&
                                           t.constructor === Symbol &&
                                           t !== Symbol.prototype
                                       ? "symbol"
                                       : typeof t
                          })(t)
      }
      function a(t, e) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function")
      }
      function s(t, e, r) {
        return e in t ? Object.defineProperty(t, e, {
          value : r,
          enumerable : !0,
          configurable : !0,
          writable : !0
        })
                      : t[e] = r,
                        t
      }
      var u = r(669), c = r(686), f = r(882).UsersManager;
      t.exports.GameClient = function t(e) {
        var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1]
                                                                : "bf3",
            n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2]
                                                                : {};
        if (a(this, t), s(this, "type", "GameClient"),
            s(this, "users", new f(this)), !e)
          throw Error("The 'client' parameter is required. ");
        if ("object" !== i(n))
          throw Error("Parameter 'options' is required to be an object. ");
        if ("string" != typeof r)
          throw Error("Parameter 'game' is required to be a string.");
        if (r = r.toLowerCase(), !["bf3", "bf4", "mohw", "bfh"].includes(r))
          throw Error("The game is not available in Battlelog.");
        this.game = r, this.client = e, n.axios || (n.axios = {}),
        this.axios = u.create(
            o(o({
                baseURL : "https://battlelog.battlefield.com/".concat(this.game)
              },
                n.axios),
              {}, {headers : o(o({}, n.axios.headers || {}), c)}))
      }
    },
    679 : (t, e, r) => {
      function n(t, e, r, n, o, i, a) {
        try {
          var s = t[i](a), u = s.value
        } catch (t) {
          return void r(t)
        }
        s.done ? e(u) : Promise.resolve(u).then(n, o)
      }
      function o(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          n.enumerable = n.enumerable || !1, n.configurable = !0,
          "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
        }
      }
      var i = r(123), a = new WeakMap, s = function() {
        function t(e, r) {
          var n, o;
          !function(t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function")
          }(this, t),
              a.set(this, {writable : !0, value : void 0}),
              o = {60 : null, 320 : null},
              (n = "badge") in this ? Object.defineProperty(this, n, {
                value : o,
                enumerable : !0,
                configurable : !0,
                writable : !0
              })
                                    : this[n] = o,
              r && this.structureData(r)
        }
        var e, r, s, u;
        return e = t,
               (r =
                    [
                      {
                        key : "structureData",
                        value : function(t) {
                          i.structureData(this, t,
                                          {blacklist : [ "badgePath", "" ]});
                          var e = (t.badgePath || t.emblemPath)
                                      .split("[FORMAT]")
                                      .join("png")
                                      .split("[SIZE]");
                          this.badge[60] = e.join("60"),
                          this.badge[320] = e.join("320")
                        }
                      },
                      {
                        key : "fetch",
                        value : (s = regeneratorRuntime.mark((function t() {
                          var e;
                          return regeneratorRuntime.wrap(
                              (function(t) {
                                for (;;)
                                  switch (t.prev = t.next) {
                                  case 0:
                                    return t.next = 2, this.client.axios.get(
                                                           "/platoon/".concat(
                                                               this.id, "/"));
                                  case 2:
                                    e = t.sent,
                                    this.structureData(this,
                                                       e.data.context.platoon),
                                    this.isFan = e.data.context.isFan;
                                  case 5:
                                  case "end":
                                    return t.stop()
                                  }
                              }),
                              t, this)
                        })),
                                 u =
                                     function() {
                                       var t = this, e = arguments;
                                       return new Promise((function(r, o) {
                                         var i = s.apply(t, e);
                                         function a(t) {
                                           n(i, r, o, a, u, "next", t)
                                         }
                                         function u(t) {
                                           n(i, r, o, a, u, "throw", t)
                                         }
                                         a(void 0)
                                       }))
                                     },
                                 function() { return u.apply(this, arguments) })
                      }
                    ]) &&
                   o(e.prototype, r),
               t
      }();
      t.exports.Platoon = s
    },
    842 : (t, e, r) => { r(123), r(953).Server },
    953 : (t, e, r) => { r(123), r(933).User },
    36 : (t, e, r) => { r(123) },
    799 : (t, e, r) => {
      function n(t, e, r, n, o, i, a) {
        try {
          var s = t[i](a), u = s.value
        } catch (t) {
          return void r(t)
        }
        s.done ? e(u) : Promise.resolve(u).then(n, o)
      }
      function o(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var r = 0, n = new Array(e); r < e; r++)
          n[r] = t[r];
        return n
      }
      function i(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          n.enumerable = n.enumerable || !1, n.configurable = !0,
          "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
        }
      }
      var a = r(36).Soldier, s = r(417).BattlelogMap, u = function() {
        function t(e, r) {
          var n, o, i;
          !function(t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function")
          }(this, t),
              n = this, o = "cache", i = new s,
              o in n ? Object.defineProperty(n, o, {
                value : i,
                enumerable : !0,
                configurable : !0,
                writable : !0
              })
                     : n[o] = i,
              this.user = e
        }
        var e, r, u, c;
        return e = t,
               (r =
                    [
                      {
                        key : "structureData",
                        value : function(t, e) {
                          var r, n = function(t, e) {
                            var r;
                            if ("undefined" == typeof Symbol ||
                                null == t[Symbol.iterator]) {
                              if (Array.isArray(t) || (r = function(t, e) {
                                    if (t) {
                                      if ("string" == typeof t)
                                        return o(t, e);
                                      var r = Object.prototype.toString.call(t)
                                                  .slice(8, -1);
                                      return "Object" === r && t.constructor &&
                                                 (r = t.constructor.name),
                                             "Map" === r || "Set" === r
                                                 ? Array.from(t)
                                                 : "Arguments" === r ||
                                                           /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/
                                                               .test(r)
                                                       ? o(t, e)
                                                       : void 0
                                    }
                                  }(t)) || e && t && "number" == typeof t.length) {
                                r && (t = r);
                                var n = 0, i = function() {};
                                return {
                                  s: i, n: function() {
                                    return n >= t.length
                                               ? {done : !0}
                                               : {done : !1, value : t[n++]}
                                  }, e: function(t) { throw t }, f: i
                                }
                              }
                              throw new TypeError(
                                  "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                            }
                            var a, s = !0, u = !1;
                            return {
                              s: function() { r = t[Symbol.iterator]() },
                                  n:
                                      function() {
                                        var t = r.next();
                                        return s = t.done, t
                                      },
                                  e: function(t) { u = !0, a = t },
                                  f: function() {
                                    try {
                                      s || null == r.return || r.return()
                                    } finally {
                                      if (u)
                                        throw a
                                    }
                                  }
                            }
                          }(t);
                          try {
                            for (n.s(); !(r = n.n()).done;) {
                              var i = r.value;
                              this.cache.structureData(i.persona.personaId,
                                                       new a(this.user, t, e),
                                                       e)
                            }
                          } catch (t) {
                            n.e(t)
                          } finally {
                            n.f()
                          }
                          return this
                        }
                      },
                      {
                        key : "fetch",
                        value : (u = regeneratorRuntime.mark((function t() {
                          var e;
                          return regeneratorRuntime.wrap(
                              (function(t) {
                                for (;;)
                                  switch (t.prev = t.next) {
                                  case 0:
                                    return t.next = 2,
                                           this.user.axios.get(
                                               "/user/overviewBoxStats/".concat(
                                                   this.user.userId));
                                  case 2:
                                    return e = t.sent,
                                           this.structureData(
                                               e.data.soldiersBox, !0),
                                           t.abrupt("return", this);
                                  case 5:
                                  case "end":
                                    return t.stop()
                                  }
                              }),
                              t, this)
                        })),
                                 c =
                                     function() {
                                       var t = this, e = arguments;
                                       return new Promise((function(r, o) {
                                         var i = u.apply(t, e);
                                         function a(t) {
                                           n(i, r, o, a, s, "next", t)
                                         }
                                         function s(t) {
                                           n(i, r, o, a, s, "throw", t)
                                         }
                                         a(void 0)
                                       }))
                                     },
                                 function() { return c.apply(this, arguments) })
                      }
                    ]) &&
                   i(e.prototype, r),
               t
      }();
      t.exports.SoldiersManager = u
    },
    882 : (t, e, r) => {
      function n(t, e, r) {
        return (n = o() ? Reflect.construct : function(t, e, r) {
                 var n = [ null ];
                 n.push.apply(n, e);
                 var o = new (Function.bind.apply(t, n));
                 return r && i(o, r.prototype), o
               }).apply(null, arguments)
      }
      function o() {
        if ("undefined" == typeof Reflect || !Reflect.construct)
          return !1;
        if (Reflect.construct.sham)
          return !1;
        if ("function" == typeof Proxy)
          return !0;
        try {
          return Date.prototype.toString.call(
                     Reflect.construct(Date, [], (function() {}))),
                 !0
        } catch (t) {
          return !1
        }
      }
      function i(t, e) {
        return (i = Object.setPrototypeOf ||
                    function(t, e) { return t.__proto__ = e, t })(t, e)
      }
      function a(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          n.enumerable = n.enumerable || !1, n.configurable = !0,
          "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
        }
      }
      var s = r(933).User, u = r(417).BattlelogMap, c = function() {
        function t(e) {
          var r, n, o;
          !function(t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function")
          }(this, t),
              r = this, n = "cache", o = new u,
              n in r ? Object.defineProperty(r, n, {
                value : o,
                enumerable : !0,
                configurable : !0,
                writable : !0
              })
                     : r[n] = o,
              this.client = e
        }
        var e, r;
        return e = t,
               (r = [ {
                  key : "fetch",
                  value : function() {
                    for (var t = arguments.length, e = new Array(t), r = 0;
                         r < t; r++)
                      e[r] = arguments[r];
                    return n(s, [ this.client ].concat(e)).fetch()
                  }
                } ]) &&
                   a(e.prototype, r),
               t
      }();
      t.exports.UsersManager = c
    },
    933 : (t, e, r) => {
      function n(t, e, r, n, o, i, a) {
        try {
          var s = t[i](a), u = s.value
        } catch (t) {
          return void r(t)
        }
        s.done ? e(u) : Promise.resolve(u).then(n, o)
      }
      function o(t) {
        return (o = "function" == typeof Symbol &&
                            "symbol" == typeof Symbol.iterator
                        ? function(t) { return typeof t }
                        : function(t) {
                            return t && "function" == typeof Symbol &&
                                           t.constructor === Symbol &&
                                           t !== Symbol.prototype
                                       ? "symbol"
                                       : typeof t
                          })(t)
      }
      function i(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          n.enumerable = n.enumerable || !1, n.configurable = !0,
          "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
        }
      }
      function a(t, e, r) {
        return e in t ? Object.defineProperty(t, e, {
          value : r,
          enumerable : !0,
          configurable : !0,
          writable : !0
        })
                      : t[e] = r,
                        t
      }
      var s = r(679).Platoon, u = r(123), c = r(673).stringify,
          f = r(799).SoldiersManager, l = (r(36).Soldier, r(417).BattlelogMap),
          p = function() {
            function t(e, r) {
              !function(t, e) {
                if (!(t instanceof e))
                  throw new TypeError("Cannot call a class as a function")
              }(this, t),
                  a(this, "gravatarEmailHash", void 0),
                  a(this, "platoons", new l), a(this, "platoonFans", new l),
                  a(this, "friends", new l), a(this, "platoon", void 0),
                  a(this, "soldiers", new f),
                  this.client = e,
                  "object" === o(r) ? this.structureData(r)
                                    : "string" == typeof r && (this.name = r)
            }
            var e, r, p, h;
            return e = t,
                   (r =
                        [
                          {
                            key : "fetch",
                            value : (p = regeneratorRuntime.mark((function t() {
                              var e, r;
                              return regeneratorRuntime.wrap(
                                  (function(t) {
                                    for (;;)
                                      switch (t.prev = t.next) {
                                      case 0:
                                        return t.next = 2,
                                               this.client.axios.get(
                                                   "/user/".concat(this.name));
                                      case 2:
                                        return e = t.sent,
                                               r = e.data.context.profileCommon,
                                               this.structureData(r),
                                               e.data.context.soldiersBox,
                                               this.activities =
                                                   e.data.context
                                                       .activityStream,
                                               t.abrupt("return", this);
                                      case 8:
                                      case "end":
                                        return t.stop()
                                      }
                                  }),
                                  t, this)
                            })),
                                     h =
                                         function() {
                                           var t = this, e = arguments;
                                           return new Promise((function(r, o) {
                                             var i = p.apply(t, e);
                                             function a(t) {
                                               n(i, r, o, a, s, "next", t)
                                             }
                                             function s(t) {
                                               n(i, r, o, a, s, "throw", t)
                                             }
                                             a(void 0)
                                           }))
                                         },
                                     function() {
                                       return h.apply(this, arguments)
                                     })
                          },
                          {
                            key : "structureData",
                            value : function(e) {
                              var r = this;
                              u.structureData(this, e, {
                                blacklist : [
                                  "user", "tenFriends", "platoons",
                                  "platoonFans"
                                ]
                              }),
                                  e.user && (u.structureData(this, e.user, {
                                    blacklist : [ "gravatarMd5" ]
                                  }),
                                             e.user.gravatarMd5 &&
                                                 (this.gravatarEmailHash =
                                                      e.user.gravatarMd5)),
                                  e.tenFriends && e.tenFriends.length &&
                                      (this.friends =
                                           e.tenFriends.map((function(e) {
                                             return new t(r.client, e)
                                           }))),
                                  e.platoons &&
                                      (this.platoons = e.platoons.map((function(
                                           t) { return new s(r.client, t) }))),
                                  e.platoonFans &&
                                      (this.platoonFans =
                                           e.platoonFans.map((function(t) {
                                             return new s(r.client, t)
                                           }))),
                                  e.club && (this.platoon =
                                                 new s(this.client, e.club)),
                                  e.soldiersBox && this.soldiers.structureData(
                                                       e.soldiersBox),
                                  this.client.users.cache.set(this.userId, this)
                            }
                          },
                          {
                            key : "displayAvatarURL",
                            value : function() {
                              var t = arguments.length > 0 &&
                                              void 0 !== arguments[0]
                                          ? arguments[0]
                                          : {};
                              if (u.validateOptions(t, {
                                    alias : {
                                      size : "s",
                                      rating : "r",
                                      default : "d",
                                      extension : "e"
                                    },
                                    defaults : {default : "retro"}
                                  }),
                                  t.size && t.size > 2048)
                                throw Error(
                                    "Option 'size' is required to be less than 2048.");
                              if (t.size && t.size < 1)
                                throw Error(
                                    "Option 'size' is required to be more than 1.");
                              if ("r" === t.rating)
                                throw Error(
                                    "To prevent abuse of this library. Avatars that are rated 'r' or 'x' is not permitted.");
                              if ("x" === t.rating)
                                throw Error("Ok coomer");
                              if (!["g", "pg"].includes(t.rating))
                                throw Error("");
                              if (!t.default.startsWith("http://") &&
                                  !t.default.startsWith("https://") &&
                                  !["404", "mp", "identicon", "monsterid",
                                    "wavatar", "retro", "robohash", "blank"]
                                       .includes(t.default))
                                throw Error(
                                    "Option 'default' did not provide a valid default profile picture");
                              var e = {r : t.rating, d : t.default, s : t.size};
                              return t.forceDefault && (e.f = "y"),
                                     "https://www.gravatar.com/avatar/"
                                         .concat(this.gravatarEmailHash, ".")
                                         .concat(t.extension, "?")
                                         .concat(c(e))
                            }
                          }
                        ]) &&
                       i(e.prototype, r),
                   t
          }();
      t.exports.User = p
    },
    352 : (t, e, r) => {
      function n(t, e, r) {
        return (n = o() ? Reflect.construct : function(t, e, r) {
                 var n = [ null ];
                 n.push.apply(n, e);
                 var o = new (Function.bind.apply(t, n));
                 return r && i(o, r.prototype), o
               }).apply(null, arguments)
      }
      function o() {
        if ("undefined" == typeof Reflect || !Reflect.construct)
          return !1;
        if (Reflect.construct.sham)
          return !1;
        if ("function" == typeof Proxy)
          return !0;
        try {
          return Date.prototype.toString.call(
                     Reflect.construct(Date, [], (function() {}))),
                 !0
        } catch (t) {
          return !1
        }
      }
      function i(t, e) {
        return (i = Object.setPrototypeOf ||
                    function(t, e) { return t.__proto__ = e, t })(t, e)
      }
      var a = r(933).User, s = r(679).Platoon, u = r(265).GameClient,
          c = r(42).BattlelogClient, f = r(882).UsersManager,
          l = (r(36).Soldier, r(842).ServerBrowser, r(953).Server, r(123));
      t.exports =
          function() {
        for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
          e[r] = arguments[r];
        return n(c, e)
      },
      t.exports.BattlelogClient = c, t.exports.GameClient = u,
      t.exports.Platoon = s, t.exports.User = a, t.exports.UsersManager = f,
      t.exports.utils = l
    },
    123 : t => {
      function e(t, e) {
        return function(t) {
          if (Array.isArray(t))
            return t
        }(t) ||
               function(t, e) {
                 if ("undefined" != typeof Symbol && Symbol.iterator in
                                                         Object(t)) {
                   var r = [], n = !0, o = !1, i = void 0;
                   try {
                     for (var a, s = t[Symbol.iterator]();
                          !(n = (a = s.next()).done) &&
                          (r.push(a.value), !e || r.length !== e);
                          n = !0)
                       ;
                   } catch (t) {
                     o = !0, i = t
                   } finally {
                     try {
                       n || null == s.return || s.return()
                     } finally {
                       if (o)
                         throw i
                     }
                   }
                   return r
                 }
               }(t, e) ||
               r(t, e) || function() {
                 throw new TypeError(
                     "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
               }()
      }
      function r(t, e) {
        if (t) {
          if ("string" == typeof t)
            return n(t, e);
          var r = Object.prototype.toString.call(t).slice(8, -1);
          return "Object" === r && t.constructor && (r = t.constructor.name),
                 "Map" === r || "Set" === r
                     ? Array.from(t)
                     : "Arguments" === r ||
                               /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(
                                   r)
                           ? n(t, e)
                           : void 0
        }
      }
      function n(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var r = 0, n = new Array(e); r < e; r++)
          n[r] = t[r];
        return n
      }
      function o(t) {
        return (o = "function" == typeof Symbol &&
                            "symbol" == typeof Symbol.iterator
                        ? function(t) { return typeof t }
                        : function(t) {
                            return t && "function" == typeof Symbol &&
                                           t.constructor === Symbol &&
                                           t !== Symbol.prototype
                                       ? "symbol"
                                       : typeof t
                          })(t)
      }
      function i(t, e) {
        if (!t)
          throw Error("Expected parameter 'str'. Found no parameters.");
        if ("string" != typeof t)
          throw Error(
              "Expected parameter 'str' to be a string. While it is actually "
                  .concat(i(o(t)), " ")
                  .concat(o(t), "."));
        return e && !0 === e
                   ? "some"
                   : [ "a", "i", "u", "e", "o" ].includes(t[0]) ? "an" : "a"
      }
      function a(t, n) {
        if (n.alias)
          for (var a = 0, s = Object.entries(n.alias); a < s.length; a++) {
            var u = e(s[a], 2), c = u[0], f = u[1];
            void 0 === t[c] && (t[c] = t[f])
          }
        if (n.defaults)
          for (var l = 0, p = Object.entries(n.defaults); l < p.length; l++) {
            var h = e(p[l], 2), d = h[0], y = h[1];
            void 0 === t[d] && (t[d] = y)
          }
        if (n.required && n.required.length) {
          var m, v = function(t, e) {
            var n;
            if ("undefined" == typeof Symbol || null == t[Symbol.iterator]) {
              if (Array.isArray(t) || (n = r(t))) {
                n && (t = n);
                var o = 0, i = function() {};
                return {
                  s: i, n: function() {
                    return o >= t.length ? {done : !0}
                                         : {done : !1, value : t[o++]}
                  }, e: function(t) { throw t }, f: i
                }
              }
              throw new TypeError(
                  "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }
            var a, s = !0, u = !1;
            return {
              s: function() { n = t[Symbol.iterator]() }, n: function() {
                var t = n.next();
                return s = t.done, t
              }, e: function(t) { u = !0, a = t }, f: function() {
                try {
                  s || null == n.return || n.return()
                } finally {
                  if (u)
                    throw a
                }
              }
            }
          }(n.required);
          try {
            for (v.s(); !(m = v.n()).done;) {
              var b = m.value;
              if (!t[b])
                throw Error("Option '".concat(
                    b, "' is required. While it's not provided."))
            }
          } catch (t) {
            v.e(t)
          } finally {
            v.f()
          }
        }
        if (n.typeof)
          for (var g = 0, w = Object.entries(n.typeof); g < w.length; g++) {
            var x = e(w[g], 2), O = x[0], j = x[1],
                S = Array.isArray(t[O]) ? "array" : o(t[O]);
            if (S !== j)
              throw Error("Option '".concat(O, "' is required to be ")
                              .concat(i(j), " ")
                              .concat(j, " while it is actually ")
                              .concat(i(S), " ")
                              .concat(S, "."))
          }
        if (n.requiredToBe)
          for (var E = function() {
                 var r, n = e(P[R], 2), o = n[0], i = n[1];
                 if (i && i.length && !i.includes(t[o]))
                   throw Error(
                       "Option ".concat(o, " is required to be ")
                           .concat((r = i.pop(), "".concat(i.map((function(t) {
                                                              return "'".concat(
                                                                  t, "'")
                                                            })).join(", "),
                                                           ", or '")
                                                     .concat(r, "'"))))
               }, R = 0, P = Object.entries(n.requiredToBe); R < P.length; R++)
            E();
        return t
      }
      t.exports.getArticle = i, t.exports.structureData = function(t, r) {
        var n =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        if (r) {
          if (!t)
            throw Error();
          a(n, {
            typeof : {
              blacklist : "array",
              setBoolean : "array",
              alias : "object",
              onlyAssignIfTruthy : "array"
            },
            defaults : {
              blacklist : [],
              setBoolean : [],
              alias : {},
              onlyAssignIfTruthy : []
            }
          });
          for (var o = 0, i = Object.entries(r); o < i.length; o++) {
            var s = e(i[o], 2), u = s[0], c = s[1];
            n.alias[u] && (u = n.alias[u]),
                n.onlyAssignIfTruthy.includes(u) && !c ||
                    n.blacklist.includes(u) ||
                    (n.setBoolean.includes[u] ? t[u] = !!c : t[u] = c)
          }
          return t
        }
      }, t.exports.validateOptions = a
    },
    155 : t => {
      var e, r, n = t.exports = {};
      function o() { throw new Error("setTimeout has not been defined") }
      function i() { throw new Error("clearTimeout has not been defined") }
      function a(t) {
        if (e === setTimeout)
          return setTimeout(t, 0);
        if ((e === o || !e) && setTimeout)
          return e = setTimeout, setTimeout(t, 0);
        try {
          return e(t, 0)
        } catch (r) {
          try {
            return e.call(null, t, 0)
          } catch (r) {
            return e.call(this, t, 0)
          }
        }
      }
      !function() {
        try {
          e = "function" == typeof setTimeout ? setTimeout : o
        } catch (t) {
          e = o
        }
        try {
          r = "function" == typeof clearTimeout ? clearTimeout : i
        } catch (t) {
          r = i
        }
      }();
      var s, u = [], c = !1, f = -1;
      function l() {
        c && s && (c = !1, s.length ? u = s.concat(u) : f = -1, u.length && p())
      }
      function p() {
        if (!c) {
          var t = a(l);
          c = !0;
          for (var e = u.length; e;) {
            for (s = u, u = []; ++f < e;)
              s && s[f].run();
            f = -1, e = u.length
          }
          s = null, c = !1, function(t) {
            if (r === clearTimeout)
              return clearTimeout(t);
            if ((r === i || !r) && clearTimeout)
              return r = clearTimeout, clearTimeout(t);
            try {
              r(t)
            } catch (e) {
              try {
                return r.call(null, t)
              } catch (e) {
                return r.call(this, t)
              }
            }
          }(t)
        }
      }
      function h(t, e) { this.fun = t, this.array = e }
      function d() {}
      n.nextTick =
          function(t) {
        var e = new Array(arguments.length - 1);
        if (arguments.length > 1)
          for (var r = 1; r < arguments.length; r++)
            e[r - 1] = arguments[r];
        u.push(new h(t, e)), 1 !== u.length || c || a(p)
      },
      h.prototype.run = function() { this.fun.apply(null, this.array) },
      n.title = "browser", n.browser = !0, n.env = {}, n.argv = [],
      n.version = "", n.versions = {}, n.on = d, n.addListener = d, n.once = d,
      n.off = d, n.removeListener = d, n.removeAllListeners = d, n.emit = d,
      n.prependListener = d, n.prependOnceListener = d,
      n.listeners = function(t) { return [] },
      n.binding = function(
          t) { throw new Error("process.binding is not supported") },
      n.cwd = function() { return "/" },
      n.chdir = function(
          t) { throw new Error("process.chdir is not supported") },
      n.umask = function() { return 0 }
    },
    587 : t => {
      "use strict";
      function e(t, e) { return Object.prototype.hasOwnProperty.call(t, e) }
      t.exports = function(t, r, n, o) {
        r = r || "&", n = n || "=";
        var i = {};
        if ("string" != typeof t || 0 === t.length)
          return i;
        var a = /\+/g;
        t = t.split(r);
        var s = 1e3;
        o && "number" == typeof o.maxKeys && (s = o.maxKeys);
        var u = t.length;
        s > 0 && u > s && (u = s);
        for (var c = 0; c < u; ++c) {
          var f, l, p, h, d = t[c].replace(a, "%20"), y = d.indexOf(n);
          y >= 0 ? (f = d.substr(0, y), l = d.substr(y + 1)) : (f = d, l = ""),
              p = decodeURIComponent(f), h = decodeURIComponent(l),
              e(i, p) ? Array.isArray(i[p]) ? i[p].push(h) : i[p] = [ i[p], h ]
                      : i[p] = h
        }
        return i
      }
    },
    361 : t => {
      "use strict";
      var e = function(t) {
        switch (typeof t) {
        case "string":
          return t;
        case "boolean":
          return t ? "true" : "false";
        case "number":
          return isFinite(t) ? t : "";
        default:
          return ""
        }
      };
      t.exports = function(t, r, n, o) {
        return r = r || "&", n = n || "=", null === t && (t = void 0),
               "object" == typeof t
                   ? Object.keys(t)
                         .map((function(o) {
                           var i = encodeURIComponent(e(o)) + n;
                           return Array.isArray(t[o])
                                      ? t[o].map((function(t) {
                                              return i +
                                                     encodeURIComponent(e(t))
                                            }))
                                            .join(r)
                                      : i + encodeURIComponent(e(t[o]))
                         }))
                         .join(r)
                   : o ? encodeURIComponent(e(o)) + n + encodeURIComponent(e(t))
                       : ""
      }
    },
    673 : (t, e, r) => {
      "use strict";
      e.decode = e.parse = r(587), e.encode = e.stringify = r(361)
    },
    686 : t => {
      "use strict";
      t.exports = JSON.parse(
          '{"X-Requested-With":"XMLHttpRequest","X-AjaxNavigation":"1"}')
    }
  },
      e = {};
  !function r(n) {
    if (e[n])
      return e[n].exports;
    var o = e[n] = {exports : {}};
    return t[n](o, o.exports, r), o.exports
  }(352)
})();