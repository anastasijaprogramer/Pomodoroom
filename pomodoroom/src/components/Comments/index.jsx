// src/components/Comments.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addComment } from '../../features/comments/commentsSlice';
import { io } from 'socket.io-client';

// Initialize with reconnection enabled
const socket = io('http://localhost:8080', {
  reconnection: true, // Auto reconnect
  reconnectionAttempts: 10, // Try reconnecting 10 times before giving up
  reconnectionDelay: 3000, // 3 seconds between attempts
  timeout: 20000, // Timeout after 20 seconds if no connection 
}); 

socket.on('connect', () =>
{
  console.log('Connected to WebSocket server!');
});

socket.on('disconnect', () =>
{
  console.log('Disconnected from server. Trying to reconnect...');
});

socket.on('connect_error', (err) =>
{
  console.error('Connection error:', err);
});

const Comments = () =>
{
  const [text, setText] = useState('');
  const comments = useSelector((state) => state.comments.comments);
  const dispatch = useDispatch();

  useEffect(() =>
  {
    // Receive initial comments from the server
    socket.on('initial_comments', (initialComments) =>
    {
      initialComments.forEach((comment) =>
      {
        dispatch(addComment(comment)); // Store in Redux
      });
    });

    // Listen for new comments from the server
    socket.on('receive_comment', (comment) =>
    {
      dispatch(addComment(comment));
    });

    // Cleanup socket connection when component unmounts
    return () => socket.disconnect();
  }, [dispatch]);

  const handleAddComment = () =>
  {
    console.log(comments);
    if (text.trim()) {
      const newComment = { id: Date.now(), text };
      // Send the new comment to the server
      socket.emit('new_comment', newComment);
      setText('');
    }
  };

  return (
    <div>
      <h2>Comments</h2>
      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
        />
        <button onClick={handleAddComment}>Post</button>
      </div>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
