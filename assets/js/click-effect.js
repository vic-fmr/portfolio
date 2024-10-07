
const inicio_botao = document.querySelector("#inicio-botao");
const projetos_botao = document.querySelector("#projetos-botao");
const contato_botao = document.querySelector("#contato-botao");
const navItems = document.querySelectorAll(".nav-button")

const classe = "clicked"

window.addEventListener("DOMContentLoaded", () => {
    inicio_botao.classList.add(classe)
})

window.addEventListener("scroll", () => {
    navItems.forEach((item) => {
        item.classList.remove(classe)
    })
    const currentScroll = window.scrollY;
    console.log(currentScroll)

    if (currentScroll > 500 && currentScroll <= 1300) {
        botaoSobreMim.classList.add(classe)
    }else if (currentScroll > 1300 && currentScroll < 2000){
        projetos_botao.classList.add(classe)
    } else if(currentScroll >= 2000){
        contato_botao.classList.add(classe)
    } else{
        inicio_botao.classList.add(classe)
    }

});
