import React from 'react';
import { Link, Outlet, useParams, } from 'react-router-dom';



function PostPage({posts, handleDelete}) {
    const {id} = useParams();
    const post = posts.find((post)=>(post.id).toString()=== id);
  return (
    <main className='PostPage'>
        <article className='post'>
            {post && 
                <>
                    <h2>{post.title}</h2>
                    <p className='postData'>{post.datetime}</p>
                    <p className='postBody'>{post.body}</p>
                    <Link to={`/edit/${post.id}`}>
                        <button
                            className='editbtn'
                        
                        >
                            edit Post
                        </button>
                    </Link> 
                    <button
                        className='deletebtn'
                        onClick={()=>handleDelete(post.id)}                     
                    >
                        Delete Post
                    </button>

                </>
            }
            {!post &&
                <>
                    <h2>Post not Found</h2>
                    <p>well, that's dissappointing</p>
                    <p>Visit our Homepage</p>
                </>
            
            
            }

        </article>
        <Outlet/>
        
    </main>
  )
}

export default PostPage