import { Injectable } from '@angular/core';
// import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class GithubService {
    private userName: string;
    private getUserUrl: string;
    private getRepoUrl: string;
    private getReadmeUrl: string;

    constructor(private http: HttpClient) {
        this.userName = '';
        this.getUserUrl = 'https://api.github.com/users/[userName]';
        this.getRepoUrl = 'https://api.github.com/users/[userName]/repos';
        this.getReadmeUrl = 'https://api.github.com/repos/[userName]/[repo]/readme';
    }

    getUser(userName) {
        this.userName = userName;
        if (this.userName) {
            return this.http.get(this.getUserUrl.replace('[userName]', this.userName))
                .pipe(catchError(this.handleError));
        }
    }

    getRepos(userName) {
        this.userName = userName;
        if (this.userName) {
            return this.http.get(this.getRepoUrl.replace('[userName]', this.userName));
        }
    }

    getReadme(repoName: string, userName: string) {
        this.userName = userName;
        if (this.userName) {
            return this.http.get(this.getReadmeUrl.replace('[userName]', this.userName)
                .replace('[repo]', repoName));
        }
    }

    updateUsername(userName: string) {
        this.userName = userName;
        let searches = [];
        if (localStorage.getItem('searches')) {
            searches = JSON.parse(localStorage.getItem('searches'));
        }
        if (searches.indexOf(userName) < 0) {
            searches.push(userName);
            localStorage.setItem('searches', JSON.stringify(searches));
        }
    }

    private handleError(error: any) {

        if (error.status === 401) {
            return Observable.throw(error.status);
        } else {
            return Observable.throw(error.status || 'Server error');
        }
    }
}
