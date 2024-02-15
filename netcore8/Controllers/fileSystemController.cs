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

            return View();
        }

        public List<archivoCLS> listarArchivos()
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
            return lista;
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

        public int subirArchivo(IFormFile archivo)
        {
            try
            {
                string rutaProyecto = _webHostEnvironment.ContentRootPath;
                string rutaCompleta = Path.Combine(rutaProyecto, "Archivos");
                string nombreArchivo = archivo.FileName;
                string rutaFinal = Path.Combine(rutaCompleta, nombreArchivo);
                using (FileStream fs = new FileStream(rutaFinal, FileMode.Create))
                {
                    archivo.CopyTo(fs);
                }

                return 1;
            }
            catch (Exception e)
            {
                return 0;
            }

        }

        public int eliminarArchivo(string nombreArchivo)
        {
            try
            {
                string rutaProyecto = _webHostEnvironment.ContentRootPath;
                string rutaCompleta = Path.Combine(rutaProyecto, "Archivos", nombreArchivo);

                if(System.IO.File.Exists(rutaCompleta))
                {
                    System.IO.File.Delete(rutaCompleta);
                }
                return 1;
            }
            catch(Exception e)
            {
                return 0;
            }

        }
    }
}
