export class Tarea {
    identificador: number;
    nombre: string;
    fecha: string;
    estado: string;

    constructor(identificador: number, nombre: string, fecha: string, estado: string) {
        this.identificador = identificador;
        this.nombre = nombre;
        this.fecha = fecha;
        this.estado = estado;
    }
}
