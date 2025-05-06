import React, { useState } from 'react';
import { apiClient } from '../config/api';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddMammalModal = ({ onMammalAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    size: '',
    weight: '',
    gender: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    apiClient.post('/mammals', formData)
      .then(response => {
        onMammalAdded(response.data);
        setFormData({
          name: '',
          age: '',
          size: '',
          weight: '',
          gender: '',
          description: '',
        });
      })
      .catch(error => {
        console.error('Помилка додавання ссавця:', error);
      });
  };

  return (
    <div className="modal fade" id="addMammalModal" tabIndex="-1" aria-labelledby="addMammalModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addMammalModalLabel">Додати ссавця</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Ім'я</label>
                <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="age" className="form-label">Вік (роки)</label>
                <input type="number" className="form-control" id="age" name="age" value={formData.age} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="size" className="form-label">Розмір</label>
                <input type="text" className="form-control" id="size" name="size" value={formData.size} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="weight" className="form-label">Вага (кг)</label>
                <input type="number" className="form-control" id="weight" name="weight" value={formData.weight} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="gender" className="form-label">Стать</label>
                <select className="form-select" id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
                  <option value="">Оберіть стать</option>
                  <option value="Чоловіча">Чоловіча</option>
                  <option value="Жіноча">Жіноча</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Опис</label>
                <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} required></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Закрити</button>
              <button type="submit" className="btn btn-primary">Додати</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMammalModal;
