import { useRef, forwardRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './sortable-ingredient.module.css';
import { ingredientType } from '../utils/types';

const SortableIngredient = forwardRef(
  ({ ingredient, index, id, moveIngredient, handleClose }, ref) => {
    const elementRef = useRef(null);

    const [{ handlerId }, drop] = useDrop({
      accept: 'sortIngredient',
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
        };
      },
      hover(item, monitor) {
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
        ref={ref || elementRef}
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

SortableIngredient.propTypes = {
  ingredient: ingredientType.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  moveIngredient: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default SortableIngredient;
