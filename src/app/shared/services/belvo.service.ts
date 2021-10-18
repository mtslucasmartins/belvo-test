import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BelvoService {
  constructor() {}

  public belvoSDK(winRef: any) {
    return winRef.nativeWindow.belvoSDK;
  }

  // TODO: isolate this method in a belvo service,
  // Note: this method in the future may receive the branding options
  //       in the future.
  // DONE
  public async requestAccessToken(): Promise<any> {
    return fetch(`${environment.service_url}/api/v1/belvo/token`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .catch((error) => console.error('Error:', error));
  }
  
  // TODO: maybe this could be isolate too...
  // TODO: switch username parameter for a non guessable externalId
  // DONE
  public async widgetSuccessCalback(
    link: string,
    institution: string,
    username: string
  ): Promise<any> {
    return fetch(
      `${environment.service_url}/api/v1/belvo/widget/callback/success`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          link,
          institution,
          _eid: username,
        }),
      }
    )
      .then((response) => response.json())
      .catch((error) => console.error('Error:', error));
  }
}
