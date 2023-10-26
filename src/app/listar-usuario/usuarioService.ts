import { Injectable } from '@angular/core';
import { User } from './usuario';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private usuarios: User[] = [];

  constructor() {
    // Verifica si hay usuarios almacenados en localStorage y cárgalos
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.usuarios = JSON.parse(storedUsers);
    }
  }

  getUsuarios(): User[] {
    return this.usuarios;
  }

  agregarUsuario(nuevoUsuario: User) {
    const usuarioExistente = this.usuarios.find(user => user.id === nuevoUsuario.id);
    if (usuarioExistente) {
      console.log(`El usuario con ID ${nuevoUsuario.id} ya existe.`);
    } else {
      this.usuarios.push(nuevoUsuario);
      localStorage.setItem('users', JSON.stringify(this.usuarios));
    }
  }
  
  eliminarUsuario(id: number) {
    const index = this.usuarios.findIndex(user => user.id === id);
    if (index !== -1) {
      this.usuarios.splice(index, 1);
      localStorage.setItem('users', JSON.stringify(this.usuarios));
    }
  }

}
