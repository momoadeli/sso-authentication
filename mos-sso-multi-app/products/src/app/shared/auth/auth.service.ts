import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map, filter, concatMap } from 'rxjs/operators/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _redirectURL: string;

  // const redirectURL = `${req.protocol}://${req.headers.host}${req.path}`;

  constructor(@Inject(DOCUMENT) private _document: Document, private http: HttpClient, private activatedRoute: ActivatedRoute) {
    console.log(_document.location);
    this.authDocument = _document;
    this.redirectURL = `${this.authDocument.location.protocol}//${this.authDocument.location.host}${this.authDocument.location.pathname}`;
    // Note: Below 'queryParams' observable can be replaced with 'params' depending on your requirements
    const ssoGlobalToken$ = this.activatedRoute.queryParams.pipe(
      filter((params: any) => params.ssoToken),
      concatMap((params) => this.checkSSORedirect(params.ssoToken))
    ).subscribe(res => {
      console.log(res);
    });

    if (this.authDocument.location.search.length === 0) {
      this.redirectToURL(this.redirectURL);
    }
  }

  get authDocument(): Document {
    return this._document;
  }

  set authDocument(document) {
    this._document = document;
  }

  get redirectURL(): string {
    return this._redirectURL;
  }

  set redirectURL(url) {
    this._redirectURL = url;
  }

  redirectToURL(redirectURL: string): void {
    this.authDocument.location.href = `http://sso.mos_ankuranand.com:3010/simplesso/login?serviceURL=${redirectURL}`;
  }

  checkSSORedirect(ssoToken: string): Observable<any> {
    const ssoServerJWTURL = `/api/simplesso/verifytoken?ssoToken=${ssoToken}`;
    const header: HttpHeaders = new HttpHeaders().set(
      'Authorization',
      'Bearer' + ' ' + 'l1Q7zkOL59cRqWBkQ12ZiGVW2DBL'
    );

    return this.http.get(ssoServerJWTURL, { headers: header })
      // tslint:disable-next-line: no-any
      .pipe(map((res: any) => {
        console.log(res.token);
        return res;
      }));
  }

}
