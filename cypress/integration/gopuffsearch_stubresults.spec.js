/// <reference types="cypress" />

describe('Beth Surry Go Puff Search Test ', ()=> {

    beforeEach( ()=>{
        cy.server({matchbase: false})
        //set up routes
        cy.route({
            method: 'GET', 
            url: 'https://prodcat.gopuff.com/api/search?facet_limit=1&text=x&facet=class&location_id=6&device_id=web',  
            response: 'fixture:gopuff_oneresult.json'  
        }).as('oneResult')//stub so when you when search for x - return a result of 1 item, Philly location

        cy.route({
            method: 'GET', 
            url: 'https://prodcat.gopuff.com/api/search?facet_limit=1&text=x&facet=class&location_id=-1&device_id=web',  
            response: 'fixture:gopuff_oneresult.json'  
        }).as('oneResult')//stub so when you when search for x - return a result of 1 item, no delivery location

        cy.route({
            method: 'GET', 
            url: 'https://prodcat.gopuff.com/api/search?facet_limit=1&text=abc&facet=class&location_id=6&device_id=web',  
            response: 'fixture:gopuff_hostessresults.json'  
        }).as('hostessResults')//stub so when you when search for abc - return a result of 14 items, Philly location

        cy.route({
            method: 'GET', 
            url: 'https://prodcat.gopuff.com/api/search?facet_limit=1&text=abc&facet=class&location_id=-1&device_id=web',  
            response: 'fixture:gopuff_hostessresults.json'  
        }).as('hostessResults')//stub so when you when search for abc - return a result of 14 items, no delivery location

        cy.route({
            method: 'GET', 
            url: 'https://prodcat.gopuff.com/api/search?facet_limit=1&text=blank&facet=class&location_id=6&device_id=web',  
            response: []
        }).as('blankResult')//stub so when you when search for blank - return empty json, Philly location

        cy.route({
            method: 'GET', 
            url: 'https://prodcat.gopuff.com/api/search?facet_limit=1&text=blank&facet=class&location_id=-1&device_id=web',  
            response: []
        }).as('blankResult')//stub so when you when search for blank - return empty json, no delivery location

        //get to the search page
        cy.visit('/')
        cy.get('.c-moments__control > .c-control > .c-control__input').click()
        cy.get('#mapAddAdddress').click() 

    })

    it('should only display one result when only one in response', ()=>{
        cy.get('#product-search').type("x")
        cy.wait('@oneResult')
        cy.get('.hwaccel').should('be.visible')
        cy.get('#shop').children().should('have.length',1)
    })

    it('should display more results when more in response', ()=>{
        cy.get('#product-search').type("abc")
        cy.wait('@hostessResults')
        cy.get('.hwaccel').should('be.visible')
        cy.get('#shop').children().should('have.length',14)
    })

    it('should display badges for new items', ()=>{
        cy.get('#product-search').type("abc")
        cy.wait('@hostessResults')
        cy.get('.gp-product-tile__badges').should('have.length',3)
    })

    it('should display category filters for items at the top (when more than 2? items)', ()=>{
        cy.get('#product-search').type("abc")
        cy.wait('@hostessResults')
        cy.get(':nth-child(1) > .cat-bubble').should('contain.text','Hostess')
        cy.get(':nth-child(2) > .cat-bubble').should('contain.text','Pastry')
        cy.get(':nth-child(3) > .cat-bubble').should('contain.text','Bread')
    })

    it('should not display category filters for items at the top when 2? or less items', ()=>{
        cy.get('#product-search').type("x")
        cy.wait('@oneResult')
        cy.get(':nth-child(1) > .cat-bubble').should('not.be.visible')
    })

    it('should handle blank response', ()=>{
        cy.get('#product-search').type("blank")
        cy.wait('@blankResult')
        cy.get('.search_error').should('be.visible')
    })
    
})


