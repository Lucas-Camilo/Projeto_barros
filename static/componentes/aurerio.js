// GLOBAL
	perdeu = false

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
		clearInterval(ContadorPontos)
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
	}


	 var grau_atual = 5;
	 window.ondevicemotion = function(e) {
	 	if(perdeu == false){



		  grau = (event.accelerationIncludingGravity.x * -1);

		  if (grau > 0){
		  grau_atual = grau_atual + 1.5;
		  } else {
		  grau_atual = grau_atual - 1.5;
		  }


		  Rotacionar('Player', grau_atual);
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


