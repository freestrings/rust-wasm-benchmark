#!/bin/bash
set -e
DIR="$(pwd)"

if [ -d "${DIR}"/rust_www ]; then
    echo "location is ok"
else
    echo "프로젝트 루트에서 ./docker/run.sh"
    exit;
fi

docker run -it --rm \
    -v "${DIR}"/docker/nginx.conf:/etc/nginx/nginx.conf:ro \
    -v "${DIR}"/emcc_c:/etc/nginx/html/emcc:ro \
    -v "${DIR}"/rust_www/dist:/etc/nginx/html/rust:ro \
    --name wasm_benchmark_nginx \
    -p 8082:80 \
    nginx