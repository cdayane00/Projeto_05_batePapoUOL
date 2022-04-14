function carregarMensagens(){

    const promisse = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    console.log(promisse);
    promisse.then(renderizarMensagens);
    /*setTimeout(function(){
        window.location.reload(1);
     }, 3000);*/
}

let mensagens;
let mensagem;

function renderizarMensagens(response){
    console.log(response.data);
    mensagens = document.querySelector(".todas-mensagens");
    console.log(response.data.length);
    for(let i=0; i<response.data.length;i++){
        mensagem = response.data[i];
        if(mensagem.type == 'status'){
            mensagens.innerHTML += `<div class="fundo-mensagemSaiOuEntra">
                                        <p class="time-mensagem">(${mensagem.time})</p>
                                        <p class="from-mensagem">${mensagem.from}</p>
                                        <p class="text-mensagem">${mensagem.text} ${i}</p>
                                    </div>`
        }
        else if(mensagem.type == 'message' && mensagem.to === 'Reservadamente'){
            mensagens.innerHTML += `<div class="fundo-mensagemReservada">
                                        <p class="time-mensagem">(${mensagem.time})</p>
                                        <p class="from-mensagem">${mensagem.from} </p>
                                        <p class="text-mensagem">para</p>
                                        <p class="to-mensagem">${mensagem.to}:</p>
                                        <p>:</p>
                                        <p class="text-mensagem">${mensagem.text}</p>
                                    </div>`
        }
        else{
            mensagens.innerHTML += `<div class="fundo-mensagemNormal">
                                        <p class="time-mensagem">(${mensagem.time})</p>
                                        <p class="from-mensagem">${mensagem.from} </p>
                                        <p class="text-mensagem">para</p>
                                        <p class="to-mensagem">${mensagem.to}</p>
                                        <p>:</p>
                                        <p class="text-mensagem">${mensagem.text}</p>
                                    </div>`
        }
       
    }
}