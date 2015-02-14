function isRelative(path) {
    var absPattern = /^([a-z]+:)*\/\//i;
    return !absPattern.test(path);
}

function isHash(path) {
    return /^#/.test(path);
}

function sameDomain(host) {
    return host.indexOf(document.domain) >= 0;
}

function setupDOM() {
    var doc = top.document;
    doc.head.innerHTML = '';
    doc.body.innerHTML = '';
    doc.body.appendChild(frame);
    doc.body.appendChild(overlay);
    frame.addEventListener('load', function () {
        console.log('~~~ frame load fired');
        top.history.pushState({}, '', location.href);
        overlay.style.display = 'none';
        rebind(frame.contentDocument);
        rebindFrame();
    });
    rebindFrame();
}

function run(path) {
    top.history.pushState({}, '', path);
    overlay.style.display = 'block';
    frame.src = path;
    frame.style.display = 'block';
}

top.document.documentElement.style.height = '100%';
top.document.body.style.height = '100%';

overlay = top.document.createElement('div');
overlay.style.cssText = [
    'position: absolute',
    'top: 0',
    'left: 0',
    'z-index: 99999999',
    'width: 100%',
    'height: 100%',
    'background: white url(https://d13yacurqjgara.cloudfront.net/users/12755/screenshots/1037374/hex-loader2.gif) no-repeat center',
    'display: none'
].join(';');
frame = top.document.createElement('iframe');
frame.style.cssText = [
    'display: none',
    'border: 0',
    'padding: 0',
    'margin: 0',
    'position: absolute',
    'top: 0',
    'left: 0',
    'min-width: 100%',
    'min-height: 100%'
].join(';');

var clicktime;
function create(el, top, type) {
    return function (e) {
        console.log('clicked', el.href);
        clicktime = Date.now();
        if (type === 'local') {
            if (!top.setup) {
                setupDOM();
                top.setup = true;
            }
            run(el.href);
        } else {
            top.location.href = el.href;
        }
        e.preventDefault();
        e.stopPropagation();
        return false;
    };
}

function rebindFrame() {
    frame.contentWindow.addEventListener('beforeunload', function () {
        overlay.style.display = 'block';
    });
}

function rebind(doc) {
    var i, el, href, set = doc.getElementsByTagName('a');
    for (i = 0; i < set.length; i += 1) {
        el = set[i];
        href = el.getAttribute('href');
        if (!isHash(href)) {
            if (isRelative(href) || sameDomain(el.host)) {
                if (self === top) {
                    el.addEventListener('click', create(el, top, 'local'));
                }
            } else {
                el.addEventListener('click', create(el, top));
            }
        }
    }
}

if (!top.running) {
    rebind(top.document);
    top.running = true;
}
