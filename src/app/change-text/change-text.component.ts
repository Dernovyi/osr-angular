import { Component, OnInit } from '@angular/core';
import {Image} from '../image';
import {ImageService} from '../image.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-change-text',
  templateUrl: './change-text.component.html',
  styleUrls: ['./change-text.component.css']
})
export class ChangeTextComponent implements OnInit {
  image: Image = new Image();

  constructor(private imageService: ImageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.image.id = this.route.snapshot.params['id'];
    this.imageService.getImageById(this.image.id).subscribe( data => {
      this.image = data;
    },
      error => console.log(error));
  }

  cleanArea(): void{
    this.image.text = '';
  }

  saveText(): void {
    this.imageService.saveImage(this.image).subscribe( data => {
        this.image = data;
      },
      error => console.log(error));
  }
}
