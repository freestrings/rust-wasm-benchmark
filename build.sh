#!/bin/bash

set -e
DIR="$(pwd)"

echo "rust build - for nodejs"
[ -e "${DIR}"/pkg ] && rm -rf "${DIR}"/pkg

wasm-pack build --target nodejs && cp -r "${DIR}"/pkg "${DIR}"/wasm_nodejs && cd "${DIR}"/wasm_nodejs && npm link && \
  cd "${DIR}"/www && npm link test-rust-wasm

echo "rust build - for browser"
[ -e "${DIR}"/www/testa.wasm ] && rm "${DIR}"/www/testa.wasm

cd "${DIR}"

rm -rf "${DIR}"/pkg && \
  wasm-pack build --target browser && \
  cp "${DIR}"/pkg/test_rust_wasm_bg.wasm "${DIR}"/www/testa.wasm

echo "emcc build"

emcc "${DIR}"/emcc_c/sumInt.c \
  -Os \
  -s WASM=1 \
  -s MODULARIZE=1 \
  -s DEMANGLE_SUPPORT=1 \
  -s ALLOW_MEMORY_GROWTH=1 \
  -s "EXPORTED_FUNCTIONS=['_sumInt', '_inlineSumInt', '_malloc', '_free']" \
  -o "${DIR}"/emcc_c/sumInt.js

[ -e "${DIR}"/www/testb.wasm ] && rm "${DIR}"/www/testb.wasm
[ -e "${DIR}"/www/testb.wasm.js ] && rm "${DIR}"/www/testb.wasm.js

cp "${DIR}"/emcc_c/sumInt.wasm "${DIR}"/www/testb.wasm
cp "${DIR}"/emcc_c/sumInt.js "${DIR}"/www/testb.wasm.js