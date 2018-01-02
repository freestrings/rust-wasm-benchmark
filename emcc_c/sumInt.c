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