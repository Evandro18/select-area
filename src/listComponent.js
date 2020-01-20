import React from "react";
import Item from "./item";
const week = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"];

export default function ListComponent() {
  return (
    <div className="container">
      {week.map((item, i) => (
        <Item value={item} key={i} />
      ))}
    </div>
  );
}
