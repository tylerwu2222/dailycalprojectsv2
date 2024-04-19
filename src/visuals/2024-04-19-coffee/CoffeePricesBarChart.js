// import './App.css';
import React from "react";
import { coffeeData } from "./coffeeData";
import { BarChart, Brush, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from "recharts";
import './CoffeePricesBarChart.css'

const sortedData = coffeeData.info.sort(
  (a, b) => b.averagePrice - a.averagePrice
);

function CoffeeBarChart() {
  return (
    <div
      className="coffee-bar-chart-container"
    >

      <ResponsiveContainer height={1000}>
        <BarChart
          width={500}
          height={1000}
          data={sortedData}
          layout="vertical"
          margin={{
            top: 5,
            right: 30,
            left: 30,
            bottom: 25
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            domain={[0, 6]}
            label={{ value: "Average price in dollars", position: "insideBottom", offset: -10 }}
          />
          {/* fix y axis padding or shorten */}
          <YAxis
            dataKey="shopName"
            type="category"
            width={140}
            tick={{ fontSize: 10 }}
            label={{ value: "Coffee shop", position: "insideLeft", angle: -90, offset: -20 }} />
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          <Bar
            dataKey="averagePrice"
            name="Average price"
            fill="#a07fac"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CoffeeBarChart;