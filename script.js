// API Key VirusTotal (TIDAK AMAN jika dipakai di client-side)
const apiKey = "c2a41f2d07d65d78ce8276c4009ba885c8a30a867f3ae12067e79ba013067552";

// Deteksi IP pengguna secara real time
fetch('https://api.ipify.org?format=json')
    .then(res => res.json())
    .then(data => {
        document.getElementById("my-ip").textContent = data.ip;
    })
    .catch(() => {
        document.getElementById("my-ip").textContent = "Gagal mendeteksi IP";
    });

// Event untuk tombol cek domain
document.getElementById("cekBtn").addEventListener("click", cekDomain);

async function cekDomain() {
    const domain = document.getElementById("domain").value.trim();
    if (!domain) {
        alert("Masukkan domain terlebih dahulu!");
        return;
    }

    document.getElementById("status").textContent = "Memeriksa...";
    document.getElementById("hasil").textContent = "";

    try {
        const response = await fetch(`https://www.virustotal.com/api/v3/domains/${domain}`, {
            headers: { "x-apikey": apiKey }
        });

        if (!response.ok) throw new Error("Gagal mengambil data dari VirusTotal");

        const data = await response.json();
        const stats = data.data.attributes.last_analysis_stats;

        // Tentukan status keamanan
        let statusKeamanan;
        if (stats.malicious > 0) {
            statusKeamanan = "⚠️ Berbahaya!";
        } else if (stats.suspicious > 0) {
            statusKeamanan = "🟡 Sedikit Berbahaya!";
        } else {
            statusKeamanan = "✅ Aman";
        }

        document.getElementById("status").textContent = `Status: ${statusKeamanan}`;

        // Tampilkan semua hasil analisis
        const analisisLengkap = data.data.attributes.last_analysis_results;
        let hasilDetail = `Ringkasan:\n- Harmless: ${stats.harmless}\n- Suspicious: ${stats.suspicious}\n- Malicious: ${stats.malicious}\n- Undetected: ${stats.undetected}\n\nHasil Lengkap:\n`;

        for (let vendor in analisisLengkap) {
            hasilDetail += `${vendor}: ${analisisLengkap[vendor].category}\n`;
        }

        document.getElementById("hasil").textContent = hasilDetail;
    } catch (error) {
        document.getElementById("status").textContent = "❌ Terjadi kesalahan";
        document.getElementById("hasil").textContent = error.message;
    }
    }
