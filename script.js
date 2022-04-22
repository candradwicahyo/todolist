window.onload = () => {
  
  const input = document.querySelector('.input');
  const button = document.querySelector('.button');
  button.addEventListener('click', () => {
    if (!input.value) return sweetalert('error','error!','field is required!');
    if (input.value.length <= 3) return sweetalert('warning','warning','too short!');
    createElement(input.value);
    input.value = '';
  });
  
  function sweetalert(icon,title,text) {
    swal.fire({
      icon: icon,
      position: 'center',
      title: title,
      text: text
    });
  }
  
  function createElement(param) {
    const box = document.createElement('div');
    box.classList.add('box');
    
    const boxContent = document.createElement('div');
    boxContent.classList.add('box-contenr');
    const p = document.createElement('p');
    const pValue = document.createTextNode(param);
    p.appendChild(pValue);
    boxContent.appendChild(p);
    
    const boxIcon = document.createElement('div');
    boxIcon.classList.add('box-icon');
    const icon = document.createElement('i');
    icon.className = 'fa-solid fa-trash';
    icon.addEventListener('click', () => {
      swal.fire({
        icon: 'warning',
        text: 'are you sure?',
        showCancelButton: true
      }).then(result => {
        if (result.isConfirmed) {
          box.remove();
          sweetalert('success','success','list has been deleted!');
        }
      });
    });
    boxIcon.appendChild(icon);
    
    box.appendChild(boxContent);
    box.appendChild(boxIcon);
    
    const wrapperContainer = document.querySelector('.wrapper-container');
    wrapperContainer.appendChild(box);
    
    return sweetalert('success','success','list added successfully');
  }
  
}