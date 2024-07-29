import React from 'react';

const Post = ({ post }) => {
  return (
    <div className="post bg-white p-4 rounded-lg shadow-lg mb-4">
      <div className="flex items-center mb-4">
        <img src={post.authorAvatar || 'default-avatar.png'} alt="Avatar" className="w-10 h-10 rounded-full mr-2" />
        <div>
          <h2 className="font-bold">{post.authorName}</h2>
          <p className="text-sm text-gray-500">{post.date}</p>
        </div>
      </div>
      <p className="mb-4">{post.content}</p>
      {post.image && <img src={post.image} alt="Post" className="w-full rounded-lg" />}
    </div>
  );
};

export default Post;
