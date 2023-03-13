import { useState } from 'react'

const Blog = ({ deleteBlog, blog, likeBlog }) => {
  const [fullView, setFullView] = useState(false)

  const style = {
    marginBottom: 2,
    padding: 5,
    borderStyle: 'solid'
  }

  return (
    <div style={style}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setFullView(!fullView)}>{fullView ? 'hide' : 'view'}</button>
      </div>
      {/* {fullView && extraBlogDetails()} */}
      {fullView && (
        <div>
          <div>
            <a href={blog.url}> {blog.url}</a>{' '}
          </div>
          <div>
            likes {blog.likes} {''}
            <button onClick={likeBlog}>like</button>
          </div>
          <div>User name: {blog.user && blog.user.name}</div>
          {/* {blog.user && blog.user.name} */}
          {/* {canRemove && <button onClick={remove}>delete</button>} */}
          <button onClick={deleteBlog}>Delete</button>
        </div>
      )}
    </div>
  )
}

export default Blog
