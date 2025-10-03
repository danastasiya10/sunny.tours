// Сайт розроблено студенткою Дубограй Анастасією, ФЕМП група 5-9з
const tours = [
  {id:1,title:{uk:"Київ — Екскурсія містом",en:"Kyiv — City Tour"},price:4200, img:"https://picsum.photos/id/1031/800/600", country:"Україна"},
  {id:2,title:{uk:"Львів — Романтичний вікенд",en:"Lviv — Romantic Weekend"},price:3500, img:"https://picsum.photos/id/1025/800/600", country:"Україна"},
  {id:3,title:{uk:"Одеса — Морський відпочинок",en:"Odesa — Sea Holiday"},price:2800, img:"https://picsum.photos/id/1015/800/600", country:"Україна"},
  {id:4,title:{uk:"Париж — Місто кохання",en:"Paris — City of Love"},price:12500, img:"https://picsum.photos/id/1016/800/600", country:"Франція"},
  {id:5,title:{uk:"Санторіні — Острів мрій",en:"Santorini — Island Dream"},price:13800, img:"https://picsum.photos/id/1027/800/600", country:"Греція"},
  {id:6,title:{uk:"Бухарест — Європейський шарм",en:"Bucharest — European Charm"},price:7600, img:"https://picsum.photos/id/1003/800/600", country:"Румунія"}
];

let lang = localStorage.getItem('lang') || 'uk';

function $(sel){return document.querySelector(sel)}
function $all(sel){return document.querySelectorAll(sel)}

function formatPrice(n){ return n.toString().replace(/(\d)(?=(\d{3})+$)/g,'$1 ' ) + ' грн'; }

function renderTours(){
  const container = $('#toursContainer');
  if(!container) return;
  container.innerHTML = '';
  tours.forEach(t=>{
    const card = document.createElement('div'); card.className='card';
    card.innerHTML = `
      <img src="${t.img}" alt="${t.title[lang]}">
      <h3>${t.title[lang]}</h3>
      <div class="small">${t.country}</div>
      <div style="margin-top:8px"><span class="price">${formatPrice(t.price)}</span></div>
      <div style="margin-top:12px"><button class="btn book-btn" data-id="${t.id}">${lang==='uk'?'Забронювати':'Book'}</button></div>
    `;
    container.appendChild(card);
  });
  $all('.book-btn').forEach(b=>b.addEventListener('click', openBooking));
}

function openBooking(e){
  const id = +e.currentTarget.dataset.id;
  const tour = tours.find(x=>x.id===id);
  $('#modal').style.display='flex';
  $('#modal .box').dataset.id=id;
  $('#tourName').textContent = tour.title[lang];
  $('#tourPrice').textContent = formatPrice(tour.price);
  $('#totalPrice').textContent = formatPrice(tour.price);
  $('#persons').value = 1;
  $('#date').value = '';
}

function closeModal(){ $('#modal').style.display='none'; }

function updateTotal(){
  const id = +$('#modal .box').dataset.id;
  const persons = +$('#persons').value || 1;
  const tour = tours.find(x=>x.id===id);
  const total = tour.price * persons;
  $('#totalPrice').textContent = formatPrice(total);
}

function confirmBooking(){
  const id = +$('#modal .box').dataset.id;
  const persons = +$('#persons').value || 1;
  const date = $('#date').value;
  if(!date){ alert(lang==='uk'?'Оберіть дату':'Please choose a date'); return; }
  const tour = tours.find(x=>x.id===id);
  alert((lang==='uk'?'Дякуємо! Ви забронювали ':'Thanks! You booked ') + tour.title[lang] + '\n' + (lang==='uk'? 'Дата: ':'Date: ') + date + '\n' + (lang==='uk'?'Кількість осіб: ':'Persons: ') + persons + '\n' + (lang==='uk'?'Загальна вартість: ':'Total price: ') + formatPrice(tour.price*persons));
  closeModal();
}

function switchLang(to){
  lang = to; localStorage.setItem('lang',lang); applyLang();
}

function applyLang(){
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.dataset.i18n;
    const texts = {
      'home':'Головна','about':'Про нас','tours':'Тури','contacts':'Контакти','reviews':'Відгуки',
      'welcome':'Ласкаво просимо до Sunny Tours','hero':'Знайдіть свій ідеальний тур','selectlang':'ENG'
    };
    const en = {'home':'Home','about':'About','tours':'Tours','contacts':'Contacts','reviews':'Reviews','welcome':'Welcome to Sunny Tours','hero':'Find your perfect tour','selectlang':'УКР'};
    el.textContent = (lang==='uk'? texts[key] || texts[key] : en[key] || en[key]);
  });
  // re-render tours and buttons
  renderTours();
  // update static small texts
  document.title = (lang==='uk'?'Туристична агенція':'Travel agency');
}

document.addEventListener('click', function(ev){
  if(ev.target.matches('.modal') && ev.target.id==='modal') closeModal();
});

document.addEventListener('DOMContentLoaded', function(){
  applyLang();
  document.getElementById('closeModal').addEventListener('click', closeModal);
  document.getElementById('persons').addEventListener('input', updateTotal);
  document.getElementById('date').addEventListener('change', updateTotal);
  document.getElementById('confirmBooking').addEventListener('click', confirmBooking);
  document.getElementById('langBtn').addEventListener('click', ()=> switchLang(lang==='uk'?'en':'uk'));
});
