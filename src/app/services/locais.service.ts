import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc, setDoc } from '@angular/fire/firestore';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadString,
} from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';
import { Observable } from 'rxjs';
 
export interface Local {
  id?: string;
  nome: string;
  localizacao: string;
  data: Date;
  imageURL: string;
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
    return updateDoc(noteDocRef, { title: local.nome, text: local.localizacao, date: local.data });
  }


  /*
  async uploadImageLocal(cameraFile: Photo) {
    const localId = this.local.id;
    const path = `uploads/${localId}/local.png`;
    const storageRef = ref(this.storage, path);

    try {
      await uploadString(storageRef, cameraFile.base64String, 'base64');

      const imageUrl = await getDownloadURL(storageRef);

      const locaisDocRef = doc(this.firestore, `locais/${localId}`);
      await setDoc(locaisDocRef, {
        imageUrl,
      });
      return true;
    } catch (e) {
      return null;
    }
  }
  

  getLocalImage(id) {
   const locaisDocRef = doc(this.firestore, `locais/${id}`);
   return docData(locaisDocRef);
  }
  */
}

