import { Injectable } from '@angular/core';
import { BelvoService } from './belvo.service';
import { WidgetConfigService } from './widget-config.service';

@Injectable({ providedIn: 'root' })
export class WidgetService {
  constructor(
    private belvoService: BelvoService,
    private widgetConfigService: WidgetConfigService
  ) {}

  // TODO: the widget creation should be inside of a isolated service
  // DONE
  public async createWidget(username: string, sdk: any): Promise<any> {
    console.log(`[widget] creating belvo widget...`);
    const config = this.widgetConfigService.config(username);

    console.log('[widget] [token] requesting access_token');
    const { access } = await this.belvoService.requestAccessToken();
    console.log(`[widget] [token] finished - access_token=[${access}]`);

    sdk.createWidget(access, config).build();
    console.log(`[widget] widget created successfully`);
  }
}
