import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GithubService } from '../../services/github.services';

@Component({
    selector: 'app-readme',
    templateUrl: './readme.component.html'
})

export class ReadmeComponent implements OnInit {


    readmeMdString: string;
    repoName: string;
    userName: string;
    constructor(private githubService: GithubService, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((v: any) => {
            this.repoName = v.repoName;
            this.userName = v.userName;
            this.loadReadme(this.repoName);
        });
    }
    loadReadme(repoName: any) {
        this.githubService.getReadme(repoName, this.userName).subscribe((readme: any) => {
            // console.log(readme);
            const decodedString = atob(readme.content);
            console.log(decodedString);
            this.readmeMdString = decodedString;

            // this.htmlContent = this.converter.makeHtml(this.encodedText);
        });
    }

}