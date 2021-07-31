import {Character} from "../typings/characterTypes";
import {CharacterModel} from "./CharacterModel";
import {Inventory} from "../typings/inventoryTypes";
import {GameData} from "../typings/gameDataTypes";
import {CharacterClassModel} from "./CharacterClassModel";
import {SpellBookModel} from "./SpellBookModel";
import {CharacterPositionModel} from "./CharacterPositionModel";
import {Subject} from "../utlis/observer/Subject";
import {Observer} from "../utlis/observer/Observer";
import {log} from "util";
import {Action, ActionTypes} from "../typings/observerActionTypes";


export class GameModel {
  private _items: Inventory.Item[]
  private readonly characters: CharacterModel[] = []
  private _races: Character.Race[]
  private _classes: Character.Class[]
  private readonly subject = new Subject()
  private readonly players = {
    human: '',
    computer: ''
  }
  constructor() {}
  init() {
    // this.load().then((data: GameData) => {
    //   this.items = data.items
    //   this.createCharacters(data)
    //   this.start()
    // })
  }
  createNewGame() {
    this.fetchData()
      .then(res => res.json())
      .then((data: GameData)=> {
        this._items = data.items
        this._races = data.races
        this._classes = data.classes
        this.createCharacters(data)
        this.notify({
          type: ActionTypes.ModelDataIsLoaded,
        })
      })
  }
  async fetchData() {
    return await fetch(`${process.env.HOST}/data.json`)
  }
  createCharacters({races, classes, spells}: GameData) {

  }
  start() {
  }
  getItemById(id: number) {
    return this.items.find(item => item.id === id)
  }
  subscribe(observer: Observer) {
    this.subject.subscribe(observer)
  }
  unsubscribe(observer: Observer) {
    this.subject.unsubscribe(observer)
  }
  notify(action: Action) {
    this.subject.notify(action)
  }
  get items() {
    return this._items
  }
  get races() {
    return this._races
  }
  get classes() {
    return this._classes
  }
}