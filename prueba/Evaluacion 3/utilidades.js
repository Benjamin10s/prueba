const verificar = (id) => {
    const input = document.getElementById(id)
    const div = document.getElementById('e-' + id)

    input.classList.remove('is-invalid')
    if (input.value.trim() == '') {
        input.classList.add('is-invalid')

        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>'
    }
    else {
        input.classList.add('is-valid')
        div.innerHTML = ''
        if (id == 'fecha') {
            const dia = validarFecha(input.value)
            if (dia < 1) {
                input.classList.add('is-invalid')
                div.innerHTML =
                    '<span class="badge bg-danger">No se puede ingresar una fecha futura </span>'
            }
        }
    }
}

const limpiar = () => {
    document.querySelector('form').reset()

    document.querySelectorAll('.form-control,.form-select').forEach(item => {
        item.classList.remove('is-invalid')
        item.classList.remove('is-valid')
        document.getElementById('e-' + item.name).innerHTML = ''
    })

    document.getElementById('btnGuardar').value = 'Guardar'

    document.getElementById('Nombre').readOnly = false
}

const soloNumeros = (evt) => {
    if (evt.keyCode >= 48 && evt.keyCode <= 57)
        return true
    return false
}
const validarFecha = (fecha) => {

    const hoy = new Date()

    fecha = new Date(fecha)

    const resta = hoy - fecha
    const dia = resta / (1000 * 60 * 60 * 24)

    return dia.toFixed(0)
}