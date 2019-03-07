// GLOBAL
	perdeu = false
	JogoIniciou = false


	function Sprites(objeto , graus){
		var objeto = $("#"+objeto)
		var sprite = "";

		if(graus >= -5 && graus < 20){
			sprite = "aurerio-direita.png";
			objeto.removeClass("Maior");
		}
		else if (graus > 20){
			sprite = "aurerio-medo-direita.png";
			objeto.addClass("Maior");
		}
		else if(graus < -5 && graus > -20){
			sprite = "aurerio-esquerda.png"
			objeto.removeClass("Maior");

		}
		else if(graus < -20){
			sprite = "aurerio-medo-esquerda.png"
			objeto.addClass("Maior");
		}

		objeto.attr("src", "static/sprites/"+sprite);
	}

	function Rotacionar(objeto, grau){
		if(perdeu == false){
			$("#"+objeto).css('transform','rotate('+grau+'deg)')

			Sprites(objeto, grau)


			if(grau > 50 || grau < -50){
				if(perdeu == false){
					Perdeu(grau)
				}
			}
		}
	}

	function Perdeu(grau){
		perdeu = true

		if(grau > 0){
			$("#Player").attr("src", "static/sprites/aurerio-pobre-direita2.png");
		} else {
			$("#Player").attr("src", "static/sprites/aurerio-pobre-esquerda2.png");
		}
		$("#Player").css('transform','rotate(0deg)')
		$("#Player").addClass("Perdeu");
		$("#Texto").hide()

		$("#PerdeuDiv").animate({
			  marginTop: '0%'
			}, 0);
		background_sound.pause();
		perdeu_sound.play();
		ContarDinheiro('stop')
		AtualizaPontos()

	}




    	 var grau_atual = 5;
    	 window.ondevicemotion = function(e) {
    	 	if(perdeu == false){
    		  if (JogoIniciou == true){
    		    grau = (event.accelerationIncludingGravity.x * -1);

        		  if (grau > 0){
        		  grau_atual = grau_atual + 1.5;
        		  } else {
        		  grau_atual = grau_atual - 1.5;
        		  }

    		    Rotacionar('Player', grau_atual);
    		  }
    		}
    	 }



	 pontuacao = 0;
	 function Timer(){
	 	background_sound.play()
	 	var placar = $("#Placar")
	 	pontuacao++;
	 	placar.empty()
	 	placar.append("R$"+pontuacao)
	 }



	var background_sound = new Audio('static/sounds/background.ogg');
	var perdeu_sound = new Audio('static/sounds/perdeu.wav');
	background_sound.volume = 0.2;

    function AtualizaPontos(){

            var NomeJogador = getCookie('NomeJogador')
            var IdJogador = getCookie('IdJogador')
          $.ajax({
            type: 'GET',
            url: "/contas/novo_usuario?id_usuario="+ IdJogador +"&nome="+ NomeJogador +"&pontuacao="+ pontuacao,
            success:function(data){
             console.log("Saved!")
            }
        });

    }

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {
    document.cookie = name+'=; Max-Age=-99999999;';
}

    function IniciarJogo(){

            var data = new Date()
            var Id_Jogador = (data.getDate() +""+ data.getDay()+""+data.getYear()+""+data.getMinutes()+""+data.getHours()+""+data.getSeconds()) + "42";

            var NomeJogador = $("#InputNome").val()

            if (NomeJogador != ""){

                setCookie('NomeJogador', NomeJogador, 3000)
                if(getCookie('IdJogador') == null){
                    setCookie('IdJogador', Id_Jogador, 3000)
                }

                $("#BemVindoDiv").hide();
                ContarDinheiro('start');
                 setTimeout(function(){ JogoIniciou = true }, 500);
            } else {
                 $("#InputNome").focus()
            }
    }


$(function() {
   // LOADING
    var NomeJogadorCookie = getCookie('NomeJogador');

    if(NomeJogadorCookie != null){
        $(".InputNomeJogador").val(NomeJogadorCookie)
      //  $(".InputNomeJogador").hide()
    //    $(".InputNomeJogador").attr('disabled', 'true');

    }
});

function ContarDinheiro(acao){
    if(acao == 'start'){
        ContadorPontos = window.setInterval('Timer()', 100);
    } else {
        clearInterval(ContadorPontos)
    }

}


function MostraPlacar(){
         $.ajax({
            type: 'GET',
            url: "/contas/rank/",
            success:function(data){
             $("#PerdeuDiv").css("height","400px");
             $(".TextoPerdeu").css("height","200px");
             $(".TextoPerdeu").css("overflow-y","scroll");

             $(".TextoPerdeu").empty()
             $(".TextoPerdeu").append(data)
            }
        });
}


