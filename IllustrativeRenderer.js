'use strict'
function IllustrativeRenderer(domQuery) { //for whole window call with domQuery "<body>"
    //A simple inhericance concept. We create an object of the AbstractRenderer type and then we change and extend it to our needs. At the end we return the self variable.
    var self = BasicThreeRenderer(domQuery);
    
    mat = new THREE.ShaderMaterial({  
      uniforms: uniforms,
      vertexShader: document.getElementById('vertexShader').textContent,
      fragmentShader: document.getElementById('fragmentShader').textContent
    });

    return self;
}
