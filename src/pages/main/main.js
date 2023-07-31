import { getDocs,collection, doc} from "firebase/firestore"
import { auth, db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Post } from "./posts";
import { ScrollUp } from "../../components/ScrollUp";

export const Main=()=>{
    const [postsList,setPostlist]=useState(null)
    const postsRef=collection(db,"posts");
    const getPosts=async()=>{
        const data=await getDocs(postsRef)
        setPostlist(data.docs.map((doc)=>({ ...doc.data(),id:doc.id})));
    };
    useEffect(()=>{
        getPosts();
    },[]);

    return(
        <> 
        <div className="main">{postsList?.map((doc)=>(<Post post={doc}/>))}</div>
        <ScrollUp />
        </>  
    )
}