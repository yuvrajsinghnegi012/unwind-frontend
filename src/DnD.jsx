import React from 'react';
import UploadImageCard from "./components/UploadImageCard";

// Temporary
import img1 from "../assets/Listing1/1.jpg";
import img2 from "../assets/Listing1/2.jpg";
import img3 from "../assets/Listing1/3.jpeg";
import img4 from "../assets/Listing1/4.jpg";
import img5 from "../assets/Listing1/5.jpg";

export const properties = [
  {
    _id: 1,
    img: img1,
  },
  {
    _id: 2,
    img: img2,
  },
  {
    _id: 3,
    img: img3,
  },
  {
    _id: 4,
    img: img4,
  },
  {
    _id: 5,
    img: img5,
  },
]

const Card = ({ src, title, id, index, moveImage }) => {
  const ref = React.useRef(null);
  const [, drop] = useDrop({
    accept: "image",
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveImage(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: "image",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging()
      };
    }
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <div ref={ref} style={{ opacity }} className="w-40 h-24">
      <img src={src} alt={title} />
    </div>
  );
};
const DnD = () => {
  const [images, setImages] = React.useState(properties);

  const moveImage = React.useCallback((dragIndex, hoverIndex) => {
    setImages((prevCards) => {
      const clonedCards = [...prevCards];
      const removedItem = clonedCards.splice(dragIndex, 1)[0];
      clonedCards.splice(hoverIndex, 0, removedItem);
      return clonedCards;
    });
  }, []);

  return (
    <main>
      {
        images.map((image, index) => (
          <UploadImageCard
            src={image.img}
            title={"2432"}
            id={image.id}
            index={index}
            moveImage={moveImage}
          />
        ))
      }
    </main>
  );
}

export default DnD;