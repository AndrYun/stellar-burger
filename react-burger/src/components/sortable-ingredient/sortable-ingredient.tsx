import { useRef, forwardRef, FC, RefObject } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './sortable-ingredient.module.css';

interface IIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

interface ISortableIngredient {
  ingredient: IIngredient;
  index: number;
  id: number;
  moveIngredient: (dragIndex: number, hoverIndex: number) => void;
  handleClose: () => void;
}

const SortableIngredient: FC<ISortableIngredient> = forwardRef(
  ({ ingredient, index, id, moveIngredient, handleClose }, ref) => {
    const elementRef = useRef<HTMLDivElement | null>(null);

    const [{ handlerId }, drop] = useDrop({
      accept: 'sortIngredient',
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
        };
      },
      hover(item: any, monitor) {
        if (!elementRef.current) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;

        if (dragIndex === hoverIndex) {
          return;
        }

        const hoverBoundingRect = elementRef.current?.getBoundingClientRect();
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        if (!clientOffset) return;
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }

        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }

        moveIngredient(dragIndex, hoverIndex);
        item.index = hoverIndex;
      },
    });

    const [{ isDragging }, drag] = useDrag({
      type: 'sortIngredient',
      item: () => {
        return { id, index };
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    drag(drop(elementRef));

    return (
      <div
        ref={(ref as RefObject<HTMLDivElement>) || elementRef}
        style={{ opacity: isDragging ? 0 : 1 }}
        className={styles.sortable_ingredient}
        data-handler-id={handlerId}
      >
        <DragIcon type="primary" />
        <ConstructorElement
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image_mobile}
          handleClose={handleClose}
        />
      </div>
    );
  }
);

export default SortableIngredient;
