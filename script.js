// Função que será chamada quando o botão "Entrar" for clicado
function verificarSenha() {
    // Pega o valor digitado no campo de senha
    const senhaDigitada = document.getElementById('senhaInput').value;

    // Define a senha correta
    const senhaCorreta = '1234';

    // Compara a senha digitada com a senha correta
    if (senhaDigitada === senhaCorreta) {
        // Se a senha estiver correta, exibe um alerta e redireciona
        alert('Acesso concedido! Preparando a homenagem...');
        // MUITO IMPORTANTE: Mude 'homenagem.html' para o nome do arquivo da sua próxima página!
        window.location.href = 'homenagem.html';
    } else {
        // Se a senha estiver errada, exibe um alerta de erro
        alert('Senha incorreta. Tente novamente.');
        // Limpa o campo de senha para uma nova tentativa
        document.getElementById('senhaInput').value = '';
    }
}

// Bônus: Permite que o usuário aperte "Enter" para tentar logar
document.getElementById('senhaInput').addEventListener('keyup', function(event) {
    // Verifica se a tecla pressionada foi "Enter"
    if (event.key === 'Enter') {
        // Chama a função de verificação de senha
        verificarSenha();
    }
});