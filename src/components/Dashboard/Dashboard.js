import React, { useState } from 'react';
import './Dashboard.css';

function Dashboard({ setBannerData }) {
  const [description, setDescription] = useState('');
  const [timer, setTimer] = useState(0);
  const [visible, setVisible] = useState(false);
  const [link, setLink] = useState('');

  //Handle update function
  const handleUpdate = () => {
    fetch("http://localhost:8000/api/v1/banner")
      .then((response) => response.json())
      .then((data) => {
        const updatedData = {
          description: description.trim() || data.description,
          timer: timer > 0 ? timer : data.timer,
          visible,
          link: link.trim() || data.link
        };

        fetch('http://localhost:8000/api/v1/update-banner', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        })
          .then(response => response.json())
          .then(() => {
            // Update the banner data in the parent component
            setBannerData(updatedData);
            // Clear form fields
            setDescription('');
            setTimer(0);
            setLink('');
            setVisible(false);
          })
          .catch(error => {
            console.error('Error updating banner data:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching current banner data:', error);
      });
  };

  return (
    <div className="dashboard">
      <div className="toggle-container">
        <label className="toggle-label">
          Show Banner
          <button
            className={`toggle-button ${visible ? 'active' : ''}`}
            onClick={() => setVisible(!visible)}
          >
            {visible ? 'Hide Banner' : 'Show Banner'}
          </button>
        </label>
      </div>
      <div className="form-container">
        <div className="form-group">
          <label htmlFor="description">Banner Description</label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Banner Description"
          />
        </div>
        <div className="form-group">
          <label htmlFor="timer">Banner Timer (hours)</label>
          <input
            id="timer"
            type="number"
            value={timer}
            onChange={(e) => setTimer(Number(e.target.value))}
            placeholder="Enter Timer Value"
          />
        </div>
        <div className="form-group">
          <label htmlFor="link">Banner Link</label>
          <input
            id="link"
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Enter Banner Link"
          />
        </div>
        <button onClick={handleUpdate}>Update Banner</button>
      </div>
    </div>
  );
}

export default Dashboard;
