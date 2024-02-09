

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

