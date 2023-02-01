import React, { useState } from "react";

const i = 10;
function Test() {
  const [count, setCount] = useState(0);
  return (
    <div>
      Test: *<label> count: ${count} </label>
      <button onClick={() => setCount((prev) => prev + 1)}>Inc</button>
      <button onClick={() => setCount((prev) => prev - 1)}>Dec</button>
      <label>{Date.now()}</label>
    </div>
  );
}

export default Test;
