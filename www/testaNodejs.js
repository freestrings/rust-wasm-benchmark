function testa() {

    let wasm = require('test-rust-wasm');
    
    const iter = 10;
    const sumNumber = 100000000;

    let sumTargetArray = initArray(sumNumber);

    let sumResult = sumInJavascript(sumTargetArray);
    let sumResultInRust = wasm.sum_array_in_rust(sumTargetArray);

    let inlineSumJsResult = inlineSumInJavascript(iter, sumTargetArray);
    let inlineSumInRustResult = wasm.inline_sum_array_in_rust(iter, sumTargetArray);

    if (sumResult != sumResultInRust) {
        throw new Error(`1.결과다름: ${sumResult}, ${sumResultInRust}`);
    }

    if (inlineSumJsResult != inlineSumInRustResult) {
        throw new Error(`2.결과다름: ${sumResult}, ${sumResultInRust}`);
    }

    if(sumResult * iter !== inlineSumJsResult) {
        throw new Error(`3.결과다름: ${(sumResult * iter)}, ${inlineSumJsResult}`);
    }

    run('JS - sumInJavascript', iter, () => sumInJavascript(sumTargetArray) === sumResult);
    run('JS - inlineSumInJavascript', 1, () => inlineSumInJavascript(iter, sumTargetArray) === inlineSumJsResult);
    run('Rust - sumInRust', iter, () => wasm.sum_array_in_rust(sumTargetArray) === sumResultInRust);
    run('Rust - inlineSumInRust', 1, () => wasm.inline_sum_array_in_rust(iter, sumTargetArray) == inlineSumJsResult);
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

function inlineSumInJavascript(iter, array) {
    let s = 0;
    for (let i = 0; i < iter; i++) {
        s += sumInJavascript(array);
    }
    return s;
}

function sumInJavascript(array) {
    let s = 0;
    for (let i = 0, len = array.length; i < len; i++) {
        s += array[i];
    }
    return s;
}

testa();