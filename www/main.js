async function main() {
    return fetchAndInstantiate('testa.wasm').then(module => {
        const iter = 100000;
        const sumNumber = 1000;
        const sumResult = 499500;
        console.log('JS - sumInJavascript', runIter(iter, () => sumInJavascript(sumNumber) === sumResult));
        console.log('Rust - sumInRust', runIter(iter, () => module.sum_in_rust(sumNumber) === sumResult));
        console.log('Rust - InlineSumInRust', runIter(1, () => module.inline_sum_in_rust(iter, sumNumber) === sumResult));
    });
}

main().catch(err => console.error(err));

function runIter(iter, fn) {
    var d = Date.now();
    Array(iter).fill().forEach(() => {
        if(fn.call() !== true) throw new Error(fn.toString()) 
    });
    return Date.now() - d;
}

function sumInJavascript(num) {
    var s = 0;
    for(var i = 0 ; i < num ; i++) {
        s += i;
    }
    return s;
}

function fetchAndInstantiate(url, importObject) {
    return fetch(url).then(response =>
        response.arrayBuffer()
    ).then(bytes =>
        WebAssembly.instantiate(bytes, importObject)
    ).then(results =>
        results.instance.exports
    );
}