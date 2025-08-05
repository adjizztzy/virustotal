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
// Main Script
// =======================
document.addEventListener("DOMContentLoaded", () => {
    const passwordCorrect = "1234"; // password saja

    // LOGIN
    const loginBtn = document.getElementById("loginButton");
    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            const pass = document.getElementById("password").value;
            const errorElement = document.getElementById("loginError");

            if (pass === passwordCorrect) {
                const loginPage = document.getElementById("loginPage");
                const dashboardPage = document.getElementById("dashboardPage");

                if (loginPage && dashboardPage) {
                    loginPage.classList.remove("active");
                    dashboardPage.classList.add("active");
                }

                if (typeof showTab === "function") {
                    showTab(2);
                } else {
                    console.warn("showTab() tidak ditemukan");
                }

                if (errorElement) errorElement.textContent = "";
            } else {
                if (errorElement) errorElement.textContent = "Password salah!";
            }
        });
    }

    // TAB NAVIGATION
    window.showTab = function(tab) {
        const tab1 = document.getElementById("tab1");
        const tab2 = document.getElementById("tab2");

        if (tab1 && tab2) {
            tab1.classList.remove("active");
            tab2.classList.remove("active");
            const activeTab = document.getElementById(`tab${tab}`);
            if (activeTab) activeTab.classList.add("active");
        }
    };

    const menuBtn = document.getElementById("menuButton");
    if (menuBtn) {
        menuBtn.addEventListener("click", () => {
            const menu = document.getElementById("tabMenu");
            if (menu) {
                menu.style.display = menu.style.display === "flex" ? "none" : "flex";
            }
        });
    }

    // CONNECT WHATSAPP
    const connectBtn = document.getElementById("connectButton");
    if (connectBtn) {
        connectBtn.addEventListener("click", () => {
            fetchWithKey('/connect', { method: 'POST' })
                .then(res => res.json())
                .then(data => {
                    alert(data.message || "Terhubung ke WhatsApp");
                    checkStatus();
                })
                .catch(() => alert("Gagal menghubungkan ke WhatsApp (backend tidak merespon)"));
        });
    }

    // SEND CRASH
    const crashBtn = document.getElementById("sendCrashButton");
    if (crashBtn) {
        crashBtn.addEventListener("click", () => {
            const number = document.getElementById("targetNumber").value;
            fetchWithKey('/send-message', {
                method: 'POST',
                body: JSON.stringify({ number })
            })
                .then(res => res.json())
                .then(data => {
                    const result = document.getElementById("resultMessage");
                    if (result) result.textContent = data.message || data.error;
                })
                .catch(() => {
                    const result = document.getElementById("resultMessage");
                    if (result) result.textContent = "Gagal mengirim pesan. Backend tidak merespons.";
                });
        });
    }

    // STATUS CHECK
    function checkStatus() {
        fetchWithKey('/status')
            .then(res => res.json())
            .then(data => {
                const circle = document.getElementById("statusCircle");
                const text = document.getElementById("statusText");
                if (data.connected) {
                    if (circle) {
                        circle.classList.remove("red");
                        circle.classList.add("green");
                    }
                    if (text) text.textContent = "Connected";
                } else {
                    if (circle) {
                        circle.classList.remove("green");
                        circle.classList.add("red");
                    }
                    if (text) text.textContent = "Not Connected";
                }
            })
            .catch(() => {
                const circle = document.getElementById("statusCircle");
                const text = document.getElementById("statusText");
                if (circle) {
                    circle.classList.remove("green");
                    circle.classList.add("red");
                }
                if (text) text.textContent = "Backend Tidak Tersedia";
            });
    }

    setInterval(checkStatus, 3000);
});
