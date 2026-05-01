import { Tarea } from "./tarea";

export class Lista {
    identificador: number;
    nombre: string;
    descripcion: string;
    color: string;
    visible: boolean;
    tareas: Tarea[] = [];
    fecha: string;

    constructor(nombre: string, descripcion: string, color: string, visible: boolean, identificador: number, fecha: string, tareas: Tarea[]) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.color = color;
        this.visible = visible;
        this.identificador = identificador;
        this.fecha = fecha;
        this.tareas = tareas;
    }
}
