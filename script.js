// Data Absensi Karantina Tahfidz
const absensiData = [
    { semester: 'Semester 1', code: 'Sem 1', total: 51, absent: 5, rate: 9.80, status: '🟢 Paling Rajin', class: 'status-good', barClass: 'fill-green', desc: 'Anak baru masih penuh semangat & jadwal kuliah masih teratur.' },
    { semester: 'Semester 3', code: 'Sem 3', total: 24, absent: 10, rate: 41.67, status: '🟡 Waspada', class: 'status-warn', barClass: 'fill-amber', desc: 'Mulai tertekan tugas praktikum dan kegiatan organisasi.' },
    { semester: 'Semester 5', code: 'Sem 5', total: 29, absent: 27, rate: 93.10, status: '🚨 Kritis', class: 'status-bad', barClass: 'fill-red', desc: 'Puncak kejenuhan & padatnya persiapan magang/penelitian.' },
    { semester: 'Semester 7', code: 'Sem 7', total: 29, absent: 25, rate: 86.21, status: '🚨 Sangat Tinggi', class: 'status-bad', barClass: 'fill-red', desc: 'Fokus terbagi total ke pengerjaan Skripsi dan Bimbingan.' },
    { semester: 'Semester 9', code: 'Sem 9', total: 8, absent: 7, rate: 87.50, status: '🚨 Sangat Tinggi', class: 'status-bad', barClass: 'fill-red', desc: 'Mahasiswa akhir yang tinggal menyelesaikan sisa kelulusan.' }
];

// 1. Render Tabel Data
function renderTable(data) {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${item.semester}</strong></td>
            <td>${item.total} orang</td>
            <td>${item.absent} orang</td>
            <td><strong style="color:var(--primary);">${item.rate.toFixed(2)}%</strong></td>
            <td style="width: 25%;">
                <div class="bar-bg">
                    <div class="bar-fill ${item.barClass}" style="width: ${item.rate}%;"></div>
                </div>
            </td>
            <td><span class="badge-status ${item.class}">${item.status}</span></td>
        `;
        // Klik baris untuk popup detail
        row.onclick = () => alert(`📌 ANALISIS ${item.semester.toUpperCase()}\n\n• Mahasiswa: ${item.total} orang\n• Ketidakhadiran: ${item.absent} orang (${item.rate}%)\n• Diagnosa: "${item.desc}"`);
        tbody.appendChild(row);
    });
}

// 2. Filter Semester Interaktif & Update KPI
function filterSemester(code, btn) {
    document.querySelectorAll('#filterGroup .filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    if (code === 'all') {
        renderTable(absensiData);
        document.getElementById('kpiTotal').innerText = 141;
        document.getElementById('kpiBest').innerText = "9.80%";
        document.getElementById('kpiWorst').innerText = "93.10%";
    } else {
        const filtered = absensiData.filter(d => d.code === code);
        renderTable(filtered);
        if(filtered.length > 0) {
            document.getElementById('kpiTotal').innerText = filtered[0].total;
            document.getElementById('kpiBest').innerText = `${filtered[0].rate}%`;
            document.getElementById('kpiWorst').innerText = `${filtered[0].absent} Absen`;
        }
    }
}

// 3. Menandai Tombol Navigasi Aktif saat Ditekan
function setActiveNav(btn) {
    document.querySelectorAll('#navTabs .nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

// 4. Ekspor Data ke File CSV
function exportData() {
    let csvContent = "data:text/csv;charset=utf-8,Semester,Mahasiswa,Tidak Hadir,Persentase Absen (%)\n";
    absensiData.forEach(r => csvContent += `${r.semester},${r.total},${r.absent},${r.rate}\n`);
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "Data_Absensi_Tahfidz_2022.csv";
    link.click();
}

// Inisialisasi Saat Halaman Selesai Dimuat
document.addEventListener('DOMContentLoaded', () => renderTable(absensiData));