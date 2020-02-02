import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { GithubService } from '../../services/github.services';
@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {


    userName: any;
    user: any;
    repos: any = [];
    readmeMdLink: string;
    constructor(private githubService: GithubService, private route: ActivatedRoute, public router: Router) {
        this.user = false;
    }
    ngOnInit(): void {
        this.route.queryParams.subscribe((v: any) => {
            this.userName = v.userName;
        });
        this.githubService.getUser(this.userName).subscribe(user => {
            console.log(user);
            this.user = user;
        });

        this.githubService.getRepos(this.userName).subscribe(repos => {
            console.log(repos);
            if (repos) {
                this.repos = repos;
                this.repos = this.repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
            }
        });
    }
    goSearch() {
        this.router.navigate(['/search']);
    }
    readmeFun(name: string) {
        this.router.navigate(['/readme'], { queryParams: { repoName: name, userName: this.userName } });
    }

}
