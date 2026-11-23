const contactForm = document.getElementById("contactForm")
const contactMessageInfo = document.getElementById("contactMessageInfo")
const contactName = document.getElementById("contactName")
const contactEmail = document.getElementById("contactEmail")
const contactMessage = document.getElementById("contactMessage")

// Usamos los datos del perfil como valores iniciales
const contactProfile = getProfile()
contactName.value = contactProfile.nombre
contactEmail.value = contactProfile.correo

contactForm.addEventListener("submit", e => {
    e.preventDefault()

    if (!contactForm.checkValidity()) {
        contactMessageInfo.className = "form-message error"
        contactMessageInfo.textContent = "Completa todos los campos con un correo válido"
        return
    }

    saveMessage({
        nombre: contactName.value.trim(),
        correo: contactEmail.value.trim(),
        mensaje: contactMessage.value.trim()
    })
    contactMessage.value = ""
    contactMessageInfo.className = "form-message success"
    contactMessageInfo.textContent = "¡Mensaje enviado! Te responderemos pronto."
})
