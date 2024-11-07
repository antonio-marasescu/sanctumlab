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
        private readonly authService: AuthenticationService,
        private readonly templateRef: TemplateRef<any>,
        private readonly viewContainer: ViewContainerRef
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
