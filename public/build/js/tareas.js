!function(){!async function(){try{const t="/api/tareas?url="+d(),a=await fetch(t),n=await a.json();e=n.tareas,o()}catch(e){console.log(e)}}();let e=[],t=[];document.querySelector("#agregar-tarea").addEventListener("click",(function(){n()}));function a(a){const n=a.target.value;t=""!==n?e.filter(e=>e.estado===n):[],o()}function o(){!function(){const e=document.querySelector("#listado-tareas");for(;e.firstChild;)e.removeChild(e.firstChild)}(),function(){const t=e.filter(e=>"0"===e.estado),a=e.filter(e=>"1"===e.estado),o=document.querySelector("#pendientes"),n=document.querySelector("#completadas");0===t.length?o.disabled=!0:o.disabled=!1;0===a.length?n.disabled=!0:n.disabled=!1}();const a=t.length?t:e;if(0===a.length){const e=document.querySelector("#listado-tareas"),t=document.createElement("LI");return t.textContent="No hay Tareas",t.classList.add("no-tareas"),void e.appendChild(t)}const r={0:"Pendiente",1:"Completa"};a.forEach(t=>{const a=document.createElement("LI");a.dataset.tareaId=t.id,a.classList.add("tarea");const i=document.createElement("P");i.textContent=t.nombre,i.onclick=function(){n(!0,{...t})};const s=document.createElement("DIV");s.classList.add("opciones");const l=document.createElement("BUTTON");l.classList.add("estado-tarea"),l.classList.add(""+r[t.estado].toLowerCase()),l.textContent=r[t.estado],l.dataset.estadoTarea=t.estado,l.onclick=function(){!function(e){console.log(e);const t="1"===e.estado?"0":"1";e.estado=t,c(e)}({...t})};const u=document.createElement("BUTTON");u.classList.add("eliminar-tarea"),u.dataset.idTrea=t.id,u.textContent="Eliminar",u.onclick=function(){!function(t){Swal.fire({title:"¿Quieres Eliminar la Tarea?",showCancelButton:!0,confirmButtonText:"Si",cancelButtonText:"No"}).then(a=>{a.isConfirmed&&async function(t){const{estado:a,id:n,nombre:r}=t,c=new FormData;c.append("id",n),c.append("nombre",r),c.append("estado",a),c.append("proyectoId",d());try{const a="http://localhost:3000/api/tarea/eliminar",n=await fetch(a,{method:"POST",body:c}),r=await n.json();r.resultado&&(Swal.fire("Eliminada!",r.mensaje,"success"),e=e.filter(e=>e.id!==t.id),o())}catch(e){console.log(e)}}(t)})}({...t})},s.appendChild(l),s.appendChild(u),a.appendChild(i),a.appendChild(s);document.querySelector("#listado-tareas").appendChild(a)})}function n(t=!1,a={}){const n=document.createElement("DIV");n.classList.add("modal"),n.innerHTML=`\n            <form class="formulario nueva-tarea">\n                <legend>${t?"Editar Tarea":"Añade una nueva tarea"}</legend>\n                <div class="campo">\n                    <label>Tarea</label>\n                    <input\n                        type="text"\n                        name="tarea"\n                        placeholder="${t?"Edita el Nombre":"Añadir Tarea al Proyecto Actual"}"\n                        id="tarea"\n                        value="${a.nombre?a.nombre:""}"\n                    />\n                </div>\n                <div class="opciones">\n                    <input type="submit" class="submit-nueva-tarea" value="${t?"Guardar Cambios":"Añadir Tarea al Proyecto"}" />\n                    <button type="button" class="cerrar-modal">Cancelar</button>\n                </div>\n\n            </form>\n        `,setTimeout(()=>{document.querySelector(".formulario").classList.add("animar")},10),n.addEventListener("click",(function(i){if(i.preventDefault(),i.target.classList.contains("cerrar-modal")){document.querySelector(".formulario").classList.add("cerrar"),setTimeout(()=>{n.remove()},200)}if(i.target.classList.contains("submit-nueva-tarea")){const n=document.querySelector("#tarea").value.trim();if(""===n)return void r("El Nombre de la Tarea es Obligatorio","error",document.querySelector(".formulario legend"));t?(a.nombre=n,c(a)):async function(t){const a=new FormData;a.append("nombre",t),a.append("proyectoId",d());try{const n="http://localhost:3000/api/tarea",c=await fetch(n,{method:"POST",body:a}),d=await c.json();if(r(d.mensaje,d.tipo,document.querySelector(".formulario legend")),"exito"===d.tipo){const a=document.querySelector(".modal");setTimeout(()=>{a.remove()},2e3);const n={id:String(d.id),nombre:t,estado:"0",proyectoId:d.proyectoId};e=[...e,n],o()}}catch(e){console.log(e)}}(n)}})),document.querySelector(".dashboard").appendChild(n)}function r(e,t,a){const o=document.querySelector(".alerta");o&&o.remove();const n=document.createElement("DIV");n.classList.add("alerta",t),n.textContent=e,a.parentElement.insertBefore(n,a.nextElementSibling),setTimeout(()=>{n.remove()},5e3)}async function c(t){const{estado:a,id:n,nombre:r,proyectoId:c}=t,i=new FormData;i.append("id",n),i.append("nombre",r),i.append("estado",a),i.append("proyectoId",d());try{const t="http://localhost:3000/api/tarea/actualizar",c=await fetch(t,{method:"POST",body:i}),d=await c.json();if("exito"===d.respuesta.tipo){Swal.fire(d.respuesta.mensaje,"Tarea Actualizada","success");const e=document.querySelector(".modal");e&&e.remove()}e=e.map(e=>(e.id===n&&(e.estado=a,e.nombre=r),e)),o()}catch(e){console.log(e)}}function d(){const e=new URLSearchParams(window.location.search);return Object.fromEntries(e.entries()).url}document.querySelectorAll('#filtros input[type="radio"]').forEach(e=>{e.addEventListener("input",a)})}();