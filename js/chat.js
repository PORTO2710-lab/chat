let grupoActual = "grupo1";

window.onload = () => {
  cargarMensajes();
};

function cambiarGrupo(grupo) {
  grupoActual = grupo;
  document.getElementById("grupoActivo").textContent = 
    "Grupo " + grupo.replace("grupo", "");
  cargarMensajes();
}

function enviarMensaje() {
  const usuario = document.getElementById("inputUsuario").value.trim();
  const texto = document.getElementById("inputMensaje").value.trim();

  if (!usuario) {
    alert("Ingresa un nombre de usuario.");
    return;
  }

  if (!texto) return;

  const mensaje = {
    usuario: usuario,
    texto: texto
  };

  let mensajes = JSON.parse(localStorage.getItem(grupoActual)) || [];
  mensajes.push(mensaje);
  localStorage.setItem(grupoActual, JSON.stringify(mensajes));

  document.getElementById("inputMensaje").value = "";
  cargarMensajes();
}

function cargarMensajes() {
  const contenedor = document.getElementById("mensajes");
  contenedor.innerHTML = "";

  let mensajes = JSON.parse(localStorage.getItem(grupoActual)) || [];

  mensajes.forEach(m => {
    const div = document.createElement("div");
    div.classList.add("mensaje");
    div.innerHTML = `<span class="usuario">${m.usuario}</span>: ${m.texto}`;
    contenedor.appendChild(div);
  });

  contenedor.scrollTop = contenedor.scrollHeight;
}
