// --- Lógica para os Botões com Balão de Mensagem ---
document.addEventListener('DOMContentLoaded', () => {
    const botoesBalao = document.querySelectorAll('.botao-balao');

    botoesBalao.forEach(container => {
        const button = container.querySelector('.btn-interativo');
        let timeoutId; // Para controlar o tempo de exibição do balão

        button.addEventListener('mouseover', () => {
            clearTimeout(timeoutId); // Limpa qualquer timeout anterior para evitar conflito
            container.classList.add('active'); // Mostra o balão
        });

        button.addEventListener('mouseout', () => {
            // Esconde o balão após um pequeno atraso
            timeoutId = setTimeout(() => {
                container.classList.remove('active');
            }, 300); // Esconde após 300ms
        });

        // Opcional: Para telas de toque, pode ser necessário um clique
        button.addEventListener('click', () => {
            // Para toggle em telas de toque
            container.classList.toggle('active');
            // Se o balão apareceu por clique, ele deve sumir em alguns segundos
            if (container.classList.contains('active')) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    container.classList.remove('active');
                }, 3000); // Balão some após 3 segundos no clique
            }
        });
    });
});


// --- Lógica para o Carrossel de Imagens Automático ---
const carrossel = document.getElementById('carrossel');
const imagens = carrossel.querySelectorAll('img');
let indiceAtual = 0;

function moverCarrossel() {
    indiceAtual++;
    if (indiceAtual >= imagens.length) {
        indiceAtual = 0; // Volta para a primeira imagem
    }
    const larguraImagem = imagens[0].clientWidth; // Pega a largura da primeira imagem
    carrossel.style.transform = `translateX(${-larguraImagem * indiceAtual}px)`;
}

// Inicia o carrossel a cada 3 segundos (3000 milissegundos)
setInterval(moverCarrossel, 3000); 


// --- Lógica para o Botão "Abrir Coração" ---
const btnCoracao = document.getElementById('btnCoracao');

btnCoracao.addEventListener('click', () => {
    // Cria um overlay para a animação
    const overlay = document.createElement('div');
    overlay.classList.add('coracao-animacao');
    
    // Adiciona o coração dentro do overlay
    const coracao = document.createElement('div');
    coracao.classList.add('coracao');
    overlay.appendChild(coracao);

    document.body.appendChild(overlay);

    // Força o reflow para garantir que a transição ocorra
    void overlay.offsetWidth; 

    // Mostra o overlay e o coração com animação
    overlay.classList.add('show');

    // Remove o overlay após a animação (ex: 3 segundos)
    setTimeout(() => {
        overlay.classList.remove('show');
        setTimeout(() => {
            overlay.remove(); // Remove o elemento do DOM
            // Opcional: Redirecionar para outra página ou mostrar uma mensagem final
            // window.location.href = 'pagina-final-do-coracao.html';
        }, 500); // Pequeno atraso para a opacidade diminuir
    }, 3000); // Coração visível por 3 segundos
});


// --- Lógica para o Botão "Uma Pergunta Especial" (WhatsApp) ---
const btnWhatsapp = document.getElementById('btnWhatsapp');

btnWhatsapp.addEventListener('click', () => {
    // A mensagem padrão que será enviada
    const mensagem = "Olá! Recebi sua pergunta especial do site e estou curiosa/o para saber o que é!";
    
    // O número de telefone (com código do país, sem + ou outros caracteres especiais)
    // Exemplo: 5511987654321 (55 para Brasil, 11 para DDD de São Paulo, 9 para celular)
    const numeroTelefone = "5511999998888"; // **MUDE AQUI PARA O NÚMERO DE WHATSAPP DA PESSOA**

    // Codifica a mensagem para URL
    const mensagemCodificada = encodeURIComponent(mensagem);

    // Monta a URL do WhatsApp
    const urlWhatsapp = `https://wa.me/${numeroTelefone}?text=${mensagemCodificada}`;

    // Abre o link em uma nova aba
    window.open(urlWhatsapp, '_blank');
});