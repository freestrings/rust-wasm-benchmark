#[no_mangle]
pub fn sum_in_rust(num: i32) -> i32 {
    let mut sum = 0;
    for i in 0..num {
        sum += i;
    }
    sum
}

#[no_mangle]
pub fn inline_sum_in_rust(iter: i32, num: i32) -> i32 {
    let mut last_sum = 0;
    for _ in 0..iter {
        let mut sum = 0;
        for i in 0..num {
            sum += i;
        }
        last_sum = last_sum.max(sum);
    }
    last_sum
}
