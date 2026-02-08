import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((prev) => prev + 1);
  };
  useEffect(() => {
    function addMouseEvent() {
      console.log(count);
    }

    window.addEventListener("click", addMouseEvent);

    return () => {
      console.log("클린업", count);
      window.removeEventListener("click", addMouseEvent);
    };
  }, [count]);
  return (
    <>
      <h1>{count}</h1>
      <button onClick={handleClick}>button</button>
    </>
  );
}

export default App;
