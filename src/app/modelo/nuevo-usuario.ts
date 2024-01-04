export class NuevoUsuario {
    nombre: string = '';
    email: string = '';
    usuario: string = '';
    password: string = '';
    
    constructor(nombre: string, email: string, usuario: string, password: string){
        this.nombre = nombre;
        this.email = email;
        this.usuario = usuario;
        this.password = password;
    }
}
