import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { openModal } from '../services/slices/modal-slice';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const openModalHandler = useCallback(
    (contentId, contentType) => {
      dispatch(openModal({ contentId, contentType }));
      navigate(`/ingredient/${contentId}`, {
        state: { background: location },
      });
    },
    [dispatch, location, navigate]
  );

  const openModalWithContent = (ingredient) =>
    openModalHandler(ingredient._id, 'ingredient');

  return (
    <DndProvider backend={HTML5Backend}>
      <BurgerIngredients openModal={openModalWithContent} />
      <BurgerConstructor openModal={() => openModalHandler(null, 'order')} />
    </DndProvider>
  );
};

export default HomePage;
