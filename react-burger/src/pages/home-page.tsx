import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FC, useCallback } from 'react';
import { useTypedDispatch } from '../components/utils/hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { openModal } from '../services/slices/modal/modal-slice';
import { IIngredient } from '../components/utils/types';

const HomePage: FC = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const openModalHandler = useCallback(
    (contentId: string | null, contentType: string | null): void => {
      dispatch(openModal({ contentId, contentType }));
      navigate(`/ingredient/${contentId}`, {
        state: { background: location },
      });
    },
    [dispatch, location, navigate]
  );

  const openModalWithContent = (ingredient: IIngredient): void => {
    openModalHandler(ingredient._id, 'ingredient');
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <BurgerIngredients openModal={openModalWithContent} />
      <BurgerConstructor openModal={() => openModalHandler(null, 'order')} />
    </DndProvider>
  );
};

export default HomePage;
