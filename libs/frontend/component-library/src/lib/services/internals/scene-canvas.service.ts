import { Injectable } from '@angular/core';
import { Application, Container } from 'pixi.js';

@Injectable({ providedIn: 'any' })
export class SceneCanvasService {
    private app!: Application;
    private stageContainer!: Container;
}
