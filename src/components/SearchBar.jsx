import React, { useRef, useState, useContext } from "react";
import TaskList from "./TaskList";
import { TaskContext } from "../context/TaskContext";

function SearchBar() {
  const [query, setQuery] = useState("");
  const inputRef = useRef();

  function handleSearch(e) {
    setQuery(e.target.value);
  }


  return (
    <div>
      <input
      ref={inputRef}
        type="text"
        placeholder="Search tasks..."
        value={query}
        onChange={handleSearch}
      />
      <TaskList query={query}/>
    </div>
  );
}

export default SearchBar;
