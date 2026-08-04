import { useState, useEffect } from 'react';
import { FaCheck, FaTrash, FaSpinner } from 'react-icons/fa';
import { adminFetchPendingComments, adminApproveComment, adminDeleteComment } from '../../services/api';

function ManageComments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await adminFetchPendingComments();
      setComments(response.data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to fetch comments' });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    setActionLoading({ ...actionLoading, [id]: 'approve' });
    try {
      await adminApproveComment(id);
      setComments(comments.filter(c => c._id !== id));
      setMessage({ type: 'success', text: 'Comment approved successfully' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to approve comment' });
    } finally {
      setActionLoading({ ...actionLoading, [id]: null });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;
    setActionLoading({ ...actionLoading, [id]: 'delete' });
    try {
      await adminDeleteComment(id);
      setComments(comments.filter(c => c._id !== id));
      setMessage({ type: 'success', text: 'Comment deleted successfully' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete comment' });
    } finally {
      setActionLoading({ ...actionLoading, [id]: null });
    }
  };

  return (
    <div className="max-w-5xl">
      <h1 className="text-2xl font-bold mb-6">Manage Comments</h1>

      {message && (
        <div className={`px-4 py-3 rounded-lg mb-6 ${
          message.type === 'success' 
            ? 'bg-green-500/20 border border-green-500/30 text-green-400' 
            : 'bg-red-500/20 border border-red-500/30 text-red-400'
        }`}>
          {message.text}
        </div>
      )}

      {loading ? (
        <div className="text-white/60">Loading comments...</div>
      ) : comments.length === 0 ? (
        <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-8 text-center text-white/60">
          No pending comments to review.
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div 
              key={comment._id} 
              className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-amber-300">{comment.visitorName}</span>
                    <span className="text-xs text-white/40">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-white/80 mb-2">{comment.comment}</p>
                  <div className="flex gap-4 text-xs text-white/40">
                    <span>Target: {comment.targetType}</span>
                    <span>ID: {comment.targetId?.slice(0, 8)}</span>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => handleApprove(comment._id)}
                    disabled={!!actionLoading[comment._id]}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {actionLoading[comment._id] === 'approve' ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      <FaCheck />
                    )}
                    Approve
                  </button>
                  <button
                    onClick={() => handleDelete(comment._id)}
                    disabled={!!actionLoading[comment._id]}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {actionLoading[comment._id] === 'delete' ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      <FaTrash />
                    )}
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageComments;