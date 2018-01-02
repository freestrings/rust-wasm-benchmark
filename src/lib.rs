use std::ffi::CString;
use std::os::raw::c_char;

#[no_mangle]
pub fn sum_in_rust(num: i32) -> i32 {
    let mut sum = 0;
    for i in 0..num {
        sum += i;
    }
    sum
}

fn inline_sum(iter: i32, num: i32) -> u64 {
    let mut sum: u64 = 0;
    for _ in 0..iter {
        sum += sum_in_rust(num) as u64;
    }
    sum
}

#[no_mangle]
pub fn inline_sum_str_in_rust(iter: i32, num: i32) -> *mut c_char {
    let s = format!("{}", inline_sum(iter, num));
    let s = CString::new(s).unwrap();
    s.into_raw()
}

#[no_mangle]
pub fn dealloc_str(ptr: *mut c_char) {
    unsafe {
        let _ = CString::from_raw(ptr);
    }
}

#[cfg(test)]
mod tests {
    #[test]
    fn testa() {
        assert_eq!(49950000000, super::inline_sum(100000, 1000));
    }
}