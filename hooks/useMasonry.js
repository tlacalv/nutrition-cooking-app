import { useRef, createRef } from "react";


export const onResize = (elRefs) => {
  window.addEventListener("resize", () => resizeAllItems(elRefs.current));
  resizeAllItems(elRefs.current);
  return () => window.removeEventListener("resize", resizeAllItems);
};
export const MasonryItem = ({children}) => {
  return (
    <div className="item">
      {children}
    </div>
  )
}
function resizeGridItem(item) {
  let currentItem = item.current;
  if(!currentItem) return;
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
export function useMasonry() {
  const elRefs = useRef([]);

  const setElRefs = (ite) => {
    if (elRefs.current.length !== ite) {
      elRefs.current = Array(ite)
        .fill()
        .map((_, i) => elRefs.current[i] || createRef());
    }
  };

  return { elRefs, setElRefs };
}
