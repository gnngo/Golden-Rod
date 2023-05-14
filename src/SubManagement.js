import React, { useState } from 'react';

function SubscriptionForm(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit({ name: name || props.initialValues?.name, description: description || props.initialValues?.description, price: price || props.initialValues?.price });
    setName('');
    setDescription('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" placeholder={props.initialValues?.name || ''} value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Description:
        <input type="text" placeholder={props.initialValues?.description || ''} value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label>
        Price:
        <input type="number" placeholder={props.initialValues?.price || ''} value={price} onChange={(e) => setPrice(e.target.value)} />
      </label>
      <button type="submit">{props.submitButtonText}</button>
    </form>
  );
}

function SubscriptionManagement(props) {
  const [editingSubscription, setEditingSubscription] = useState(null);
  
  const handleEdit = (subscription) => {
    setEditingSubscription(subscription);
  };

  const handleCancelEdit = () => {
    setEditingSubscription(null);
  };

  const handleDelete = (subscription) => {
    props.onDelete(subscription);
  };

  const handleSubmit = (subscription) => {
    if (editingSubscription) {
      props.onEdit({ ...editingSubscription, ...subscription });
      setEditingSubscription(null);
    } else {
      props.onSubmit(subscription);
    }
  };

  const calculateTotalCost = () => {
    let total = 0;
    props.subscriptions.forEach(subscription => {
      total += parseFloat(subscription.price);
    });
    return total.toFixed(2);
  }

  return (
    <div>
      {editingSubscription ? (
        <div>
          <h2>Edit Subscription</h2>
          <SubscriptionForm
            onSubmit={handleSubmit}
            submitButtonText="Save"
            initialValues={editingSubscription}
          />
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      ) : (
        <div>
          <h2>Add Subscription</h2>
          <SubscriptionForm onSubmit={handleSubmit} submitButtonText="Add" />
        </div>
      )}
      <h2>Current Subscriptions</h2>
      <p>Total Cost: ${calculateTotalCost()}</p>
      <ul>
        {props.subscriptions.map(subscription => (
          <li key={subscription.id}>
            <h3>{subscription.name}</h3>
            <p>{subscription.description}</p>
            <p>Price: ${subscription.price} / month</p>
            <button onClick={() => handleEdit(subscription)}>Edit</button>
            <button onClick={() => handleDelete(subscription)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubscriptionManagement;
