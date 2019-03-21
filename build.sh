#!/bin/bash

set -e
DIR="$(pwd)"

echo "> rust build - for nodejs"
[ -e "${DIR}"/nodejs/pkg ] && rm -rf "${DIR}"/nodejs/pkg
[ -e "${DIR}"/nodejs/node_modules ] && rm -rf "${DIR}"/nodejs/node_modules
[ -e "${DIR}"/rust_www/node_modules ] && rm -rf "${DIR}"/rust_www/node_modules

wasm-pack build --target nodejs --scope nodejs --out-dir "${DIR}"/nodejs/pkg && \
  cd "${DIR}"/nodejs/pkg && npm link && \
  cd .. && npm link @nodejs/test-rust-wasm

echo "> rust build - for browser"
[ -e "${DIR}"/rust_www/pkg ] && rm -rf "${DIR}"/rust_www/pkg

cd "${DIR}"

wasm-pack build --target browser --scope browser --out-dir "${DIR}"/rust_www/pkg && \
  cd "${DIR}"/rust_www/pkg && npm link && \
  cd .. && npm install && npm link @browser/test-rust-wasm && \
  rm -rf "${DIR}"/rust_www/dist && \
  npm run build

printf "> emcc build"

emcc "${DIR}"/emcc_c/sumInt.c \
  -Os \
  -s WASM=1 \
  -s MODULARIZE=1 \
  -s DEMANGLE_SUPPORT=1 \
  -s ALLOW_MEMORY_GROWTH=1 \
  -s "EXPORTED_FUNCTIONS=['_sumInt', '_inlineSumInt', '_malloc', '_free']" \
  -o "${DIR}"/emcc_c/sumInt.js

printf " done\n"

printf "> copy docs"
cp "${DIR}"/emcc_c/{index.html,index.js,sumInt.js,sumInt.wasm} "${DIR}"/docs/emcc/ && \
rm -f "${DIR}"/docs/rust/*.* && cp "${DIR}"/rust_www/dist/* "${DIR}"/docs/rust/

printf " done\n"