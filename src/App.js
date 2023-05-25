import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTransition, animated } from "react-spring";
import { addItem, removeItem, selectItems } from "./store/itemsSlice";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const App = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);

  const handleAdd = () => {
    const color = getRandomColor();
    dispatch(addItem(color));
  };

  const handleDelete = () => {
    dispatch(removeItem());
  };

  const transition = useTransition(items, {
    key: (item) => item.id,
    from: { opacity: 0, transform: "translateX(-100%)" },
    enter: { opacity: 1, transform: "translateX(0%)" },
    leave: { opacity: 0, transform: "translateX(100%)" },
  });

  return (
    <div>
      <div>
        <button onClick={handleAdd}>Add</button>
        <button onClick={handleDelete} disabled={items.length === 0}>
          Delete
        </button>
      </div>
      <div style={{ display: "flex", overflowX: "auto" }}>
        {transition((style, item) => (
          <animated.div
            key={item.id}
            style={{
              ...style,
              width: "20%",
              height: "100px",
              background: item.color,
              marginRight: "10px",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
