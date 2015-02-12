function isRelative(path) {
    var absPattern = /^([a-z]+:)*\/\//i;
    return !absPattern.test(path);
}
function sameDomain(el) {
    return el.host.indexOf(document.domain) >= 0;
}
function setupDOM(doc) {
    doc.body.innerHTML = '';
    doc.body.appendChild(frame);
    doc.body.appendChild(overlay);
    frame.addEventListener('load', function () {
        console.log('~~~ frame load fired');
        overlay.style.display = 'none';
        rebind(frame.contentDocument);
    });
    frame.contentWindow.addEventListener('unload', function () {
        console.log('~~~ frame unload fired');
    });
}
function run(path) {
    top.history.pushState({}, '', path);
    overlay.style.display = 'block';
    frame.src = path;
    frame.style.display = 'block';
}
window.addEventListener('load', function () {
    console.log('~~~~ window load fired');
});

top.document.documentElement.style.cssText = [
    'height: 100%'
].join(';');
top.document.body.style.cssText = [
    'height: 100%'
].join(';');
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

function create(el, top, type) {
    return function (e) {
        console.log('clicked', el.href);
        if (type === 'local') {
            if (!top.setup) {
                setupDOM(top.document);
                top.setup = true;
            }
        } else {
            top.location.href = el.href;
        }
        e.preventDefault();
        e.stopPropagation();
        run(el.href);
        return false;
    };
}
function rebind(doc) {
    var i, el, href, set = doc.getElementsByTagName('a');
    for (i = 0; i < set.length; i += 1) {
        el = set[i];
        href = el.getAttribute('href');
        if (isRelative(href) || sameDomain(el)) {
            el.addEventListener('click', create(el, top, 'local'));
        } else {
            el.addEventListener('click', create(el, top));
        }
    }
}
if (!top.running) {
    rebind(top.document);
    top.running = true;
}
