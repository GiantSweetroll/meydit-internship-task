import storage from "../config/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

export async function uploadImage(file) {

    if (!file) throw new Error('File not specified')

    const storageRef = ref(storage, `/files/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log('Upload is ' + progress + '% done')
            },
            (err) => {
                console.log('error', err)
                reject()
            },
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    resolve(url)
                })
            }
        )
    })
}