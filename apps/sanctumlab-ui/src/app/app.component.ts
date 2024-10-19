import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
    standalone: true,
    imports: [RouterModule],
    selector: 'app-root',
    template: `<router-outlet></router-outlet>`,
    styleUrls: []
})
export class AppComponent implements OnInit {
    ngOnInit() {
        initFlowbite();
    }
}
