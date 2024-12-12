import { Injectable } from '@angular/core';
import { SceneCanvasState } from '../../types/internal/scene-canvas-internal.types';
import { InitialSceneCanvasState } from '../../config/internals/scene-canvas.config';
import {
    BackgroundNode,
    CanvasNode,
    NodeId
} from '../../types/organisms/scene-canvas.types';

@Injectable({ providedIn: 'any' })
export class SceneCanvasDataService {
    protected canvasState: SceneCanvasState = InitialSceneCanvasState;
    protected nodes: Map<NodeId, CanvasNode> = new Map<NodeId, CanvasNode>();
    protected backgroundNode: BackgroundNode | undefined;

    public setup(): void {}
}
