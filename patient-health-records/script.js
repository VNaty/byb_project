document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('patient-form');
    const tableBody = document.querySelector('#patient-table tbody');

    // Load patients from the mock backend
    let patients = [];
    fetch('patients.json')
        .then(response => response.json())
        .then(data => {
            patients = data;
            displayPatients();
        });

    // Add a new patient
    form.addEventListener('submit', event => {
        event.preventDefault();

        const newPatient = {
            id: Date.now(),
            name: form.name.value,
            age: form.age.value,
            gender: form.gender.value,
            history: form.history.value,
            medications: form.medications.value
        };

        patients.push(newPatient);
        displayPatients();
        form.reset();
    });

    // Display patients in the table
    function displayPatients() {
        tableBody.innerHTML = '';
        patients.forEach(patient => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${patient.name}</td>
                <td>${patient.age}</td>
                <td>${patient.gender}</td>
                <td>${patient.history}</td>
                <td>${patient.medications}</td>
                <td class="actions">
                    <button class="edit" onclick="editPatient(${patient.id})">Edit</button>
                    <button class="delete" onclick="deletePatient(${patient.id})">Delete</button>
                </td>
            `;

            tableBody.appendChild(row);
        });
    }

    // Edit a patient (this function will be expanded later)
    window.editPatient = function(id) {
        alert('Edit functionality to be implemented');
    };

    // Delete a patient
    window.deletePatient = function(id) {
        patients = patients.filter(patient => patient.id !== id);
        displayPatients();
    };
});
