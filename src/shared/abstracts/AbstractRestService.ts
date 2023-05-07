import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export default abstract class AbstractRestService<T> {
  constructor(
    private _http: HttpClient,
    protected _url: string,
    private _collection$: BehaviorSubject<T[]>
  ) {
    this.getAll();
  }

  public get collection$(): BehaviorSubject<T[]> {
    return this._collection$;
  }

  getAll() {
    this._http.get<T[]>(this._url).subscribe({
      next: (result) => this.collection$.next(result),
      error: (error) => console.log(error),
      complete: () => {},
    });
  }

  getOne(id: string) {
    return this._collection$
      .getValue()
      .find((enitity) => (enitity as any)['id'] === id);
  }

  post(entity: T) {
    this._http.post<T>(this._url, entity).subscribe({
      next: (result) => this.collection$.next(this.addLocaly(result)),
      error: (error) => console.log(error),
      complete: () => {},
    });
  }

  delete(entityId: string) {
    this._http.delete(this._url + '/' + entityId).subscribe({
      next: (result) => {
        this.deleteEntityLocaly(entityId);
      },
      error: (error) => console.log(error),
      complete: () => {},
    });
  }

  update(entity: T) {
    this._http
      .put<T>(this._url + '/' + (entity as any)['id'], entity, {
        headers: {
          'Content-Type': 'application/json-patch+json',
        },
      })
      .subscribe({
        next: (result) => {
          this.updateLocaly(result);
        },
        error: (error) => console.error(error),
        complete: () => {},
      });
  }

  private addLocaly(entity: T): T[] {
    const entities = this.collection$.getValue();
    entities.push(entity);
    return entities;
  }

  private deleteEntityLocaly(id: string) {
    this.collection$.next(
      this.collection$.getValue().filter((entity) => (entity as any).id !== id)
    );
  }

  private updateLocaly(entity: T) {
    const newArray = this.collection$.getValue();
    const index = newArray.findIndex(
      (elemnt) => (elemnt as any).id === (entity as any).id
    );
    newArray[index] = entity;
    this.collection$.next(newArray);
  }
}
