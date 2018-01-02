set -e
DIR="$( pwd )"
echo "Current Directory: '$DIR'"

echo "Build testa"

[ -e www/testa.wasm ] && rm www/testa.wasm
[ -e www/testa_orig.wasm ] && rm www/testa_orig.wasm

cargo +nightly build --release --target wasm32-unknown-unknown

cp "target/wasm32-unknown-unknown/release/test_rust_wasm.wasm" www/testa_orig.wasm

wasm-gc www/testa_orig.wasm www/testa.wasm

echo "Build testb"

[ -e emcc_c/sumInt.js ] && rm emcc_c/sumInt.js
[ -e emcc_c/sumInt.wasm ] && rm emcc_c/sumInt.wasm

emcc emcc_c/sumInt.c \
  -Os \
  -s WASM=1 \
  -s MODULARIZE=1 \
  -s DEMANGLE_SUPPORT=1 \
  -s ALLOW_MEMORY_GROWTH=1 \
  -s "EXPORTED_FUNCTIONS=['_sumInt', '_inlineSumInt']" \
  -o emcc_c/sumInt.js

[ -e www/testb.wasm ] && rm www/testb.wasm
[ -e www/testb.wasm.js ] && rm www/testb.wasm.js

cp emcc_c/sumInt.wasm www/testb.wasm
cp emcc_c/sumInt.js www/testb.wasm.js