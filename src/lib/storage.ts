
'use server';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

export async function uploadImage(file: File, folder: string): Promise<string> {
    const storageRef = ref(storage, `${folder}/${Date.now()}-${file.name}`);
    
    const snapshot = await uploadBytes(storageRef, file, {
        contentType: file.type,
    });
    
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
}
