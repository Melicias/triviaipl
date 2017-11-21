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
    var sdificuldade;
    var categoria;
    var scategoria;
    var perguntas = new Array();
    var nrpergunta = -1;
    var nomeJogador;
    
    
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
	sdificuldade = "Fácil";
        escolherDificuldade("easy");
    });
    
    $(document).on("click","#butaoDificuldadeMedia",function(){
	sdificuldade = "Média";
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
	scategoria = "Informática";
        escolherCategoria(18);
    });
    
    $(document).on("click","#botaojogos",function(){
	scategoria = "Video-Jogos";
        escolherCategoria(15);
    });
    
    $(document).on("click","#botaodesporto",function(){
	scategoria = "Desporto";
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
                    scategoria = "Informática";
                    break;
                case 2:
                    categoria = 15;
                    scategoria = "Video-Jogos";
                    break;
                case 3:
                    categoria = 21;
                    scategoria = "Desporto";
                    break;
                default:
                    categoria = 18;
                    scategoria = "Informática";
            }
        }
		iniciarJogo();
        //generarLinkAPI();
    }
	
	function iniciarJogo(){
		$("#contentor").html("<div id='div_iniciar_jogo'>\n\
                                <h2>Opções do jogo: </h2>\n\
                                <p>Dificuldade: "+ sdificuldade +"</p><br>\n\
                                <p>Categoria: "+ scategoria +"</p><br>\n\
                                Nome do jogador: <input type='text' id='username' name='username'><br>\n\
                                <button id='iniciarJogoUsername' type='button' style=' margin:30px; width:200px ; height: 100px; font-size: 35px;' class='btn btn-primary'>Iniciar</button>\n\
                            </div>"); 
	}
	
	$(document).on("click","#iniciarJogoUsername",function(){
		nomeJogador = $('#username').val();
		if(nomeJogador != "" && nomeJogador.length > 2){
                    generarLinkAPI();
		}else{
                    alert("O nome tem de ter pelo menos 3 carateres!");
		}
	});
    
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
                
                //Envio o 0 para comecar a contar desde o 0;
                comecarAsPerguntas(0);
            } else {
                alert("Your browser does not support Web Storage...");
            }
            
        });
    }
    
    function comecarAsPerguntas(id){
        nrpergunta = id;
        localStorage.setItem('nrpergunta', nrpergunta);
        if(perguntas[nrpergunta].type == "boolean"){
            //codigo de html com os botoes verdadeiro e falso.
            $("#contentor").html("");
        }else{
            //codigo para escolher um botao aleatoriamente para ser a opcao certa.
            //O primeiro numero do array vai ser o numero que tera a resposta correta
            var correto = Math.floor((Math.random() * 4) + 1);
            var butoes = "<div id='div_escolha_multipla'>\n\
                            <p> " + perguntas[nrpergunta].question + "</p>";
            var ii = 0;	
            for(var i=1;i<=4;i++){
                if(i == correto){
                    //adicionar a variavel butoes um botao com a respota correta
                    butoes += "<button id='butaoRespostaCorreta' type='button' style=' margin:30px; width:100px ; height: 50px; font-size: 20px;' class='btn btn-primary'>" + perguntas[nrpergunta].correct_answer + "</button>";
                }else{
                    var incorreto = perguntas[nrpergunta].incorrect_answers[ii];
                    //adicionar a variavel butoes um botao com a incorrectanswers
                    butoes += "";
                    ii++;
                }
                
            }
            butoes += "</div>";
            //adicionar a variavel butoes butoes para adicionar aos favs.
            //codigo de html com 4 botoes para fazer os 4 opcoes de escolhas.
            $("#contentor").html(butoes);
        }
        
    }
    
    //https://www.w3schools.com/html/html5_webstorage.asp
    
});


