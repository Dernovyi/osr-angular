import {Component, ElementRef, OnInit, Output, ViewChild} from '@angular/core';
import {Image} from '../image';
import {ImageService} from '../image.service';


@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent implements OnInit {
  @ViewChild('input' ) inputRef: ElementRef;
  image: Image = new Image();
  languages: string[];
  text: string;
  selectedFile: File = null;

  constructor( private imageService: ImageService) { }

  ngOnInit(): void {
    this.getAllLang();
  }

  getAllLang(): void {
    this.imageService.getLanguage().subscribe( data => {
      this.languages = data;
    });
  }

  getText(): void {
    if ( this.image.language === undefined){
      this.image.language = 'unk';
    }
    if ( this.image.url !== null && this.image.url !== undefined && this.image.url !== ''){
      this.image.url.trim();
      this.imageService.addNewImageForRead(this.image).subscribe( data => {
          this.image = data;
        },
        error => console.log(error));
    } else if (this.selectedFile !== null){
        this.saveImageToAzure();
        this.inputRef.nativeElement.value = '';
    }
  }

  cleanArea(): void {
    this.image.text = '';
    this.image.url = '';
    this.image.language = 'unk';
    this.selectedFile = null;
    this.inputRef.nativeElement.value = '';

  }

  // метод для сохранения редактированного текста
  saveText(): void {
    if (this.image.url !== null && this.image.url !== undefined && this.image.url !== ''){
      this.imageService.saveImage(this.image).subscribe( data => {
          this.image = data;
        },
        error => console.log(error));
    }
  }
  saveImageToAzure(): void{
    const formData = new FormData();
    formData.append('file', this.selectedFile , this.selectedFile.name);
    this.imageService.addImageToStorage(formData).subscribe(data => {
        this.image = data;
        this.selectedFile = null;
      },
      error => console.log(error));
  }

  onFileSelected(event): void {
    this.selectedFile =  event.target.files[0];

  }
}
