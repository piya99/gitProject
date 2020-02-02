import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { GithubService } from '../../services/github.services';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {

    // userName: string;
    userName = new FormControl();
    options: string[] = [];
    filteredOptions: Observable<string[]>;
    constructor(private githubService: GithubService, public router: Router) {
        if (localStorage.getItem('searches')) {
            this.options = JSON.parse(localStorage.getItem('searches'));
        }
    }

    ngOnInit() {
        this.filteredOptions = this.userName.valueChanges
            .pipe(
            startWith(''),
            map(value => this._filter(value))
            );
    }

    searchUser() {
        this.githubService.updateUsername(this.userName.value);
        this.router.navigate(['/profile'], {queryParams: {userName: this.userName.value}});

    }

    private _filter(value: string): string[] {
        if (value && this.options) {
            const filterValue = value.toLowerCase();
            return this.options.filter(option => option.toLowerCase().includes(filterValue));
        }
    }

}
