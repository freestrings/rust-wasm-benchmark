msg('##rust##');

import * as wasm from '@browser/test-rust-wasm';

function main() {
    let iter = 10;
    let num = 100000000;
    let array = initArray(num);
    let jsResult = jsSumInt(array, num);
    let wsResult = wasm.sum_array_in_rust(array);
    let inlineJsResult = inlineJsSumInt(array, num, iter);
    let inlineWsResult = wasm.inline_sum_array_in_rust(iter, array);

    if (jsResult !== wsResult) {
        throw new Error(`1.결과다름: ${jsResult}, ${wsResult}`);
    }

    if (inlineJsResult !== inlineWsResult) {
        throw new Error(`2.결과다름: ${inlineJsResult}, ${inlineWsResult}`);
    }

    if (jsResult * iter !== inlineJsResult) {
        throw new Error(`3.결과다름: ${(jsResult * iter)}, ${inlineJsResult}`);
    }

    run('JS - sum', iter, function() {
        return jsSumInt(array, num) === jsResult;
    }).then(function() {
        return run('JS - inlineSum', iter, function() {
            return inlineJsSumInt(array, num, iter) === inlineJsResult;
        });
    }).then(function() {
        return run('Ws - sum', iter, function() {
            return wasm.sum_array_in_rust(array) === jsResult;
        });
    }).then(function() {
        return run('Ws - inlineSum', iter, function() {
            return wasm.inline_sum_array_in_rust(iter, array) === inlineJsResult;
        });
    });
}

function initArray(num) {
    let array = new Int32Array(num);
    for (let i = 0, len = array.length; i < len; i++) {
        array[i] = ((Math.random() * 20000) | 0) - 10000;
    }
    return array;
}

function run(message, iter, cb) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            let d = Date.now();
            for (let i = 0; i < iter; i++) {
                let ret = cb();
                if (ret !== true) throw new Error(cb.toString());
            }
            msg([message, Date.now() - d].join(', '));
            resolve();
        }, 1000);
    });
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

function msg(msg) {
    console.log(msg);
    let div = document.createElement('div');
    div.innerText = msg;
    document.body.appendChild(div);
}

setTimeout(main, 0);