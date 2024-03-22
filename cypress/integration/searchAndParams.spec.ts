describe('Search and Parameters', () => {
    context('Verify Search', () => {
        it('search should return correct results', () => {
            const searchFor = 'phone'
            cy.request('GET', `/products/search?q=${searchFor}`).then((response) => {
                // @ts-ignore
                cy.verifyResponseStatus(response)
                const listOfProducts = response.body.products
                console.log(listOfProducts)
                listOfProducts.forEach((product) => {
                const containsSearchFor = product.title.toLowerCase().includes(searchFor) || product.description.toLowerCase().includes(searchFor)
                expect(containsSearchFor).to.be.true
                })
            });
        });
    })

    context('Verify params', () => {
        it('limit param should properly limits the results', () => {
            cy.request('GET', '/products?limit=25').then((response) => {
                // @ts-ignore
                cy.verifyResponseStatus(response)
                expect(response.body.products.length).to.eq(response.body.limit)
            });
        });

        it('skip param should skips desired number of records', () => {
            const skip = 26
            cy.request('GET', `/products?skip=${skip}`).then((response) => {
                // @ts-ignore
                cy.verifyResponseStatus(response)
                expect(response.body.products[0].id).to.eq(skip + 1)
            });
        });

        it('select param should return only requested attributes and id', () => {
            cy.request('GET', '/products?select=title,price').then((response) => {
                // @ts-ignore
                cy.verifyResponseStatus(response)
                const listOfProducts = response.body.products
                listOfProducts.forEach((product) => {
                    expect(product).to.have.all.keys('id', 'title', 'price');
                    expect(Object.keys(product).length).to.equal(3);
                })
            });
        });
    })
});