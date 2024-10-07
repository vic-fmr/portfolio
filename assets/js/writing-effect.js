 // Texto que será exibido
 const texto = "developer in development";

 // Velocidade de digitação
 const velocidade = 50; // em milissegundos

 let i = 0;
 const typingEffect = document.getElementById('typing-effect');
 const dots = document.getElementById('dots');

 function digitar() {
   if (i < texto.length) {
     typingEffect.innerHTML += texto.charAt(i);
     i++;
     setTimeout(digitar, velocidade);
   }
 }

 // Começa o efeito de digitação
 digitar();