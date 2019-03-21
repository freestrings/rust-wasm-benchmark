# rust-wasm-benchmark

1억개 int 난수 배열 합. 반복 10회.

* Webassembly vs Javascript 성능비교 (Webassembly가 월등하다고 해서)
* 빈번한 Webassembly 함수 호출은 성능저하가 있다고 해서 비교차 inline 코드를 넣어 봄

[demo: result as emscripten](https://freestrings.github.io/rust-wasm-benchmark/emcc)

[demo: result as wasm-pack](https://freestrings.github.io/rust-wasm-benchmark/rust)

## 왜?

To enjoy Rust!

## 테스트 코드

**C**
```c
int sumInt(int *array, int n) {
  int s = 0;
  for (int i = 0; i < n; i++) {
    s += array[i];
  }
  return s;
}

int inlineSumInt(int *array, int n, int iter) {
  int s = 0;
  for (int i = 0 ; i < iter; i++) {
    s += sumInt(array, n);
  }
  return s;
} 
```

**Rust**
```rust
pub fn sum_array_in_rust(array: &[i32]) -> i32 {
    array.iter().sum()
}

pub fn inline_sum_array_in_rust(iter: usize, array: &[i32]) -> i32 {
    let mut sum: i32 = 0;
    for _ in 0..iter {
        sum += sum_array_in_rust(array);
    }
    sum
}
```

**Javascript**
```javascript
function jsSumInt(array, n) {
    var s = 0;
    for (var i = 0; i < n; i++) {
        s += array[i];
    }
    return s;
}

function inlineJsSumInt(array, n, iter) {
    var s = 0;
    for (var i = 0; i < iter; i++) {
        s += jsSumInt(array, n);
    }
    return s;
}
```

## 사전설치

* Emscripten (https://free-strings.blogspot.kr/2017/04/rust-webassembly.html "Emscripten 설치" 참고)
* NodeJS
* Rust (Tested in nightly version)
* wasm-pack (https://github.com/rustwasm/wasm-pack)
* Docker

## 빌드

```bash
./build.sh
```

## 로컬 실행

```bash
./docker/run.sh
```

* http://localhost:8082/rust/
* http://localhost:8082/emcc/

## 테스트 환경

* NodeJS: 11.0
* Chrome: 72.0, Firefox: 65.0
* CPU: Intel Core i5-4460
* Memory: 16GB

### Chrome

```
##rust##
JS - sum, 698
JS - inlineSum, 7070
Ws - sum, 775
Ws - inlineSum, 5266

##emcc##
JS - sumInt, 706
JS - inlineSumInt, 6969
Ws - sumWs, 756
Ws - inlineSumWs, 753
```

### Firefox

```
##rust##
JS - sum, 782
JS - inlineSum, 7657
Ws - sum, 952
Ws - inlineSum, 7859

##emcc##
JS - sumInt, 982
JS - inlineSumInt, 9479
Ws - sumWs, 912
Ws - inlineSumWs, 942
```

> Webassembly이 Javascript 보다 빠르고 \
> 호출 빈도가 적은 Inline 형식이 빠르다. \
> 그리고 emcc로 컴파일된 Inline은 월등하게 빠르다.

## NodeJS

```bash
./test_in _nodejs.sh
```

```bash
emcc
JS - sum 704
JS - inlineSum 6990
Ws - sum 813
Ws - inlineSum 815
```

> Emscripten으로 컴파일된 코드는 역시 Inline 형식으로 작성된 Webassembly가 월등하게 빠르다.

```bash
rust
JS - sum 697
JS - inlineSum 6992
Ws - sum 818
Ws - inlineSum 5624
```

> Rust로 컴파일된 코드는 호출 빈도가 많을 수록 느리고, Inline 형식으로 작성된 코드는 약간 빠르다.