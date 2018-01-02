async function main() {
    return fetchAndInstantiate('testa.wasm').then(module => {
        const iter = 10;
        const sumNumber = 100000000;

        let sumTargetArray = initArray(sumNumber);
        let sumResult = sumInJavascript(sumTargetArray);
        let copiedArrayPtr = copyArray(module, sumTargetArray);
        let sumResultInRust = sumInRust(module, copiedArrayPtr, sumTargetArray.length * 4);

        if(sumResult != sumResultInRust) {
            throw new Error(`Different result: ${sumResult}, ${sumResultInRust}`);
        }

        run('JS - sumInJavascript', iter, () => sumInJavascript(sumTargetArray) === sumResult);
        run('JS - inlineSumInJavascript', 1, () => inlineSumInJavascript(iter, sumTargetArray) === iter * sumResult);
        run('Rust - sumInRust', iter, () => sumInRust(module, copiedArrayPtr, sumTargetArray.length * 4) === sumResultInRust);
        run('Rust - inlineSumInRust', 1, () => inlineSumInRust(module, iter, copiedArrayPtr, sumTargetArray.length * 4) == iter * sumResultInRust);
    });
}

main().catch(err => console.error(err));

function initArray(num) {
    let array = new Int32Array(num);
    for (let i = 0, len = array.length; i < len; i++) {
        array[i] = ((Math.random() * 20000) | 0) - 10000;
    }
    return array;
}

function copyArray(module, array) {
    let ptr = module.alloc(array.length * 4);
    let memory = new Int8Array(module.memory.buffer);
    let len = array.length;
    for (let i = 0; i < len; i++) {
        let v = array[i];
        for(let j = 3 ; j >= 0 ; j--) {
            memory[ptr + i * 4 + j] = v & 0xff;
            v = v >> 8;
        }
    }
    return ptr;
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

function sumInRust(module, arrayPtr, len) {
    return copyCStr(module, module.sum_array_in_rust_str(arrayPtr, len));
}

function inlineSumInRust(module, iter, arrayPtr, len) {
    return copyCStr(module, module.inline_sum_array_in_rust_str(iter, arrayPtr, len));
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

function copyCStr(module, ptr) {
    let orig_ptr = ptr;
    const collectCString = function* () {
        let memory = new Uint8Array(module.memory.buffer);
        while (memory[ptr] !== 0) {
            if (memory[ptr] === undefined) { throw new Error(`Undefined: ${ptr}`); }
            yield memory[ptr]
            ptr += 1;
        }
    }

    const buffer_as_u8 = new Uint8Array(collectCString())
    const utf8Decoder = new TextDecoder("UTF-8");
    const buffer_as_utf8 = utf8Decoder.decode(buffer_as_u8);
    module.dealloc_str(orig_ptr);
    return buffer_as_utf8
}