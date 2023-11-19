import React, { useState } from "react";
import { Words, Word } from "../../types";

type GridItemProps = Word & {
  selectGridItem: (id: number) => boolean;
};

const GridItem = ({ word, id, selectGridItem, group }: GridItemProps) => {
  const [isActive, toggleIsActive] = useState(false);

  const clickGridItem = () => {
    let isValid = selectGridItem(id);
    toggleIsActive(isValid);
  };

  const className = isActive ? "grid-item-content active" : "grid-item-content";

  return (
    <div className="grid-item">
      <div className={className} onClick={clickGridItem}>
        {word}
      </div>
    </div>
  );
};

export default GridItem;
