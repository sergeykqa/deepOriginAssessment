import { Product } from './../support/interfaces';

describe('Verify a single product', () => {
    it('should have the correct product structure', () => {
        cy.request('GET', '/products/1').then((response) => {
            // @ts-ignore
            cy.verifyResponseStatus(response)
            const product: Product = response.body;
            expect(response.body).to.have.all.keys(
                'id', 'title', 'description', 'price', 'discountPercentage',
                'rating', 'stock', 'brand', 'category', 'thumbnail', 'images'
                );
            expect(product.id).to.be.a('number').and.to.eq(1);
            expect(product.title).to.be.a('string');
            expect(product.description).to.be.a('string');
            expect(product.price).to.be.a('number');
            expect(product.discountPercentage).to.be.a('number');
            expect(product.rating).to.be.a('number');
            expect(product.stock).to.be.a('number');
            expect(product.brand).to.be.a('string');
            expect(product.category).to.be.a('string');
            expect(product.thumbnail).to.be.a('string');
            expect(product.images).to.be.a('array');
        });
    });

    it('verify error message for unexisting product', () => {
        cy.request({method: 'GET', url: '/products/1000', failOnStatusCode: false}).then((response) => {
            // @ts-ignore
            cy.verifyResponseStatus(response, 404)
            expect(response.body.message).to.eq("Product with id '1000' not found")
        });
    });
});