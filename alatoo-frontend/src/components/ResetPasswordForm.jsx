import { useState } from 'react';
import { useParams } from 'react-router-dom';

const ResetPasswordForm = () => {
  const { uidb64, token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  console.log(uidb64,token);
  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/accounts/reset-password/${uidb64}/${token}/`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ new_password: newPassword }),
        }
        
        
      );
      console.log(newPassword);
      if (response.ok) {
        setSuccess('Password reset successful! You can now log in.');
      } else if (response.status === 403) {
        console.log(uidb64,token);
        setError('Invalid or expired reset link.');
      } else {
        setError('Failed to reset password. Please try again.');
      }
    } catch (err) {
        console.log(err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handlePasswordReset}>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
