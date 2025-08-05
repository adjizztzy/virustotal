const usernameCorrect = "adji";
const passwordCorrect = "adji";
let currentTab = 2;

// LOGIN FUNCTION
function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    const errorElement = document.getElementById("loginError");

    if (user === usernameCorrect && pass === passwordCorrect) {
        // Sembunyikan halaman login, tampilkan dashboard
        document.getElementById("loginPage").classList.remove("active");
        document.getElementById("dashboardPage").classList.add("active");
        showTab(2);
        errorElement.textContent = ""; // Hapus pesan error jika login berhasil
    } else {
        // Tampilkan pesan error
        errorElement.textContent = "Username atau password salah!";
    }
            }
// TOGGLE MENU
function toggleMenu() {
    const menu = document.getElementById("tabMenu");
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

// SHOW TAB
function showTab(tab) {
    document.getElementById("tab1").classList.remove("active");
    document.getElementById("tab2").classList.remove("active");
    document.getElementById(`tab${tab}`).classList.add("active");
    currentTab = tab;
}

// CONNECT WHATSAPP
function connectWhatsApp() {
    fetch('/connect', { method: 'POST' })
        .then(() => checkStatus());
}

// CHECK STATUS EVERY 3 SECONDS
function checkStatus() {
    setInterval(() => {
        fetch('/status')
            .then(res => res.json())
            .then(data => {
                const circle = document.getElementById("statusCircle");
                const text = document.getElementById("statusText");
                if (data.connected) {
                    circle.classList.remove("red");
                    circle.classList.add("green");
                    text.textContent = "Connected";
                    if (currentTab === 2) showTab(1);
                } else {
                    circle.classList.remove("green");
                    circle.classList.add("red");
                    text.textContent = "Not Connected";
                }
            });
    }, 3000);
}
checkStatus();

// SEND CRASH
function sendCrash() {
    const number = document.getElementById("targetNumber").value;
    fetch('/crash', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("resultMessage").textContent = data.message || data.error;
    });
}        // Tentukan status keamanan
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
