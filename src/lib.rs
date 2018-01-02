use std::mem;
use std::ffi::CString;
use std::os::raw::{c_char, c_void};
use std::vec::Vec;
use std::slice;

fn str_to_raw(s: String) -> *mut c_char {
    let s = CString::new(s).unwrap();
    s.into_raw()
}

fn sum_array_in_rust(ptr: *mut c_void, len: usize) -> i64 {

    let array: &[u8] = unsafe {
        mem::transmute(slice::from_raw_parts(ptr, len))
    };

    let mut sum: i64 = 0;
    let len = array.len();
    let mut i = 0;
    while i < len {
        let mut v = (array[i + 3] & 0xff) as i32;
        v = v | ((array[i + 2] & 0xff) as i32) << 8;
        v = v | ((array[i + 1] & 0xff) as i32) << 16;
        v = v | ((array[i] & 0xff) as i32) << 24;
        i += 4;
        sum += v as i64;
    }
    sum
}

#[no_mangle]
pub fn inline_sum_array_in_rust_str(iter: i32, ptr: *mut c_void, len: usize) -> *mut c_char {
    let mut sum: i64 = 0;
    for _ in 0..iter {
        sum += sum_array_in_rust(ptr, len);
    }
    str_to_raw(format!("{}", sum))
}

#[no_mangle]
pub fn sum_array_in_rust_str(ptr: *mut c_void, len: usize) -> *mut c_char {
    str_to_raw(format!("{}", sum_array_in_rust(ptr, len)))
}

#[no_mangle]
pub fn alloc(size: usize) -> *mut c_void {
    let mut buf = Vec::with_capacity(size);
    let ptr = buf.as_mut_ptr();
    mem::forget(buf);
    return ptr as *mut c_void;
}

#[no_mangle]
pub fn dealloc_str(ptr: *mut c_char) {
    unsafe {
        let _ = CString::from_raw(ptr);
    }
}