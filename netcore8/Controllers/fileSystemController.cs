using Microsoft.AspNetCore.Mvc;
using netcore8.clases;

namespace netcore8.Controllers
{
    public class fileSystemController : Controller
    {
        
        private readonly IWebHostEnvironment _webHostEnvironment;

        public fileSystemController(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }

        public IActionResult leerFileSystem()
        {
            string rutaProyecto = _webHostEnvironment.ContentRootPath;
            string rutaCompleta = Path.Combine(rutaProyecto, "Archivos");

            List<archivoCLS> lista = new List<archivoCLS>();

            List<string> archivos =
                Directory.GetFiles(rutaCompleta).ToList();
            foreach (var archivo in archivos)
            {
                lista.Add(new archivoCLS
                {
                    nombreArchivo = Path.GetFileNameWithoutExtension(archivo),
                    extension = Path.GetExtension(archivo).Replace(".", "")
                });

            }
            return View(lista);
        }

        public IActionResult subirFileSystem()
        {
            return View();
        }

        public FileResult descargaArchivo(string nombreArchivo) 
        {
            string rutaProyecto = _webHostEnvironment.ContentRootPath;
            string rutaCompleta = Path.Combine(rutaProyecto, "Archivos");

            
            string ruta = Path.Combine(rutaCompleta, nombreArchivo);
            byte[] buffer = System.IO.File.ReadAllBytes(ruta);

            return File(buffer, "application/octet-stream");



        }

    }
}
