import { sumPriceArticle } from "@/app/(public)/utils/pricesFormat";
import { OrderItem } from "@/components/pages/dashboard/customer/hooks/useOrdersCustomer";
import useProducts, {
  Product,
} from "@/components/pages/dashboard/customer/hooks/useProducts";
import PromotionBadge from "@/components/shared/badge/PromotionBadge";
import ProductImageItem from "@/components/shared/productImage/ProductImageItem";
import { TableCell, TableRow } from "@/components/ui/table";
import React, { useEffect, useState } from "react";

interface OrderItemRowProps {
  item: OrderItem;
}
const OrderItemRow: React.FC<OrderItemRowProps> = ({ item }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const { getProductById } = useProducts(item.product_id);
  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const data = await getProductById();
        if (data) {
          setProduct(data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
      }
    };
    fetchOrderItems();
  }, [item, getProductById]);

  return (
    <TableRow>
      <TableCell>
        {product && (
          <ProductImageItem
            productId={product.id}
            name={product?.name}
            path={product.images.find((image) => image.is_main)?.url || ""}
          />
        )}
      </TableCell>
      <TableCell>
        {product?.name} - {item.variant}{" "}
      </TableCell>
      <TableCell className="whitespace-nowrap">
        {sumPriceArticle(item.article_number, item.price_before_discount)}
      </TableCell>
      <TableCell className="whitespace-nowrap">
        {item.discount_percentage && (
          <PromotionBadge discountPercentage={item.discount_percentage} />
        )}
      </TableCell>
    </TableRow>
  );
};

export default OrderItemRow;
