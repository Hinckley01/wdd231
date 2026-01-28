
document.getElementById('timestamp').value = new Date().toISOString();


const modalButtons = document.querySelectorAll('.card button');
modalButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const modal = document.getElementById(btn.dataset.modal);
    if(modal) modal.showModal();
  });
});

const closeButtons = document.querySelectorAll('dialog .close');
closeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('dialog').close();
  });
});


window.addEventListener('load', () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card,i) => setTimeout(()=>card.classList.add('animate'), i*150));
});
