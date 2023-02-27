import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit {

  pensamentos: Pensamento[] = [];
  paginaAtual: number = 1;
  haMaisPensamentos: boolean = true;
  filtro: string = '';
  favoritos: boolean = false;
  pensamentosFavoritos: Pensamento[] = [];
  titulo: string = 'Meu Mural';

  constructor(
    private router: Router,
    private pensamentoService: PensamentoService
  ) { }

  ngOnInit(): void {
    this.pensamentoService.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe((pensamentos) => {
      this.pensamentos = pensamentos;
    });
  }

  isPensamento(): boolean {
    if (this.pensamentos.length == 0) {
      return false;
    }
    return true;
  }

  carregarMaisPensamentos() {
    this.pensamentoService.listar(++this.paginaAtual, this.filtro, this.favoritos)
      .subscribe(pensamentos => {
        this.pensamentos.push(...pensamentos);
        if (!pensamentos.length) {
          this.haMaisPensamentos = false;
        }
      });
  }

  pesquisarPensamentos() {
    this.haMaisPensamentos = true;
    this.paginaAtual= 1;

    this.pensamentoService.listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe(pensamentos => {
        this.pensamentos = pensamentos;
      }); 
  }

  recarregarComponente() {
    this.favoritos = false;
    this.paginaAtual = 1;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }

  listarFavoritos() {
    this.titulo = 'Meus favoritos';
    this.favoritos = true;
    this.haMaisPensamentos = true;
    this.paginaAtual = 1;
    this.pensamentoService.listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe(pensamentosFavoritos => {
        this.pensamentos = pensamentosFavoritos;
        this.pensamentosFavoritos = pensamentosFavoritos; 
      });
  }

}
