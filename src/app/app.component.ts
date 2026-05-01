import { Component, OnInit } from '@angular/core';
import { Lista } from './models/lista';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
})

export class AppComponent implements OnInit {
	title = 'appListas';
	msg = "Hola, bienvenido a mi proyecto en Angular";
	habilitarEdicion = false;
	indiceListaModificar = -1;

	//Array de listas general
	listas: Lista[] = [
		new Lista('Compras', 'Lista del súper', 'red', true, 1, "10/02/2025", []),
		new Lista('Trabajo', 'Tareas pendientes', 'blue', false, 2, "12/02/2022", []),
		new Lista('Viaje', 'Cosas para llevar', 'green', false, 3, "10/05/2026", [])
	];

	//lista para enlazar al formulario
	lista: Lista = new Lista("", "", "", true, 0, "", []);

	visible: boolean = false;
	listasVisibles: string = "todas";

	constructor(private modalService: NgbModal) { }

	ngOnInit(): void {
		setTimeout(() => {
			this.msg = "";
		}, 5000)
	}

	formalizarColor(lista: Lista): Lista {
		if (lista.color === "rojo") {
			lista.color = 'red';
		} else if (lista.color === "verde") {
			lista.color = 'green';
		} else if (lista.color === "azul") {
			lista.color = 'blue';
		} else if (lista.color === "amarillo") {
			lista.color = 'yellow';
		} else if (lista.color === "naranja") {
			lista.color = 'orange';
		}

		return lista;
	}

	formatearFecha(fecha: Date): string {
		const dia = String(fecha.getDate()).padStart(2, '0');
		const mes = String(fecha.getMonth() + 1).padStart(2, '0');
		const anio = fecha.getFullYear();
		return `${dia}/${mes}/${anio}`;
	}

	//el formLista no seria un object con muchos datos dentro?
	onSubmit(formLista: any): void {
		if (formLista.valid) {
			if (!this.habilitarEdicion) {
				//Normalizar valores
				var cantidad = this.listas.length;
				var identificador = this.listas[this.listas.length - 1].identificador + 1;

				//Poner valores a la lista nueva
				this.lista = this.formalizarColor(this.lista);
				this.lista.identificador = identificador;

				//Añadir al array
				this.listas.push({ ...this.lista });
				formLista.reset();

				this.lista = new Lista("", "", "", true, 0, this.formatearFecha(new Date()), []);

				if (cantidad + 1 == this.listas.length)
					this.msg = "Se ha añadido correctamente la lista"
				else
					this.msg = "No se ha podido añadir a la lista general"
			}
			else {
				this.lista = this.formalizarColor(this.lista);
				this.lista.fecha = this.formatearFecha(new Date());
				this.listas[this.indiceListaModificar] = { ...this.lista };
				this.msg = "Se ha actualizado correctamente la lista";
			}

		}
	}

	eliminar(lista: Lista): void {
		this.listas = this.listas.filter(l => l != lista);
		this.msg = "Se ha eliminado correctamente la lista";
	}

	actualizar(lista: Lista): void {
		this.lista = { ...lista };
		this.indiceListaModificar = this.listas.indexOf(lista);
		this.habilitarEdicion = true;
		this.visible = true;
	}

	cambiarVisibilidad(lista: Lista): void {
		this.listas = this.listas.map(l => {
			if (l.identificador == lista.identificador) {
				return { ...l, visible: !l.visible };
			}
			return l;
		})
	}

	//Getter --> como una propiedad calculada
	get listasFiltradas(): Lista[] {
		if (this.listasVisibles === 'visibles') {
			return this.listas.filter(l => l.visible);
		}
		if (this.listasVisibles === 'ocultas') {
			return this.listas.filter(l => !l.visible);
		}
		return this.listas;
	}

	abrirModal(modal: any, lista: Lista) {
		this.modalService.open(modal).result.then(
			(res) => {
				if (res === 'ok') {
					this.eliminar(lista);
				}
			},
			() => { }
		);
	}
}