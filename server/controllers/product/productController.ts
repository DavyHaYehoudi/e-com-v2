import { Request, Response, NextFunction } from "express";
import * as productService from "../../services/product/productService.js";
import {
  preprocessProductQueries,
  ProductDTO,
  productQueriesSchema,
  productSchema,
} from "./entities/dto/product.dto.js";

// Récupérer tous les produits
export const getAllProductsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const preprocessedFilters = preprocessProductQueries(req.query);
    const validatedFilters = productQueriesSchema.parse(preprocessedFilters);
    const products = await productService.getAllProductsService(
      validatedFilters
    );

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
