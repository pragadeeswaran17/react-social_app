import React, {useState, useEffect} from "react"
import Header from "./Header";
import Nav from "./Nav";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import Footer from "./Footer";
import { Route, Routes, useNavigate } from "react-router-dom";
//import Post from "./Post";
import {format} from "date-fns"
import Api from "./api/posts"
import EditPost from "./EditPost";
import useWindowSize from "./hooks/useWindowSize";
import useAxiosFetch from "./hooks/useAxiosFetch";

//import PostLayout from "./PostLayout";

function App() {

  const [posts, setPosts] = useState([])
  const [search, setSearch]= useState("")
  const [searchResults, setSearchResults] = useState([])
  const [postTitle, setPostTitle] = useState("")
  const [postBody, setPostBody] = useState("")
  const [editTitle, setEditTitle] = useState("")
  const [editBody, setEditBody] = useState("")
  const navigate = useNavigate()
  const {width} = useWindowSize();
  const {data, fetchError, isLoading} = useAxiosFetch("http://localhost:3500/posts")



/* 
  useEffect(()=>{
    const fetchPosts = async()=>{
      try{
        const response = await Api.get('/posts');
        setPosts(response.data);

      }catch(err){
        if(err.response){
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);

        } else {
          console.log(`ERROR : ${err.message}`);
        }

      }
    }
    fetchPosts()
  },[]) */


  useEffect(()=>{
    setPosts(data)
  },[data])


  useEffect(()=>{
    const filteredResults = posts.filter((post)=>
      ((post.body).toLocaleLowerCase().includes(search.toLocaleLowerCase())
      || ((post.title).toLocaleLowerCase().includes(search.toLocaleLowerCase()))

    ))
    setSearchResults(filteredResults.reverse());

  },[posts, search])

  const handleSubmit= async(e)=>{
    e.preventDefault();
    const id = posts.length ? posts[posts.length-1].id + 1 : 1;
    const datatime = format(new Date(), "MMMM, dd, yyyy pp");
    const newPost = {id, title:postTitle, datatime, body: postBody};
    try{
    const response = await Api.post("/posts", newPost)
    const allPosts =[...posts, response.data];
    setPosts(allPosts);
    setPostBody("");
    setPostTitle("")
    navigate("/")
    } catch(err){
      if(err.response){
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);

      } else {
        console.log(`ERROR : ${err.message}`);
      }

    }
  
  }

  const handleDelete = async(id)=>{
    try{
      await Api.delete(`/posts/${id}`)
      const postList = posts.filter((post) => post.id !== id)
      setPosts(postList);
      navigate("/");

    }catch(err){
      console.log(err.response.data);
      console.log(err.message);

    }
    
    

  }

  const handleEdit = async(id)=>{
    const dataTime = format(new Date(), "MMMM, dd, yyyy pp");
    const updatedPost = {id, title: editTitle, dataTime, body: editBody}
    try{
      const response = await Api.put(`/posts/${id}`, updatedPost)
      setPosts(posts.map(post=> post.id===id?{...response.data}:post));
      setEditBody("");
      setEditTitle("")
      navigate("/")
      
    }catch(err){
      console.log(err.response.data);

    }
 
  }



  return (
    <div className="App">
        <Header
          title={"Praga Social Media"}
          width={width}
          
        />
        <Nav
            search={search}
            setSearch={setSearch}
            
        />
      
        <Routes>
          <Route path="/" element={
              <Home 
                  posts={searchResults}
                  fetchError={fetchError}
                  isLoading={isLoading}
              />}
          />
          <Route path="/post">
              <Route index element={
                 <NewPost
                      postTitle={postTitle}
                      setPostTitle={setPostTitle}
                      postBody={postBody}
                      setPostBody={setPostBody}
                      handleSubmit={handleSubmit}
                  />}
              />
              
              <Route path=":id" element={
                  <PostPage 
                      posts={posts}
                      handleDelete={handleDelete}
                  />}
              />
          </Route>
          <Route path="/edit/:id" element = {
                  <EditPost
                      posts={posts}
                      handleEdit={handleEdit}
                      editBody={editBody}
                      setEditBody={setEditBody}
                      editTitle={editTitle}
                      setEditTitle={setEditTitle}
                  />}
              />
          <Route path="/about" element={ 
                   <About/> 
                  } 
          />
          <Route path="*" element={
                  <Missing/>
                   } 
          />


        </Routes>
        <Footer/>






{/*  
        <nav>
          <ul>
            <li><Link to="/" >Home</Link></li>
            <li><Link to="/about" >About</Link></li>
            <li><Link to="/postpage" >PostPage</Link></li>
          </ul>

        
        </nav>

       <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/postpage" element={<PostLayout/>} >
            <Route index element={<PostPage/>}/>
            <Route path=":id" element={<Post/>}/>
            <Route path="newpost" element={<NewPost/>}/>
          </Route>
          <Route path="*" element={<Missing/>}/>
          
        </Routes> */}
      
         
     
    </div>
  );
}

export default App;
