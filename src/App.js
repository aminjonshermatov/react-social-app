import React from 'react';
import Wall from './components/Wall/Wall';
import PostsProvider from './contexts/PostsProvider';

function App() {
  return (
    <div className="App">
      <PostsProvider>
        <Wall />
      </PostsProvider>
    </div>
  );
}

export default App;
