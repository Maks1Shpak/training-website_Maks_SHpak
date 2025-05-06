import { API_BASE_URL } from './config/api.js';

const mammalTableBody = document.getElementById('mammalTableBody');
const spinner = document.getElementById('spinner');
const toast = new bootstrap.Toast(document.getElementById('toast'));
const mammalForm = document.getElementById('mammalForm');
const saveMammalBtn = document.getElementById('saveMammalBtn');

let editingMammalId = null;

// Показати сповіщення
function showToast(message) {
  document.querySelector('.toast-body').textContent = message;
  toast.show();
}

// Завантажити дані
async function loadMammals() {
  spinner.classList.remove('d-none');
  try {
    const response = await axios.get(`${API_BASE_URL}/mammals`);
    mammalTableBody.innerHTML = response.data.map(mammal => `
      <tr>
        <td>${mammal.name}</td>
        <td>${mammal.age}</td>
        <td>${mammal.size}</td>
        <td>${mammal.weight}</td>
        <td>${mammal.gender}</td>
        <td>${mammal.description}</td>
        <td>${new Date(mammal.addedDate).toLocaleDateString()}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="editMammal(${mammal.id})">Редагувати</button>
          <button class="btn btn-danger btn-sm" onclick="deleteMammal(${mammal.id})">Видалити</button>
        </td>
      </tr>
    `).join('');
  } catch (error) {
    showToast('Помилка завантаження даних');
  } finally {
    spinner.classList.add('d-none');
  }
}

// Додати/Редагувати ссавця
saveMammalBtn.addEventListener('click', async () => {
  const mammalData = {
    name: mammalForm.name.value,
    age: mammalForm.age.value,
    size: mammalForm.size.value,
    weight: mammalForm.weight.value,
    gender: mammalForm.gender.value,
    description: mammalForm.description.value,
  };

  try {
    if (editingMammalId) {
      await axios.put(`${API_BASE_URL}/mammals/${editingMammalId}`, mammalData);
      showToast('Запис оновлено');
    } else {
      await axios.post(`${API_BASE_URL}/mammals`, mammalData);
      showToast('Запис додано');
    }
    editingMammalId = null;
    mammalForm.reset();
    bootstrap.Modal.getInstance(document.getElementById('mammalModal')).hide();
    loadMammals();
  } catch (error) {
    showToast('Помилка збереження даних');
  }
});

// Видалити ссавця
async function deleteMammal(id) {
  try {
    await axios.delete(`${API_BASE_URL}/mammals/${id}`);
    showToast('Запис видалено');
    loadMammals();
  } catch (error) {
    showToast('Помилка видалення запису');
  }
}

// Редагувати ссавця
function editMammal(id) {
  const mammal = Array.from(mammalTableBody.children).find(row => row.dataset.id == id);
  mammalForm.name.value = mammal.name;
  mammalForm.age.value = mammal.age;
  mammalForm.size.value = mammal.size;
  mammalForm.weight.value = mammal.weight;
  mammalForm.gender.value = mammal.gender;
  mammalForm.description.value = mammal.description;
  editingMammalId = id;
  new bootstrap.Modal(document.getElementById('mammalModal')).show();
}

// Завантажити дані при завантаженні сторінки
document.addEventListener('DOMContentLoaded', loadMammals);
