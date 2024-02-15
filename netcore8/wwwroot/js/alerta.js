let alertaExito = (titulo) => {

    Swal.fire({
        position: "top-end",
        icon: "success",
        title: titulo,
        showConfirmButton: false,
        timer: 7500
    });
}

let alertaError = (titulo, texto) => {
    Swal.fire({
        icon: "error",
        title: titulo,
        text: texto,
        showConfirmButton: true,

        //footer: '<a href="#">Why do I have this issue?</a>'
    });

}

let alertaAviso = (titulo) => {

    Swal.fire({
        title: titulo,
        icon: "success",
        showConfirmButton: false,

    })
}

let alertaConfirmacion = (titulo = '¿Desea guardar los cambios?', callback) => {

    Swal.fire({
        title: titulo,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Si',
        denyButtonText: 'No'
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            callback();
            //Swal.fire("Saved!", "", "success");
        } /*else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
        }*/
    });
}