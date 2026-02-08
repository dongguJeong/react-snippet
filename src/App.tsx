import { useState } from "react";

import "./App.css";
import { useDebounce } from "./hook/useDebounce/useDebounce";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="검색어를 입력하세요"
      />
      <p>실제 검색어: {debouncedSearchTerm}</p>
    </div>
  );
}

export default App;
