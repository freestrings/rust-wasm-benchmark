function main() {
    let wasm = require('@nodejs/test-rust-wasm');

    let iter = 10;
    let num = 100000000;
    let array = initArray(num);
    let jsResult = jsSumInt(array, num);
    let wsResult = wasm.sum_array_in_rust(array);
    let inlineJsResult = inlineJsSumInt(array, num, iter);
    let inlineWsResult = wasm.inline_sum_array_in_rust(iter, array);

    if(jsResult !== wsResult) {
        throw new Error(`1.결과다름: ${jsResult}, ${wsResult}`);
    }

    if(inlineJsResult !== inlineWsResult) {
        throw new Error(`2.결과다름: ${inlineJsResult}, ${inlineWsResult}`);
    }

    if(jsResult * iter !== inlineJsResult) {
        throw new Error(`3.결과다름: ${(jsResult * iter)}, ${inlineJsResult}`);
    }

    run('JS - sum', iter, () => jsSumInt(array, num) === jsResult);
    run('JS - inlineSum', iter, () => inlineJsSumInt(array, num, iter) === inlineJsResult);
    run('Ws - sum', iter, () => wasm.sum_array_in_rust(array) === jsResult);
    run('Ws - inlineSum', iter, () => wasm.inline_sum_array_in_rust(iter, array) === inlineJsResult);
}

function initArray(num) {
    let array = new Int32Array(num);
    for (let i = 0, len = array.length; i < len; i++) {
        array[i] = ((Math.random() * 20000) | 0) - 10000;
    }
    return array;
}

function run(message, iter, cb) {
    let d = Date.now();
    for (let i = 0; i < iter; i++) {
        let ret = cb();
        if (ret !== true) throw new Error(cb.toString());
    }
    console.log(message, Date.now() - d);
}

function jsSumInt(array, n) {
    var s = 0;
    for (var i = 0; i < n; i++) {
        s += array[i];
    }
    return s;
}

function inlineJsSumInt(array, n, iter) {
    var s = 0;
    for (var i = 0; i < iter; i++) {
        s += jsSumInt(array, n);
    }
    return s;
}

setTimeout(main, 0);