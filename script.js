document.addEventListener("DOMContentLoaded", () => {
    console.log("Script loaded!");

    const usernameCorrect = "admin";
    const passwordCorrect = "1234";
    let currentTab = 2;

    // LOGIN
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

    // TOGGLE MENU
    document.getElementById("menuButton").addEventListener("click", () => {
        const menu = document.getElementById("tabMenu");
        menu.style.display = menu.style.display === "flex" ? "none" : "flex";
    });

    // SHOW TAB
    function showTab(tab) {
        document.getElementById("tab1").classList.remove("active");
        document.getElementById("tab2").classList.remove("active");
        document.getElementById(`tab${tab}`).classList.add("active");
        currentTab = tab;
    }

    // CONNECT WHATSAPP
    document.getElementById("connectButton").addEventListener("click", () => {
        fetch('/connect', { method: 'POST' }).then(() => checkStatusOnce());
    });

    // SEND CRASH
    document.getElementById("sendCrashButton").addEventListener("click", () => {
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
    });

    // STATUS CHECK (manual)
    function checkStatusOnce() {
        fetch('/status')
            .then(res => res.json())
            .then(data => {
                const circle = document.getElementById("statusCircle");
                const text = document.getElementById("statusText");
                if (data.connected) {
                    circle.classList.remove("red");
                    circle.classList.add("green");
                    text.textContent = "Connected";
                    showTab(1);
                } else {
                    circle.classList.remove("green");
                    circle.classList.add("red");
                    text.textContent = "Not Connected";
                }
            });
    }

    // STATUS CHECK (otomatis)
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
                } else {
                    circle.classList.remove("green");
                    circle.classList.add("red");
                    text.textContent = "Not Connected";
                }
            });
    }, 3000);
});    fetch('/connect', { method: 'POST' }).then(() => checkStatusOnce());
});

// SEND CRASH
document.getElementById("sendCrashButton").addEventListener("click", () => {
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
});

// STATUS CHECK
function checkStatusOnce() {
    fetch('/status')
        .then(res => res.json())
        .then(data => {
            const circle = document.getElementById("statusCircle");
            const text = document.getElementById("statusText");
            if (data.connected) {
                circle.classList.remove("red");
                circle.classList.add("green");
                text.textContent = "Connected";
                showTab(1);
            } else {
                circle.classList.remove("green");
                circle.classList.add("red");
                text.textContent = "Not Connected";
            }
        });
}

// AUTO STATUS CHECK
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
            } else {
                circle.classList.remove("green");
                circle.classList.add("red");
                text.textContent = "Not Connected";
            }
        });
}, 3000);function connectWhatsApp() {
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
