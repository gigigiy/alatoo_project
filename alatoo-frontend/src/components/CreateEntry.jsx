import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateEntry = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const navigate = useNavigate();

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
      const response = await fetch('http://localhost:8000/api/notes/create/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        setTitle('');
        setContent('');
        setImage(null);
        setError('');
        navigate('/');
      } else {
        const data = await response.json();
        if (data.error === 'A note with this title already exists.') {
          const confirmOverride = window.confirm(
            'A note with this title already exists. Are you sure you want to continue?'
          );
          if (!confirmOverride) {
            setError('Duplicate title detected. Please choose a different title.');
            return;
          }
        } else {
          setError(data.error || 'Failed to create entry.');
        }
      }
    } catch (err) {
      console.log(err.message);
      setError('Error creating entry.');
    }
  };

  return (
    <div>
      <h1>Create Diary Entry</h1>
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
        <button type="submit">Create Entry</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default CreateEntry;
