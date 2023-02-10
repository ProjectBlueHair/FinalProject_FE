import { useEffect } from "react";
function useOutSideClick(ref, callback) {
  useEffect(() => {
    const handleClick = (event) => {
      const isSearchElement = event.target.dataset.name === "searchElement";
      console.log("event target ..", event.target.dataset.name);
      if (ref.current) {
        if (!ref.current.contains(event.target) && !isSearchElement) {
          callback?.();
        }
      }
    };

    window.addEventListener("mousedown", handleClick);

    return () => window.removeEventListener("mousedown", handleClick);
  }, [ref, callback]);
}

export default useOutSideClick;
