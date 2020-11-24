import { Component, OnInit } from '@angular/core';
import {Image} from '../image';
import {ImageService} from '../image.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {
   images: Image[];
  constructor(private imageService: ImageService, private router: Router) { }

  ngOnInit(): void {
    this.getImages();
  }
  // tslint:disable-next-line:typedef
  getImages(){
      this.imageService.getImageList().subscribe(data => {
        this.images = data;
        });
  }

  saveText(id: number): void {
    console.log(id);
    this.router.navigate(['chang-text', id]);
  }
}
