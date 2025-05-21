$(document).ready(function () {
    $('#criaturas').DataTable({
        "pageLength": 7, // Quantidade de registros por página
        "lengthMenu": [3, 5, 7], // Lista de opções selecionáveis de quantidade de registros por página
        "ajax": {
            "url": "/Criaturas/GetCriaturas", // Caminho do método na Controller para enviar dados para a jtable
            "type": "GET",
            "datatype": "json",
            "error": function (xhr) { // Função para retornar o erro disparado na controller
                console.error("Erro ao carregar criaturas:", xhr.responseText); // Mensagem de erro no console
                alert(xhr.responseText); // Mensagem de erro em tela
            }
        },
        "columns": [
            {
                "data": "image_url", // Nome da propriedade recebida do método na controller
                "title": "Creature", // Título do campo na tabela referente a propriedade
                "render": function (data) { // No caso da propriedade recebida ser uma url que carrega uma imagem, nós usamos a função do render para carregá-la
                    return '<img src="' + data + '" alt="Creature" style="width:70px; height:70px; border-radius:5px;"/>';
                }
            },
            { "data": "name", "title": "Name" }
        ],
        "language": { // A chave language é usada para alterações nos textos da paginação da jtable
            "lengthMenu": "_MENU_ Entries per page", // Texto personalizado
        }
    });
});

$('#criaturas tbody').on('click', 'tr', function () {
    var data = $('#criaturas').DataTable().row(this).data(); // Obtém os dados da linha clicada
    var criaturaNome = data.name; // Supondo que 'name' seja o nome da criatura

    if (criaturaNome) {
        var url = "https://tibia.fandom.com/wiki/" + encodeURIComponent(criaturaNome);

        // Abre a URL em uma nova aba
        window.open(url, '_blank');
    }
});
