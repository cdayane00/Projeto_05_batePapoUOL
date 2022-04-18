let mensagens;
let mensagem;
let nome;
let obj;
let objMsg;
entrar();

function entrar(){
    nome = prompt("Qual seu nome?");
    obj = {name: nome};
    const promisse = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants",obj)
    promisse.then(manterConexao);
    promisse.catch(tratarErroEntrada);
}

function tratarErroEntrada(erro){
    console.log("Status code: " + erro.response.status);
    alert("Insira outro nome, este já está em uso");
    entrar();
}

function manterConexao(){
    const usuario = {name: nome}
    const promisse = axios.post("https://mock-api.driven.com.br/api/v6/uol/status",usuario);
    promisse.then(carregarMensagens);
    promisse.catch(tratarErro);
}
setInterval(manterConexao,4000);

function tratarErro(){
    console.log("Status code: " + erro.response.status);
    window.location.reload()
    entrar();
}

function enviarMensagem(){
    let msg = document.querySelector(".texto").value;
    objMsg = {from: nome,
              to: "Todos",
              text: msg,
              type: "message"}
    const promisse = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages",objMsg);
    promisse.then(carregarMensagens);
    let limpa = document.querySelector(".texto");
    limpa.value = "";
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
        else if(mensagem.type == 'private_message'){
            if(mensagem.to === nome){
                mensagens.innerHTML += `<div class="fundo-mensagemReservada">
                                        <p class="time-mensagem">(${mensagem.time})</p>
                                        <p class="from-mensagem">${mensagem.from} </p>
                                        <p class="text-mensagem">para</p>
                                        <p class="to-mensagem">${mensagem.to}:</p>
                                        <p>:</p>
                                        <p class="text-mensagem">${mensagem.text}</p>
                                    </div>`
            }   
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



/*setInterval(function () {
    const promisse = axios.post("https://mock-api.driven.com.br/api/v6/uol/status",obj);
    promisse.then(carregarMensagens);
}, 4000);*/

function rolar(){
    const elementoQueQueroQueApareca = document.querySelector('.mensagem');
    elementoQueQueroQueApareca.scrollIntoView();
    console.log(ultimaMensagem)
}

