import { Component } from '@angular/core';
import { User } from '../listar-usuario/usuario';
import { UserService } from '../listar-usuario/usuarioService';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent {

  users: User[] = [];

  constructor(private usuarioService: UserService) {
    // Obtener la lista de usuarios desde el servicio
    this.users = usuarioService.getUsuarios();
  }



  eliminarUsuario(user: User) {
    Swal.fire({
      title: '¿Estás seguro?',              //Mostrar en la ventana emergente el nombre y apellido del usuario
      text: `¿Deseas eliminar al usuario ${user.nombre} ${user.apellidos}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuarioService.eliminarUsuario(user.id);
        Swal.fire('Usuario eliminado', '', 'success');
      }
    });
  }

  //Con modal, en el sweetalert replicamos los campos y ponemos los valores del usuario
  editarUsuario(user: User) {
    Swal.fire({
      title: 'Editar Usuario',
      //Es el "html" que sale en el modal usando el sweetalert y los campos se inician con el usuario seleccionado
      html: `
      <label for="nombre">Nombre:</label>
        <input id="nombre" class="swal2-input" value="${user.nombre}" required>
        <label for="apellido">Apellido:</label>
        <input id="apellidos" class="swal2-input" value="${user.apellidos}" required>
        <label for="email">Email:</label>
        <input id="email" class="swal2-input" value="${user.email}" required>
        <label for="tipo-usuario">Tipo de Usuario:</label>
        <select id="tipoUsuario" class="swal2-select" required>
        <option value="Admin" ${user.tipo === 'Admin' ? 'selected' : ''}>Admin</option>
        <option value="Vendedor" ${user.tipo === 'Vendedor' ? 'selected' : ''}>Vendedor</option>
        <option value="Cliente" ${user.tipo === 'Cliente' ? 'selected' : ''}>Cliente</option>
        </select>
        <label for="fecha-creacion">Fecha de Creación:</label>
        <input type="date" class="swal2-input" value="${user.fechaCreacion}" required>
        <label for="observaciones">Observaciones:</label>
        <textarea id="observaciones" class="swal2-textarea">${user.observaciones}</textarea>

        <style>
          label{
            font-weight:800;
          }
        </style>
      `,

      
      confirmButtonText: 'Guardar',
      showCancelButton: true, // true Para que aparezca el boton
      cancelButtonText: 'Regresar',


    }).then((result) => {
      if (result.isConfirmed) {
        const nombre = (<HTMLInputElement>document.getElementById('nombre')).value;
        const apellidos = (<HTMLInputElement>document.getElementById('apellidos')).value;
        const email = (<HTMLInputElement>document.getElementById('email')).value;
        const tipoUsuario = (<HTMLSelectElement>document.getElementById('tipoUsuario')).value;
        const observaciones = (<HTMLInputElement>document.getElementById('observaciones')).value;

        user.nombre = nombre;
        user.apellidos = apellidos;
        user.email = email;
        user.tipo = tipoUsuario;
        user.observaciones = observaciones;

        this.usuarioService.actualizarUsuario(user);

        Swal.fire('Cambios guardados con exito', 'Usuario fue editado', 'success');
      }
    });
  }


}
