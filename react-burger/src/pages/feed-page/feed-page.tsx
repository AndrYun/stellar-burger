import { FC, useEffect } from 'react';
import styles from './feed-page.module.css';
import {
  useTypedDispatch,
  useTypedSelector,
} from '../../components/utils/hooks';
import {
  feedConnect,
  feedDisconnect,
} from '../../services/web-socket/actions/feed';
import { wsURL } from '../../components/utils/url';
import OrderList from '../../components/order-list/order-list';
import { OrderSummary } from '../../components/order-list/order-summary/order-summary';

export const Feed: FC = () => {
  const dispatch = useTypedDispatch();
  const { orderFeed } = useTypedSelector((state) => state.feedSocket);

  useEffect(() => {
    dispatch(feedConnect(`${wsURL}/all`));
    return () => {
      dispatch(feedDisconnect('Closed by user'));
    };
  }, []);
  return (
    <section className={styles.feed__wrapp}>
      <p className="text text_type_main-large mb-5">Лента заказов</p>
      <div className={styles.feed__wrapp_main}>
        {orderFeed && (
          <>
            <OrderList />
            <OrderSummary />
          </>
        )}
      </div>
    </section>
  );
};
