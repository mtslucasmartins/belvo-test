import { Injectable } from '@angular/core';
import { BelvoService } from './belvo.service';

@Injectable({ providedIn: 'root' })
export class WidgetConfigService {
  constructor(private belvoService: BelvoService) {}

  public config(username: any) {
    // TODO: this boy here should be getting some attributes from environment variables too.
    // TODO: isolate this variables and the creation of this object on a isolated service.
    // DONE
    const config: any = {
      callback: (link: any, institution: any) =>
        successCallbackFunction(link, institution),
      onExit: (data: any) => onExitCallbackFunction(data),
      onEvent: (data: any) => onEventCallbackFunction(data),
      show_intro: true,
      locale: 'pt',
    };

    console.log(`[widget] [callback] defining success callback`);
    const successCallbackFunction = (link: any, institution: any) => {
      console.log(
        `[widget] [callback] [success] - link=[${link}] institution=[${institution}]`
      );
      const response = this.belvoService.widgetSuccessCalback(
        link,
        institution,
        username
      );
      console.log('success callback', response);
    };

    // TODO: study a way to use tihs callbacks maybe storing them in the database, at least the error ones.
    console.log(`[widget] [callback] defining exit callback`);
    const onExitCallbackFunction = (data: any) => {
      console.log('[widget] [callback] [exit]', data);
    };

    // TODO: better understand the usage of event callbacks.
    console.log(`[widget] [callback] defining event callback`);
    const onEventCallbackFunction = (data: any) => {
      console.log('[widget] [callback] [event]', data);
    };

    return config;
  }
}
