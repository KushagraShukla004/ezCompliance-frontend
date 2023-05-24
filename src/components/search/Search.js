import React from "react";
import styles from "./Search.module.scss";
import { BiSearch } from "react-icons/bi";

const Search = ({ value, onChange }) => {
  return (
    <div className={styles.search}>
      <BiSearch size={18} fill="black" className={styles.icon} />
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
