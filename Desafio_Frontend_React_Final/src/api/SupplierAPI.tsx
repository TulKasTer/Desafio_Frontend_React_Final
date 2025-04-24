import api from ".";

import { Supplier } from "my-types";

// GET ALL suppliers


export const getAllSuppliers = async () => {
  try {
    const res = await api.get(`/suppliers`,{headers:{"Cache-Control": "no-cache"}});

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getSuppliersById = async (id: number) => {
  try {
    const res = await api.get(`/suppliers/${id}`);
    const supplier: Supplier = res.data;

    return supplier;
  } catch (err) {
    console.log(err);
  }
};

export const deleteSupplier = async (id: number) => {
  try {
    const res = await api.delete(`/suppliers/${id}`, {
      data: { id },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const createSupplier = async (supplier: Omit<Supplier,"id">) => {
  try {
    const res = await api.post(`/suppliers`, supplier);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateSupplier = async (id: number, updateSupplier: Partial<Supplier>) => {
  try {
    const res = await api.put(`/suppliers/${id}`, updateSupplier);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
