type StockAwareProduct = {
  stock?: number;
  reserved?: number;
  stockStatus?: string;
};

export function isOutOfStock(product: StockAwareProduct) {
  if (product.stockStatus) return product.stockStatus === "out_of_stock";
  if (typeof product.stock !== "number") return false;
  return product.stock - (product.reserved || 0) <= 0;
}
