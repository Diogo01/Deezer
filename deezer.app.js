(function ($){
	'use strict';

	$(function(){ //raccourcie de $ (document).ready()

		$('#search-form').on('submit',function(evt){
			evt.preventDefault();//empeche le navigateur de recharger la page pdt la validation)

			$('#resultats').empty(); //vidage de la div resultat

			var request = $.ajax('http://api.deezer.com/search', {
				data : {
					q : $('#q').val(),
					output : 'jsonp' //demande à deezer du Jsonp
				},
				dataType : 'jsonp' // indique à jQuery qu'il recevera du Jsonp
			});

				request.done(function(response){ // recupere de la reponse complete
					response.data.forEach(function (chanson) { // traitement de chaque chanson

						var $div = $('<div class="col-md-4 musique"></div>');
						$div.append(chanson.title)
							.append('<span class="col-md-12"><img class="img-responsive" id="imgcover" src="' + chanson.album.cover_big +' "></span></br>')
							.append('<span class="col-md-12"><input style="margin:0 5px;float: right;" class="btn btn-default" type="button" data-preview="' + chanson.preview + '" value="play"></span>');

						
						$('#resultats')
							.show()
							.append($div)

							
					});
				});
		});

		$('#resultats').on('click', 'input[data-preview]', function (){
			$('#preview').attr({
				'src' : $(this).attr('data-preview'),
				'autoplay' : true ,
				'alwaysShowControls' : true,
				

			});
		});

	});

})(jQuery)