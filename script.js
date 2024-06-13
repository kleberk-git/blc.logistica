function checkAccess() {
    var codigo = document.getElementById('codigo').value;
    console.log('Código digitado:', codigo);

    // Verificar se o código é válido
    if (codigo === 'admin123') {
        console.log('Redirecionando para cadastro.html');
        window.location.href = 'cadastro.html';
    } else if (codigo === 'cliente123') {
        console.log('Redirecionando para pagina_do_cliente.html');
        window.location.href = 'menu.html';
    } else {
        alert('Código de acesso inválido!');
    }

    return false; // Impede o envio do formulário
}

function togglePage(pageId) {
    var pages = document.querySelectorAll('.content');
    var div = document.getElementById(pageId);
    
    // Verifica se a div já está ativa
    if (div.classList.contains('active')) {
        div.classList.remove('active');
        return; // Sai da função, já que estamos escondendo a div
    }
    
    // Remove a classe 'active' de todas as páginas
    for (var i = 0; i < pages.length; i++) {
        pages[i].classList.remove('active');
    }

    // Adiciona a classe 'active' à página especificada
    div.classList.add('active');

    // Movendo a div correspondente para baixo do botão clicado
    var button = document.querySelector('button[data-page="' + pageId + '"]');
    var container = document.querySelector('.center-container');
    
    container.insertBefore(div, button.nextSibling); // Insere a div após o botão
}

document.addEventListener("DOMContentLoaded", function() {
    const table = document.getElementById("myTable");
    const rowsPerPage = 5;
    let currentPage = 1;

    function showPage(page) {
        const rows = table.rows;
        const startIndex = (page - 1) * rowsPerPage;
        const endIndex = Math.min(startIndex + rowsPerPage, rows.length - 1);

        for (let i = 1; i < rows.length; i++) {
            if (i > startIndex && i <= endIndex) {
                rows[i].style.display = "table-row";
            } else {
                rows[i].style.display = "none";
            }
        }
    }

    showPage(currentPage);

    document.getElementById("prev").addEventListener("click", function() {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    });

    document.getElementById("next").addEventListener("click", function() {
        const totalRows = table.rows.length - 1;
        const totalPages = Math.ceil(totalRows / rowsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
  const table = document.getElementById("results-table");
  const rowsPerPage = 5;
  let currentPage = 1;

  function showPage(page) {
      const rows = table.rows;
      const startIndex = (page - 1) * rowsPerPage;
      const endIndex = Math.min(startIndex + rowsPerPage, rows.length - 1);

      for (let i = 1; i < rows.length; i++) {
          if (i > startIndex && i <= endIndex) {
              rows[i].style.display = "table-row";
          } else {
              rows[i].style.display = "none";
          }
      }
  }

  showPage(currentPage);

  document.getElementById("prev").addEventListener("click", function() {
      if (currentPage > 1) {
          currentPage--;
          showPage(currentPage);
      }
  });

  document.getElementById("next").addEventListener("click", function() {
      const totalRows = table.rows.length - 1;
      const totalPages = Math.ceil(totalRows / rowsPerPage);
      if (currentPage < totalPages) {
          currentPage++;
          showPage(currentPage);
      }
  });
});

document.addEventListener('DOMContentLoaded', function () {
    var originInput = document.getElementById('origin');
    var destinationInput = document.getElementById('destination');
    var mapContainer = document.getElementById('map');

    originInput.addEventListener('change', updateMap);
    destinationInput.addEventListener('change', updateMap);

    function updateMap() {
        var origin = originInput.value;
        var destination = destinationInput.value;

        if (origin !== '' && destination !== '') {
            var mapUrl = `https://dev.virtualearth.net/REST/v1/Imagery/Map/Road/Routes?wp.0=${origin}&wp.1=${destination}&key=YOUR_BING_MAPS_API_KEY`;
            mapContainer.innerHTML = `<img src="${mapUrl}" alt="Mapa" width="100%">`;
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const emailFolders = document.querySelectorAll('.email-folder');
  
    // Mostra a pasta correspondente ao link clicado
    document.querySelectorAll('.email-sidebar a').forEach(link => {
      link.addEventListener('click', function(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substr(1);
        emailFolders.forEach(folder => {
          if (folder.id === `${targetId}-folder`) {
            folder.classList.add('active');
          } else {
            folder.classList.remove('active');
          }
        });
      });
    });
  
    // Simula a criação de alguns e-mails para cada pasta
    const inboxFolder = document.getElementById('inbox-folder');
    inboxFolder.innerHTML = `
      <div class="email">E-mail de exemplo na Caixa de Entrada</div>
      <div class="email">Outro e-mail de exemplo na Caixa de Entrada</div>
    `;
  
    const draftsFolder = document.getElementById('drafts-folder');
    draftsFolder.innerHTML = `
      <div class="email">Rascunho de e-mail de exemplo</div>
    `;
  
    const trashFolder = document.getElementById('trash-folder');
    trashFolder.innerHTML = `
      <div class="email">E-mail excluído</div>
    `;
  
    const sentFolder = document.getElementById('sent-folder');
    sentFolder.innerHTML = `
      <div class="email">E-mail enviado</div>
    `;
  
    // Eventos dos botões de ação
    const composeButton = document.querySelector('.email-compose');
    composeButton.addEventListener('click', function() {
      // Simula a abertura da página para escrever um novo e-mail
      alert('Abrir página para escrever um novo e-mail');
    });
  });
  
  function compareImages() {
    const originalInput = document.getElementById('original');
    const verifiedInput = document.getElementById('verified');

    if (!originalInput.files[0] || !verifiedInput.files[0]) {
        alert('Por favor, selecione ambas as imagens.');
        return;
    }

    const originalImg = new Image();
    const verifiedImg = new Image();

    originalImg.onload = function() {
        verifiedImg.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = Math.max(originalImg.width, verifiedImg.width);
            canvas.height = Math.max(originalImg.height, verifiedImg.height);

            ctx.drawImage(originalImg, 0, 0);
            const originalData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(verifiedImg, 0, 0);
            const verifiedData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

            let differentPixels = 0;

            for (let i = 0; i < originalData.length; i += 4) {
                if (originalData[i] !== verifiedData[i] || originalData[i + 1] !== verifiedData[i + 1] || originalData[i + 2] !== verifiedData[i + 2]) {
                    differentPixels++;
                }
            }

            const similarity = 1 - differentPixels / (originalData.length / 4);

            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = '';

            if (similarity === 1) {
                resultDiv.textContent = 'As imagens são idênticas.';
            } else {
                resultDiv.textContent = 'A imagem comparada com a original apresentou inconsistências. Por favor, verifique!';
            }
        };
        verifiedImg.src = URL.createObjectURL(verifiedInput.files[0]);
    };
    originalImg.src = URL.createObjectURL(originalInput.files[0]);
}

 function togglePage(pageId) {
            var page = document.getElementById(pageId);
            page.style.display = page.style.display === 'none' ? 'block' : 'none';
        }

        document.getElementById('boletoForm').addEventListener('submit', function(event) {
            event.preventDefault();
            
            var numeroBoleto = document.getElementById('numeroBoleto').value;
            var dataEmissao = document.getElementById('dataEmissao').value;
            var dataVencimento = document.getElementById('dataVencimento').value;
            var valor = document.getElementById('valor').value;
            var status = document.getElementById('status').value;
            var empresa = document.getElementById('empresa').value;
            var cpfCnpj = document.getElementById('cpfCnpj').value;
            
            var table = document.getElementById('myTable').getElementsByTagName('tbody')[0];
            var newRow = table.insertRow();

            newRow.insertCell(0).textContent = numeroBoleto;
            newRow.insertCell(1).textContent = dataEmissao;
            var vencimentoCell = newRow.insertCell(2);
            vencimentoCell.textContent = dataVencimento;
            newRow.insertCell(3).textContent = valor;
            newRow.insertCell(4).textContent = status;
            newRow.insertCell(5).textContent = empresa;
            newRow.insertCell(6).textContent = cpfCnpj;

            var today = new Date();
            var vencimentoDate = new Date(dataVencimento);
            
            if (vencimentoDate < today) {
                vencimentoCell.classList.add('vencido');
                var message = document.createElement('span');
                message.classList.add('mensagem-vencido');
                message.textContent = ' (Vencido)';
                vencimentoCell.appendChild(message);
            }

            document.getElementById('boletoForm').reset();
        });
        function toggleMenu() {
            var mobileNavLinks = document.querySelector('.mobile-nav-links');
            var menuIcon = document.querySelector('.menu-icon');
            mobileNavLinks.classList.toggle('active');
            menuIcon.classList.toggle('active');
        }
        
 // Função para exibir informações sobre a BLC Logística
function exibirSobre() {
    var sobre = "Bem-vindo à BLC Logística!\n\nSomos uma empresa construída para atender às demandas logísticas, facilitando com serviços práticos e eficientes. Nossa missão é oferecer soluções integradas e inovadoras para otimizar processos de transporte, armazenamento e distribuição de mercadorias.\n\nAcreditamos na importância da excelência operacional, no compromisso com a satisfação do cliente e na constante busca pela melhoria contínua. Com uma equipe dedicada e experiente, estamos prontos para atender às suas necessidades logísticas com eficiência e qualidade.\n\nObrigado por escolher a BLC Logística para suas operações logísticas!";
    
    // Exibir as informações em um alerta
    alert(sobre);
}


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
    var tableBody = document.getElementById('myTable_cadastro').getElementsByTagName('tbody')[0];
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

document.addEventListener('DOMContentLoaded', function() {
    carregarClientes();
    loadCompanyName();
});

document.addEventListener('DOMContentLoaded', function() {
    carregarClientes();
    loadCompanyName();
});

function toggleTableVisibility() {
    const table = document.getElementById('client-table');
    const search = document.getElementById('search');
    const button = document.getElementById('show-table-button');

    if (table.style.display === 'none') {
        table.style.display = 'block';
        search.style.display = 'block';
        button.textContent = 'Esconder Relação de Dados Cadastrados';
    } else {
        table.style.display = 'none';
        search.style.display = 'none';
        button.textContent = 'Mostrar Relação de Dados Cadastrados';
    }
}

function limparFormulario() {
    document.getElementById('register-form').reset();
}

function voltarParaLogin() {
    window.location.href = 'index.html';
}

function pesquisar() {
    const input = document.getElementById('search');
    const filter = input.value.toUpperCase();
    const table = document.getElementById('myTable_cadastro');
    const tr = table.getElementsByTagName('tr');

    for (let i = 1; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName('td');
        let found = false;
        for (let j = 0; j < td.length; j++) {
            if (td[j]) {
                let text = td[j].textContent || td[j].innerText;
                if (text.toUpperCase().indexOf(filter) > -1) {
                    found = true;
                    const regex = new RegExp(`(${filter})`, 'gi');
                    td[j].innerHTML = text.replace(regex, `<span class="highlight">$1</span>`);
                } else {
                    td[j].innerHTML = text; // Remove any previous highlights
                }
            }
        }
        tr[i].style.display = found ? '' : 'none';
    }
}


