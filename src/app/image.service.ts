import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Image} from './image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  // private baseUrl = 'http://localhost:8080/picture';
  // private urlToBox = 'http://localhost:8080/drop';
  private baseUrl = 'https://osr-azure.herokuapp.com/picture';
  private urlToBox = 'https://osr-azure.herokuapp.com/drop';
  constructor( private httpClient: HttpClient) { }
  // @ts-ignore
  public getImageList(): Observable<Image[]>{
    return this.httpClient.get<Image[]>(`${this.baseUrl}`);
  }
  public getImageById(id: number): Observable<Image>{
    return this.httpClient.get<Image>(`${this.baseUrl}/${id}`);
  }
  public getLanguage(): Observable<string[]>{
    return this.httpClient.get<string[]>(`${this.baseUrl}/lang`);
  }
  public addNewImageForRead(image: Image): Observable<Image>{
    return this.httpClient.post<Image>(`${this.baseUrl}`, image);
  }
  public saveImage(image: Image): Observable<Image>{
    return this.httpClient.put<Image>(`${this.baseUrl}`, image);
  }
  public addImageToStorage(formData: FormData): Observable<Image>{
    return this.httpClient.post<Image>(`${this.urlToBox}`, formData);
  }
}
