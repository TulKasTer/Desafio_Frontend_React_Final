import api from ".";

import { Product } from "my-types";

// GET ALL PRODUCTS


export const getAllProducts = async () => {
  try {
    const res = await api.get(`/products`,{headers:{"Cache-Control": "no-cache"}});

    // const products: Product[] = res.data.payload;

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getProductsById = async (id: number) => {
  try {
    const res = await api.get(`/products/${id}`);
    const product: Product = res.data;

    return product;
  } catch (err) {
    console.log(err);
  }
};

export const getProductsByCategory = async (category: string) => {
  try {
    const res = await api.get(`/products?category=${category}`);
    const products: Product[] = res.data.payload;
    return products;
  } catch (err) {
    console.log(err);
  }
};

export const deleteProduct = async (id: number) => {
  try {
    const res = await api.delete(`/products/${id}`, {
      data: { id },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const createProduct = async (product: Omit<Product,"id">) => {
  try {
    const res = await api.post(`/products`, product);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateProduct = async (id: number, updateProduct: Partial<Product>) => {
  try {
    const res = await api.put(`/products/${id}`, updateProduct);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
