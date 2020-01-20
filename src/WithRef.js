import React, { useState } from "react";

export default function WithRef() {
  const [selectedItems, setItems] = useState();

  return { selectedItems, setItems };
}
