document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Scroll suave para os links do menu
   */
  const scrolltoLinks = document.querySelectorAll('.scrollto');
  
  scrolltoLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      let targetId = this.getAttribute('href');
      let targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Remove 'active' de todos os links e adiciona no clicado
        document.querySelectorAll('.navbar .active').forEach(el => el.classList.remove('active'));
        this.classList.add('active');

        // Calcula a posição descontando a altura do header fixo
        let headerHeight = document.querySelector('#header').offsetHeight;
        let elementPosition = targetElement.offsetTop;
        let offsetPosition = elementPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

});