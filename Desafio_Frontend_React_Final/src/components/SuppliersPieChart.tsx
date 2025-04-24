import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from "recharts";

interface ProviderData {
  name: string;
  value: number;
}

const COLORS = ["#102E50", "#F5C45E", "#E78B48", "#BE3D2A", "#88304E", "#F7374F", "#FE7743"];

const ProviderPieChart = () => {
  const [data, setData] = useState<ProviderData[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/products")
      .then((res) => {
        const products = res.data;

        // Agrupar por proveedor
        const grouped: { [key: string]: number } = products.reduce((acc: { [key: string]: number }, prod: any) => {
          const proveedor = prod.proveedor?.Nombre || "Sin proveedor";
          acc[proveedor] = (acc[proveedor] || 0) + 1;
          return acc;
        }, {});

        const formatted: ProviderData[] = Object.entries(grouped).map(([name, value]) => ({
          name,
          value,
        }));

        setData(formatted);
      })
      .catch(console.error);
  }, []);

  return (
    <div style={{ width: "100%", height: 400, marginTop: "2rem" }}>
      <h1 className="text-xl font-bold text-center mb-2">Proveedores</h1>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            fill="#8884d8"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProviderPieChart;
