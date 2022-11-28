const logoutBtn = document.getElementById("logout")
const recadoid = document.getElementById("recadoid")
const inputDesc = document.getElementById("inputDesc")
const inputDet = document.getElementById("inputDet")

logoutBtn.addEventListener("click", logout)
 
function logout(){
    localStorage.removeItem("logado");
    window.location.href = "login.html"

}
window.addEventListener("load", redirecionaIfnotLogado)

function redirecionaIfnotLogado()
{
const notUser = localStorage.getItem("logado" ) === null

if(notUser){
window.location.href = "login.html"

}else{
  preencherTabela()
}
}

const preencherTabela = () =>{
  let tbody = document.getElementById("tbody")
  let db = JSON.parse(localStorage.getItem("recados") || "[]");
     
    const usuarioLogado = localStorage.getItem("logado")//Pegou o email logado 

    if(!db.length ){
      document.querySelector(".table").style.display="none"
      document.querySelector("#recadodefault").style.display="block"

    }else{
      const recados = db.filter((e)=> e.userid === usuarioLogado)
      document.querySelector(".table").style.display="block"
      document.querySelector("#recadodefault").style.display="none"
      tbody.innerHTML = "";
      let id = 1;
    for(const recado of  recados){
      tbody.innerHTML += `
        <tr>
          <td>${id}</td>
          <td>${recado.descricao}</td>
          <td>${recado.detalhes}</td>
          
          <td>
            <button onclick="editar('${recado.id}')">Editar</button>
            <button onclick="remover('${recado.id}')">Deletar</button>
          </td>
        </tr>
      `
      id++
    }   
    }
}

const botaoSalvar = document.getElementById("btnSalvar")
botaoSalvar.addEventListener("click", ()=>saveRecado())

const saveRecado = ()=>{
  let db = JSON.parse(localStorage.getItem("recados") || "[]");

  if(recadoid.value.length>0){ 
  const recado = db.find(e=>e.id === recadoid.value)
  recado.descricao = inputDesc.value
  recado.detalhes = inputDet.value
  localStorage.setItem("recados", JSON.stringify(db))
  
  preencherTabela()

  }else{
  const usuarioLogado = localStorage.getItem("logado")
  let desc = document.getElementById("inputDesc").value
  let det = document.getElementById("inputDet").value
  
  if(!desc || !det){
  alert("Campos Vazios!")
    }else{
      const mensagem = {
        id:S4()+S4(),
        descricao: desc,
        detalhes: det,
        userid: usuarioLogado
      }
      db.push(mensagem)
      localStorage.setItem("recados", JSON.stringify(db))
      preencherTabela()
     
     
         
    }}
    reset()
}
function S4() {
  const time = new Date().getTime();
  return Math.floor((1 + Math.random()) * time)
      .toString(16)
      .substring(1);
}
const editar = (id)=>{
  const db = JSON.parse(localStorage.getItem("recados") || "[]");
  const recado = db.find(e=>e.id ===id)
inputDesc.value = recado.descricao
inputDet.value = recado.detalhes
  recadoid.value = recado.id
 
}
const remover = (id)=>{
if(  confirm("Deseja excluir o recado?")){
 const db = JSON.parse(localStorage.getItem("recados") || "[]");
  const index = db.map(e=>e.id).indexOf(id)//localiza a posição do recado 
  db.splice(index, 1)
  localStorage.setItem("recados", JSON.stringify(db))//atualiza o local storage
  preencherTabela()

  
}}

const reset = ()=>{
  document.getElementById("inputDesc").value=""
  document.getElementById("inputDet").value=""
  recadoid.value = ""

}

