import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = {
  Fixed: "#22c55e",
  Variable: "#3b82f6",
  Savings: "#f59e0b",
  Remaining: "#ef4444",
};

const DonutChart = ({ data }) => {
  const total = data.reduce((acc, item) => acc + item.value, 0);
  const remaining = data.find((item) => item.name === "Remaining")?.value || 0;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 1.3;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const value = data[index].value;

    if (value / total < 0.03) return null;

    return (
      <text
        x={x}
        y={y}
        fill={COLORS[data[index].name] || "#888"}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        style={{ fontSize: "12px", fontWeight: "500" }}
      >
        {`${data[index].name}: ₹${value.toLocaleString()}`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width={460} height={360}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={120}
          labelLine={false}
          label={renderCustomizedLabel}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[entry.name] || "#ccc"} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name) => [`₹${value.toLocaleString()}`, name]}
        />
        {/* Center label for remaining */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ fontSize: "18px", fontWeight: "600" }}
        >
          ₹{remaining.toLocaleString()}
        </text>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DonutChart;
