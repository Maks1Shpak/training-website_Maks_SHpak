import React, { useState, useEffect } from 'react';
import { apiClient } from '../config/api';
import 'bootstrap/dist/css/bootstrap.min.css';

const MammalsTable = () => {
  const [mammals, setMammals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Завантаження даних про ссавців
    apiClient.get('/mammals')
      .then(response => {
        setMammals(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Помилка завантаження даних:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Список ссавців</h1>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Завантаження...</span>
          </div>
        </div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Ім'я</th>
              <th>Вік (роки)</th>
              <th>Розмір</th>
              <th>Вага (кг)</th>
              <th>Стать</th>
              <th>Опис</th>
              <th>Дата додавання</th>
              <th>Дії</th>
            </tr>
          </thead>
          <tbody>
            {mammals.map(mammal => (
              <tr key={mammal.id}>
                <td>{mammal.name}</td>
                <td>{mammal.age}</td>
                <td>{mammal.size}</td>
                <td>{mammal.weight}</td>
                <td>{mammal.gender}</td>
                <td>{mammal.description}</td>
                <td>{new Date(mammal.addedDate).toLocaleDateString()}</td>
                <td>
                  <button className="btn btn-primary btn-sm me-2">Редагувати</button>
                  <button className="btn btn-danger btn-sm">Видалити</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MammalsTable;
