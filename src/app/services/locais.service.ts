import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc, setDoc } from '@angular/fire/firestore';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadString,
} from '@angular/fire/storage';
import { Observable } from 'rxjs';

export interface Local {
  id?: string;
  nome: string;
  localizacao: string;
  data: Date;
}
 
@Injectable({
  providedIn: 'root'
})
export class LocaisService {
  private local: Local;
 
  constructor(private firestore: Firestore, private storage: Storage) { }
 
  getLocais(): Observable<Local[]> {
    const notesRef = collection(this.firestore, 'locais');
    return collectionData(notesRef, { idField: 'id'}) as Observable<Local[]>;
  }
 
  getLocalById(id): Observable<Local> {
    const noteDocRef = doc(this.firestore, `locais/${id}`);
    return docData(noteDocRef, { idField: 'id' }) as Observable<Local>;
  }
 
  addLocal(local: Local) {
    const notesRef = collection(this.firestore, 'locais');
    return addDoc(notesRef, local);
  }
 
  deleteLocal(local: Local) {
    const noteDocRef = doc(this.firestore, `locais/${local.id}`);
    return deleteDoc(noteDocRef);
  }
 
  updateLocal(local: Local) {
    const noteDocRef = doc(this.firestore, `locais/${local.id}`);
    return updateDoc(noteDocRef, { title: local.nome, text: local.localizacao, date: local.data});
  }

  


}

