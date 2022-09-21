'use strict';
//Active cho slide bar//
const sidebarTitleEl = document.getElementById("sidebar-title");
const sidebarEl = document.getElementById("sidebar");
sidebarTitleEl.addEventListener("click", function (e) {
    e.preventDefault();
    sidebarEl.classList.toggle("active");
});

//Đặt biến//
const petArr = getFromStorage("pet-list") || [];
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
<td>`;
        tBody.appendChild(row);
    }
}
renderTableData(petArr);
//Hiển thị các option cho breed//
const petBreed = getFromStorage("breed-list");
const renderBreed = function (petBreed) {
    breedInput.innerHTML = '';
    let option = document.createElement("option");
    option.innerHTML = "<option value=''>Select Breed</option>";
    breedInput.appendChild(option);
    for (let i = 0; i < petBreed.length; i++) {
        option = document.createElement("option");
        option.innerHTML = `<option>${petBreed[i].breed}</option>`;
        breedInput.appendChild(option);
    }
};
renderBreed(petBreed);
//Tạo event cho nút Find//
const findBtn = document.getElementById("find-btn");
findBtn.addEventListener("click", function () {
    const findArr = [];
    for (let i = 0; i < petArr.length; i++) {
        if (
            (idInput.value == '' || idInput.value == petArr[i].id) &&
            (nameInput.value == '' || nameInput.value == petArr[i].name) &&
            (typeInput.value == '' || typeInput.value == petArr[i].type) &&
            (breedInput.value == 'Select Breed' || breedInput.value == petArr[i].breed) &&
            (
                (vaccinatedInput.checked == false || vaccinatedInput.checked == petArr[i].vaccinated) &&
                (dewormedInput.checked == false || dewormedInput.checked == petArr[i].dewormed) &&
                (sterilizedInput.checked == false || sterilizedInput.checked == petArr[i].sterilized)
            )
        ) {
            findArr.push(petArr[i]);
        };
    }
    renderTableData(findArr);
});
