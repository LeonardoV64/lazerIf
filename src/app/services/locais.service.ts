import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Local {
  id?: string;
  nome: string;
  localizacao: string;
}


@Injectable({
  providedIn: 'root'
})
export class LocaisService {

  constructor(private firestore: Firestore) { }

    getLocais(): Observable<Local[]>{
      const locaisRef = collection(this.firestore, 'locais');
      return collectionData(locaisRef, {idField: 'id'}) as Observable<Local[]>;
    }

    getLocalById(id): Observable<Local>{
      const localDocRef = doc(this.firestore, 'locais/${id}');
      return docData(localDocRef, {idField: 'id'}) as Observable<Local>;
    }

    addLocal(local: Local){
      const locaisRef = collection(this.firestore, 'locais');
      return addDoc(locaisRef, local);
    }

    deleteLocal(local: Local){
      const localDocRef = doc(this.firestore, 'locais/${local.id');
      return deleteDoc(localDocRef);
    }

    updateLocal(local: Local){
      const localDocRef = doc(this.firestore, 'locais/${local.id}');
      return updateDoc(localDocRef, {nome: local.nome, localizacao: local.localizacao})
    }
}
