import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface MenuItem {
  ItemName: string;
  Description: string;
  Price: number;
  Category: string;
  Id: number;
  CreatedOn: string;
  UpdatedOn: string;
}

interface MenuItemsResponse {
  items: MenuItem[];
}

interface CreateMenuItemPayload {
  itemName: string;
  description: string;
  price: number;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class MenuItemsService {
  private apiUrl = 'http://localhost:14289/front/api/MenuItem';
  private token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjM0MTE2MDEsIm5iZiI6MzQxMDI1MjI2OSwiZXhwIjozNDEwMjU1ODY5LCJhdWQiOiJzZDQ1NHZzZHZzNTM0YnNhIiwiaXNzIjoiaHR0cHM6Ly9yZXN0dXJhbnQtb2F1dGguY29tIiwic3ViIjoiOWI0NmM1NjQtZmEyMy0xMWVkLWFlODUtN2IxNDI4MDBhYjFiIiwianRpIjoiZmZjMzk1YmE4YjI3NmQ1ZDA1YjMxZWI0MWFiMGIzMDk3YmViNTFjMWFmMTZmYmY2M2ViMzExOGZlYjRkOTBlZGVhNWY5ZjA2MzY2ZTYwNDcifQ.FZvKGdDboslbAg2N1rbPMfjDzbQ179gUnyuBqDzsrt8062KVyiv5BkTkzNzmmvoLBYNq734xXRE_zzQn_dLjHrwf6xGbpI-sEthxBR_JAyHdnJfG2MDrNfmtC_BTChUN0BJ-9kK4-1wXAZehrcBuxbxEZRmyllHJIR90Cj_y5hcD4eK5igmhDx1AseMM_unXerqnLTXKAngZOa-c7IJItRIjX5_Umz-y63sex7eIbqKYHKGEz5leUBKjHX6IVdYko5cfX1zfXohnzR6pSXPFyLyd1xFjsnQrEpjREyrdwtrEZtBM9QNWNqcrk1bktwLVBdlDZwt7AJAeEOs_mOuGSg';

  constructor(private http: HttpClient) { }

  getMenuItems(): Observable<MenuItemsResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<MenuItemsResponse>(`${this.apiUrl}/Get`, { headers });
  }

  createMenuItem(payload: CreateMenuItemPayload): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post(`${this.apiUrl}/Insert`, payload, { headers });
  }

  deleteMenuItem(menuItemId: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.delete(`${this.apiUrl}/DeleteById/${menuItemId}`, { headers });
  }
}