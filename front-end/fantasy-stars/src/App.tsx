import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainScreen from './Views/MainScreen';
import ItemDetailScreen from './Views/ItemDetailScreen';
import EditItemDetailScreen from './Views/EditItemDetailScreen';
import CreateItemScreen from './Views/CreateItemScreen';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/details/:id" element={<ItemDetailScreen />} />
          <Route path="/edit/:id" element={<EditItemDetailScreen />} />
-          <Route path="/create" element={<CreateItemScreen />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;