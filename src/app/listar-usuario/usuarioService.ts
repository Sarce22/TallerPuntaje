import { Injectable } from '@angular/core';
import { User } from './usuario';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private usuarios: User[] = [];

  constructor() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.usuarios = JSON.parse(storedUsers);
    }
  }

  getUsuarios(): User[] {
    return this.usuarios;
  }


  agregarUsuario(nuevoUsuario: User) {
    
    nuevoUsuario.id = this.usuarios.length + 1;//que aumentara para que no me salieran todos con id=0
  
    this.usuarios.push(nuevoUsuario);
    localStorage.setItem('users', JSON.stringify(this.usuarios));
  }


  eliminarUsuario(id: number) {
    const index = this.usuarios.findIndex(user => user.id === id);
    if (index !== -1) {
      this.usuarios.splice(index, 1);
      localStorage.setItem('users', JSON.stringify(this.usuarios));
    }
  }

  
  actualizarUsuario(user: User) {
    const index = this.usuarios.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.usuarios[index] = user;
      localStorage.setItem('users', JSON.stringify(this.usuarios));
    }
  }

}
