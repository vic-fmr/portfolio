
const navItems = document.querySelectorAll(".nav-button");

const sections = [
  { element: document.querySelector("#inicio"), button: botaoInicio },
  { element: document.querySelector("#sobre-mim"), button: botaoSobreMim },
  { element: document.querySelector("#projetos"), button: botaoProjetos },
  { element: document.querySelector("#contato"), button: botaoContato },
];

const classe = "clicked";
let activeButton = botaoInicio; // Inicialmente, o botão de "Início" está ativo

// Função para alterar o botão ativo
function setActiveButton(newButton) {
  if (activeButton !== newButton) {
    activeButton.classList.remove(classe);
    newButton.classList.add(classe);
    activeButton = newButton;
  }
}

// Configura o observador
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const sectionData = sections.find(
        (section) => section.element === entry.target
      );
      if (sectionData) {
        setActiveButton(sectionData.button);
      }
    }
  });
}, {
  threshold: 0.5 // 50% da seção precisa estar visível para ser considerada "visível"
});

// Observa todas as seções
sections.forEach((section) => {
  observer.observe(section.element);
});

// Adiciona a classe "clicked" ao botão de início no carregamento da página
window.addEventListener("DOMContentLoaded", () => {
  botaoInicio.classList.add(classe);
});
