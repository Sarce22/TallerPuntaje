import { Injectable } from '@angular/core';
import { User } from './usuario';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private usuarios: User[] = [];

  constructor() { }

  getUsuarios(): User[] {
    return this.usuarios;
  }

  agregarUsuario(nuevoUsuario: User) {
    this.usuarios.push(nuevoUsuario);
  }

  eliminarUsuario(id: number): void {
    const index = this.usuarios.findIndex(user => user.id === id);
    if (index !== -1) {
      this.usuarios.splice(index, 1);
    }
  }
}
