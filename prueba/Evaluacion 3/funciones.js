import { getData, save, remove, getDocumento, update } from "./firestore.js"
let id = 0

document.getElementById('btnGuardar').addEventListener('click', () => {
    document.querySelectorAll('.form-control,.form-select').forEach(item => {
        verificar(item.id)
    })
    if (document.querySelectorAll('.is-invalid').length == 0) {
        const jugador = {
            Nombre: document.getElementById('Nombre').value,
            Apellido: document.getElementById('Apellido').value,
            Fecha: document.getElementById('fecha').value,
            posicion: document.getElementById('posicion').value,
            numCamiseta: document.getElementById('numCamiseta').value,
            clasi: document.getElementById('clasi').value,
        }
        if (document.getElementById('btnGuardar').value == 'Guardar') {
            save(jugador)
        } 
        else {
            update(id, jugador)
            id = 0
        }    
        limpiar()
    }
})

window.addEventListener('DOMContentLoaded', () => {
    getData((datos) => {
        let tabla = ''

        datos.forEach((doc) => {

            const item = doc.data()
            tabla += `<tr>
            <td>${item.Nombre}</td>
            <td>${item.Apellido}</td>
            <td>${item.fecha}</td>
            <td>${item.numCamiseta}</td>
            <td>${item.posicion}</td>
            <td>${item.clasi}</td>
            <td nowrap>
                <button class="btn btn-warning" id="${doc.id}">Editar</button>
                <button class="btn btn-danger" id="${doc.id}">Eliminar</button>
            </td>
        </tr>`
        })
        document.getElementById('contenido').innerHTML = tabla

        document.querySelectorAll('.btn-danger').forEach(btn => {

            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Está seguro que desea eliminar el registro?",
                    text: "No podrás revertir los cambios",
                    icon: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    if (result.isConfirmed) {

                        remove(btn.id)
                        Swal.fire({
                            title: "Eliminado!",
                            text: "Su registro ha sido eliminado",
                            icon: "success"
                        })
                    }
                })
            })
        })

        document.querySelectorAll('.btn-warning').forEach(btn => {

            btn.addEventListener('click', async () => {

                const gestion = await getDocumento(btn.id)

                const c = gestion.data()

                document.getElementById('Nombre').value = c.Nombre
                document.getElementById('Apellido').value = c.Apellido
                document.getElementById('Fecha').value = c.fecha
                document.getElementById('posicion').value = c.posicion
                document.getElementById('numCamiseta').value = c.numCamiseta
                document.getElementById('clasi').value = c.clasi

                document.getElementById('btnGuardar').value = 'Editar'

                document.getElementById('Nombre').readOnly = true

                id = gestion.id
            })
        })
    })
})