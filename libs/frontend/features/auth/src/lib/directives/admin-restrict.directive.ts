import {
    Directive,
    OnInit,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Directive({
    standalone: true,
    selector: '[ngxAuthAdminRestrict]'
})
export class AdminRestrictDirective implements OnInit {
    constructor(
        private authService: AuthenticationService,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef
    ) {}

    ngOnInit() {
        this.authService.isAdmin().then(isAdmin => {
            if (isAdmin) {
                this.viewContainer.createEmbeddedView(this.templateRef);
            } else {
                this.viewContainer.clear();
            }
        });
    }
}
