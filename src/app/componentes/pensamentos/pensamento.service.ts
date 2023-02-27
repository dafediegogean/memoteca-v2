import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Pensamento } from './pensamento';

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {

  private readonly apiUrl = 'http://localhost:3000/pensamentos';

  constructor(private httpClient: HttpClient) { }

  listar(pagina: number, filtro: string, favoritos: boolean): Observable<Pensamento[]> {
    const itensPorPagina = 5;

    let params = new HttpParams()
      .set("_page", pagina)
      .set("_limit", itensPorPagina);
    
    if (filtro.trim().length > 2) {
      params = params.set("q", filtro);
    }

    if (favoritos) {
      params = params.set("favorito", true);
    }
    
    // 1o forma de se fazer
    //return this.httpClient.get<Pensamento[]>(this.apiUrl, { params: params })  
    // ou quando se tem o nome da propriedade igual, se omite a referencia, se faz a auto referencia
    return this.httpClient.get<Pensamento[]>(this.apiUrl, { params })

    // 2o forma de se fazer
    // GET /posts?_page=5&_limit=20
    //return this.httpClient
    //  .get<Pensamento[]>(`${this.apiUrl}?_page=${pagina}&_limit=${itensPorPagina}`);
  }

  criar(pensamento: Pensamento): Observable<Pensamento> {
    return this.httpClient.post<Pensamento>(this.apiUrl, pensamento);
  }

  editar(pensamento: Pensamento): Observable<Pensamento> {
    const url = `${this.apiUrl}/${pensamento.id}`;
    return this.httpClient.put<Pensamento>(url, pensamento);
  }

  mudarFavorito(pensamento: Pensamento): Observable<Pensamento> {
    pensamento.favorito = !pensamento.favorito;
    return this.editar(pensamento);
  }

  excluir(id: number): Observable<Pensamento> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete<Pensamento>(url);
  }

  buscarPorId(id: number): Observable<Pensamento> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<Pensamento>(url); 
  }

}
