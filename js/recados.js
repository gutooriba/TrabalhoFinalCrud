const logoutBtn = document.getElementById("logout")

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
      const recados = db.filter((e)=> e.userid ===usuarioLogado)
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
            <button onclick="editar(${recado.id})">editar</button>
            <button onclick="remover(${recado.id})">deletar</button>
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
      reset()
     
         
    }
}
function S4() {
  const time = new Date().getTime();
  return Math.floor((1 + Math.random()) * time)
      .toString(16)
      .substring(1);
}
const editar = (id)=>{
  console.log(id)
}
const remover = (id)=>{
  console.log(id)
}

const reset = ()=>{
  document.getElementById("inputDesc").value=""
  document.getElementById("inputDet").value=""

}

