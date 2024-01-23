import { deleteObject, ref } from "firebase/storage";
import { auth, db, storage } from "./firebaseApp";
import {collection,addDoc,serverTimestamp, query, 
    orderBy, onSnapshot, where, doc, getDoc, updateDoc, deleteDoc, 
    arrayUnion, arrayRemove, limit, getDocs} from 'firebase/firestore'
import { deleteAvatar } from "./uploadFile";
import { deleteUser, getAuth } from "firebase/auth";



export const readCategories=(setCategories)=>{
    const collectionRef=collection(db,'categories')
    const unsubscribe=onSnapshot(collectionRef,(snapshot)=>{
        setCategories(snapshot.docs.map(doc=>doc.data().name))
    })
    return unsubscribe
}


export const addPost=async (formData)=>{
    console.log(formData);
    const collectionRef=collection(db,'posts')
    const newItem={...formData,timestamp:serverTimestamp()}
    const newDocRef=await addDoc(collectionRef,newItem)
}
export const readComments=(id,setComments)=>{
    const collectionRef=collection(db,'comments')
    const q=  query(collectionRef,where('id','==',id))
    const unsubscribe=onSnapshot(q,(snapshot)=>{
        setComments(snapshot.docs.map(doc=>doc.data()))
    })
    return unsubscribe
}



export const addComment=async (id,email,userName,comment)=>{
    const collectionRef=collection(db,'comments')
    console.log(id,email,userName,comment);
    const newItem={id,comment,email,userName,timestamp:serverTimestamp()}
    const newDocRef=await addDoc(collectionRef,newItem)
}
export const readPosts=async (setPosts,selectedCategories)=>{
    const collectionRef=collection(db,'posts')
    const q=selectedCategories.length==0 ?  query(collectionRef,orderBy('timestamp','desc')) :
                                            query(collectionRef,where('category','in',selectedCategories))
    const unsubscribe=onSnapshot(q,(snapshot)=>{
        setPosts(snapshot.docs.map(doc=>({...doc.data(),id:doc.id})))
    })
    return unsubscribe
}

export const readPost=async (id,setPost,setLikes=null)=>{
    const docRef=doc(db,"posts",id)
    try{
        const docSnap=await getDoc(docRef)
        if(docSnap.exists()){
            setPost({...docSnap.data(),id:docSnap.id})
            setLikes && setLikes(docSnap.data().likes.length)
        }else
            console.log('A dokumentum nem létezik!');
    }catch(err){
        console.log(err);
    }
}
export const editPost=async (id,{title,category,description})=>{
    const docRef=doc(db,"posts",id)
    await updateDoc(docRef,{title,category,description})
}
export const deleteFile=async (url)=>{
    const fileRef=ref(storage,url)
    try{
        await deleteObject(fileRef)
        return true
    }catch(err){
        console.log('deleteFile:',err);
        return false
    }
}
export const deletePost=async (id)=>{
    const docRef=doc(db,"posts",id)
    await deleteDoc(docRef)
}
export const editLikes=async (postId,userId)=>{
    const docRef=doc(db,"posts",postId)
    const docSnap=await getDoc(docRef)
    //console.log(docSnap.data().likes.indexOf(userId));
    let likesCount=docSnap.data().likes.length
    if(docSnap.data().likes.indexOf(userId)==-1){
        likesCount++
        await updateDoc(docRef,{likes:arrayUnion(userId),likesCount})
    }else{
         likesCount--
        await updateDoc(docRef,{likes:arrayRemove(userId),likesCount}) 
    }
    //await update
    return likesCount
}

export const popularPosts=(setPosts)=>{
    const collectionRef=collection(db,'posts')
    const q=query(collectionRef,orderBy('likesCount','desc'),limit(3)) 
    const unsubscribe=onSnapshot(q,(snapshot)=>{
    setPosts(snapshot.docs.map(doc=>({...doc.data(),id:doc.id})))
})
return unsubscribe
}
//felhasználói fiók törlése:
export const deletePostsByAuthorId=async (userId)=>{
    const postsRef=collection(db,'posts')
    const q=query(postsRef,where('userId','==',userId))
    const querySnapshot=await getDocs(q)
    querySnapshot.forEach(async (d)=>{
        const id=d.id
        const docRef=doc(db,'posts',id)
        const querySnap=await getDoc(docRef)
        deleteFile(querySnap.data().photoUrl)
        deleteDoc(docRef)
    })

}

//felhasználó törlése:

//const auth = getAuth();

const deleteAccount = async () => {
  try {
    // Ellenőrizd, hogy a felhasználó be van-e jelentkezve
    const user = auth.currentUser;

    if (user) {
      // Töröld a felhasználót
      await deleteUser(user);
      console.log('Felhasználó törölve');
    } else {
      console.log('Nincs bejelentkezett felhasználó');
    }
  } catch (error) {
    console.error('Hiba történt a felhasználó törlése során', error);
  }
};


export const deleteProfile=async (userId)=>{
    //a postok törlése
    await deletePostsByAuthorId(userId)
    //avatar törlése, ha van
    await deleteAvatar(userId)
    //user törlése
    await deleteAccount()
    
}



