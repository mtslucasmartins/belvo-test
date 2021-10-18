import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BelvoService } from './shared/services/belvo.service';
import { WidgetService } from './shared/services/widget.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private sdk: any;

  // TODO: load this argument from a mandatory query param field.
  //       e.g: ..../connect?_eid=<value>
  // DONE
  private username: string = 'bnk100';

  constructor(
    private winRef: WindowRef,
    private route: ActivatedRoute,
    private belvoService: BelvoService,
    private widgetService: WidgetService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((queryParams: any) => {
      this.username = queryParams.get('_eid') || 'bnk100';
      console.log('a: ', this.username);
    });

    const belvoSDK = this.belvoService.belvoSDK(this.winRef);

    // TODO: isolate this validation in a service, passing the WindowRef.
    // DONE
    if (belvoSDK) {
      // TODO: isolate this method in a service returning the belvoSDK from
      //       the specified WindowRef.
      // DONE
      this.sdk = belvoSDK;

      // TODO: maybe this could be called from the service to?
      // DONE
      this.widgetService.createWidget(this.username, this.sdk);
    } else {
      console.log(`couldn't load belvo sdk`);
    }
  }
}

function _window(): any {
  // return the global native browser window object
  return window;
}

@Injectable()
export class WindowRef {
  get nativeWindow(): any {
    return _window();
  }
}
