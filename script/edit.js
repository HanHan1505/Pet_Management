'use strict';
//Slide bar trang//
const sidebarTitleEl = document.getElementById("sidebar-title");
const sidebarEl = document.getElementById("sidebar");
sidebarTitleEl.addEventListener("click", function (e) {
    e.preventDefault();
    sidebarEl.classList.toggle("active");
});
//Khai biến//
const petArr = getFromStorage("pet-list") || [];
const storePet = (x) => saveToStorage("pet-list", x);
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tBody = document.getElementById("tbody");
const renderTableData = function (petArr) {
    tBody.innerHTML = "";
    for (let i = 0; i < petArr.length; i++) {
        let vaccinatedText = petArr[i].vaccinated
            ? "bi bi-check-circle-fill"
            : "bi bi-x-circle-fill";
        let dewormedText = petArr[i].dewormed
            ? "bi bi-check-circle-fill"
            : "bi bi-x-circle-fill";
        let sterilizedText = petArr[i].sterilized
            ? "bi bi-check-circle-fill"
            : "bi bi-x-circle-fill";
        const row = document.createElement("tr");
        row.innerHTML = `<th scope="row">${petArr[i].id}</th>
<td>${petArr[i].name}</td>
<td>${petArr[i].age}</td>
<td>${petArr[i].type}</td>
<td>${petArr[i].weight} kg</td>
<td>${petArr[i].length} cm</td>
<td>${petArr[i].breed}</td>
<td>
<i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
</td>
<td><i class="${vaccinatedText}"></i></td>
<td><i class="${dewormedText}"></i></td>
<td><i class="${sterilizedText}"></i></td>
<td>${petArr[i].date}</td>
<td>
<td>
    <button type="button" class="btn btn-warning" onclick="editPet('${petArr[i].id
            }');">Edit</button>
    </td>`;
        tBody.appendChild(row);
    }
}
renderTableData(petArr);
//Hiển thị option breed-list//
const petBreed = getFromStorage("breed-list");
const renderBreed = function (petBreed) {
    breedInput.innerHTML = '';
    for (let i = 0; i < petBreed.length; i++) {
        const option = document.createElement("option");
        option.innerHTML = `<option>${petBreed[i].breed}</option>`;
        breedInput.appendChild(option);
    }
};
typeInput.addEventListener("change", function () {
    const optionsValue = petBreed.filter(function (item) {
        if (typeInput.value === "Dog") return item.type === "Dog";
        if (typeInput.value === "Cat") return item.type === "Cat";
        if (typeInput.value === "Select type") return [];
    });
    renderBreed(optionsValue);
});
renderBreed(petBreed);
//Nhận giá trị từ table date về form//
function editPet(id) {
    document.getElementById('container-form').classList.remove('hide');
    for (let i = 0; i < petArr.length; i++) {
        if (petArr[i].id == id) {
            document.getElementById('input-id').value = petArr[i].id;
            document.getElementById('input-name').value = petArr[i].name;
            document.getElementById('input-age').value = petArr[i].age;
            document.getElementById('input-type').value = petArr[i].type;
            document.getElementById('input-weight').value = petArr[i].weight;
            document.getElementById('input-length').value = petArr[i].length;
            document.getElementById('input-color-1').value = petArr[i].color;
            document.getElementById('input-breed').value = petArr[i].breed;
            document.getElementById('input-vaccinated').checked = petArr[i].vaccinated;
            document.getElementById('input-dewormed').checked = petArr[i].dewormed;
            document.getElementById('input-sterilized').checked = petArr[i].sterilized;
        }
    }
};
const submitBtn = document.getElementById("submit-btn");
const newData = submitBtn.addEventListener("click", function () {
    const data = {
        id: idInput.value,
        name: nameInput.value,
        age: parseInt(ageInput.value),
        type: typeInput.value,
        weight: parseInt(weightInput.value),
        length: parseInt(lengthInput.value),
        color: colorInput.value,
        breed: breedInput.value,
        vaccinated: vaccinatedInput.checked,
        dewormed: dewormedInput.checked,
        sterilized: sterilizedInput.checked,
        date:
            new Date().getDate() +
            "/" +
            (new Date().getMonth() + 1) +
            "/" +
            new Date().getFullYear(),
    };
    //Validate form//
    if (!idInput.value) alert("Please input ID");
    if (!nameInput.value) alert("Please input name");
    if (!ageInput.value) alert("Please input age");
    if (typeInput.value === "Select Type" || typeInput.value === "")
        alert("Please select type");
    if (breedInput.value === "Select Breed" || breedInput.value === "")
        alert("Please select breed");
    if (!weightInput.value) alert("Please input weigth");
    if (!lengthInput.value) alert("Please input length");
    if (!colorInput.value) alert("Please input color");

    if (ageInput.value < 1 || ageInput.value > 15)
        alert("Age must be between 1 and 15!"); // 1 <= age <= 15
    if (weightInput.value < 1 || weightInput.value > 15)
        alert("Weight must be between 1 and 15!"); // 1 <= weight <= 15
    if (lengthInput.value < 1 || lengthInput.value > 100)
        alert("Length must be between 1 and 100!"); // 1 <= length <= 100
    //Cập nhật giá trị mới từ form//
    const petArr = getFromStorage("pet-list") || [];
    for (let i = 0; i < petArr.length; i++) {
        if (petArr[i].id == idInput.value) {
            petArr[i].name = data.name
            petArr[i].age = data.age
            petArr[i].type = data.type
            petArr[i].breed = data.breed
            petArr[i].weight = data.weight
            petArr[i].length = data.length
            petArr[i].color = data.color
            petArr[i].vaccinated = data.vaccinated
            petArr[i].dewormed = data.dewormed
            petArr[i].sterilized = data.sterilized
            petArr[i].date = data.date
        }
    }
    storePet(petArr);
    renderTableData(petArr)
});
