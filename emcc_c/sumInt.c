long long sumInt(int *array, int n) {
  long long s = 0;
  for (int i = 0; i < n; i++) {
    s += array[i];
  }
  return s;
}

long long inlineSumInt(int *array, int n, int iter) {
  long long s = 0;
  for (int i = 0 ; i < iter; i++) {
    s += sumInt(array, n);
  }
  return s;
}