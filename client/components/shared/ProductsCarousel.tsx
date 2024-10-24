import {
  Carousel as ShadcnCarousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "./productCard/ProductCard";
import { CarouselProps } from "@/app/types/CarouselTypes";

const ProductsCarousel: React.FC<CarouselProps> = ({ products }) => {
  return (
    <ShadcnCarousel className="relative overflow-hidden px-20">
      <CarouselPrevious className="absolute left-0 z-10">
        <span className="material-icons">arrow_back</span>
      </CarouselPrevious>

      <CarouselContent className="flex space-x-4">
        {products &&
          products.length > 0 &&
          products.map((product) => (
            <CarouselItem key={product.id} className="basis-1/4 p-4">
              <ProductCard product={product} />
            </CarouselItem>
          ))}
      </CarouselContent>

      <CarouselNext className="absolute right-0 z-10">
        <span className="material-icons">arrow_forward</span>
      </CarouselNext>
    </ShadcnCarousel>
  );
};

export default ProductsCarousel;
