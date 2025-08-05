document.addEventListener("DOMContentLoaded", () => {
    console.log("Frontend loaded!");

    // Login credentials
    const usernameCorrect = "admin";
    const passwordCorrect = "1234";
    let currentTab = 2;

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

    // ------------------ MENU ------------------
    document.getElementById("menuButton").addEventListener("click", () => {
        const menu = document.getElementById("tabMenu");
        menu.style.display = menu.style.display === "flex" ? "none" : "flex";
    });

    // ------------------ TAB SWITCH ------------------
    window.showTab = function(tab) {
        document.getElementById("tab1").classList.remove("active");
        document.getElementById("tab2").classList.remove("active");
        document.getElementById(`tab${tab}`).classList.add("active");
        currentTab = tab;
    };

    // ------------------ CONNECT WHATSAPP ------------------
    document.getElementById("connectButton").addEventListener("click", () => {
        fetch("/connect", { method: "POST" })
            .then(res => res.json())
            .then(data => {
                alert(data.message);
                checkStatusOnce();
            })
            .catch(() => {
                alert("Gagal menghubungkan ke WhatsApp");
            });
    });

    // ------------------ KIRIM PESAN ------------------
    document.getElementById("sendCrashButton").addEventListener("click", () => {
        const number = document.getElementById("targetNumber").value;
        if (!number) {
            alert("Masukkan nomor target");
            return;
        }

        fetch("/send-message", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ number })
        })
            .then(res => res.json())
            .then(data => {
                document.getElementById("resultMessage").textContent = data.message;
            })
            .catch(() => {
                document.getElementById("resultMessage").textContent = "Gagal mengirim pesan";
            });
    });

    // ------------------ STATUS CEK SEKALI ------------------
    function checkStatusOnce() {
        fetch("/status")
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

    // ------------------ STATUS CEK OTOMATIS ------------------
    setInterval(() => {
        fetch("/status")
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
                text.textContent = "Server Error";
            });
    }, 3000);
});
