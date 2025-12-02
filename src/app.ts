import { Component, OnInit } from '@angular/core';
import { Header } from './app/core/component/header/header';
import { RouterOutlet } from '@angular/router';
import { filter, interval, map, Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent implements OnInit{

  interval$!: Observable<string>;

  ngOnInit(): void {
  this.interval$ = interval(1000).pipe(
    filter(value => value%3 ===0),
    map(value => value % 2 === 0 ? 
      `je suis ${value} et je suis paire` : 
      `je suis ${value} et je suis impaire`
    ),
    tap(text => this.logger(text))
  );
  }

  logger(text : string){
    console.log(`log: ${text}`);
  }
}