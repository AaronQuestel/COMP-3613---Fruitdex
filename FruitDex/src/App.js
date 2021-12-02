import React from 'react';
import Images from './components/Images';
import Title from './components/Title';
import UploadForm from './components/UploadForm';

function App() {
  return (
    <div className="App">
      <Title/>
      <UploadForm />
      <Images />
    </div>
  );
}

export default App;
