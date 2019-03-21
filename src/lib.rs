extern crate cfg_if;
extern crate wasm_bindgen;

use cfg_if::cfg_if;
use wasm_bindgen::prelude::*;

cfg_if! {
    if #[cfg(feature = "wee_alloc")] {
        extern crate wee_alloc;
        #[global_allocator]
        static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
    }
}

#[wasm_bindgen]
pub fn sum_array_in_rust(array: &[i32]) -> i32 {
    array.iter().sum()
}

#[wasm_bindgen]
pub fn inline_sum_array_in_rust(iter: usize, array: &[i32]) -> i32 {
    let mut sum: i32 = 0;
    for _ in 0..iter {
        sum += sum_array_in_rust(array);
    }
    sum
}