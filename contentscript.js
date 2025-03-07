console.log("Ejecutando Content Script...");
(function() {

  // Verifica si la URL actual incluye "forum" o "assign" en la posición especificada
  const url = window.location.href;
  const regexForum = /https:\/\/.*\.unad\.edu\.co\/.*\/mod\/forum\/view\.php\?.*/;
  const regexAssign = /https:\/\/.*\.unad\.edu\.co\/.*\/mod\/assign\/view\.php\?.*/;

  var nombreDelBoton = "ButtonNAME";
  var accion = "";

  if (regexForum.test(url)) {
    console.log("La URL incluye 'forum' en la posición especificada.");
    nombreDelBoton = "Abrir todos los foros"
    accion = "";
  } else if (regexAssign.test(url)) {
    console.log("La URL incluye 'assign' en la posición especificada.");
    // Código específico para "assign"
    accion = '&action=downloadall';
    nombreDelBoton = "Descargar todas las tareas";
  } else {
    console.log("La URL no incluye 'forum' ni 'assign' en la posición especificada.");
  }
   
   
    // Busca el formulario con id "selectgroup"
    const form = document.getElementById('selectgroup');
    if (!form) {
      console.error('No se encontró el formulario con id "selectgroup".');
      return;
    }
    
    // Crea el botón y configura sus atributos
    const button = document.createElement("button");
    button.id = "abrirGrupos";
    button.textContent = nombreDelBoton;
    
    // Opcional: agregar estilos para que el botón se destaque dentro del form
    button.style.padding = "10px";
    button.style.marginTop = "10px";
    button.style.backgroundColor = "#007bff";
    button.style.color = "#fff";
    button.style.border = "none";
    button.style.borderRadius = "5px";
    button.style.cursor = "pointer";
    button.type = "button";
    
    // Inserta el botón dentro del formulario
    form.appendChild(button);
    
    // Agrega el evento click al botón para ejecutar la acción
    button.addEventListener('click', function() {
      // Dentro del formulario, selecciona el elemento "select"
      const select = form.querySelector('select');
      if (!select) {
        console.error('No se encontró un elemento "select" dentro del formulario.');
        return;
      }
      
      // Obtiene todas las opciones y extrae sus valores (idDelGrupo)
      const opciones = select.querySelectorAll('option');
      const idGrupos = Array.from(opciones)
                            .map(opcion => opcion.value)
                            .filter(valor => valor);  // Filtra valores vacíos
      
      // Imprime en consola todos los idDelGrupo
      console.log('idDelGrupo:', idGrupos);
      
      // Por cada idDelGrupo, abre una nueva pestaña con la URL actual agregando los parámetros
      var index = 1;
      idGrupos.forEach(id => {
        // Construye la nueva URL
        const nuevaURL = window.location.href + accion + '&group=' + id;
        chrome.runtime.sendMessage({ action: "createWindow", url: nuevaURL }, function(response) {
            console.log("Respuesta del background:", response);
          });
      
        
      });
    });
  })();
