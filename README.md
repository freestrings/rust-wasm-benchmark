# rust-wasm-benchmark

1억개 int 난수 배열 합. 반복 10회.

* Webassembly vs Javascript 성능비교 (Webassembly가 월등하다고 해서)
* 빈번한 Webassembly 함수 호출은 성능저하가 있다고 해서 비교차 inline 코드를 넣어 봄
* Rust 코드가 복잡한건 초보라서

## www/testa.html (Rust + nightly -> WASM + wasm32-unknown-unknown)

* JS - sumInJavascript 1068
* JS - inlineSumInJavascript 1067
* Rust - sumInRust **2379**
* Rust - inlineSumInRust **5348**

> Webassembly가 JS 보다 더 느리다. inline(=묶어서 실행?)이 더 느리다.

### 사전설치

rust 설치 + nightly 툴체인 추가 + wasm32-unknown-unknown 타겟 추가

## www/testb.html (C -> WASM + emcc)

* JS - sumInt 1072
* JS - inlineSumInt 1071
* Ws - sumWs 1040
* Ws - inlineSumWs **109**

> Webassembly가 JS 보다 더 빠르다. inline(=묶어서 실행?)이 훨씬 빠르다

### 사전설치

Emscripten (https://free-strings.blogspot.kr/2017/04/rust-webassembly.html "Emscripten 설치" 참고)

## testc (Rust + stable -> WASM + wasm32-unknown-emscripten)

~~TODO~~
* cargo build --target wasm32-unknown-emscripten 컴파일 안됨
  * 링커도 실행 안됨. 참고: [.cargo/config](https://github.com/freestrings/testaris/blob/master/.cargo/config)
* rustc --target wasm32-unknown-emscripten로 컴파일은 되지만 별도 벤치마크 코드를 실행하기 위한 별도 코드가 필요함

## 빌드 & 실행

* ./build.sh 
* 웹서버 띄우고 
* 브라우저에서 testa.html, testb.html 접속