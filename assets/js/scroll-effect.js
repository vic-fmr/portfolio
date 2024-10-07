//Bloco responsável pela alteração no header
const header = document.querySelector("#id-header");
const toggleClass = "scrolled";

window.addEventListener("scroll", () => {

  const currentScroll = window.scrollY;


  if (currentScroll > 100) {
    header.classList.add(toggleClass);
  } else {
    header.classList.remove(toggleClass);
  }
});

//Bloco responsável pelos scrolls da página
const botaoInicio = document.querySelector("#inicio-botao")
const botaoSobreMim = document.querySelector("#sobre-mim-botao");
const botaoProjetos = document.querySelector("#projetos-botao")
const botaoContato = document.querySelector("#contato-botao")

const sobreMimSection = document.querySelector("#sobre-mim");
const projetosSection = document.querySelector("#projetos")
const contatoSecton = document.querySelector("#contato")

const baterPapo = document.querySelector("#bater-um-papo")
baterPapo.addEventListener("click", () => {
  contatoSecton.scrollIntoView({ behavior: "smooth" });
})

botaoSobreMim.addEventListener("click", () => {
  sobreMimSection.scrollIntoView({ behavior: "smooth" });
});
botaoProjetos.addEventListener("click", () => {
  projetosSection.scrollIntoView({ behavior: "smooth" });
});
botaoContato.addEventListener("click", () => {
  contatoSecton.scrollIntoView({ behavior: "smooth" });
});
botaoInicio.addEventListener("click", () => {
  window.scrollTo({
    top: 0,  // Volta ao topo da página
    behavior: "smooth"  // Rolagem suave
  });
});



function reveal() {
  var sections = document.querySelectorAll('.section');
  for (var i = 0; i < sections.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = sections[i].getBoundingClientRect().top;
    var elementVisible = 150; // Margem de visibilidade

    // Se o elemento estiver visível na janela de visualização
    if (elementTop < windowHeight - elementVisible) {
      sections[i].classList.add('active');
    } else {
      sections[i].classList.remove('active');
    }
  }
}

// Aciona a função ao rolar a página
window.addEventListener('scroll', reveal);

// Executa a função uma vez quando a página carrega
reveal();


