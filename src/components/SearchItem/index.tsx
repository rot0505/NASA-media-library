import React from "react";
import { Link } from "react-router-dom";
import styles from "./SearchItem.module.scss";
import { SearchResult } from "../../types";

interface SearchItemProps {
  item: SearchResult;
}

const SearchItem: React.FC<SearchItemProps> = ({ item }) => {
  return (
    <div className={styles.searchItem}>
      <Link to={`/show/${item.nasaId}`}>
        <img src={item.thumbnail} alt={item.title} />
        <div className={styles.info}>
          <h3>{item.title}</h3>
          <p><label>Location:</label> {item.location}</p>
          <p><label>Photographer:</label> {item.photographer}</p>
        </div>
      </Link>
    </div>
  );
};

export default SearchItem;
