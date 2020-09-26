var cache = {};
export function getUrl(url) {
    return new Promise(resolve => {
        if(cache[url]) resolve(cache[url]);
        const request = new XMLHttpRequest();
        request.open('GET', url);
        request.addEventListener('load', () => {
            resolve(request.responseText);  
        });
        request.send(null);
    })
}
export async function require(path) {
    if(cache[path]) return cache[path];
    const data = await getUrl(location.href + '/' + path.slice(2));
    try {
        const json = JSON.parse(data);
        return json;
    } catch {}
    const {code} = Babel.transform(data, {
        presets: ['react'],
        plugins: ['syntax-class-properties']
    });
    return eval(`(function(module, exports) {\n${code}\n\nreturn exports || module.exports})({exports: null})`);
}