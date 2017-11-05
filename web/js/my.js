/* LINK
 * https://opentdb.com/api.php?amount=10&category=18&difficulty=easy
 * 
 * A dificuldade pode ser easy ou medium
 * categoria 9 - Conhecimento geral
 * categoria 15 - video jogos
 * categoria 18 - computadores
 * 
 */

$(document).ready(function(){
    //$("#contentor").load("inicio_menu.html");
    
    var dificuldade;
    var categoria;
    
    
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
        dificuldade(1);
    });
    
    $(document).on("click","#butaoDificuldadeMedia",function(){
        dificuldade(2);
    });
    
    
    function dificuldade(id){
        if(id == 1){
            alert("1");
            return 0;
        } else{
            alert("2");
        }
        return 1;
    }
    
    
});


