import React, { useState } from "react";
import GridItem from "../grid-item/GridItem";
import Button from "../button/Button";
import Life from "../life/Life";
import { Words, Word } from "../../types";

const MAX_WORDS = 4;
let selectedWords: Word[] = [];

const initialWords: Words = [
  {
    id: 1,
    word: "Walk",
    group: 1,
  },
  {
    id: 2,
    word: "Step",
    group: 1,
  },
  {
    id: 3,
    word: "Stride",
    group: 1,
  },
  {
    id: 4,
    word: "Tread",
    group: 1,
  },
  {
    id: 5,
    word: "Birth",
    group: 2,
  },
  {
    id: 6,
    word: "Creation",
    group: 2,
  },
  {
    id: 7,
    word: "Dawn",
    group: 2,
  },
  {
    id: 8,
    word: "Start",
    group: 2,
  },
  {
    id: 9,
    word: "Earth",
    group: 3,
  },
  {
    id: 10,
    word: "Groundhog",
    group: 3,
  },
  {
    id: 11,
    word: "Labor",
    group: 3,
  },
  {
    id: 12,
    word: "May",
    group: 3,
  },
  {
    id: 13,
    word: "August",
    group: 4,
  },
  {
    id: 14,
    word: "Grand",
    group: 4,
  },
  {
    id: 15,
    word: "Noble",
    group: 4,
  },
  {
    id: 16,
    word: "Regal",
    group: 4,
  },
];

const Grid = () => {
  const [words, setWords] = useState(initialWords);
  const [gridItemKey, setGridItemKey] = useState(0);
  const [lives, setLives] = useState(4);

  // Shuffles the words array
  const shuffleWords = () => {
    let shuffledWords = [...words];
    for (let i = shuffledWords.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledWords[i], shuffledWords[j]] = [
        shuffledWords[j],
        shuffledWords[i],
      ];
    }
    setWords(shuffledWords);
  };

  // Selects a grid item and returns true if it was selected, false if it was deselected
  const selectGridItem = (id: number): boolean => {
    const alreadySelected = selectedWords.find((word) => word.id === id);
    if (alreadySelected) {
      selectedWords = selectedWords.filter((item) => item.id !== id);
      return false;
    }

    const found = words.find((word) => word.id === id);
    if (selectedWords.length < MAX_WORDS && found) {
      selectedWords.push(found);
      return true;
    }

    return false;
  };

  const deselectWords = () => {
    selectedWords = [];
    setGridItemKey((prevKey) => prevKey + 1);
  };

  const submitWords = () => {
    if (selectedWords.length !== MAX_WORDS) {
      return false;
    }

    const firstGroup = selectedWords[0].group;
    const isSameGroup = selectedWords.every(
      (word) => word.group === firstGroup
    );

    if (isSameGroup) {
      // correct();
    } else {
      setLives(lives - 1);
    }
  };

  return (
    <>
      <div className="grid-wrapper">
        {words.map((word) => (
          <GridItem
            word={word.word}
            id={word.id}
            key={`${word.id}-${gridItemKey}`}
            group={word.group}
            selectGridItem={selectGridItem}
          />
        ))}
      </div>

      <div className="lives-wrapper">
        Mistakes remaining:
        {Array.from({ length: lives }, (_, index) => (
          <Life key={index} />
        ))}
      </div>

      <div className="button-wrapper">
        <Button onClick={shuffleWords} text="Shuffle" />
        <Button onClick={deselectWords} text="Deselect All" />
        <Button onClick={submitWords} text="Submit" />
      </div>
    </>
  );
};

export default Grid;
