document.addEventListener('DOMContentLoaded', () => {

    // ===============================================
    // LÓGICA DA CAIXA DE MEMÓRIAS
    // ===============================================
    const listaDeMemorias = [
        "Lembra daquela vez que rimos até a barriga doer por causa daquela série?",
        "O dia em que nos conhecemos foi o começo de tudo.",
        "Sua comida favorita sempre me lembra de você.",
        "Aquela nossa primeira viagem, mesmo curta, foi inesquecível.",
        "Adoro o jeito que seus olhos brilham quando você fala do que ama.",
        "Você tem o abraço mais confortável do mundo.",
        "Obrigado por sempre me apoiar nos meus sonhos mais loucos.",
        "Nossa piada interna sobre 'o abacate' sempre me faz sorrir.",
        "A trilha sonora da nossa história com certeza tem aquela música que ouvimos no carro.",
        "Cada dia ao seu lado é uma nova página linda da nossa história."
    ];
    
    const btnMemoria = document.getElementById('btn-memoria');
    const displayMemoria = document.getElementById('display-memoria');
    const textoMemoria = document.getElementById('texto-memoria');
    let memoriaAtual = ""; 

    if (btnMemoria) { // Adiciona uma verificação para segurança
        btnMemoria.addEventListener('click', () => {
            let novaMemoria;
            do {
                const indiceAleatorio = Math.floor(Math.random() * listaDeMemorias.length);
                novaMemoria = listaDeMemorias[indiceAleatorio];
            } while (novaMemoria === memoriaAtual && listaDeMemorias.length > 1);
            
            memoriaAtual = novaMemoria;

            displayMemoria.classList.remove('nova-memoria');
            setTimeout(() => {
                textoMemoria.textContent = novaMemoria;
                displayMemoria.classList.add('nova-memoria');
            }, 300);
        });
    }

    // ===============================================
    // LÓGICA DO CONTADOR DE TEMPO
    // ===============================================
    const dataInicio = new Date(2022, 9, 27, 18, 30, 0); // Lembre-se de ajustar a data!

    function atualizarContador() {
        const agora = new Date();
        if (dataInicio > agora) return;

        let tempDate = new Date(dataInicio);
        
        let anos = agora.getFullYear() - tempDate.getFullYear();
        tempDate.setFullYear(tempDate.getFullYear() + anos);
        if (tempDate > agora) {
            anos--;
            tempDate.setFullYear(tempDate.getFullYear() - 1);
        }

        let meses = agora.getMonth() - tempDate.getMonth();
        if (meses < 0) { meses += 12; }
        tempDate.setMonth(tempDate.getMonth() + meses);
        if (tempDate > agora) {
            meses--;
            if (meses < 0) { anos--; meses += 12; }
            tempDate.setMonth(tempDate.getMonth() - 1);
        }
        
        let dias = Math.floor((agora - tempDate) / (1000 * 60 * 60 * 24));
        
        const diferencaTotal = agora - dataInicio;
        let segundos = Math.floor((diferencaTotal / 1000) % 60);
        let minutos = Math.floor((diferencaTotal / 1000 / 60) % 60);
        let horas = Math.floor((diferencaTotal / (1000 * 60 * 60)) % 24);

        document.getElementById('anos').innerText = anos;
        document.getElementById('meses').innerText = meses;
        document.getElementById('dias').innerText = dias;
        document.getElementById('horas').innerText = String(horas).padStart(2, '0');
        document.getElementById('minutos').innerText = String(minutos).padStart(2, '0');
        document.getElementById('segundos').innerText = String(segundos).padStart(2, '0');
    }
    setInterval(atualizarContador, 1000);
    atualizarContador();

    // --- Lógica para os Botões com Balão de Mensagem ---
    const botoesBalao = document.querySelectorAll('.botao-balao');
    botoesBalao.forEach(container => {
        const button = container.querySelector('.btn-interativo'); let timeoutId;
        button.addEventListener('mouseover', () => { clearTimeout(timeoutId); container.classList.add('active'); });
        button.addEventListener('mouseout', () => { timeoutId = setTimeout(() => { container.classList.remove('active'); }, 300); });
        button.addEventListener('click', () => {
            container.classList.toggle('active');
            if (container.classList.contains('active')) { clearTimeout(timeoutId); timeoutId = setTimeout(() => { container.classList.remove('active'); }, 3000); }
        });
    });

    // --- Lógica para o Carrossel Infinito ---
    const carrossel = document.querySelector('.carrossel-imagens');
    if (carrossel) {
        const imagensOriginais = Array.from(carrossel.querySelectorAll('img'));
        if (imagensOriginais.length > 0) { const primeiraImagemClone = imagensOriginais[0].cloneNode(true); carrossel.appendChild(primeiraImagemClone); }
        let indiceAtual = 0;
        const totalImagens = imagensOriginais.length;
        function moverCarrossel() {
            indiceAtual++; carrossel.style.transition = 'transform 0.7s ease-in-out'; const larguraImagem = carrossel.clientWidth; carrossel.style.transform = `translateX(${-larguraImagem * indiceAtual}px)`;
        }
        carrossel.addEventListener('transitionend', () => {
            if (indiceAtual > totalImagens - 1) { carrossel.style.transition = 'none'; indiceAtual = 0; const larguraImagem = carrossel.clientWidth; carrossel.style.transform = `translateX(${-larguraImagem * indiceAtual}px)`; }
        });
        setInterval(moverCarrossel, 3500);
    }
    
    // --- Lógica do Botão "Abrir Coração" ---
    const btnCoracao = document.getElementById('btnCoracao');
    if (btnCoracao) {
        btnCoracao.addEventListener('click', () => {
            const overlay = document.createElement('div'); overlay.classList.add('coracao-animacao'); const coracao = document.createElement('div'); coracao.classList.add('coracao'); const texto = document.createElement('p'); texto.classList.add('texto-animado'); texto.textContent = "Você é especial!";
            overlay.appendChild(coracao); overlay.appendChild(texto); document.body.appendChild(overlay); void overlay.offsetWidth; overlay.classList.add('show');
            setTimeout(() => {
                overlay.classList.remove('show'); setTimeout(() => { overlay.remove(); }, 500);
            }, 3500);
        });
    }

    // --- Lógica do Botão "Uma Pergunta Especial" (WhatsApp) ---
    const btnWhatsapp = document.getElementById('btnWhatsapp');
    if (btnWhatsapp) {
        btnWhatsapp.addEventListener('click', () => {
            const overlay = document.createElement('div'); overlay.className = 'overlay-pergunta';
            const caixaPergunta = document.createElement('div'); caixaPergunta.className = 'caixa-pergunta';
            caixaPergunta.innerHTML = `<h2>Uma Pergunta...</h2><p>Você aceita ser a pessoa que alegra todos os meus dias?</p><div class="botoes-resposta"><button class="btn-sim">Claro que sim!</button><button class="btn-nao">Não</button></div>`;
            overlay.appendChild(caixaPergunta); document.body.appendChild(overlay);
            setTimeout(() => overlay.classList.add('show'), 10);
            const btnSim = overlay.querySelector('.btn-sim'); const btnNao = overlay.querySelector('.btn-nao');
            btnSim.addEventListener('click', () => {
                const mensagem = "Eu aceito ser a pessoa que alegra todos os seus dias! ❤️"; const numeroTelefone = "5511999998888"; const mensagemCodificada = encodeURIComponent(mensagem); const urlWhatsapp = `https://wa.me/${numeroTelefone}?text=${mensagemCodificada}`; window.open(urlWhatsapp, '_blank');
                fecharModal();
            });
            btnNao.addEventListener('click', () => {
                caixaPergunta.innerHTML = `<h2>Tem certeza? 😟</h2><p>Pense com carinho! Essa resposta pode mudar o rumo de uma galáxia inteira (a minha, no caso). Repense e tente de novo mais tarde!</p><div class="botoes-resposta"><button class="btn-fechar">Ok, vou repensar</button></div>`;
                const btnFechar = overlay.querySelector('.btn-fechar'); btnFechar.addEventListener('click', fecharModal);
            });
            function fecharModal() {
                overlay.classList.remove('show'); setTimeout(() => { overlay.remove(); }, 400);
            }
        });
    }

    // --- Função para criar Corações Flutuantes ---
    function criarCoracoesFlutuantes() {
        const container = document.getElementById('coracoes-flutuantes'); if (!container) return; const quantidade = 15;
        for (let i = 0; i < quantidade; i++) {
            const coracao = document.createElement('div'); coracao.classList.add('coracao-fundo'); coracao.innerHTML = '♥';
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