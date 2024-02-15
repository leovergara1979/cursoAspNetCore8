document.addEventListener("DOMContentLoaded", Evento_CargaInicialPagina, false);
function Evento_CargaInicialPagina(evento) {

    console.log('inicio');
    listarArchivos();
}

let descargar = async (nombreArchivo, ext) => {

    let llamada = await fetch(`/fileSystem/descargaArchivo/?nombreArchivo=${nombreArchivo}.${ext}`);
    let res = await llamada.blob();
    let url = URL.createObjectURL(res);
    let a = document.createElement('a');
    a.href = url;
    a.download = `${nombreArchivo}.${ext}`;
    a.click();
}

let subir = async () => {

    let valor = document.getElementById('fupArchivo').value;

    if (valor == '') {
        alertaError('error', 'Debe seleccionar un archivo');
        return;
    }

    let archivo = document.getElementById('fupArchivo').files[0];
    let frm = new FormData();
    frm.append('archivo', archivo)

    let llamada = await fetch(`/fileSystem/subirArchivo/`, {
        method: 'POST',
        body: frm,
    })

    let res = await llamada.text();
    (res == 1)
        ? (alertaExito('Se subió el archivo correctamente'), listarArchivos(), document.getElementById('fupArchivo').value='' )
        : alert('Error');
}

let listarArchivos = async () => {

    let llamada = await fetch('/fileSystem/listarArchivos');
    let data = await llamada.json();

    let contenido = '';

    contenido += `<table class="table mt-3">
                        <thead>
                            <tr>
                                <th>Nº</th>
                                <th>Nombre archivo</th>
                                <th>Extensión archivo</th>
                                <th>Operación</th>
                            </tr>
                        </thead>
                    <tbody>`

    let obj;

    for (let i = 0; i < data.length; i++){
        obj = data[i]

        contenido += `<tr>
                            <td>${i+1}</td>
                            <td>${obj.nombreArchivo}</td>
                            <td>${obj.extension}</td>
                            <td><button class="btn btn-primary" onclick="descargar('${obj.nombreArchivo}', '${obj.extension}')"><i class="bi bi-cloud-arrow-down"></i></button>
                                <button class="btn btn-danger"  onclick="eliminar('${obj.nombreArchivo}', '${obj.extension}')"><i class="bi bi-trash"></i></button></td>
                        </tr>`
    }
    contenido +=`</tbody></table>`;
    document.getElementById('divTabla').innerHTML = contenido;

}

let eliminar = async (nombre, extension) => {


    alertaConfirmacion('¿Desea eliminar el archivo?',async function(){

        let llamada = await fetch(`/fileSystem/eliminarArchivo/?nombreArchivo=${nombre}.${extension}`);
        let data = await llamada.json();

        (data == 1)
            ? (alertaAviso('Se elimino correctamente.'), listarArchivos())
            : alertaError('error', 'Ha ocurrido algo mal.');


    });

    //let llamada = await fetch(`/fileSystem/eliminarArchivo/?nombreArchivo=${nombre}.${extension}`);
    //let data = await llamada.json();

    //(data == 1)
    //    ? alertaAviso('Se elimino correctamente.')
    //    : alertaError('error', 'Ha ocurrido algo mal.');

}

    