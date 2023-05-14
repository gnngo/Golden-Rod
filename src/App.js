import React, { useState } from 'react';
import SubManagement from './SubManagement';
import logo from './image/theme.jpeg'
import './App.css';

function App() {
  const [subscriptions, setSubscriptions] = useState([
    {
      id: 1,
      name: 'Netflix',
      description: 'Streaming video service',
      price: 15.99,
    },
    {
      id: 2,
      name: 'Spotify',
      description: 'Music streaming service',
      price: 9.99,
    },
    {
      id: 3,
      name: 'Adobe Creative Cloud',
      description: 'Subscription service for creative software',
      price: 52.99,
    },
  ]);

  const handleAddSubscription = (subscription) => {
    const newSubscription = { id: subscriptions.length + 1, ...subscription };
    setSubscriptions([...subscriptions, newSubscription]);
  };

  const handleEditSubscription = (subscription) => {
    const updatedSubscriptions = subscriptions.map((s) =>
      s.id === subscription.id ? subscription : s
    );
    setSubscriptions(updatedSubscriptions);
  };

  const handleDeleteSubscription = (subscription) => {
    const updatedSubscriptions = subscriptions.filter((s) => s.id !== subscription.id);
    setSubscriptions(updatedSubscriptions);
  };

  return (
    <div>
    <img src={logo} className="App-logo" alt="logo" />
      <SubManagement
        subscriptions={subscriptions}
        onSubmit={handleAddSubscription}
        onEdit={handleEditSubscription}
        onDelete={handleDeleteSubscription}
      />
    </div>
  );
}

export default App;
