var cliente = {
	valida : function(funcao){
		$().valida({
			campos : ["nome","telefone","endereco","dataNascimento"],
			retorno : funcao
		});
	},

	cadastrar : function(){
		var params = "nome=" + $("#nome").val() +
					 "&telefone=" + $("#telefone").val() +
					 "&endereco=" + $("#endereco").val() +
					 "&dataNascimento=" + $("#dataNascimento").val();
					 
		var url = "Controlador?command=CadastrarCliente";
		
		var result = function(requisicao){
			$("#pagina").html(requisicao);
			$("#carregando").hide();
		};
		
		$("#carregando").show();
		
		$.ajax({ type: "POST", url: url, data: params, success: result });			;
	},
	
	validaConsulta : function(){
		if ($("#opcoes").val() > 1 && $("#valor").val() != "")
			return true;
		else{
			if ($("#opcoes").val() == 1)
				return true
			else
				return false;
		}
	},
		
	consultar: function(){	
		if (this.validaConsulta()){
			var params = "opcoes=" + $("#opcoes").val() +
						 "&valor=" + $("#valor").val();
						 
			var url = "Controlador?command=ConsultarCliente";
			
			var result = function(requisicao){
				$("#resultado").html(requisicao);
				$("#carregando").hide();
			};
			
			$("#carregando").show();
			
			$.ajax({ type: "POST", url: url, data: params, success: result });	
		} 
		else 
			alert("É preciso preencher o segundo campo");
					
		
	},
	
	desabilita:function(obj){
		if (obj.value > 1)
			$("#valor").attr("disabled",false);
		else
			$("#valor").attr("disabled",true);
		
		$("#valor").val("");
	}
};