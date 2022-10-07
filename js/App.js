class Elements {
  menuBtn = this.$('.header__menu')
  nav = this.$('.nav')
  menuImg = this.$('.header__menu-img')
  body = this.$('body')
  drawer = this.$('.drawer')
  sections = this.$$('section')
  article = this.$('.latest-articles')

  $(selector) {
    return document.querySelector(selector)
  }

  $$(selectors) {
    return Array.from(document.querySelectorAll(selectors))
  }
}

class Events extends Elements {
  activeClass = 'nav--active'
  options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
  }

  onInitEvents() {
    this.toggleNavigation()
    this.onResize()
    this.animateSections()
  }

  isNavActive() {
    return this.nav.classList.contains(this.activeClass)
  }

  toggleNavigation() {
    this.menuBtn.onclick = () => {
      this.nav.classList.toggle(this.activeClass)
      this.body.classList.toggle('hidden')

      if (this.isNavActive()) {
        this.menuImg.src = 'images/icon-close.svg'
        return
      }

      this.menuImg.src = 'images/icon-hamburger.svg'
    }
  }

  onResize() {
    window.onresize = () => {
      if (this.isNavActive()) {
        this.nav.classList.remove(this.activeClass)
        this.menuImg.src = 'images/icon-hamburger.svg'
        this.body.classList.remove('hidden')
      }
    }
  }

  onIntersection(el) {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('fade-in')
      }
    }, this.options)

    observer.observe(el)
  }

  animateSections() {
    this.sections.forEach(section => {
      this.onIntersection(section)
    })
  }
}

export default class App extends Events {
  init() {
    this.onInitEvents()
  }
}
