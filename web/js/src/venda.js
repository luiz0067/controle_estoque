var venda = {
	ListaItens : new Array(),
	qtd : 0,
	
	/**
	 *VALIDA AO ADICIONAR O ITEM
	 *@param funcao - uma função que será chamada caso a validação esteja certa
	 */
	validaAdicionar : function(funcao){
		$().valida({
			campos : ["produto","quantidade"],
			retorno : funcao
		});
	},	
	
	/**
	 *ADICIONA UM ITEM A LISTA, VERIFICANDO A SUA DISPONIBILIDADE NO ESTOQUE
	 */
	adicionar:function(){
		var params = "codigo=" + $("#produto").val() +
					 "&quantidade=" + $("#quantidade").val();
					 
		var url = "Controlador?command=AdicionarItem";
		
		var result = function(requisicao){
			//alert(requisicao.valor);
			requisicao = eval("(" +requisicao+")");
			if (requisicao.produto != null){
				venda.adicionaLista(requisicao);
				venda.imprimeLista();
			} else {
				alert("O produto não existe!");
			}			
			
			$("#carregando").hide();
			
			$("#quantidade, #produto").val("");			
		};
		
		$("#carregando").show();
		
		$.ajax({ type: "POST", url: url, data: params, success: result });				
	},
	
	validaConsulta:function(){
		if ($("#datainicio").val() != "" && $("#datafim").val() != "")
			return true;
		else
			return false;
	},
	
	consultar:function(){
		if (this.validaConsulta()){
			var params = "dtini=" + $("#datainicio").val() +
						 "&dtfim=" + $("#datafim").val();
						 
			var url = "Controlador?command=ConsultarFluxo";
			
			var result = function(requisicao){
				$("#resultado").html(requisicao);
				
				$("#carregando").hide();			
			};
			
			$("#carregando").show();
			
			$.ajax({ type: "POST", url: url, data: params, success: result });
		}		
		else
			alert("Todos os campos tem que ser preenchidos!");	
	},
	
	/**
	 *FINALIZA A VENDA
	 */	
	finalizar:function(){
		if ($("#formapgto").val() != "" && this.qtd > 0){
			var params = "formapgto=" + $("#formapgto").val();
			var valorTotal = 0;
					
			for (i=0;i<this.qtd; i++){
				params += "&codigo" + i + "=" + this.ListaItens[i].produto.codigo +
						  "&quantidade" + i + "=" + this.ListaItens[i].produto.quantidade;
				valorTotal += this.ListaItens[i].valor;						  
			}
			
			params += "&quantidade=" + this.qtd + 
					  "&total=" + valorTotal;
					  
			var url = "Controlador?command=FinalizarVenda";
			
			var result = function (requisicao){			
				$("#pagina").html(requisicao);	
				$("#carregando").hide();			
			}
			$("#carregando").show();
			
			$.ajax({ type: "POST", url: url, data: params, success: result });			
		} else {
			alert("É necessário ter algum item e preencher a forma de pagamento!");
		}
		
		
	},

	/**
	 *ADICIONA UM ITEM A LISTAITENS
	 */	
	adicionaLista:function(json){
		this.ListaItens[this.qtd] = json;
		this.qtd++; 
	},
	
	/**
	 *RETIRA UM ITEM DA LISTAITEMS
	 */	
	retiraLista:function(cod){
		if (this.qtd > 0){
			for (i=0; i<this.qtd; i++){
				if (this.ListaItens[i].produto.codigo == cod){
					this.ListaItens.splice(i,1);
					this.qtd--;
				}
			}
		}
		
		this.imprimeLista();
	},
	
	/**
	 *lIMPAR LISTAITEMS
	 */	
	limparLista:function(cod){
		for (i=0; i<this.qtd; i++){
			this.ListaItens.splice(i,1);
		}
		this.qtd = 0;		
		$("#resultado").html("");
	},	
	
	/**
	 *IMPRIME A LISTAITENS
	 */	
	imprimeLista:function(){
		total = 0;
		val = "<table border='1' class='tabela'>";

		val += "<tr>" +
			    "<th>Item</th>" +
			    "<th>Código</th>" +
			    "<th>Produto</th>" +
			    "<th>Qtd</th>" +
			    "<th>Valor</th>" +
			    "<th>&nbsp;</th>" +
			  "</tr>";		
		for (i=0; i<this.qtd; i++){
			val += "<tr>" +
				    "<td>"+(i+1)+"</td>" +
				    "<td>"+this.ListaItens[i].produto.codigo+"</td>" +
				    "<td>"+this.ListaItens[i].produto.nome+"</td>" +
				    "<td>"+this.ListaItens[i].produto.quantidade+"</td>" +
				    "<td>"+this.ListaItens[i].valor+"</td>" +
				    "<td><a href='javascript:venda.retiraLista("+this.ListaItens[i].produto.codigo+")'>x</a></td>" +
				  "</tr>";
			total += this.ListaItens[i].valor;		
		}		
		
		val +="<tr><td colspan='4' align='right'><b>Total</b></td><td colspan='4' align='right'>"+total+"</td></tr>"
		val += "</table>";
		
		$("#resultado").html(val);
	}	
};