import * as THREE from 'three'
export default class spaceSystem {

    constructor(scene, camera, renderer, params) {
        this.G = params.G; // gravitational constant
        this.dt = params.dt; //0.005 years is equal to 1.825 days
        this.grid = params.sizeArea;
        this.divisions = params.divisions
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.game = params.objects;
        this.params = params;
    }

    initMiniStars() {
        //add stars
        let starsGeometry = new THREE.Geometry();
        let starsMaterial = new THREE.PointsMaterial({
            color: 0xbbbbbb,
            sizeAttenuation: false
        });

        for (let i = 0; i < 45000; i++) {
            let star = new THREE.Vector3();
            star.x = Math.random() * 2 - 1;
            star.y = Math.random() * 2 - 1;
            star.z = Math.random() * 2 - 1;
            star.multiplyScalar(this.params.sizeArea / 2);
            starsGeometry.vertices.push(star);
        }

        let stars = new THREE.Points(starsGeometry, starsMaterial);
        stars.scale.set(50, 50, 50);
        this.scene.add(stars);

        var gridHelper = new THREE.GridHelper(this.grid, this.divisions);
        this.scene.add( gridHelper );
    }

    initObjects() {
        console.log(this.game);
        for (let ind in this.game) {
            // create elements
            this.game[ind].precalculate = {};
            this.game[ind].geometry = new THREE.SphereGeometry(this.game[ind].radius * this.game[ind].needResize, 40, 40);
            this.game[ind].material = new THREE.MeshBasicMaterial({
                color: parseInt(this.game[ind].color)
                //color: 0xffff00
            });
            this.game[ind].three = new THREE.Mesh(this.game[ind].geometry, this.game[ind].material);
            this.game[ind].three.position.x = this.game[ind].x;
            this.game[ind].three.position.y = this.game[ind].y;
            this.game[ind].three.position.z = this.game[ind].z;
            this.scene.add(this.game[ind].three);
        }
        console.log(this.game);
    }

    calculateFx(obj, obj2) {
        let R = obj.three.position.distanceTo(obj2.three.position); // sqrt(pow((x1-x2),2) + pow((y1-y2),2) + pow((z1-z2),2))
        return this.G * obj2.weight / Math.pow(R, 3) * (obj2.three.position.x - obj.three.position.x);
    }

    calculateFy(obj, obj2) {
        let R = obj.three.position.distanceTo(obj2.three.position); // sqrt(pow((x1-x2),2) + pow((y1-y2),2) + pow((z1-z2),2))
        return this.G * obj2.weight / Math.pow(R, 3) * (obj2.three.position.y - obj.three.position.y);
    }

    calculateFz(obj, obj2) {
        let R = obj.three.position.distanceTo(obj2.three.position); // sqrt(pow((x1-x2),2) + pow((y1-y2),2) + pow((z1-z2),2))
        return this.G * obj2.weight / Math.pow(R, 3) * (obj2.three.position.z - obj.three.position.z);
    }

    calculateMotions() {
        for (let ind in this.game) {
            this.game[ind].three.position.x += this.game[ind].vx * this.dt;
            this.game[ind].x += this.game[ind].vx * this.dt;
            this.game[ind].three.position.y += this.game[ind].vy * this.dt;
            this.game[ind].y += this.game[ind].vy * this.dt;
            this.game[ind].three.position.z += this.game[ind].vz * this.dt;
            this.game[ind].z += this.game[ind].vz * this.dt;
        }
        for (let ind in this.game) {
            let Fx = 0;
            let Fy = 0;
            let Fz = 0;
            for (let ind2 in this.game) {
                if (ind !== ind2) {
                    Fx += this.calculateFx(this.game[ind],this.game[ind2]);
                    Fy += this.calculateFy(this.game[ind],this.game[ind2]);
                    Fz += this.calculateFz(this.game[ind],this.game[ind2]);
                }
            }
            this.game[ind].precalculate = {Fx,Fy,Fz};
        }

        for (let ind in this.game) {
            this.game[ind].vx += this.game[ind].precalculate.Fx * this.dt;
            this.game[ind].vy += this.game[ind].precalculate.Fy * this.dt;
            this.game[ind].vz += this.game[ind].precalculate.Fz * this.dt;
        }
    }

    motion () {

    }

}