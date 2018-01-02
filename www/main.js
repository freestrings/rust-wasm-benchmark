async function main() {
    return fetchAndInstantiate('testa.wasm').then(module => {
        const iter = 100000;
        const sumNumber = 1000;
        const sumResult = 499500;

        run('JS - sumInJavascript', iter, () => sumInJavascript(sumNumber) === sumResult);
        run('JS - inlineSumInJavascript', 1, () => inlineSumInJavascript(iter, sumNumber) === iter * sumResult);
        run('Rust - sumInRust', iter, () => module.sum_in_rust(sumNumber) === sumResult);
        run('Rust - inlineSumInRust', 1, () => copyCStr(module, module.inline_sum_str_in_rust(iter, sumNumber)) == iter * sumResult);
    });
}

main().catch(err => console.error(err));

function run(message, iter, cb) {
    let d = Date.now();
    for (var i = 0; i < iter; i++) {
        let ret = cb();
        if (ret !== true) throw new Error(cb.toString());
    }
    console.log(message, Date.now() - d);
}

function inlineSumInJavascript(iter, num) {
    let s = 0;
    for (var i = 0; i < iter; i++) {
        s += sumInJavascript(num);
    }
    return s;
}

function sumInJavascript(num) {
    let s = 0;
    for (var i = 0; i < num; i++) {
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

function copyCStr(module, ptr) {
    let orig_ptr = ptr;
    const collectCString = function* () {
        let memory = new Uint8Array(module.memory.buffer);
        while (memory[ptr] !== 0) {
            if (memory[ptr] === undefined) { throw new Error("Woop~ a undefined memory"); }
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