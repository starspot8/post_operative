const patients = [
  {id:1,name:'Budi Santoso',initials:'BS',procedure:'Katarak',checkpoint:'H+1',time:'09:30',status:'urgent',label:'Perlu perhatian',detail:'Sakit sekali dan penglihatan bertambah buram.',next:'Segera hubungi perawat'},
  {id:2,name:'Siti Aminah',initials:'SA',procedure:'Vitrektomi',checkpoint:'3 Jam',time:'10:15',status:'urgent',label:'Perlu perhatian',detail:'Belum mengirim foto mata setelah menjawab merah.',next:'Review foto pasien'},
  {id:3,name:'Hendra Wijaya',initials:'HW',procedure:'LASIK',checkpoint:'H+3',time:'08:45',status:'warning',label:'Perlu dipantau',detail:'Kadang lupa menggunakan obat sesuai jadwal.',next:'Telepon sesuai jadwal'},
  {id:4,name:'Maria Lestari',initials:'ML',procedure:'Oculoplasty',checkpoint:'H+1',time:'11:00',status:'warning',label:'Perlu dipantau',detail:'Istirahat kurang semalam.',next:'Telepon sesuai jadwal'},
  {id:5,name:'Agus Setiawan',initials:'AS',procedure:'Katarak',checkpoint:'H+1',time:'11:30',status:'warning',label:'Perlu dipantau',detail:'Mata sedikit merah, tanpa keluhan lain.',next:'Review normal'},
  {id:6,name:'Dewi Kartika',initials:'DK',procedure:'Katarak',checkpoint:'3 Jam',time:'12:00',status:'normal',label:'Normal',detail:'Kondisi mata normal dan check-in lengkap.',next:'Tidak ada tindakan'},
  {id:7,name:'Rudi Hartono',initials:'RH',procedure:'Injeksi',checkpoint:'3 Jam',time:'12:30',status:'normal',label:'Normal',detail:'Tidak ada nyeri atau keluhan.',next:'Tidak ada tindakan'},
  {id:8,name:'Lina Marlina',initials:'LM',procedure:'LASIK',checkpoint:'H+1',time:'13:00',status:'pending',label:'Belum respons',detail:'Belum ada jawaban dari pasien.',next:'Tindak lanjuti via telepon'},
  {id:9,name:'Eko Prasetyo',initials:'EP',procedure:'Vitrektomi',checkpoint:'H+3',time:'14:00',status:'pending',label:'Belum respons',detail:'Reminder sudah dikirim 30 menit lalu.',next:'Tindak lanjuti via telepon'},
  {id:10,name:'Nur Aisyah',initials:'NA',procedure:'Oculoplasty',checkpoint:'1 Minggu',time:'15:30',status:'pending',label:'Belum respons',detail:'Belum ada jawaban dari pasien.',next:'Tindak lanjuti via telepon'}
];
const rows = document.getElementById('patientRows');
const empty = document.getElementById('emptyState');
let activeFilter = 'all';
function render() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const visible = patients.filter(p => (activeFilter === 'all' || p.status === activeFilter) && p.name.toLowerCase().includes(query));
  rows.innerHTML = visible.map(p => `<tr><td><div class="patient-name"><span class="patient-avatar">${p.initials}</span>${p.name}</div></td><td><span class="procedure">${p.procedure}</span></td><td><span class="checkpoint">${p.checkpoint}<small>${p.time}</small></span></td><td><span class="status ${p.status}">${p.label}</span></td><td><button class="row-action" data-id="${p.id}" aria-label="Lihat detail ${p.name}">›</button></td></tr>`).join('');
  empty.style.display = visible.length ? 'none' : 'block';
  document.querySelectorAll('.row-action').forEach(b => b.addEventListener('click', () => openPatient(Number(b.dataset.id))));
}
function openPatient(id) { const p = patients.find(x => x.id === id); document.getElementById('modalContent').innerHTML = `<p class="eyebrow">DETAIL PASIEN DEMO</p><h2>${p.name}</h2><p class="muted">Data contoh — bukan data pasien nyata</p><div class="modal-grid"><div><label>TINDAKAN</label><strong>${p.procedure}</strong></div><div><label>CHECKPOINT</label><strong>${p.checkpoint}, ${p.time}</strong></div><div><label>STATUS</label><span class="status ${p.status}">${p.label}</span></div><div><label>NEXT ACTION</label><strong>${p.next}</strong></div></div><hr><p><strong>Ringkasan check-in</strong></p><p class="muted">${p.detail}</p>`; document.getElementById('modal').classList.add('open'); }
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => { document.querySelector('.filter.active').classList.remove('active'); button.classList.add('active'); activeFilter = button.dataset.filter; render(); }));
document.getElementById('searchInput').addEventListener('input', render);
document.getElementById('closeModal').addEventListener('click', () => document.getElementById('modal').classList.remove('open'));
document.getElementById('modal').addEventListener('click', e => { if (e.target.id === 'modal') e.currentTarget.classList.remove('open'); });
document.getElementById('addPatient').addEventListener('click', () => alert('Fitur tambah pasien akan tersedia pada versi berikutnya.'));
document.getElementById('exportButton').addEventListener('click', () => alert('Demo: laporan siap diunduh pada versi berikutnya.'));
render();
