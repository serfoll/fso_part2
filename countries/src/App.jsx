/** @format */
import { useEffect, useState } from "react";

function App() {
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (!filter || filter === "") return;
    console.log("current filter: ", filter);
  }, [filter]);

  return (
    <div>
      <label htmlFor="countrie">find countries: </label>
      <input
        onChange={(e) => setFilter(e.target.value)}
        id="countrie"
        name="countrie"
        type="text"
        value={filter}
      />
    </div>
  );
}

export default App;
