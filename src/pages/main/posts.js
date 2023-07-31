import { addDoc,getDocs,collection,query,where,deleteDoc,doc} from "firebase/firestore";
import { db,auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect,useState } from "react"
import toast, { Toaster } from 'react-hot-toast';

export const Post=(props)=>{
    const [user]=useAuthState(auth);
    const [like,setLike]=useState(null)
    const likesRef=collection(db,"likes");
    const likesDoc=query(likesRef, where("postId","==",props.post.id))
    const getLikes=async()=>{
        const data=await getDocs(likesDoc)
        setLike(
            data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
          );
    };
    
    const addLike=async()=>{
        
        try{
            const newDoc = await addDoc(likesRef, {
                userId: user?.uid,
                postId: props.post.id,
              });
              if (user) {
                setLike((prev) =>
                  prev
                    ? [...prev, { userId: user.uid, likeId: newDoc.id }]
                    : [{ userId: user.uid, likeId: newDoc.id }]
                );
              }
        } catch (err){
            console.log("error")
        }
            
       
    };
    
    const removeLike=async()=>{
        
        try{
            const likeToDeleteQuery = query(
                likesRef,
                where("postId", "==", props.post.id),
                where("userId", "==", user?.uid)
              );
              const likeToDeleteData = await getDocs(likeToDeleteQuery);
                const likeId = likeToDeleteData.docs[0].id;
                const likeToDelete = doc(db, "likes", likeId);
                await deleteDoc(likeToDelete);
                if (user) {
                    setLike(
                    (prev) => prev && prev.filter((like) => like.likeId !== likeId)
                    );
                }
                
        } 
        catch (err){
            console.log("error")
        }
            
       
    };
    const hasuserliked=like?.find((like)=>like.userId===user?.uid)
    useEffect(() => {
      getLikes()
    }, [])
    const dec1=hasuserliked ? removeLike : addLike
    const dec2=()=>{
      toast.error("Login to like.");
    }
    return(
        <>
        <div class="card">
          <div class="card-header">
            <div className="title"><h2>{props.post.title}</h2></div>
            <div className="footer"><p>@{props.post.username}</p></div>
          </div>
          <div class="card-body">
            <div className="body"><p>{props.post.description}</p></div>
          </div>
          <div class="card-footer">
            
            <button onClick={user?dec1:dec2}>
            {hasuserliked ? <>&#128078;</> : <>&#128077;</>}{" "}
            </button>
            {like&&<p>Likes : {like.length}</p>}
            
          </div>
          <Toaster position="top-center" 
                reverseOrder={true} />
        </div>
          
          
          
          
        </>
    )
}