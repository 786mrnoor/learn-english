import { getStorage, ref as sRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateUserPic } from './Authentication';

const storage = getStorage();

function profilePicUpload(id, file, showOutPut) {
    uploadBytes(sRef(storage, `usersPic/${id}/profilePic`), file)
        .then((snapshot) => {
            getDownloadURL(sRef(storage, `usersPic/${id}/profilePic`))
                .then((url) => {
                    updateUserPic({ photoURL: url }, showOutPut);
                })
        })
        .catch(err => {
            console.log(err.code);
            console.log(err.message);
        })
}

export { profilePicUpload };