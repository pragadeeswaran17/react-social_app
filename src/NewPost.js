import React from 'react'

function NewPost({
    postTitle, setPostTitle, postBody,setPostBody, handleSubmit
}) {

  return (
    <main className='NewPost'>
        <h2>New Post</h2>
        <form className='newPostForm' onSubmit={handleSubmit}>
            <label htmlFor='postTitle'>Title :</label>
            <input
                id='postTitle'
                type='text'
                required
                value={postTitle}
                onChange={(e)=>setPostTitle(e.target.value)}
            >
            </input>
            <label htmlFor='postBody'>Post :</label>
            <textarea
                id='postBody'
                type='text'
                required
                value={postBody}
                onChange={(e)=>setPostBody(e.target.value)}
            >
            </textarea>
            <button
                type='submit'
            >
                submit
            </button>

        </form>
        
    </main>
  )
}

export default NewPost