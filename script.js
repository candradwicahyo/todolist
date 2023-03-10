window.onload = () => {
  
  const content = document.querySelector('.content');
  const input = document.querySelector('.input');
  const submitButton = document.querySelector('.btn-submit');
  submitButton.addEventListener('click', () => {
    // input value
    const value = input.value.trim();
    // validasi
    if (validate(value) == true) {
      // render element 
      const result = render(value);
      // tampilkan element
      content.insertAdjacentHTML('afterbegin', result);
      // hapus value input
      input.value = '';
    }
  });
  
  function sweetalert(icon, title, text, position = 'center') {
    // plugin sweetalert2
    swal.fire ({
      position: position,
      icon: icon,
      title: title,
      text: text
    });
  }
  
  function validate(value) {
    // input kosong
    if (!value) return sweetalert('error', 'Alert!', 'field is empty!');
    // jika terlalu pendek
    if (value.length < 2) return sweetalert('error', 'Alert!', 'too short! must be more than 1 characters');
    // jika terlalu panjang
    if (value.length > 80) return sweetalert('error', 'Alert!', 'too much! must be less than 80 characters');
    // jika berhasil melewati semua validasi
    return true;
  }
  
  function render(value) {
    return `
    <div class="bg-white p-4 rounded my-2 shadow-sm">
      <div class="d-flex justify-content-between align-items-center">
        <span class="fw-light my-auto text">${value}</span>
        <div class="d-flex justify-content-end align-items-center">
          <button class="btn btn-success btn-sm rounded-0 me-1 btn-edit">edit</button>
          <button class="btn btn-danger btn-sm rounded-0 btn-delete">delete</button>
        </div>
      </div>
    </div>
    `;
  }
  
  function create(name, classname, value, show = false) {
    // buat element sesuai isi parameter name
    const element = document.createElement(name);
    // beri class pada element yang dibuat
    element.className = !classname ? '' : classname;
    // jika parameter show berisi boolean true
    if (show == true) {
      // isi element dengan value atau teks
      element.textContent = value;
      return element;
    }
    // tanpa value atau teks
    return element;
  }
  
  // hapus data
  document.addEventListener('click', e => {
    if (e.target.classList.contains('btn-delete')) {
      // element box
      const box = e.target.parentElement.parentElement.parentElement;
      // jalankan fungsi deleteData()
      deleteData(box);
    }
  });
  
  function deleteData(box) {
    // plugin sweetalert
    swal.fire ({
      icon: 'info',
      title: 'Are You Sure?',
      text: 'do you want to delete this data?',
      showCancelButton: true
    })
    .then(result => {
      // jika menekan tombol ok 
      if (result.isConfirmed) {
        // tampilkan pesan
        sweetalert('success', 'Success', 'data has been deleted!');
        // hapus element box
        box.remove();
      }
    });
  }
  
  // ubah data
  window.addEventListener('click', e => {
    // tombol ubah data
    if (e.target.classList.contains('btn-edit')) {
      // ambil element text
      let text = e.target.parentElement.previousElementSibling;
      // jalankan fungsi editData()
      editData(text);
    }
  });
  
  function editData(text) {
    // prompt
    const result = prompt('enter new data', text.textContent);
    /*
      jika isi variabel result adalah string kosong, 
      maka isi dengan text lama. bila variabel result ada isinya
      maka ubah isi text dengan isi dari variabel result
    */
    text.textContent = (result == '' || !result) ? text.textContent : result.trim();
    // tampilkan pesan
    sweetalert('success', 'Success', 'data has been updated!');
    /*
      supaya text dari data baru tidak menduplikat text
      dari data sebelumnya. maka dari itu, variabel text diisi
      dengan nilai null 
    */
    text = null;
  }
  
  // berguna untuk menandai sebuah teks
  window.addEventListener('click', e => {
    if (e.target.classList.contains('text')) {
      // ambil element tombol edit
      const editButton = e.target.nextElementSibling.firstElementChild;
      /*
        tambahkan class active pada saat teks ditekan.
        class tersebut bisa ditambahkan dan bisa dihilangkan dari element text
      */
      e.target.classList.toggle('active');
      // set attribute untuk tombol edit
      setAttributeButton(e.target, editButton)
    }
  });
  
  function setAttributeButton(param, edit) {
    /*
      jika text memiliki class active, maka matikan tombol edit.
      tapi jika text tidak memiliki class active, nyalakan lagi tombol editnya
    */
    return (param.classList.contains('active')) ? edit.setAttribute('disabled', true) : edit.removeAttribute('disabled');
  }
  
}