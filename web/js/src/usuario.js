var usuario = {
	valida : function(funcao){
		$().valida({
			campos : ["nome","telefone","endereco","dataNascimento","dataCadastro"],
			retorno : funcao
		});
	},

	verificar : function(){
		var params = "login=" + $("#login").val() +
					 "&senha=" + $("#senha").val();
					 
		var url = "Controlador?command=Login";
		
		var result = function(requisicao){
			$("#pagina").html(requisicao);
			$("#carregando").hide();
		};
		
		$("#carregando").show();
		
		$.ajax({ type: "POST", url: url, data: params, success: result });			;
	},

};