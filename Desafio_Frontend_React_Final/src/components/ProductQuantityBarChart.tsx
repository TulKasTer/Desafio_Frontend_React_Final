import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface Product {
  id: number;
  Nombre: string;
  Cantidad: number;
}

const ProductQuantityBarChart = () => {
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((res) => {
        const formatted = res.data.map((prod: any) => ({
          id: prod.id,
          Nombre: prod.Nombre,
          Cantidad: prod.Cantidad,
        }));
        setData(formatted);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <div style={{ width: "100%", height: 400, marginTop: "2rem" }}>
        <h2 className="text-xl font-bold mb-2">Cantidad de cada Producto</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Nombre" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Cantidad" fill="#1E3E62" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default ProductQuantityBarChart;
