let mensagens;
let mensagem;
entrar();
function entrar(){
    const nome = prompt("Qual seu nome?");
    const obj = {name: nome};
    const promisse = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants",obj)
    promisse.then(carregarMensagens);
    promisse.catch(tratarErro);

}

function tratarErro(erro){
    console.log("Status code: " + erro.response.status);
    alert("Insira outro nome, este já está em uso");
    entrar();
}

function carregarMensagens(){
    const promisse = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    console.log(promisse);
    promisse.then(renderizarMensagens);
}



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
                                        <p class="text-mensagem">${mensagem.text}</p>
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
    document.querySelector(".todas-mensagens").scrollIntoView(false);
    setTimeout(function () {
        mensagens="";
        carregarMensagens(response);
    }, 4000);
    
}
function rolar(){
    const elementoQueQueroQueApareca = document.querySelector('.mensagem');
    elementoQueQueroQueApareca.scrollIntoView();
    console.log(ultimaMensagem)
}