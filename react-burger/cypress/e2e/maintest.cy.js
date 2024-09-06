const url = 'http://localhost:3000';

describe('main test scenario', () => {
  // сначала пишим мокки
  beforeEach(() => {
    // мокакаем авторизвацию и заказ
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'postOrder'
    );
    cy.intercept('GET', 'api/ingridients', { fixture: 'ingredients.json' });

    // мокаем токены
    window.localStorage.setItem(
      'accessToken',
      JSON.stringify('accessTestToken')
    );
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('refreshTestToken')
    );

    // заходим на первоначальныую страницу
    cy.visit(url);
  });

  // сценарий создания заказа
  it('should create order using react dnd', () => {
    // перемещаем булку в конструктор
    cy.get('[data-testid="bun"]').first().trigger('dragstart');
    cy.get('[data-testid="dropzone-top"]').trigger('drop');

    // перемещаем ингредиенты
    cy.get('[data-testid="ingredient"]').first().trigger('dragstart');
    cy.get('[data-testid="dropzone-middle"]').trigger('drop');

    cy.get('[data-testid="ingredient"]').eq(1).trigger('dragstart');
    cy.get('[data-testid="dropzone-middle"]').trigger('drop');

    // Проверяем, что ингредиенты переместились в конструктор
    cy.get('[data-testid="constructor-element"]').should('have.length', 4); // 2 булка + 2 ингредиента
  });
  // проверка модального окна
  it('should check modal', () => {
    // Открываем модальное окно при нажатии на ингредиент
    cy.get('[data-testid="ingredient"]').first().click();

    // Проверяем, что модальное окно открылось и содержит данные ингредиента
    cy.get('[data-testid="modal-overlay"]').should('exist');

    // Закрываем модальное окно
    cy.get('[data-testid="modal-close"]').click();

    // Проверяем, что модальное окно закрылось
    cy.get('[data-testid="modal-overlay"]').should('not.exist');
  });
  // отправка заказа и получение номера заказа
  it('should send order', () => {
    cy.get('[data-testid="bun"]').first().trigger('dragstart');
    cy.get('[data-testid="dropzone-top"]').trigger('drop');
    cy.get('[data-testid="ingredient"]').first().trigger('dragstart');
    cy.get('[data-testid="dropzone-middle"]').trigger('drop');

    // Нажимаем кнопку оформления заказа
    cy.get('button').contains('Оформить заказ').click();

    // Проверяем, что был сделан запрос на отправку заказа
    cy.wait('@postOrder');

    // Проверяем, что открывается модальное окно с номером заказа
    cy.get('[data-testid="modal-overlay"]').should('exist');
    cy.get('[data-testid="order-number"]').should('contain.text', '123'); // номер из fixture -> order
  });
});
