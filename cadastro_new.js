
// Função para cadastrar um cliente
function cadastrarCliente() {
    var nome = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var dataNascimento = document.getElementById('data_nascimento').value;
    var empresa = document.getElementById('empresa').value;
    var tipoContrato = document.getElementById('tipo_contrato').value;

    if (nome && email && dataNascimento && empresa && tipoContrato) {
        var codigoAcesso = generateAccessCode();
        salvarCliente(nome, email, dataNascimento, empresa, tipoContrato, codigoAcesso);
        limparFormulario();
        alert("Usuário cadastrado com sucesso!\nCódigo de Acesso: " + codigoAcesso);
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

// Função para gerar um código de acesso aleatório
function generateAccessCode() {
    return Math.random().toString(36).substr(2, 8).toUpperCase();
}

// Função para salvar os dados do cliente e o código de acesso no localStorage
function salvarCliente(nome, email, dataNascimento, empresa, tipoContrato, codigoAcesso) {
    var clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    clientes.push({ nome, email, dataNascimento, empresa, tipoContrato, codigoAcesso });
    localStorage.setItem('clientes', JSON.stringify(clientes));
    atualizarTabela(clientes);
}

// Função para limpar o formulário de cadastro
function limparFormulario() {
    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
    document.getElementById('data_nascimento').value = '';
    document.getElementById('empresa').value = '';
    document.getElementById('tipo_contrato').value = '';
}

// Função para validar o código de acesso no login
function checkAccess() {
    var codigo = document.getElementById('codigo').value;
    var clientes = JSON.parse(localStorage.getItem('clientes')) || [];

    // Verificar se o código é válido
    if (codigo === 'admin123') {
        window.location.href = 'cadastro.html';
    } else if (clientes.some(cliente => cliente.codigoAcesso === codigo)) {
        window.location.href = 'menu.html';
    } else {
        alert('Código de acesso inválido!');
    }

    return false; // Impede o envio do formulário
}

// Função para atualizar a tabela com os clientes cadastrados
function atualizarTabela(clientes) {
    var tableBody = document.getElementById('myTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Limpa a tabela antes de adicionar os dados

    clientes.forEach((cliente, index) => {
        var newRow = tableBody.insertRow();

        newRow.insertCell(0).textContent = index + 1;
        newRow.insertCell(1).textContent = cliente.nome;
        newRow.insertCell(2).textContent = cliente.email;
        newRow.insertCell(3).textContent = cliente.dataNascimento;
        newRow.insertCell(4).textContent = cliente.empresa;
        newRow.insertCell(5).textContent = cliente.tipoContrato;
        newRow.insertCell(6).textContent = cliente.codigoAcesso;
    });
}

// Função para carregar os clientes do localStorage ao carregar a página
function carregarClientes() {
    var clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    atualizarTabela(clientes);
}

