$(document).ready(function () {
    
    // ajax para buscar a criatura boostada ao iniciar a tela, como não precisamos de paginação e formatação de tabela, não é necessário usar o DataTable
    $.ajax({
        url: "/Legacy/GetCriaturaBoostada",
        type: "GET",
        datatype: "json",
        success: function (data) {
            if (data && data.image_url) { // Se a resposta contiver uma URL(data.image_url), inserimos a imagem dentro da div.
                $("#boostadoImage").html(
                    '<img src="' + data.image_url + '" alt="BoostedCreature" style="width:150px; height:150px; border-radius:10px;"/>' // A inserção da imagem é igual ao ajax acima onde insere a imagem na coluna da DataTable
                );
                $("#criaturaBoostada").text(data.name); // .text pois o campo #criaturaBoostada é um span, sendo assim, não é um campo de entrada (input), entao val() não funciona nele
            } else {
                $("#boostadoImage").html("<p>Imagem não disponível</p>");
            }
        },
        error: function (xhr) {
            console.error("Erro ao carregar a imagem:", xhr.responseText);
            $("#boostadoImage").html("<p>Erro ao carregar imagem</p>");
        }
    });

    // ajax para buscar o boss boostado ao iniciar a tela, como não precisamos de paginação e formatação de tabela, não é necessário usar o DataTable
    $.ajax({
        url: "/Legacy/GetBossBoostado",
        type: "GET",
        datatype: "json",
        success: function (data) {
            if (data && data.image_url) {
                $("#bossBoostadoImage").html(
                    '<img src="' + data.image_url + '" alt="BoostedBoss" style="width:150px; height:150px; border-radius:10px;"/>'
                );
                $("#bossBoostado").text(data.name);
            } else {
                $("#bossBoostadoImage").html("<p>Imagem não disponível</p>");
            }
        },
        error: function (xhr) {
            console.error("Erro ao carregar a imagem:", xhr.responseText);
            $("#bossBoostadoImage").html("<p>Erro ao carregar imagem</p>");
        }
    });

});
