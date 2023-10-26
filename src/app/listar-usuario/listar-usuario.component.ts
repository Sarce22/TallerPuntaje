import { Component } from '@angular/core';
import { User } from './usuario';
import { UserService } from './usuarioService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent {

  agregarFormulario!: FormGroup;
  users: User[] = []; 
  nuevoUsuario: User = new User(); 
//Inyeccion para poder persistir el mismo array en diferentes componentes
  constructor(private usuarioService: UserService, private fb: FormBuilder) { }

  ngOnInit(){
    this.agregarFormulario = this.iniciarFormulario();
  }

  iniciarFormulario(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellidos: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      tipo: ['', [Validators.required]],
      fechaCreacion: ['', Validators.required],
      observaciones: ['', [Validators.required]]
    });
  }

  agregarUsuario() {
    if (this.agregarFormulario.valid) {
      this.nuevoUsuario = { ...this.nuevoUsuario, ...this.agregarFormulario.value };
      this.usuarioService.agregarUsuario(this.nuevoUsuario);
      this.nuevoUsuario = new User();
      this.agregarFormulario.reset();
      Swal.fire({
        icon: 'success',
        title: 'Se registró con éxito',
        text: 'Puedes continuar'
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Completa los campos',
        text: 'Algo ha salido mal :(',
      });
    }
  }
}
