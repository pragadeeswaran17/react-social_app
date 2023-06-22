import React from 'react'
import Feed from './Feed'

function Home({posts, fetchError, isLoading}) {
  return (
    <main className='Home'>

      {isLoading && <p className='sattusMsg' >Loading Posts...</p>}
      {!isLoading && fetchError && <p className='statusMsg' style={{color:"red"}}>{fetchError}</p> }
      {!isLoading && !fetchError &&
         (posts.length 
         ? (<Feed posts={posts}/>)
         : (<p style={{marginTop:"2rem"}}>No post to display</p>))
         }
         </main>
  )
}

export default Home;