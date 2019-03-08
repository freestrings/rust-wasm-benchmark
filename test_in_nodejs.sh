#!/bin/bash

set -e
DIR="$(pwd)"

cd "${DIR}"/emcc_c && node sumIntInNodeJs.js
cd "${DIR}"/www && node testaNodejs.js
