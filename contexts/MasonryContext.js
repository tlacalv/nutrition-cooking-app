import React, { useContext, useRef, useState, useEffect, createRef } from "react";

const MasonryContext = React.createContext();

export function useMasonry() {
  return useContext(MasonryContext);
}

function resizeGridItem(item) {
  let currentItem = item.current;
  let rowHeight = 20;
  let rowGap = 10;
  let rowSpan = Math.ceil(
    (currentItem.getBoundingClientRect().height + rowGap) /
      (rowHeight + rowGap)
  );
  currentItem.parentElement.style.gridRowEnd = "span " + rowSpan;
}
function resizeAllItems(items) {
  if (!items) {
    return;
  }
  for (let x = 0; x < items.length; x++) {
    resizeGridItem(items[x]);
  }
}
 //Initialize refsArray
 





export function Masonry({ children }) {
  const elRefs = useRef([]);
  const [arrLenght, setArrLenght] = useState(0);


  useEffect(() => {
    window.addEventListener("resize", () => resizeAllItems(elRefs.current));
    resizeAllItems(elRefs.current);
    return () => window.removeEventListener("resize", resizeAllItems);
  }, [elRefs.current]);

  if(elRefs.current.length !== arrLenght) {
    elRefs.current=Array(arrLenght).fill().map((_,i) => elRefs.current[i] || createRef())
  }
  const value = {
    elRefs,
    arrLenght,
    setArrLenght
  };
  console.log(elRefs)
  return <MasonryContext.Provider value={value}><div className="grid">{children} </div></MasonryContext.Provider>;
}
