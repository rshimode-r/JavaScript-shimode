## 予想

Float64Array()の方が、Array()よりも速いと予想。  
Unit8Array()とArray()なら4倍ほどUnit8Array()が速いと予想。（教科書p305を参考）

## 試した結果

### `const [N, K, M] = [100, 200, 300];`の場合(Float64Array)

```
arrayMultiply: 980.8886980000002
typedArrayMultiply: 1016.431646
```

### `const [N, K, M] = [1000, 200, 300];`の場合(Float64Array)

```
arrayMultiply: 9615.962760999999
typedArrayMultiply: 10731.094805
```

### `const [N, K, M] = [100, 200, 300];`の場合(Unit8Array)

```
arrayMultiply: 1004.353431
typedArrayMultiply: 1123.196356
```
