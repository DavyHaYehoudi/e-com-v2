import { ProductDTO } from "../../controllers/product/entities/dto/product.dto";
import * as productService from "../../repositories/product/productRepository.js";

// Récupérer tous les produits
export const getAllProductsService = async (filters: {
  name?: string;
  category_ids?: number[];
  tag_ids?: number[];
  min_price?: number;
  max_price?: number;
  on_promotion?: boolean;
  is_new?: boolean;
  collection_ids?: number[];
}) => {
  return await productService.getAllProductsRepository(filters);
};
// Récupérer un produit
export const getProductService = async (productId: number) => {
  return await productService.getProductRepository(productId);
};

// Créer un nouveau produit
export const createProductService = async (productData: ProductDTO) => {
  const newProduct = await productService.createProductRepository(productData);
  return newProduct;
};
// Mettre à jour un produit
export const updateProductService = async (
  productId: number,
  updatedFields: ProductDTO
) => {
  await productService.updateProductRepository(productId, updatedFields);
};

// Supprimer un produit
export const deleteProductService = async (productId: number) => {
  await productService.deleteProductRepository(productId);
};
