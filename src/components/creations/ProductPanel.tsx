import type { Product } from "@/types/creation";

interface ProductPanelProps {
  readonly product: Product;
}

export default function ProductPanel({ product }: ProductPanelProps) {
  if (!product.isForSale) {
    return null;
  }

  return (
    <section className="product-panel" aria-labelledby="product-panel-heading">
      <h2 id="product-panel-heading" className="product-panel-title">
        Purchase details
      </h2>
      <p className="product-panel-price">
        {new Intl.NumberFormat("en-US").format(product.price)} {product.currency}
      </p>
      {product.license && (
        <p className="product-panel-license">{product.license}</p>
      )}
      <p className="product-panel-notice">
        Online ordering and downloads are not available yet.
      </p>
    </section>
  );
}
