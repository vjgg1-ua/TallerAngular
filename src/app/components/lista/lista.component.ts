import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Lista } from '../../models/lista';
import { Tarea } from '../../models/tarea';

@Component({
    selector: 'app-lista',
    templateUrl: './lista.component.html',
    //styleUrl: './lista.component.css'
})

export class ListaComponent {
    @Input() lista!: Lista;
    @Output() eliminar = new EventEmitter<void>();
    @Output() actualizar = new EventEmitter<void>();
    @Output() cambiarVisibilidad = new EventEmitter<void>();
    @Output() guardar = new EventEmitter<void>();


    visible: boolean = false;
    tarea: Tarea = new Tarea(0, "", "", "incompleta");

    eliminarLista() {
        this.eliminar.emit();
    }

    actualizarLista() {
        this.actualizar.emit();
    }

    cambiarVisibilidadLista() {
        this.cambiarVisibilidad.emit();
    }

    eliminarTarea(tarea: Tarea): void {
        this.lista.tareas = this.lista.tareas.filter(t => t != tarea);
    }

    onSubmit(formTarea: any): void {
        if (formTarea.valid) {
            this.lista.tareas.push({ ...this.tarea });
        }

        this.visible = false;
        formTarea.reset();
        this.tarea = new Tarea(0, "", "", "incompleta");
        
        this.guardar.emit(); // Para que se guarden las tareas tmb        
    }

    completarTarea(tarea: Tarea): void {
        console.log("llega", tarea);
        this.lista.tareas = this.lista.tareas.map(t => {
            if (t === tarea) {
                return { ...t, estado: 'completa' };
            }
            return t;
        });
    }
}
