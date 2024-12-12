import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    NgZone,
    OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core';
import { Application, Assets, Container, Graphics, Sprite } from 'pixi.js';
import { SceneCanvasToolbarComponent } from './scene-toolbar/scene-canvas-toolbar.component';
import { SceneCanvasDataService } from '../../../services/internals/scene-canvas-data.service';
import { SceneCanvasService } from '../../../services/internals/scene-canvas.service';

@Component({
    selector: 'ngx-clib-scene-canvas',
    standalone: true,
    imports: [SceneCanvasToolbarComponent],
    providers: [SceneCanvasService, SceneCanvasDataService],
    template: `<div
        class="bg-base-300 shadow-lg flex flex-col gap-2 h-full w-full"
    >
        <ngx-clib-scene-canvas-toolbar />
        <div #sceneContainer class="w-full h-full"></div>
    </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SceneCanvasComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('sceneContainer', { static: true })
    sceneContainer!: ElementRef<HTMLDivElement>;
    private app!: Application;
    private resizeObserver!: ResizeObserver;
    private stageContainer!: Container;
    private isDragging = false;
    private dragStart: { x: number; y: number } = { x: 0, y: 0 };
    private stageStart: { x: number; y: number } = { x: 0, y: 0 };
    private selectedBorder!: Graphics;

    constructor(private ngZone: NgZone) {}

    ngOnInit(): void {
        this.ngZone.runOutsideAngular(async () => {
            this.app = new Application();
            await this.app.init({
                backgroundAlpha: 0,
                resizeTo: this.sceneContainer.nativeElement
            });
            this.sceneContainer.nativeElement.appendChild(this.app.canvas);
            this.stageContainer = new Container();
            this.app.stage.addChild(this.stageContainer);

            const texture = await Assets.load('assets/logo.png');
            const asset = new Sprite(texture);
            asset.anchor.set(0.5);
            asset.x = this.app.screen.width / 2;
            asset.y = this.app.screen.height / 2;
            this.stageContainer.addChild(asset);

            asset.eventMode = 'static';
            asset.interactive = true;
            asset.on('pointerdown', data => {
                console.log('Sprite clicked!', data);
                this.addBorderToAsset(asset);
            });

            this.addZoomListener();
            this.addDragListener();
        });
    }

    ngAfterViewInit(): void {
        this.ngZone.runOutsideAngular(() => {
            this.resizeObserver = new ResizeObserver(() => {
                this.resizeCanvas();
            });
            this.resizeObserver.observe(this.sceneContainer.nativeElement);
        });
    }

    ngOnDestroy(): void {
        if (this.app) {
            this.app.destroy(true, {
                children: true,
                texture: true
            });
        }
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
    }

    private resizeCanvas(): void {
        const container = this.sceneContainer.nativeElement;
        if (container && this.app?.renderer) {
            this.app.renderer.resize(
                container.clientWidth,
                container.clientHeight
            );
            this.app.stage.children.forEach(child => {
                if (child instanceof Sprite) {
                    child.x = this.app.screen.width / 2;
                    child.y = this.app.screen.height / 2;
                }
            });
        }
    }

    private addZoomListener(): void {
        this.sceneContainer.nativeElement.addEventListener(
            'wheel',
            (event: WheelEvent) => {
                event.preventDefault();

                const zoomAmount = 1.05;
                if (event.deltaY < 0) {
                    // Zoom in
                    this.stageContainer.scale.x *= zoomAmount;
                    this.stageContainer.scale.y *= zoomAmount;
                } else {
                    // Zoom out
                    this.stageContainer.scale.x /= zoomAmount;
                    this.stageContainer.scale.y /= zoomAmount;
                }
            }
        );
    }

    private addDragListener(): void {
        const container = this.sceneContainer.nativeElement;

        container.addEventListener('mousedown', (event: MouseEvent) => {
            this.isDragging = true;
            this.dragStart = { x: event.clientX, y: event.clientY };
            this.stageStart = {
                x: this.stageContainer.x,
                y: this.stageContainer.y
            };
        });

        container.addEventListener('mousemove', (event: MouseEvent) => {
            if (this.isDragging) {
                const dx = event.clientX - this.dragStart.x;
                const dy = event.clientY - this.dragStart.y;
                this.stageContainer.position.set(
                    this.stageStart.x + dx,
                    this.stageStart.y + dy
                );
            }
        });

        container.addEventListener('mouseup', () => {
            this.isDragging = false;
        });

        container.addEventListener('mouseleave', () => {
            this.isDragging = false;
        });
    }

    private addBorderToAsset(asset: Sprite): void {
        // Remove any existing border
        if (this.selectedBorder) {
            this.stageContainer.removeChild(this.selectedBorder);
            this.selectedBorder.destroy();
        }

        // Create a new border
        this.selectedBorder = new Graphics();
        this.selectedBorder.rect(
            asset.x - asset.width / 2,
            asset.y - asset.height / 2,
            asset.width,
            asset.height
        );
        this.selectedBorder.stroke({ width: 2, color: 0xfeeb77, alignment: 2 });
        // Position the border relative to the asset

        // Add the border to the same container as the asset
        this.stageContainer.addChild(this.selectedBorder);
    }
}
