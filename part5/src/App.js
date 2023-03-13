import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({ message: null })

  const newBlogRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs.data))
  }, [setBlogs])

  useEffect(() => {
    const loginedInUser = window.localStorage.getItem('KEY')
    if (loginedInUser) {
      const user = JSON.parse(loginedInUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // useEffect(() => {
  //   let timer;
  //   if (message !== null) {
  //     timer = setTimeout(() => {
  //       setMessage({ message: null });
  //     }, 1000);
  //   }
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [message]);

  const notify = (message, type = 'info') => {
    setMessage({
      message,
      type
    })

    setTimeout(() => {
      setMessage({ message: null })
    }, 3000)
  }

  //Login
  const login = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password
      })

      //Setup Key:value
      window.localStorage.setItem('KEY', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (error) {
      notify('wrong username or password', 'error')
    }
  }

  //Logout
  const logout = async () => {
    //Ensure the brower does not remember the details  of the user after logging out
    setUser(null)
    window.localStorage.removeItem('KEY')
  }

  if (user === null) {
    return (
      <>
        <Notification info={message} /> <LoginForm onLogin={login} />
      </>
    )
  }

  //Add a new blog
  const addBlog = async (blogObject) => {
    try {
      const createBlog = await blogService.create(blogObject)
      setMessage({
        message: `a new blog ${blogObject.title} by ${blogObject.author} added`,
        type: 'info'
      })
      setBlogs(blogs.concat(createBlog.data))
      newBlogRef.current.toggleVisibility()
    } catch (error) {
      notify('failed to add blog - title or url is missing', 'error')
    }
  }

  // Update a blog
  const updateBlog = async (blogObject) => {
    const updatedBlog = await blogService.update({
      ...blogObject,
      likes: blogObject.likes + 1,
      user: blogObject.user.id
    })
    notify(`Blog ${blogObject.title} by ${blogObject.author} was liked`)
    setBlogs(blogs.map((b) => (b.id === blogObject.id ? updatedBlog.data : b)))
  }

  const remove = async (blog) => {
    const ok = window.confirm(`Sure you want to remove '${blog.title}' by ${blog.author}`)
    if (ok) {
      try {
        await blogService.remove(blog.id)
        notify(`The blog' ${blog.title}' by '${blog.author} removed`)
        setBlogs(blogs.filter((b) => b.id !== blog.id))
      } catch (error) {
        notify(error.response.data.error, 'error')
      }
    }
  }

  // const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
  console.log('blogs', blogs)
  const byLikes = (b1, b2) => b2.likes - b1.likes
  console.log('sortedBlogs', blogs)
  return (
    <div>
      <h2>blogs</h2>
      <Notification info={message} />
      <div>
        {user.name} logged in
        <button onClick={logout}>Logout</button>
      </div>
      <Toggleable buttonLabel="new blog" ref={newBlogRef}>
        <NewBlog createBlog={addBlog} />
      </Toggleable>
      <h2>Blog list</h2>
      {blogs.sort(byLikes).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={() => updateBlog(blog)}
          deleteBlog={() => remove(blog)}
        />
      ))}
    </div>
  )
}

export default App
