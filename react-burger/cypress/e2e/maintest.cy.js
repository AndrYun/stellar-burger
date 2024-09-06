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

  // создадим константы
  const bun = `[data-testid="bun"]`;
  const ingredient = `[data-testid="ingredient"]`;
  const dropZoneTop = `[data-testid="dropzone-top"]`;
  const dropZoneMiddle = `[data-testid="dropzone-middle"]`;
  const modal = `[data-testid="modal-overlay"]`;

  // сценарий создания заказа
  it('should create order using react dnd', () => {
    // перемещаем булку в конструктор
    cy.get(bun).first().trigger('dragstart').as('bun');
    cy.get(dropZoneTop).trigger('drop').as('dropTop');

    // перемещаем ингредиенты
    cy.get(ingredient).first().trigger('dragstart').as('ingredient');
    cy.get(dropZoneMiddle).trigger('drop').as('dropMiddle');

    cy.get('@ingredient').eq(1).trigger('dragstart');
    cy.get('@dropMiddle').trigger('drop');
  });
  // проверка модального окна
  it('should check modal', () => {
    // Открываем модальное окно при нажатии на ингредиент
    cy.get('@ingredient').first().click();

    // Проверяем, что модальное окно открылось и содержит данные ингредиента
    cy.get(modal).should('exist').as('modal');

    // Закрываем модальное окно
    cy.get('[data-testid="modal-close"]').click();

    // Проверяем, что модальное окно закрылось
    cy.get('@modal').should('not.exist');
  });
  // отправка заказа и получение номера заказа
  it('should send order', () => {
    cy.get('@bun').first().trigger('dragstart');
    cy.get('@dropTop').trigger('drop');
    cy.get('@ingredient').first().trigger('dragstart');
    cy.get('@dropMiddle').trigger('drop');

    // Нажимаем кнопку оформления заказа
    cy.get('button').contains('Оформить заказ').click();

    // Проверяем, что был сделан запрос на отправку заказа
    cy.wait('@postOrder');

    // Проверяем, что открывается модальное окно с номером заказа
    cy.get('@modal').should('exist');
    cy.get('[data-testid="order-number"]').should('contain.text', '123'); // номер из fixture -> order
  });
});
