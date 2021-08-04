import {GameData} from "./gameDataTypes";
import {CharacterModel} from "../models/CharacterModel";

export interface Action {
  type: ActionTypes
  payload?: GameData | CharacterModel[] | ViewClassPanelInfo
}

export enum ActionTypes {
  ModelDataIsLoaded = 'ModelDataIsLoaded',
  ViewClassControlIsClicked = 'ViewClassControlIsClicked',
  WorldIsReady = 'WorldIsReady',
  NewGameButtonIsClicked = 'NewGameButtonIsClicked'
}

export type ViewClassPanelInfo = {className: string}
