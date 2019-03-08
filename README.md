# rust-wasm-benchmark

1억개 int 난수 배열 합. 반복 10회.

* Webassembly vs Javascript 성능비교 (Webassembly가 월등하다고 해서)
* 빈번한 Webassembly 함수 호출은 성능저하가 있다고 해서 비교차 inline 코드를 넣어 봄
* Rust 코드가 복잡한건 초보라서

## 테스트 환경

* NodeJS: 11.0
* Chrome: 70.0
* CPU: Intel Core i7-8700
* Memory: 32GB

## www/testa.html (Rust -> WASM + wasm-bindgen)

* JS - sumInJavascript 719
* JS - inlineSumInJavascript 721
* Rust - sumInRust **1292**
* Rust - inlineSumInRust **1293**

> Webassembly가 JS 보다 더 느리다. inline(=묶어서 실행?)이 더 느리다.

### 사전설치

rust 설치 + nightly 툴체인 추가 + wasm32-unknown-unknown 타겟 추가

## www/testb.html (C -> WASM + emcc)

* JS - sumInt 717
* JS - inlineSumInt 710
* Ws - sumWs 769
* Ws - inlineSumWs **78**

> Webassembly가 JS 보다 더 빠르다. inline(=묶어서 실행?)이 훨씬 빠르다

### 사전설치

Emscripten (https://free-strings.blogspot.kr/2017/04/rust-webassembly.html "Emscripten 설치" 참고)

## NodeJS

### Rust -> WASM
```bash
JS - sumInJavascript 714
JS - inlineSumInJavascript 712
Rust - sumInRust **827**
Rust - inlineSumInRust **575**
```

### C -> WASM
```bash
JS - sumInt 711
JS - inlineSumInt 710
Ws - sumWs 817
Ws - inlineSumWs **85**
```

## 빌드 & 실행

* ./build.sh
* cd www && python -m SimpleHTTPServer (브라우저에서 testa.html, testb.html 콘솔 결과 확인)
* ./test_in _nodejs.sh