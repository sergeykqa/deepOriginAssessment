describe('Get All Products', () => {
    it('verify all products endpoint', () => {
      cy.request('GET', '/products')
        .then((response) => {
          // @ts-ignore
          cy.verifyResponseStatus(response);
          expect(response.body).to.have.property('products');
          expect(response.body.products.length).to.eq(response.body.limit)
        });
    });

    it('verify the total number of records', () => {
        cy.request('GET', '/products?limit=102')
          .then((response) => {
            // @ts-ignore
            cy.verifyResponseStatus(response);
            expect(response.body.products.length, 'Total records').to.eq(response.body.total)
          });
      });
  });