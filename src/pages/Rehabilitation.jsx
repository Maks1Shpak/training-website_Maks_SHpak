import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { API_BASE_URL } from '../config/api';
import { Toast } from 'bootstrap';

// Компонент для управління китами, які перебувають на реабілітації, через API
function Rehabilitation() {  
  const [whales, setWhales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const [whaleToDelete, setWhaleToDelete] = useState(null); 
  const [currentWhale, setCurrentWhale] = useState(null);
  const [toastMessage, setToastMessage] = useState({ text: '', type: 'success' });
  
  const toastRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    gender: 'male',
    description: ''
  });

  useEffect(() => {
    document.title = 'Реабілітація китів - Сайт про китів';
    fetchWhales();
  }, []);

  useEffect(() => {
    if (toastMessage.text && toastRef.current) {
      const toastElement = new Toast(toastRef.current);
      toastElement.show();
    }
  }, [toastMessage]);
  
  const fetchWhales = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE_URL}/whales`);
      setWhales(Array.isArray(response.data) ? response.data : []);

    } catch (err) {
      setError(`Помилка завантаження даних: ${err.message}`);
      console.error('Помилка при отриманні даних про китів:', err);
      setWhales([]);

    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    
    if (['age', 'height', 'weight'].includes(name)) {
      processedValue = value === '' ? '' : Number(value);
    }
    
    setFormData({
      ...formData,
      [name]: processedValue
    });
  };

  const handleShowAddModal = () => {
    setFormData({
      name: '',
      age: '',
      height: '',
      weight: '',
      gender: 'male',
      description: ''
    });
    setShowAddModal(true);
  };

  const handleShowEditModal = (whale) => {
    setCurrentWhale(whale);
    setFormData({
      name: whale.name,
      age: whale.age,
      height: whale.height,
      weight: whale.weight,
      gender: whale.gender,
      description: whale.description || ''
    });
    setShowEditModal(true);
  };

  const handleAddWhale = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/whales`, formData);
      const newWhale = response.data;
      setWhales([...whales, newWhale]);
      setShowAddModal(false);
      setToastMessage({ text: `Кита "${newWhale.name}" успішно додано!`, type: 'success' });

    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(`Помилка при створенні: ${errorMessage}`);
      setToastMessage({ text: `Помилка при створенні: ${errorMessage}`, type: 'danger' });
      console.error('Помилка при додаванні кита:', err);

    } finally {
      setLoading(false);
    }
  };

  const handleUpdateWhale = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const response = await axios.put(`${API_BASE_URL}/whales/${currentWhale._id}`, formData);
      const updatedWhale = response.data;
      setWhales(whales.map(whale => 
        whale._id === currentWhale._id ? updatedWhale : whale
      ));
      setShowEditModal(false);
      setToastMessage({ text: `Дані про кита "${updatedWhale.name}" оновлено!`, type: 'success' });

    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(`Помилка при оновленні: ${errorMessage}`);
      setToastMessage({ text: `Помилка при оновленні: ${errorMessage}`, type: 'danger' });
      console.error('Помилка при оновленні кита:', err);
      
    } finally {
      setLoading(false);
    }
  };
   
  const handleShowDeleteModal = (whale) => {
    setWhaleToDelete(whale);
    setShowDeleteModal(true);
  };

  const handleDeleteWhale = async () => {
    try {
      setLoading(true);
      await axios.delete(`${API_BASE_URL}/whales/${whaleToDelete._id}`);
      setWhales(whales.filter(whale => whale._id !== whaleToDelete._id));
      setToastMessage({ text: `Кита "${whaleToDelete.name}" успішно видалено!`, type: 'success' });
      setShowDeleteModal(false); 
      setWhaleToDelete(null); 

    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(`Помилка при видаленні: ${errorMessage}`);
      setToastMessage({ text: `Помилка при видаленні: ${errorMessage}`, type: 'danger' });
      console.error('Помилка при видаленні кита:', err);

    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('uk-UA', options);
  };
  
  return (
    <main className="container px-4 py-4">
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2 text-success">Реабілітація китів</h1>
        <button 
          className="btn btn-success" 
          onClick={handleShowAddModal}
          disabled={loading}
        >
          Додати кита
        </button>
      </header>

      {/* Повідомлення про помилку */}
      {error && (
        <section className="alert alert-danger mb-4" role="alert">
          {error}
        </section>
      )}
      
      {/* Toast для повідомлень */}
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div 
          ref={toastRef}
          className={`toast align-items-center text-white bg-${toastMessage.type} border-0`} 
          role="alert" 
          aria-live="assertive" 
          aria-atomic="true"
          data-bs-delay="3000"
        >
          <div className="d-flex">
            <div className="toast-body">
              {toastMessage.text}
            </div>
            <button 
              type="button" 
              className="btn-close btn-close-white me-2 m-auto" 
              data-bs-dismiss="toast" 
              aria-label="Закрити"
            ></button>
          </div>
        </div>
      </div>

      {/* Таблиця китів */}
      {loading && !error && (
        <div className="text-center my-5">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Завантаження...</span>
          </div>
          <p className="mt-2">Завантаження записів китів...</p>
        </div>
      )}
      
      {!loading && whales.length === 0 && (
        <section className="alert alert-info">
          Немає доступних записів про китів у реабілітації. Додайте першого кита!
        </section>
      )}
      
      {!loading && whales.length > 0 && (
        <section className="table-responsive">
          <table className="table table-striped table-bordered table-hover vertical-align-middle">
            <thead>
              <tr>
                <th>Ім'я</th>
                <th>Вік (роки)</th>
                <th>Висота (см)</th>
                <th>Вага (кг)</th>
                <th>Стать</th>
                <th>Опис</th>
                <th>Дата додавання</th>
                <th>Дії</th>
              </tr>
            </thead>
            <tbody>
              {whales.map(whale => (
                <tr key={whale._id}>
                  <td>{whale.name}</td>
                  <td>{whale.age}</td>
                  <td>{whale.height}</td>
                  <td>{whale.weight}</td>
                  <td>{whale.gender === 'male' ? 'Самець' : 'Самиця'}</td>
                  <td>{whale.description}</td>
                  <td>{whale.dateAdded ? formatDate(whale.dateAdded) : 'Н/Д'}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm me-2"
                      onClick={() => handleShowEditModal(whale)}
                      disabled={loading}
                    >
                      Редагувати
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleShowDeleteModal(whale)}
                      disabled={loading}
                    >
                      Видалити
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* Модальні вікна для китів */}
      {/* ...existing modal code updated for whales... */}
    </main>
  );
}

export default Rehabilitation;