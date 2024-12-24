import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './delete.css';



const DeleteEntry = ({ entryId }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    const token = localStorage.getItem('access');
    try {
      const response = await fetch(`http://localhost:8000/api/notes/delete/${entryId}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setShowModal(false);
        navigate('/'); // Redirect after successful deletion
      } else {
        alert('Failed to delete entry.');
      }
    } catch (error) {
      console.log(error);
      alert('Error deleting entry.');
    }
  };

  return (
    <div>
      {/* Small delete icon */}
      <button onClick={() => setShowModal(true)} className="delete-icon-btn">
        <img src="trash.jpg" alt="Delete" className="delete-icon" />
      </button>
      {/* Modal confirmation */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Are you sure you want to delete this entry?</h2>
            <div className="modal-buttons">
              <button onClick={handleDelete}>Delete</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

DeleteEntry.propTypes = {
  entryId: PropTypes.number.isRequired, // Make sure `entryId` is a number and required
};

export default DeleteEntry;
