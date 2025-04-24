import api from ".";

import { Category } from "my-types";

export const getAllCategories = async () => {
  try {
    const res = await api.get(`/categories`,{headers:{"Cache-Control": "no-cache"}});

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getCategoriesById = async (id: number) => {
  try {
    const res = await api.get(`/categories/${id}`);
    const category: Category = res.data;

    return category;
  } catch (err) {
    console.log(err);
  }
};

export const deleteCategories = async (id: number) => {
  try {
    const res = await api.delete(`/categories/${id}`, {
      data: { id },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const createCategories = async (category: Omit<Category,"id">) => {
  try {
    const res = await api.post(`/categories`, category);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateCategories = async (id: number, updateCategories: Partial<Category>) => {
  try {
    const res = await api.patch(`/categories/${id}`, updateCategories);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
