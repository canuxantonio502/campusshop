const profileForm = document.getElementById("profileForm")
const profileMessage = document.getElementById("profileMessage")
const profileName = document.getElementById("profileName")
const profileEmail = document.getElementById("profileEmail")
const profilePhone = document.getElementById("profilePhone")

// Cargamos los datos guardados
function loadProfile() {
    const profile = getProfile()
    profileName.value = profile.nombre
    profileEmail.value = profile.correo
    profilePhone.value = profile.telefono
}

profileForm.addEventListener("submit", e => {
    e.preventDefault()

    if (!profileForm.checkValidity()) {
        profileMessage.className = "form-message error"
        profileMessage.textContent = "Revisa el nombre y el correo"
        return
    }

    saveProfile({
        nombre: profileName.value.trim(),
        correo: profileEmail.value.trim(),
        telefono: profilePhone.value.trim()
    })
    profileMessage.className = "form-message success"
    profileMessage.textContent = "Cambios guardados"
})

//Iniciamos
loadProfile()
