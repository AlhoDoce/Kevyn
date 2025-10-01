document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica para os Botões com Balão de Mensagem ---
    const botoesBalao = document.querySelectorAll('.botao-balao');
    botoesBalao.forEach(container => {
        const button = container.querySelector('.btn-interativo');
        let timeoutId;
        button.addEventListener('mouseover', () => { clearTimeout(timeoutId); container.classList.add('active'); });
        button.addEventListener('mouseout', () => { timeoutId = setTimeout(() => { container.classList.remove('active'); }, 300); });
        button.addEventListener('click', () => {
            container.classList.toggle('active');
            if (container.classList.contains('active')) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => { container.classList.remove('active'); }, 3000);
            }
        });
    });

    // --- Lógica para o Carrossel Infinito ---
    const carrossel = document.querySelector('.carrossel-imagens');
    if (carrossel) {
        const imagensOriginais = Array.from(carrossel.querySelectorAll('img'));
        if (imagensOriginais.length > 0) {
            const primeiraImagemClone = imagensOriginais[0].cloneNode(true);
            carrossel.appendChild(primeiraImagemClone);
        }
        let indiceAtual = 0;
        const totalImagens = imagensOriginais.length;
        function moverCarrossel() {
            indiceAtual++;
            carrossel.style.transition = 'transform 0.7s ease-in-out';
            const larguraImagem = carrossel.clientWidth;
            carrossel.style.transform = `translateX(${-larguraImagem * indiceAtual}px)`;
        }
        carrossel.addEventListener('transitionend', () => {
            if (indiceAtual > totalImagens - 1) {
                carrossel.style.transition = 'none';
                indiceAtual = 0;
                const larguraImagem = carrossel.clientWidth;
                carrossel.style.transform = `translateX(${-larguraImagem * indiceAtual}px)`;
            }
        });
        setInterval(moverCarrossel, 3500);
    }
    
    // --- Lógica do Botão "Abrir Coração" ---
    const btnCoracao = document.getElementById('btnCoracao');
    btnCoracao.addEventListener('click', () => {
        const overlay = document.createElement('div');
        overlay.classList.add('coracao-animacao');
        const coracao = document.createElement('div');
        coracao.classList.add('coracao');
        const texto = document.createElement('p');
        texto.classList.add('texto-animado');
        texto.textContent = "Você é especial!";
        overlay.appendChild(coracao);
        overlay.appendChild(texto);
        document.body.appendChild(overlay);
        void overlay.offsetWidth;
        overlay.classList.add('show');
        setTimeout(() => {
            overlay.classList.remove('show');
            setTimeout(() => {
                overlay.remove();
            }, 500);
        }, 3500);
    });

    // ===================================================================
    // ATUALIZADO: LÓGICA DO BOTÃO "UMA PERGUNTA ESPECIAL" (WHATSAPP)
    // ===================================================================
    const btnWhatsapp = document.getElementById('btnWhatsapp');

    btnWhatsapp.addEventListener('click', () => {
        // 1. Cria a estrutura do modal
        const overlay = document.createElement('div');
        overlay.className = 'overlay-pergunta';

        const caixaPergunta = document.createElement('div');
        caixaPergunta.className = 'caixa-pergunta';

        caixaPergunta.innerHTML = `
            <h2>Uma Pergunta...</h2>
            <p>Você aceita ser a pessoa que alegra todos os meus dias?</p>
            <div class="botoes-resposta">
                <button class="btn-sim">Claro que sim!</button>
                <button class="btn-nao">Não</button>
            </div>
        `;

        overlay.appendChild(caixaPergunta);
        document.body.appendChild(overlay);
        
        // Adiciona a classe .show para iniciar a animação de surgimento
        setTimeout(() => overlay.classList.add('show'), 10);

        // 2. Adiciona os eventos aos botões
        const btnSim = overlay.querySelector('.btn-sim');
        const btnNao = overlay.querySelector('.btn-nao');

        btnSim.addEventListener('click', () => {
            // Ação para o "Sim": abre o WhatsApp
            const mensagem = "Eu aceito ser a pessoa que alegra todos os seus dias! ❤️";
            const numeroTelefone = "5511990065287"; // **LEMBRE-SE DE MUDAR AQUI!**
            const mensagemCodificada = encodeURIComponent(mensagem);
            const urlWhatsapp = `https://wa.me/${numeroTelefone}?text=${mensagemCodificada}`;
            window.open(urlWhatsapp, '_blank');
            
            fecharModal();
        });

        btnNao.addEventListener('click', () => {
            // Ação para o "Não": mostra o popup para repensar
            caixaPergunta.innerHTML = `
                <h2>Tem certeza? 😟</h2>
                <p>Pense com carinho! Essa resposta pode mudar o rumo de uma galáxia inteira (a minha, no caso). Repense e tente de novo mais tarde!</p>
                <div class="botoes-resposta">
                    <button class="btn-fechar">Ok, vou repensar</button>
                </div>
            `;
            
            const btnFechar = overlay.querySelector('.btn-fechar');
            btnFechar.addEventListener('click', fecharModal);
        });

        // Função para fechar e remover o modal
        function fecharModal() {
            overlay.classList.remove('show');
            setTimeout(() => {
                overlay.remove();
            }, 400); // Espera a transição de fade-out terminar
        }
    });

    // --- Função para criar Corações Flutuantes ---
    function criarCoracoesFlutuantes() {
        const container = document.getElementById('coracoes-flutuantes');
        if (!container) return;
        const quantidade = 15;
        for (let i = 0; i < quantidade; i++) {
            const coracao = document.createElement('div');
            coracao.classList.add('coracao-fundo');
            coracao.innerHTML = '♥';
            coracao.style.left = Math.random() * 100 + 'vw';
            coracao.style.animationDuration = (Math.random() * 8 + 7) + 's';
            coracao.style.animationDelay = Math.random() * 5 + 's';
            coracao.style.transform = `scale(${Math.random() * 0.8 + 0.5})`;
            coracao.style.opacity = Math.random() * 0.5 + 0.2;
            container.appendChild(coracao);
        }
    }
    criarCoracoesFlutuantes();
});