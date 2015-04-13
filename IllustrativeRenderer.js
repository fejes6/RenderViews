function IllustrativeRenderer(domQuery) {
    var self = BasicThreeRenderer(domQuery);
    
        this.self = function() {
var cloned = mesh.children[0].geometry.self();
var materials = [
        new THREE.MeshLambertMaterial( { opacity:0.6,color: 0xff44ff, transparent:true } ),
        new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true } )
];
var mesh2 = THREE.SceneUtils.createMultiMaterialObject(cloned,materials);
mesh2.children.forEach(function(e) {e.castShadow=true});
mesh2.translateX(5);
mesh2.translateZ(5);
mesh2.name="clone";
scene.remove(scene.getChildByName("clone"));
scene.add(mesh2);
}

    return self;
}
