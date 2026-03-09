let grupoActual = "grupo1";

window.onload = () => {
  cargarMensajes();
};

function cambiarGrupo(grupo, el) {
  grupoActual = grupo;
  const num = grupo.replace("grupo", "");
  document.getElementById("grupoActivo").textContent = "GRUPO " + num;

  // Tabs activo
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  if (el) el.classList.add("active");

  cargarMensajes();
}

function actualizarNombre(val) {
  const display = document.getElementById("userNameDisplay");
  const status  = document.getElementById("statusUser");
  const nombre  = val.trim().toUpperCase() || "ANONIMO";
  display.textContent = nombre;
  status.textContent  = nombre;
}

function enviarMensaje() {
  const usuario = document.getElementById("inputUsuario").value.trim();
  const texto   = document.getElementById("inputMensaje").value.trim();

  if (!usuario) {
    alert("// ERROR: ingresa un nombre de usuario.");
    return;
  }
  if (!texto) return;

  const ahora = new Date();
  const hora  = ahora.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });

  const mensaje = { usuario, texto, hora };

  let mensajes = JSON.parse(localStorage.getItem(grupoActual)) || [];
  mensajes.push(mensaje);
  localStorage.setItem(grupoActual, JSON.stringify(mensajes));

  document.getElementById("inputMensaje").value = "";
  cargarMensajes();
}

function cargarMensajes() {
  const contenedor = document.getElementById("mensajes");
  contenedor.innerHTML = "";

  const mensajes = JSON.parse(localStorage.getItem(grupoActual)) || [];

  mensajes.forEach(m => {
    const div = document.createElement("div");
    div.classList.add("mensaje");
    div.innerHTML = `
      <span class="usuario">${m.usuario}</span>
      <div class="msg-text">${m.texto}</div>
      ${m.hora ? `<div class="msg-time">// ${m.hora}</div>` : ""}
    `;
    contenedor.appendChild(div);
  });

  contenedor.scrollTop = contenedor.scrollHeight;
}
