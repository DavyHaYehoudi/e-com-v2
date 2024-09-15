import { CreateProductDTO } from "../../dto/product/product.dto";
import * as productService from "../../repositories/product/productRepository.js";

// Récupérer tous les produits
export const getAllProductsService = async () => {
  return await productService.getAllProductsRepository();
};
// Récupérer un produit
export const getProductService = async (productId: number) => {
  return await productService.getProductRepository(productId);
};

// Créer un nouveau produit
export const createProductService = async (productData: CreateProductDTO) => {
  const newProduct = await productService.createProductRepository(productData);
  return newProduct;
};
// Mettre à jour un produit
export const updateProductService = async (
  productId: number,
  updatedFields: Record<string, any>
) => {
  await productService.updateProductRepository(productId, updatedFields);
};

// Supprimer un produit
export const deleteProductService = async (productId: number) => {
  await productService.deleteProductRepository(productId);
};
