import React, { Component } from 'react'
import * as THREE from 'three'
import OrbitControlsLib from 'three-orbit-controls'
import throttle from 'lodash/throttle'
import spaceSystem from './spaceSystem'
import './Game.css'

const OrbitControls = OrbitControlsLib(THREE);

export default class Game extends Component { 
    constructor(props) {
        super(props);
       
        this.resizeWindow = throttle(this.resizeWindow, 300);
        this.space = {}
        this.params = props.params;
    }

    componentDidMount() {
        let width = this.container.clientWidth,
            height = this.container.clientHeight;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, this.params.sizeArea);
        this.camera.position.x = this.params.camera.x;
        this.camera.position.y = this.params.camera.y;
        this.camera.position.z = this.params.camera.z;
        console.log(this.camera.position);

        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        this.renderer.setSize(width, height);
        this.orbit = new OrbitControls(this.camera, this.renderer.domElement);
        this.orbit.enableZoom = true;
        this.orbit.enableKeys = false;

        this.space = new spaceSystem(this.scene, this.camera, this.renderer, this.params);
        this.space.initMiniStars();
        this.space.initObjects();

        console.log(this.scene);

        this.container.appendChild(this.renderer.domElement);
        this.start();
        window.addEventListener("resize", this.resizeWindow);

    }

    start = () => {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate);
        }
    };

    stop = () => {
        cancelAnimationFrame(this.animate);
    };

    animate = () => {
        this.space.calculateMotions();
        this.count++;
        
        this.renderScene();
        this.frameId = requestAnimationFrame(this.animate);
    };

    renderScene = () => {
        this.renderer.render(this.scene, this.camera);
    };

    resizeWindow = () => {
        let width = this.container.clientWidth,
            height = this.container.clientHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    };

    componentWillUnmount() {
        this.stop();
        this.container.removeChild(this.renderer.domElement);
        window.removeEventListener("resize", this.resizeWindow);
    }

    render() {
        return ( <div className = 'threejs-app' >
            <div className = 'scene'
                ref = {
                    container => this.container = container
                }
            /> 
            </div>
        )
    }
}