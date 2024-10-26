import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import { Product } from "@/app/types/ProductTypes";

interface ProductCardProps {
  product: Product;
}
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div
      className="flex flex-col items-center justify-between transform transition-transform duration-300 hover:scale-[1.005]"
      style={{
        width: "400px",
        height: "520px",
        boxShadow: "0 0 5px whitesmoke",
        borderRadius: "25px",
        padding: "2px",
        background: "var(--bg-1)",
        transition: "transform 0.3s ease-in-out",
      }}
    >
      <Header product={product} />
      <Body product={product} />
      <Footer product={product} />
    </div>
  );
};

export default ProductCard;
