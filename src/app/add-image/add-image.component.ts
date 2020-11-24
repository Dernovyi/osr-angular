import { Component, OnInit } from '@angular/core';
import {Image} from '../image';
import {ImageService} from '../image.service';


@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent implements OnInit {

  image: Image = new Image();
  languages: string[];
  text: string;
  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.getAllLang();
  }


  getAllLang(): void {
    this.imageService.getLanguage().subscribe( data => {
      this.languages = data;
    });
  }

  getText(): void {
    this.image.url.trim();
    if ( this.image.language === undefined){
      this.image.language = 'unk';
    }
    if ( this.image.url !== undefined){
      this.imageService.addNewImage(this.image).subscribe( data => {
          this.image = data;
          console.log(this.image);
        },
        error => console.log(error));
    }
  }

  cleanArea(): void {
    this.image.text = '';
    this.image.url = '';
    this.image.language = 'unk';
  }

  saveText(): void {
    this.imageService.saveImage(this.image).subscribe( data => {
      this.image = data;
    },
      error => console.log(error));
  }
}
