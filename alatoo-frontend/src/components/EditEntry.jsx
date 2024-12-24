import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditEntry = () => {
  const { id } = useParams();  // Get the entry ID from the URL
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  // Fetch the existing entry data when the component loads
  // useEffect(() => {
  //   const token = localStorage.getItem('access');
  //   fetch(`http://localhost:8000/api/notes/${id}/`, {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setTitle(data.title);
  //       setContent(data.content);
  //       setImage(data.image || null);  // Assuming your backend returns image URL if it exists
  //     })
  //     .catch(() => setError('Failed to load entry'));
  //     console.log(error);
      
  // },);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setError('Title and content are required.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) formData.append('image', image);

    const token = localStorage.getItem('access');
    try {
      const response = await fetch(`http://localhost:8000/api/notes/update/${id}/`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        navigate('/');  // Redirect to home page after successful update
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to update entry.');
      }
    } catch (err) {
        console.log(err.message);
      setError('Error updating entry.');
    }
  };

  return (
    <div>
      <h1>Edit Diary Entry</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            maxLength="10000"
          />
        </div>
        <div>
          <label>Upload Image (Optional)</label>
          <input type="file" onChange={handleImageChange} />
        </div>
        <button type="submit">Update Entry</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default EditEntry;
