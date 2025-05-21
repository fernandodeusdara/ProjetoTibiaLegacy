$(document).ready(function () {
    // Geração da JTable
    $('#mundosOnline').DataTable({
        "pageLength": 15, // Quantidade de registros por página
        "lengthMenu": [5, 10, 15], // Lista de opções selecionáveis de quantidade de registros por página
        "ajax": {
            "url": "/WorldPlayer/GetMundos", // Caminho do método na Controller para enviar dados para a jtable
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "name", "title": "World" }, // Nome da propriedade recebida do método na controller e seu título no campo da tabela
            { "data": "status", "title": "Status" },
            { "data": "players_online", "title": "PlayersOnline" },
        ],
        "language": { // A chave language é usada para alterações nos textos da paginação da jtable
            "lengthMenu": "_MENU_ Entries per page", // Texto personalizado
        }
    });

    // Esconde a tabela ao iniciar a tela
    document.getElementById("characterTable").style.display = "none";   
});

// Configuração para cada nome de mundo no body da table seja um link que abra uma pop up chamando um novo método para preencher as informações pertinentes
$('#mundosOnline tbody').on('click', 'tr', function () {
    var data = $('#mundosOnline').DataTable().row(this).data(); // Obtém os dados da linha clicada
    var mundoNome = data.name; // Supondo que 'name' seja o identificador único do mundo

    // Chamar AJAX para obter mais detalhes sobre o mundo
    $.ajax({
        url: '/WorldPlayer/GetPlayersOnline', // Endpoint que retorna detalhes do mundo
        type: 'GET',
        data: { mundo: mundoNome }, // Enviar o nome do mundo como parâmetro
        success: function (response) {
            // Preencher o modal com os dados recebidos
            $('#mundoNome').text(response.name);

            // Limpar a tabela de jogadores antes de adicionar novos dados
            $('#mundoPlayers').empty();

            // Verificar se há jogadores online
            if (response.status && response.status.length > 0) {
                response.status.forEach(function (player) {
                    var row = `<tr>
                        <td>${player.name}</td>
                        <td>${player.level}</td>
                        <td>${player.vocation}</td>
                    </tr>`;
                    $('#mundoPlayers').append(row);
                });
            } else {
                $('#mundoPlayers').append('<tr><td colspan="3">Nenhum jogador online</td></tr>');
            }

            // Abrir o modal
            $('#mundoModal').modal('show');
        },
        error: function () {
            alert('Erro ao carregar detalhes do mundo.');
        }
    });
});

// Montei outra JTable mas que é carregada apenas após a ação de um clique
$("#searchCharacter").click(function () { // Função responsável para acionar uma ação no clique do botão em questão ("searchCharacter")

    let character = document.getElementById("nameCharacter").value; // Pegando o valor de um campo, no caso a box de preenchimento para pesquisa de um objeto

    $.ajax({
        url: "/WorldPlayer/GetCharacter",
        type: "GET",
        data: { name: character }, // Por ser um GET, o parâmetro enviado deve ser dessa forma na query string da URL, caso contrário, se for um POST, por exemplo, seria no body. (" (data: JSON.stringify({ name: character })) ")
        success: function (data) {
            if (data && data.data) {
                let char = data.data; // Pegando o objeto retornado

                // Atualiza os valores na tabela
                $("#nameValue").text(char.character.character.name);
                $("#guildValue").text(char.character.character.guild.name);
                $("#titleValue").text(char.character.character.title);
                $("#vocationValue").text(char.character.character.vocation);
                $("#levelValue").text(char.character.character.level);
                $("#worldValue").text(char.character.character.world);
                $("#loginValue").text(char.character.character.last_login);
                $("#accValue").text(char.character.character.account_status);

                // Configuração para alterar valor recebido no objeto (Offline ou Online)
                let status = "";

                if (char.character.character.status == true)
                    status = "Online";
                else
                    status = "Offline"

                $("#statusValue").text(status);

                document.getElementById("characterTable").style.display = "table"; // Mostra a tabela para carregar as informações

                console.log("Dados recebidos:", char);
            } else {
                console.warn("Nenhum dado encontrado.");
            }
        },
        error: function (xhr) {
            console.error("Erro:", xhr.responseText);
            alert(xhr.responseJSON.error);
        }
    });
});

// Fechar modal tanto no "X" quanto no "Fechar"
$('.close, .fechar').on('click', function () {
    $('#mundoModal').modal('hide');
});
