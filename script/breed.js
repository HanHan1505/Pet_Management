"use strict";
//Đặt biến xử lý
const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const submitBtn = document.getElementById("submit-btn");
const sidebarTitleEl = document.getElementById("sidebar-title");
const sidebarEl = document.getElementById("sidebar");
const storeBreed = (x) => saveToStorage("breed-list", x);
const petBreed = getFromStorage("breed-list") || []; //JSON.parse(localStorage.getItem("breed-list"))
//Xử lý slide bar trang:
sidebarTitleEl.addEventListener("click", function (e) {
    e.preventDefault();
    sidebarEl.classList.toggle("active");
});
//Hàm hiện dữ liệu bảng Breed
const renderTableData = function (x) {
    tbody.innerHTML = "";
    for (let i = 0; i < x.length; i++) {
        const row = document.createElement("tr");
        row.innerHTML = `<td scope="row">${x.indexOf(x[i]) + 1}</td>
    <td>${x[i].breed}</td>
    <td>${x[i].type}</td>
    <td>
    <button type="button" class="btn btn-danger">
    Delete
    </button>
    </td>`;
        tbody.appendChild(row);
    }
    // Bắt sự kiện Delete 
    const btnsDelete = document.querySelectorAll(".btn-danger");
    btnsDelete.forEach(function (btn, i) {
        btn.addEventListener("click", function () {
            petBreed.splice(i, 1);
            storeBreed(petBreed);
            renderTableData(petBreed);
        });
    });
};
//Kiểm tra hợp lệ
const validate = function () {
    if (typeInput.value === "Select Type" || typeInput.value === "")
        return false;
    if (breedInput.value === "") return false;
    return true;
};
renderTableData(petBreed);
//Bắt sự kiện vào nút Submit
//Xử lý dữ liệu nhận từ input form:
submitBtn.addEventListener("click", function () {
    const breedData = {
        breed: breedInput.value,
        type: typeInput.value,
    };
    //Yêu cầu để validate form
    if (typeInput.value === "Select Type" || typeInput.value === "")
        alert("Please select type");
    if (breedInput.value === "Select Breed" || breedInput.value === "")
        alert("Please input breed");
    validate();
    if (validate()) {
        petBreed.push(breedData);
        renderTableData(petBreed);
        storeBreed(petBreed);
        typeInput.value = "";
        breedInput.value = "";
    }
});

