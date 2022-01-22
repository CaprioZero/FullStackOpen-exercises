//like test can be flaky sometimes
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'test',
      password: 'test123',
      name: 'root'
    }
    const user2 = {
      username: 'person',
      password: 'person123',
      name: 'user'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Username')
    cy.contains('Password')
    cy.contains('Login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('test123')
      cy.get('#login-button').click()

      cy.contains('root logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'root logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'test', password: 'test123' })
    })

    it('A blog can be created', function() {
      cy.contains('Create new blog').click()
      cy.get('#title').type('Ex 5.19')
      cy.get('#author').type('root')
      cy.get('#url').type('https://google.com')
      cy.get('button[id="blog-submit"]').click()
      cy.contains('Ex 5.19')
    })

    describe('and a blog already exists', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'like test', author: 'test', url: 'https://google.com' })
      })

      it('users can like a blog', function () {
        cy.contains('like test').contains('View').click()
        cy.get('button[id="like-button"]').click()
        cy.contains('Likes: 1')
      })

      it('users who create the blog can delete it', function () {
        cy.contains('like test').contains('View').click()
        cy.get('button[id="delete-button"]').click()

        cy.get('.success')
          .should('contain', 'Blog "like test" delete successfully')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid')

        cy.get('html').should('not.contain', 'like test')
      })

      describe('users who doesn\'t create the blog can\'t delete it', function () {
        beforeEach(function () {
          cy.get('button[id="logout-button"]').click()
          cy.login({ username: 'person', password: 'person123' })
        })

        it('check delete button doesn\'t exist', function () {
          cy.contains('like test').contains('View').click()
          cy.get('html').should('not.have.id', 'logout-button')
        })
      })
    })

    describe('and if multiple blog exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'like test', author: 'test', url: 'https://google.com' })
        cy.createBlog({ title: 'like test 2', author: 'test', url: 'https://youtube.com' })
        cy.createBlog({ title: 'like test 3', author: 'test', url: 'https://facebook.com' })

        cy.contains('like test').parent().parent().as('firstBlog')
        cy.contains('like test 2').parent().parent().as('secondBlog')
        cy.contains('like test 3').parent().parent().as('thirdBlog')
      })

      it('check blogs are ordered descendingly according to likes', function () {
        cy.get('@firstBlog').contains('View').click()
        cy.get('@secondBlog').contains('View').click()
        cy.get('@thirdBlog').contains('View').click()

        cy.get('@firstBlog').contains('Like').as('likeButton1')
        cy.get('@secondBlog').contains('Like').as('likeButton2')
        cy.get('@thirdBlog').contains('Like').as('likeButton3')

        cy.get('@likeButton3').click()
        cy.wait(500)
        cy.get('@likeButton2').click()
        cy.wait(500)
        cy.get('@likeButton3').click()
        cy.wait(500)

        cy.get('.blog').then(blogsMap => {
          cy.wrap(blogsMap[0]).contains('Likes: 2')
          cy.wrap(blogsMap[1]).contains('Likes: 1')
          cy.wrap(blogsMap[2]).contains('Likes: 0')
        })
      })
    })
  })
})