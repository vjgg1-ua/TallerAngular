import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Tarea } from "../../models/tarea";

@Component({
    selector: 'app-tarea',
    templateUrl: './tarea.component.html'
})
export class TareaComponent {
    @Input() tarea!: Tarea;
    @Output() eliminar = new EventEmitter<void>();
    @Output() completada = new EventEmitter<void>();

    eliminarTarea() {
        this.eliminar.emit();
    }

    completarTarea() {
        this.completada.emit();
    }
}
