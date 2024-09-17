import { Request, Response, NextFunction } from "express";
import * as productService from "../../services/product/productService.js";
import { ProductDTO, productSchema } from "../../dto/product/product.dto.js";

// Récupérer tous les produits
export const getAllProductsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extraction des paramètres de la requête (req.query)
    const filters = {
      name: req.query.name as string | undefined,
      category_ids: req.query.category_ids
        ? (req.query.category_ids as string).split(",").map(Number)
        : undefined,
      tag_ids: req.query.tag_ids
        ? (req.query.tag_ids as string).split(",").map(Number)
        : undefined,
      min_price: req.query.min_price ? Number(req.query.min_price) : undefined,
      max_price: req.query.max_price ? Number(req.query.max_price) : undefined,
      on_promotion: req.query.on_promotion === "true" ? true : undefined,
      is_new: req.query.is_new === "true" ? true : undefined,
      collection_ids: req.query.collection_ids
        ? (req.query.collection_ids as string).split(",").map(Number)
        : undefined,
    };

    // Appel du service avec les filtres extraits
    const products = await productService.getAllProductsService(filters);

    res.json(products);
  } catch (error) {
    next(error);
  }
};
// Récupérer un produit
export const getProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = parseInt(req.params.productId);
    const product = await productService.getProductService(productId);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

// ADMIN - Créer un nouveau produit
export const createProductController = async (
  req: Request<any, any, ProductDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const productData = productSchema.parse(req.body);
    const newProduct = await productService.createProductService(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// ADMIN - Mettre à jour un produit
export const updateProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = parseInt(req.params.productId);
    const productData = productSchema.parse(req.body);
    await productService.updateProductService(productId, productData);
    res.status(204).json();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// ADMIN - Supprimer un produit
export const deleteProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = parseInt(req.params.productId);
    await productService.deleteProductService(productId);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
