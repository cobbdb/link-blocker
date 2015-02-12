!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;"undefined"!=typeof window?e=window:"undefined"!=typeof global?e=global:"undefined"!=typeof self&&(e=self),e.superagent=t()}}(function(){return function t(e,r,n){function i(s,a){if(!r[s]){if(!e[s]){var u="function"==typeof require&&require;if(!a&&u)return u(s,!0);if(o)return o(s,!0);var h=new Error("Cannot find module '"+s+"'");throw h.code="MODULE_NOT_FOUND",h}var c=r[s]={exports:{}};e[s][0].call(c.exports,function(t){var r=e[s][1][t];return i(r?r:t)},c,c.exports,t,e,r,n)}return r[s].exports}for(var o="function"==typeof require&&require,s=0;s<n.length;s++)i(n[s]);return i}({1:[function(t,e){function r(t){return t?n(t):void 0}function n(t){for(var e in r.prototype)t[e]=r.prototype[e];return t}e.exports=r,r.prototype.on=r.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks[t]=this._callbacks[t]||[]).push(e),this},r.prototype.once=function(t,e){function r(){n.off(t,r),e.apply(this,arguments)}var n=this;return this._callbacks=this._callbacks||{},r.fn=e,this.on(t,r),this},r.prototype.off=r.prototype.removeListener=r.prototype.removeAllListeners=r.prototype.removeEventListener=function(t,e){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var r=this._callbacks[t];if(!r)return this;if(1==arguments.length)return delete this._callbacks[t],this;for(var n,i=0;i<r.length;i++)if(n=r[i],n===e||n.fn===e){r.splice(i,1);break}return this},r.prototype.emit=function(t){this._callbacks=this._callbacks||{};var e=[].slice.call(arguments,1),r=this._callbacks[t];if(r){r=r.slice(0);for(var n=0,i=r.length;i>n;++n)r[n].apply(this,e)}return this},r.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks[t]||[]},r.prototype.hasListeners=function(t){return!!this.listeners(t).length}},{}],2:[function(t,e){e.exports=function(t,e,r){for(var n=0,i=t.length,o=3==arguments.length?r:t[n++];i>n;)o=e.call(null,o,t[n],++n,t);return o}},{}],3:[function(t,e){function r(){}function n(t){var e={}.toString.call(t);switch(e){case"[object File]":case"[object Blob]":case"[object FormData]":return!0;default:return!1}}function i(){if(m.XMLHttpRequest&&("file:"!=m.location.protocol||!m.ActiveXObject))return new XMLHttpRequest;try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(t){}try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(t){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(t){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(t){}return!1}function o(t){return t===Object(t)}function s(t){if(!o(t))return t;var e=[];for(var r in t)null!=t[r]&&e.push(encodeURIComponent(r)+"="+encodeURIComponent(t[r]));return e.join("&")}function a(t){for(var e,r,n={},i=t.split("&"),o=0,s=i.length;s>o;++o)r=i[o],e=r.split("="),n[decodeURIComponent(e[0])]=decodeURIComponent(e[1]);return n}function u(t){var e,r,n,i,o=t.split(/\r?\n/),s={};o.pop();for(var a=0,u=o.length;u>a;++a)r=o[a],e=r.indexOf(":"),n=r.slice(0,e).toLowerCase(),i=v(r.slice(e+1)),s[n]=i;return s}function h(t){return t.split(/ *; */).shift()}function c(t){return y(t.split(/ *; */),function(t,e){var r=e.split(/ *= */),n=r.shift(),i=r.shift();return n&&i&&(t[n]=i),t},{})}function p(t,e){e=e||{},this.req=t,this.xhr=this.req.xhr,this.text="HEAD"!=this.req.method?this.xhr.responseText:null,this.setStatusProperties(this.xhr.status),this.header=this.headers=u(this.xhr.getAllResponseHeaders()),this.header["content-type"]=this.xhr.getResponseHeader("content-type"),this.setHeaderProperties(this.header),this.body="HEAD"!=this.req.method?this.parseBody(this.text):null}function l(t,e){var r=this;d.call(this),this._query=this._query||[],this.method=t,this.url=e,this.header={},this._header={},this.on("end",function(){var t=null,e=null;try{e=new p(r)}catch(n){t=new Error("Parser is unable to parse the response"),t.parse=!0,t.original=n}r.callback(t,e)})}function f(t,e){return"function"==typeof e?new l("GET",t).end(e):1==arguments.length?new l("GET",t):new l(t,e)}var d=t("emitter"),y=t("reduce"),m="undefined"==typeof window?this:window,v="".trim?function(t){return t.trim()}:function(t){return t.replace(/(^\s*|\s*$)/g,"")};f.serializeObject=s,f.parseString=a,f.types={html:"text/html",json:"application/json",xml:"application/xml",urlencoded:"application/x-www-form-urlencoded",form:"application/x-www-form-urlencoded","form-data":"application/x-www-form-urlencoded"},f.serialize={"application/x-www-form-urlencoded":s,"application/json":JSON.stringify},f.parse={"application/x-www-form-urlencoded":a,"application/json":JSON.parse},p.prototype.get=function(t){return this.header[t.toLowerCase()]},p.prototype.setHeaderProperties=function(){var t=this.header["content-type"]||"";this.type=h(t);var e=c(t);for(var r in e)this[r]=e[r]},p.prototype.parseBody=function(t){var e=f.parse[this.type];return e&&t&&t.length?e(t):null},p.prototype.setStatusProperties=function(t){var e=t/100|0;this.status=t,this.statusType=e,this.info=1==e,this.ok=2==e,this.clientError=4==e,this.serverError=5==e,this.error=4==e||5==e?this.toError():!1,this.accepted=202==t,this.noContent=204==t||1223==t,this.badRequest=400==t,this.unauthorized=401==t,this.notAcceptable=406==t,this.notFound=404==t,this.forbidden=403==t},p.prototype.toError=function(){var t=this.req,e=t.method,r=t.url,n="cannot "+e+" "+r+" ("+this.status+")",i=new Error(n);return i.status=this.status,i.method=e,i.url=r,i},f.Response=p,d(l.prototype),l.prototype.use=function(t){return t(this),this},l.prototype.timeout=function(t){return this._timeout=t,this},l.prototype.clearTimeout=function(){return this._timeout=0,clearTimeout(this._timer),this},l.prototype.abort=function(){return this.aborted?void 0:(this.aborted=!0,this.xhr.abort(),this.clearTimeout(),this.emit("abort"),this)},l.prototype.set=function(t,e){if(o(t)){for(var r in t)this.set(r,t[r]);return this}return this._header[t.toLowerCase()]=e,this.header[t]=e,this},l.prototype.unset=function(t){return delete this._header[t.toLowerCase()],delete this.header[t],this},l.prototype.getHeader=function(t){return this._header[t.toLowerCase()]},l.prototype.type=function(t){return this.set("Content-Type",f.types[t]||t),this},l.prototype.accept=function(t){return this.set("Accept",f.types[t]||t),this},l.prototype.auth=function(t,e){var r=btoa(t+":"+e);return this.set("Authorization","Basic "+r),this},l.prototype.query=function(t){return"string"!=typeof t&&(t=s(t)),t&&this._query.push(t),this},l.prototype.field=function(t,e){return this._formData||(this._formData=new FormData),this._formData.append(t,e),this},l.prototype.attach=function(t,e,r){return this._formData||(this._formData=new FormData),this._formData.append(t,e,r),this},l.prototype.send=function(t){var e=o(t),r=this.getHeader("Content-Type");if(e&&o(this._data))for(var n in t)this._data[n]=t[n];else"string"==typeof t?(r||this.type("form"),r=this.getHeader("Content-Type"),this._data="application/x-www-form-urlencoded"==r?this._data?this._data+"&"+t:t:(this._data||"")+t):this._data=t;return e?(r||this.type("json"),this):this},l.prototype.callback=function(t,e){var r=this._callback;return this.clearTimeout(),2==r.length?r(t,e):t?this.emit("error",t):void r(e)},l.prototype.crossDomainError=function(){var t=new Error("Origin is not allowed by Access-Control-Allow-Origin");t.crossDomain=!0,this.callback(t)},l.prototype.timeoutError=function(){var t=this._timeout,e=new Error("timeout of "+t+"ms exceeded");e.timeout=t,this.callback(e)},l.prototype.withCredentials=function(){return this._withCredentials=!0,this},l.prototype.end=function(t){var e=this,o=this.xhr=i(),s=this._query.join("&"),a=this._timeout,u=this._formData||this._data;if(this._callback=t||r,o.onreadystatechange=function(){return 4==o.readyState?0==o.status?e.aborted?e.timeoutError():e.crossDomainError():void e.emit("end"):void 0},o.upload&&(o.upload.onprogress=function(t){t.percent=t.loaded/t.total*100,e.emit("progress",t)}),a&&!this._timer&&(this._timer=setTimeout(function(){e.abort()},a)),s&&(s=f.serializeObject(s),this.url+=~this.url.indexOf("?")?"&"+s:"?"+s),o.open(this.method,this.url,!0),this._withCredentials&&(o.withCredentials=!0),"GET"!=this.method&&"HEAD"!=this.method&&"string"!=typeof u&&!n(u)){var h=f.serialize[this.getHeader("Content-Type")];h&&(u=h(u))}for(var c in this.header)null!=this.header[c]&&o.setRequestHeader(c,this.header[c]);return this.emit("request",this),o.send(u),this},f.Request=l,f.get=function(t,e,r){var n=f("GET",t);return"function"==typeof e&&(r=e,e=null),e&&n.query(e),r&&n.end(r),n},f.head=function(t,e,r){var n=f("HEAD",t);return"function"==typeof e&&(r=e,e=null),e&&n.send(e),r&&n.end(r),n},f.del=function(t,e){var r=f("DELETE",t);return e&&r.end(e),r},f.patch=function(t,e,r){var n=f("PATCH",t);return"function"==typeof e&&(r=e,e=null),e&&n.send(e),r&&n.end(r),n},f.post=function(t,e,r){var n=f("POST",t);return"function"==typeof e&&(r=e,e=null),e&&n.send(e),r&&n.end(r),n},f.put=function(t,e,r){var n=f("PUT",t);return"function"==typeof e&&(r=e,e=null),e&&n.send(e),r&&n.end(r),n},e.exports=f},{emitter:1,reduce:2}]},{},[3])(3)});



        function nativeInline() {
            console.log('Native: inline');
        }
        function LBClick(el) {
            console.log('LB> anchor clicked', el.href);
            superagent.get(el.href, function (res) {
                console.log('done', res);
                document.documentElement.innerHTML = res.text;
                history.pushState({
                    page: res.text
                }, '', el.href);
                rebindAnchors();
                runScripts();
                var evt = document.createEvent('Event');
                evt.initEvent('load', false, false);
                window.dispatchEvent(evt);
            });
        }
        addEventListener('load', function () {
            console.log('~~~~ Document load fired');
        });
        addEventListener('popstate', function (e) {
            console.log('~~~~ Document popstate fired');
            var page = e.state.page;
            document.documentElement.innerHTML = page;
            rebindAnchors();
            runScripts();
            var evt = document.createEvent('Event');
            evt.initEvent('load', false, false);
            window.dispatchEvent(evt);
        });
        function runScripts() {
            var scripts = document.getElementsByTagName('script');
            for (var i = 0; i < scripts.length; i += 1) {
                eval(scripts[i].text);
            }
        }
        
        
        
        
        
        history.pushState({
            page: document.documentElement.innerHTML
        }, '', location.href);
        function isRelative(path) {
            var absPattern = /^([a-z]+:)*\/\//i;
            return !absPattern.test(path);
        }
function sameDomain(el) {
    return el.host === location.host;
}
        function isStatic(path) {
            return /\/[a-z]+\.[a-z]+$/i.test(path);
        }
        function ClickHandler(el) {
            return function (e) {
                e = e || window.event;
                e.cancelBubble = true;
                if (e.preventDefault) e.preventDefault();
                if (e.stopPropagation) e.stopPropagation();
                LBClick(el);
                return false;
            };
        }
        function cleanPath(path) {
            return path.replace(/^\/|\/$/g, '');
        }
        function rebindAnchors() {
            var i, el, href, path, split, host,
                set = document.getElementsByTagName('a');
            for (i = 0; i < set.length; i += 1) {
                el = set[i];
                href = el.getAttribute('href');
                if (el.href) {
                    if (isRelative(href) || sameDomain(el)) {
                        href = cleanPath(href);
                        path = cleanPath(location.pathname);
                        path += '/';
                        host = cleanPath(location.host);
                        if (isStatic(path)) {
                            split = path.split('/');
                            split.pop();
                            path = split.join('/');
                        }
                        console.log('generating path',
                            [host, path, href].join('|')
                        );
                        el.href = (
                            '//' + host + '/' +
                            path + href
                        );
                        el.addEventListener(
                            'click',
                            ClickHandler(el)
                        );
                    }
                }
            }
        }
        rebindAnchors();
        
        