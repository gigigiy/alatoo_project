import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import DeleteEntry from '../components/DeleteEntry';

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(''); // For storing the username
  const navigate = useNavigate();
  const location = useLocation(); // Track the current route

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('access');
      if (!token) return;

      try {
        const response = await fetch('http://localhost:8000/api/accounts/current-user/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setUsername(data.username); // Assuming the response contains the username
        }
      } catch (err) {
        console.error('Failed to fetch user info:', err);
      }
    };

    const fetchNotes = async () => {
      const token = localStorage.getItem('access');
      if (!token) {
        setError('You are not logged in. Please log in to view your notes.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/api/notes/getUserNotes/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setNotes(data);
          setError('');
        } else if (response.status === 401) {
          setError('Unauthorized. Please log in again.');
        } else {
          setError('Failed to fetch notes.');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching notes.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
    fetchNotes();
  }, [location]); // Re-run the effect when the route changes

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/'); // Redirect to the home page
  };

  return (
    <div>
      <h1>Your Diary Entries</h1>

      {/* Greeting and Logout */}
      {localStorage.getItem('access') ? (
        <div>
          <p>Hello, {username || 'User'}!</p> {/* Greet the user */}
          <button onClick={handleLogout}>Logout</button>
          {/* Create New Entry Button */}
          <Link to="/create">
            <button>Create New Entry</button>
          </Link>
        </div>
      ) : (
        <Link to="/login">
          <button>Login</button>
        </Link>
      )}

      {/* Notes List or Error Message */}
      {loading ? (
        <p>Loading your notes...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {notes.map((entry) => (
            <li key={entry.id}>
              <h2>{entry.title}</h2>
              <p>{entry.content}</p>
              {entry.image_url && <img src={`http://localhost:8000${entry.image_url}`} alt={entry.title} />}
              <div>
                <Link to={`/edit/${entry.id}`}>Edit</Link>
                <DeleteEntry entryId={entry.id} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
