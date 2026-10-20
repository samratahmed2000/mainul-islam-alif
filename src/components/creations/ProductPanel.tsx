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
        বিক্রয় তথ্য
      </h2>
      <p className="product-panel-price">
        {new Intl.NumberFormat("bn-BD").format(product.price)} {product.currency}
      </p>
      {product.license && (
        <p className="product-panel-license">{product.license}</p>
      )}
      <p className="product-panel-notice">
        অনলাইন অর্ডার ও ডাউনলোড সুবিধা এখনো চালু হয়নি।
      </p>
    </section>
  );
}
