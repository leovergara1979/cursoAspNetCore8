

function descargar(nombreArchivo, ext) {

    //console.log(`nombre archivo: ${nombreArchivo} largo: ${nombreArchivo.length} ---- extención: ${ext}`);
    let nameArchi = `${nombreArchivo}.${ext}`;
    console.log(nameArchi);
    fetch(`/fileSystem/descargaArchivo/?nombreArchivo=${nameArchi}`)
        .then(b => b.blob())
        .then(res => {
            let url = URL.createObjectURL(res);
            let a = document.createElement('a');
            a.href = url; 
            a.download = nameArchi;
            a.click();
        })
}

function subir() {

    let archivo = document.getElementById('fupArchivo').files[0];


    let frm = new FormData();
    frm.append('archivo', archivo)

    fetch(`/fileSystem/subirArchivo/`, {
        method: 'POST',
        body: frm,

    })
        .then(res => res.text())
        .then(res => {
            (res == 1)
                ? alert('Exito')
                : alert('Error');
        })


}