import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DiaryEntry = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState({ title: "", content: "" });

  useEffect(() => {
    // Fetch the diary entry by ID (Simulated here)
    setEntry({ title: `Entry ${id}`, content: "This is a sample entry." });
  }, [id]);

  const handleEdit = () => {
    // Handle editing (Simulated here)
    alert("Edit functionality not implemented.");
  };

  const handleDelete = () => {
    // Handle delete functionality (Simulated here)
    const confirmDelete = window.confirm("Are you sure you want to delete this entry?");
    if (confirmDelete) {
      alert("Entry deleted.");
      navigate("/");
    }
  };

  return (
    <div>
      <h1>{entry.title}</h1>
      <div>{entry.content}</div>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DiaryEntry;
