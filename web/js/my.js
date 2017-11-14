/* LINK
 * https://opentdb.com/api.php?amount=10&category=18&difficulty=easy
 * 
 * A dificuldade pode ser easy ou medium
 * categoria 21 - Desporto
 * categoria 15 - video jogos
 * categoria 18 - computadores/informatica
 * 
 */

$(document).ready(function(){
    //$("#contentor").load("inicio_menu.html");
    
    var dificuldade; //dificuldade facil(easy) / dificuldade media(medium)
    var categoria;
    var perguntas = new Array();
    
    
    //Butao adicionar
    $("#contentor").html("<div id='div_butoes_inicio_menu'>\n\
                            <button id='butaoIniciarJogo' type='button' style='display: block; margin:15px; width:250px ; height: 125px; font-size: 35px;' class='btn btn-primary btn-lg' >Iniciar Jogo</button>\n\
                         </div>");
    
    $("#butaoIniciarJogo").click(function(){
        $("#contentor").html("<div id='div_escolher_dificuldade'>\n\
                                <h2>Escolha a dificuldade:</h2>\n\
                                <button id='butaoDificuldadeFacil' type='button' style=' margin:30px; width:200px ; height: 100px; font-size: 35px;' class='btn btn-primary'>Fácil</button>\n\
                                <button id='butaoDificuldadeMedia' type='button' style=' margin:30px; width:200px ; height: 100px; font-size: 35px;' class='btn btn-primary'>Média</button>\n\
                            </div>");  
    });
    
    
    $(document).on("click","#butaoDificuldadeFacil",function(){
        escolherDificuldade("easy");
    });
    
    $(document).on("click","#butaoDificuldadeMedia",function(){
        escolherDificuldade("medium");
    });
    
    
    function escolherDificuldade(id){
        dificuldade = id;
        $("#contentor").html("<div id='div_escolher_categoria'>\n\
                                <button type='button' id='botaoinformatica' style=' margin:30px; width:200px ; height: 100px; font-size: 25px;' class='btn btn-primary'>Informática</button>\n\
                                <button type='button' id='botaojogos' style=' margin:30px; width:200px ; height: 100px; font-size: 25px;' class='btn btn-primary'>Video-Jogos</button>\n\
                                <button type='button' id='botaodesporto' style=' margin:30px; width:200px ; height: 100px; font-size: 25px;' class='btn btn-primary'>Desporto</button>\n\
                                <button type='button' id='botaoRandom' style=' margin:30px; width:200px ; height: 100px; font-size: 25px;' class='btn btn-primary'>Random</button>\n\
                              </div>"); 
    }
    
    $(document).on("click","#botaoinformatica",function(){
        escolherCategoria(18);
    });
    
    $(document).on("click","#botaojogos",function(){
        escolherCategoria(15);
    });
    
    $(document).on("click","#botaodesporto",function(){
        escolherCategoria(21);
    });
    
    $(document).on("click","#botaoRandom",function(){
        escolherCategoria(-1);
    });
    
    
    function escolherCategoria(cat){
        categoria = cat;
        if(cat == -1){
            var random = Math.floor((Math.random() * 3) + 1);
            switch(random){
                case 1:
                    categoria = 18;
                    break;
                case 2:
                    categoria = 15;
                    break;
                case 3:
                    categoria = 21;
                    break;
                default:
                    categoria = 18;
            }
        }
         generarLinkAPI();
    }
    
    function generarLinkAPI(){
        var link = "https://opentdb.com/api.php?amount=10&category=" + categoria + "&difficulty="+ dificuldade;
        $.getJSON(link, function(data) {
            //data is the JSON string
            //criar array com isto, e assim que s saca a informacao do data
            perguntas = data.results;
            if (typeof(Storage) !== "undefined") {
                localStorage.setItem('perguntas', JSON.stringify(perguntas));
                //get local storage
                //var retrievedObject = localStorage.getItem('perguntas');
                //perguntas = JSON.parse(retrievedObject);
            } else {
                alert("Your browser does not support Web Storage...");
            }
            
        });
    }
    
    //https://www.w3schools.com/html/html5_webstorage.asp
    
});


