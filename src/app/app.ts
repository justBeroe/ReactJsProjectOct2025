import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer, Header } from './shared/components';
// import { PostBoard } from './features/posts';
// import { ThemeBoard } from './features/themes';
// import { Beroetest } from './shared/components/beroetest/beroetest';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // protected title = 'softuni-forum';
}
