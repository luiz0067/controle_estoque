var produto = {
	valida : function(funcao){
		$().valida({
			campos : ["nome","tipo","quantidade","fornecedor"],
			retorno : funcao
		});
	},

	cadastrar : function(){
		var params = "tipo=" + $("#tipo").val() +
					 "&nome=" + $("#nome").val() +
					 "&descricao=" + $("#descricao").val() +
					 "&preco=" + $("#preco").val() +
					 "&quantidade=" + $("#quantidade").val() +
					 "&fornecedor=" + $("#fornecedor").val() +
					 "&revista=" + $("#revista").attr("checked")+
					 "&periodicidade=" + $("#periodicidade").val() +
					 "&edicao=" + $("#edicao").val();
					 
		var url = "Controlador?command=CadastrarProduto";
		
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
					 
		var url = "Controlador?command=ConsultarProduto";
		
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
	},
	
	exibirRevista:function(){
		if ($("#revista").attr("checked"))
			$("#contRevista").show();
		else
			$("#contRevista").hide();
	}
};