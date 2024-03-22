import { Product } from './../support/interfaces';

const newProduct: Product = {
    "title": "Crystal chandelier maria theresa for 12 light",
    "description": "Fancy Samsung phone",
    "price": 47,
    "discountPercentage": 0.99,
    "rating": 4.99,
    "stock": 133,
    "brand": "Samsung",
    "category": "smartphones" 
}

let newProductID: number;

describe('Create - Read - Update - Delete', () => {
    it('Create a new product', () => {
        cy.request('POST', '/products/add', newProduct).then((response) => {
            // @ts-ignore
            cy.verifyResponseStatus(response);
            expect(response.body.title).to.eq(newProduct.title);
            expect(response.body.price).to.eq(newProduct.price);
            newProductID = response.body.id - 1 // Since no actual record created on the server, I mimic the ID number to the latest existed
        })
    })

    it('Read created product', () => {
        cy.request('GET', `/products/${newProductID}`).then((response) => {
            // @ts-ignore
            cy.verifyResponseStatus(response);
            expect(response.body.title, 'Created product title').to.eq(newProduct.title);
            expect(response.body.price, 'Created product price').to.eq(newProduct.price);
            expect(response.body.stock, 'Created product stock').to.eq(newProduct.stock);
        })
    })

    it('Update created product', () => {
        newProduct.price = 500
        newProduct.stock = 5000
        cy.request('PUT', `/products/${newProductID}`, newProduct).then((response) => {
            // @ts-ignore
            cy.verifyResponseStatus(response);
            expect(response.body.price, 'Updated price').to.eq(newProduct.price);
            expect(response.body.stock, 'Updated stock').to.eq(newProduct.stock);
        })
    })

    it('Delete created product', () => {
        cy.request('DELETE', `/products/${newProductID}`).then((response) => {
            // @ts-ignore
            cy.verifyResponseStatus(response);
            expect(response.body.isDeleted).to.be.true
        })
    })
})