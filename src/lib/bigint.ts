(BigInt.prototype as any).toJSON = function transformBigInt() {
  return this.toString()
}
