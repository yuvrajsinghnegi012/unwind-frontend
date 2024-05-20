import React from 'react';
import { useDrag, useDrop } from "react-dnd";
import { BiTrash } from "../constant";

const UploadImageCard = ({ img, photoId, index, moveImage, removePhotoHandler }) => {
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
            return { photoId, index };
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
        <div ref={ref} style={{ opacity }} className="relative w-72 h-40 overflow-hidden">
            <img src={URL.createObjectURL(img)} alt="place" className='w-full h-full object-contain' />
            <button className='absolute top-0 right-0 text-xl bg-white' type='button' onClick={() => removePhotoHandler(photoId)}>
                <BiTrash />
            </button>
        </div>
    );
};

export default UploadImageCard;