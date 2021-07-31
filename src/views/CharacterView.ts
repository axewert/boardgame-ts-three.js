import * as THREE from 'three'
import {GLTF, GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

export class CharacterView {
  model: GLTF
  meshes = new THREE.AnimationObjectGroup()
  animations: THREE.AnimationClip[]
  mixer: THREE.AnimationMixer
  constructor(
    public className: string,
    public race: string
  ) {}
  async create() {
    this.model = await this.loadModel()
    this.model.scene.traverse(child => {
      if(child.type === 'SkinnedMesh') {
        // @ts-ignore
        (child as THREE.Mesh).material.metalness = 0.1
        this.meshes.add(child as THREE.Mesh)
      }
    })
    this.mixer = new THREE.AnimationMixer(this.meshes)
    this.animations = this.model.animations
    const clip = THREE.AnimationClip.findByName(this.animations, 'animation_0')
    clip.duration = 2.9
    const action = this.mixer.clipAction(clip)
    action.play()
    return this
  }
  async loadAnimations() {
    const loader = new THREE.FileLoader()
    const animations = await loader.loadAsync('/assets/characters/blood_elf/hunter/female/animations.json') as string
    return JSON.parse(animations)
  }
  async loadModel() {
    return await new GLTFLoader().loadAsync('/assets/characters/blood_elf/hunter/female/model.gltf')
  }
  render(delta: number) {
    this.mixer.update(delta)
  }
  getModel() {
    return this.model.scene
  }
}