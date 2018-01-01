set -e
DIR="$( pwd )"
echo "Current Directory: '$DIR'"

[ -e www/testa.wasm ] && rm www/testa.wasm
[ -e www/testa_orig.wasm ] && rm www/testa_orig.wasm

cargo +nightly build --release --target wasm32-unknown-unknown

cp "target/wasm32-unknown-unknown/release/test_rust_wasm.wasm" www/testa_orig.wasm

wasm-gc www/testa_orig.wasm www/testa.wasm