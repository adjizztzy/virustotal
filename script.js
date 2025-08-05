// =======================
// Konfigurasi Backend
// =======================
const BACKEND_URL = "http://IP_SERVER:PORT"; // Ganti dengan URL backend kamu
const API_KEY = "secret123"; // Sama seperti di backend

function fetchWithKey(endpoint, options = {}) {
    options.headers = {
        ...options.headers,
        "x-api-key": API_KEY,
        "Content-Type": "application/json"
    };
    return fetch(`${BACKEND_URL}${endpoint}`, options);
}

// =======================
// Login dan Navigasi
// =======================
document.addEventListener("DOMContentLoaded", () => {
    const usernameCorrect = "admin";
    const passwordCorrect = "1234";
    let currentTab = 2;

    // Login
    document.getElementById("loginButton").addEventListener("click", () => {
        const user = document.getElementById("username").value;
        const pass = document.getElementById("password").value;
        const errorElement = document.getElementById("loginError");

        if (user === usernameCorrect && pass === passwordCorrect) {
            document.getElementById("loginPage").classList.remove("active");
            document.getElementById("dashboardPage").classList.add("active");
            showTab(2);
            errorElement.textContent = "";
        } else {
            errorElement.textContent = "Username atau password salah!";
        }
    });

    // Menu navigasi
    document.getElementById("menuButton").addEventListener("click", () => {
        const menu = document.getElementById("tabMenu");
        menu.style.display = menu.style.display === "flex" ? "none" : "flex";
    });

    window.showTab = function(tab) {
        document.getElementById("tab1").classList.remove("active");
        document.getElementById("tab2").classList.remove("active");
        document.getElementById(`tab${tab}`).classList.add("active");
        currentTab = tab;
    };

    // =======================
    // Fitur WhatsApp
    // =======================

    // Tombol Connect WhatsApp
    document.getElementById("connectButton").addEventListener("click", () => {
        fetchWithKey('/connect', { method: 'POST' })
            .then(res => res.json())
            .then(data => {
                alert(data.message || "Terhubung ke WhatsApp");
                checkStatus(); // Cek ulang status setelah connect
            })
            .catch(() => alert("Gagal menghubungkan ke WhatsApp (backend tidak merespon)"));
    });

    // Tombol Kirim Pesan / Crash
    document.getElementById("sendCrashButton").addEventListener("click", () => {
        const number = document.getElementById("targetNumber").value;
        fetchWithKey('/send-message', {
            method: 'POST',
            body: JSON.stringify({ number })
        })
            .then(res => res.json())
            .then(data => {
                document.getElementById("resultMessage").textContent = data.message || data.error;
            })
            .catch(() => {
                document.getElementById("resultMessage").textContent = "Gagal mengirim pesan. Backend tidak merespons.";
            });
    });

    // =======================
    // Status Otomatis
    // =======================
    function checkStatus() {
        fetchWithKey('/status')
            .then(res => res.json())
            .then(data => {
                const circle = document.getElementById("statusCircle");
                const text = document.getElementById("statusText");
                if (data.connected) {
                    circle.classList.remove("red");
                    circle.classList.add("green");
                    text.textContent = "Connected";
                } else {
                    circle.classList.remove("green");
                    circle.classList.add("red");
                    text.textContent = "Not Connected";
                }
            })
            .catch(() => {
                const circle = document.getElementById("statusCircle");
                const text = document.getElementById("statusText");
                circle.classList.remove("green");
                circle.classList.add("red");
                text.textContent = "Backend Tidak Tersedia";
            });
    }

    setInterval(checkStatus, 3000);
});        }
    });

    // Menu navigasi
    document.getElementById("menuButton").addEventListener("click", () => {
        const menu = document.getElementById("tabMenu");
        menu.style.display = menu.style.display === "flex" ? "none" : "flex";
    });

    window.showTab = function(tab) {
        document.getElementById("tab1").classList.remove("active");
        document.getElementById("tab2").classList.remove("active");
        document.getElementById(`tab${tab}`).classList.add("active");
        currentTab = tab;
    };

    // =======================
    // Fitur WhatsApp
    // =======================

    // Tombol Connect WhatsApp
    document.getElementById("connectButton").addEventListener("click", () => {
        fetchWithKey('/connect', { method: 'POST' })
            .then(res => res.json())
            .then(data => {
                alert(data.message || "Terhubung ke WhatsApp");
                checkStatus(); // Cek ulang status setelah connect
            })
            .catch(() => alert("Gagal menghubungkan ke WhatsApp (backend tidak merespon)"));
    });

    // Tombol Kirim Pesan / Crash
    document.getElementById("sendCrashButton").addEventListener("click", () => {
        const number = document.getElementById("targetNumber").value;
        fetchWithKey('/send-message', {
            method: 'POST',
            body: JSON.stringify({ number })
        })
            .then(res => res.json())
            .then(data => {
                document.getElementById("resultMessage").textContent = data.message || data.error;
            })
            .catch(() => {
                document.getElementById("resultMessage").textContent = "Gagal mengirim pesan. Backend tidak merespons.";
            });
    });

    // =======================
    // Status Otomatis
    // =======================
    function checkStatus() {
        fetchWithKey('/status')
            .then(res => res.json())
            .then(data => {
                const circle = document.getElementById("statusCircle");
                const text = document.getElementById("statusText");
                if (data.connected) {
                    circle.classList.remove("red");
                    circle.classList.add("green");
                    text.textContent = "Connected";
                } else {
                    circle.classList.remove("green");
                    circle.classList.add("red");
                    text.textContent = "Not Connected";
                }
            })
            .catch(() => {
                const circle = document.getElementById("statusCircle");
                const text = document.getElementById("statusText");
                circle.classList.remove("green");
                circle.classList.add("red");
                text.textContent = "Backend Tidak Tersedia";
            });
    }

    setInterval(checkStatus, 3000);
});
