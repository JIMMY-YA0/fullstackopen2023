import { useState } from 'react'

const NewBlog = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog({ title: newTitle, author: newAuthor, url: newUrl, likes: 0 })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }
  return (
    <div>
      <h2>Create a blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            type="text"
            value={newTitle}
            name="Title"
            onChange={({ target }) => setNewTitle(target.value)}
            placeholder="write blog title here"
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={newAuthor}
            name="Author"
            onChange={({ target }) => setNewAuthor(target.value)}
            placeholder="write blog author here"
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={newUrl}
            name="Url"
            onChange={({ target }) => setNewUrl(target.value)}
            placeholder="write blog url here"
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default NewBlog
