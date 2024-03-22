describe('Get Categories and Products of Category', () => {
    const listOfCategories = [
        "smartphones",
        "laptops",
        "fragrances",
        "skincare",
        "groceries",
        "home-decoration",
        "furniture",
        "tops",
        "womens-dresses",
        "womens-shoes",
        "mens-shirts",
        "mens-shoes",
        "mens-watches",
        "womens-watches",
        "womens-bags",
        "womens-jewellery",
        "sunglasses",
        "automotive",
        "motorcycle",
        "lighting"
    ]

    it('verify all products categories endpoint', () => {
      cy.request('GET', '/products/categories')
        .then((response) => {
          // @ts-ignore
          cy.verifyResponseStatus(response)
          expect(response.body.sort()).to.deep.eq(listOfCategories.sort())
        });
    });

    it('verify all products of a category', () => {
        const randomIndex = Math.floor(Math.random() * listOfCategories.length);
        const randomCategory = listOfCategories[randomIndex];
        cy.request('GET', `/products/category/${randomCategory}`)
          .then((response) => {
          // @ts-ignore
          cy.verifyResponseStatus(response)
            const listOfProducts = response.body.products
            listOfProducts.forEach((product) => {
                expect(product.category).to.eq(randomCategory)
            })
        });
    });
  });