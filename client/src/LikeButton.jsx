import React, { useState } from 'react';

function LikeButton() {
  const [likes, setLikes] = useState(0);

  return (
    <button onClick={() => setLikes(prev => prev + 1)}>
      赞 {likes}
    </button>
  );
}

export default LikeButton;