import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ToastNotification = ({ message, onClose }) => {
  return (
    <div className="toast show position-fixed bottom-0 end-0 m-3" role="alert" aria-live="assertive" aria-atomic="true">
      <div className="toast-header">
        <strong className="me-auto">Сповіщення</strong>
        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={onClose}></button>
      </div>
      <div className="toast-body">
        {message}
      </div>
    </div>
  );
};

export default ToastNotification;
