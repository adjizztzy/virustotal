document.addEventListener("DOMContentLoaded", () => {
    console.log("Frontend loaded!");

    const usernameCorrect = "admin";
    const passwordCorrect = "1234";
    let isConnected = false;
    let backendAvailable = false;

    // ------------------ CEK BACKEND OTOMATIS ------------------
    function checkBackend() {
        fetch("/status")
            .then(res => res.json())
            .then(data => {
                backendAvailable = true;
                if (data.connected) {
                    isConnected = true;
                    updateStatus(true);
                } else {
                    isConnected = false;
                    updateStatus(false);
                }
            })
            .catch(() => {
                backendAvailable = false;
                isConnected = false;
                updateStatus(false);
            });
    }

    // Jalankan cek backend setiap 3 detik
    setInterval(checkBackend, 3000);
    checkBackend();

    // ------------------ UPDATE STATUS UI ------------------
    function updateStatus(connected) {
        const circle = document.getElementById("statusCircle");
        const text = document.getElementById("statusText");

        if (!backendAvailable) {
            circle.classList.remove("green");
            circle.classList.add("red");
            text.textContent = "Backend Tidak Tersedia";
            return;
        }

        if (connected) {
            circle.classList.remove("red");
            circle.classList.add("green");
            text.textContent = "Connected";
        } else {
            circle.classList.remove("green");
            circle.classList.add("red");
            text.textContent = "Not Connected";
        }
    }

    // ------------------ LOGIN ------------------
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

    // ------------------ TOGGLE MENU ------------------
    document.getElementById("menuButton").addEventListener("click", () => {
        const menu = document.getElementById("tabMenu");
        menu.style.display = menu.style.display === "flex" ? "none" : "flex";
    });

    // ------------------ SWITCH TAB ------------------
    window.showTab = function(tab) {
        document.getElementById("tab1").classList.remove("active");
        document.getElementById("tab2").classList.remove("active");
        document.getElementById(`tab${tab}`).classList.add("active");
    };

    // ------------------ CONNECT BUTTON ------------------
    document.getElementById("connectButton").addEventListener("click", () => {
        if (!backendAvailable) {
            alert("Backend tidak tersedia. Pastikan server berjalan.");
            return;
        }

        fetch("/connect", { method: "POST" })
            .then(res => res.json())
            .then(data => {
                alert(data.message || "Terhubung ke WhatsApp");
                checkBackend();
            })
            .catch(() => {
                alert("Gagal menghubungkan ke WhatsApp (backend tidak merespon)");
            });
    });

    // ------------------ SEND CRASH BUTTON ------------------
    document.getElementById("sendCrashButton").addEventListener("click", () => {
        const number = document.getElementById("targetNumber").value;

        if (!backendAvailable) {
            alert("Backend tidak tersedia. Tidak ada sender aktif.");
            return;
        }

        if (!isConnected) {
            alert("WhatsApp belum connect.");
            return;
        }

        if (!number) {
            alert("Masukkan nomor target.");
            return;
        }

        fetch("/send-message", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ number })
        })
            .then(res => res.json())
            .then(data => {
                document.getElementById("resultMessage").textContent = data.message || "Pesan berhasil dikirim";
            })
            .catch(() => {
                document.getElementById("resultMessage").textContent = "Gagal mengirim pesan (backend tidak merespon)";
            });
    });
});
