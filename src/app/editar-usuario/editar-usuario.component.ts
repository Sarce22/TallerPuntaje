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
      title: '¿Estás seguro?',
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
  
}
