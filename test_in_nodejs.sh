#!/bin/bash

set -e
DIR="$(pwd)"

printf "emcc\n"
cd "${DIR}"/emcc_c && node sumIntInNodeJs.js
printf "\n"
printf "rust\n"
cd "${DIR}"/nodejs && node index.js
