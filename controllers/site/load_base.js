const _loadJS = () => {
    let js = {
        a: CONFIG.BASE_URL + "public/js/jquery.min.js",
        b: CONFIG.BASE_URL + "public/js/bootstrap.min.js",
        c: CONFIG.BASE_URL + "public/js/slick.min.js",
        d: CONFIG.BASE_URL + "public/js/venobox.min.js",
        e: CONFIG.BASE_URL + "public/js/gmap.js",
        f: CONFIG.BASE_URL + "public/js/fuse.min.js",
        g: CONFIG.BASE_URL + "public/js/mark.js",
        h: CONFIG.BASE_URL + "public/js/search.js",
        i: CONFIG.BASE_URL + "public/js/ddj.js",
        j: CONFIG.BASE_URL + "public/js/script.min.js",
        k: CONFIG.BASE_URL + "public/js/sweetAlerts.js",
        brandIcon: CONFIG.BASE_URL + 'public/images/icon/icon.png'
    }
    return js;
}

const _loadCSS = () => {
    let css = {
        a: CONFIG.BASE_URL + "public/scss/bootstrap.min.css",
        b: CONFIG.BASE_URL + "public/scss/slick.css",
        c: CONFIG.BASE_URL + "public/scss/font-awesome.min.css",
        d: CONFIG.BASE_URL + "public/scss/venobox.css",
        e: CONFIG.BASE_URL + "public/scss/ddj.css",
        f: CONFIG.BASE_URL + "public/scss/style.min.css",
        h: CONFIG.BASE_URL + "public/scss/static.css",
        brandIcon: CONFIG.BASE_URL + 'public/images/icon/icon.png',
        loader: CONFIG.BASE_URL + 'public/images/preloader.gif'
    }
    return css
}

module.exports = {
    loadCSS: _loadCSS,
    loadJS: _loadJS
}