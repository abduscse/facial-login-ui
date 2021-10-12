import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss']
})
export class ImagePickerComponent {
  @Input() imageUrl: any;
  @Output() imageUploadAction = new EventEmitter();
  uploadImage($event: any) {
    const files = $event.target.files;
    if (files.length === 0) return;
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) { return; }
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imageUrl = reader.result;
    }
    this.imageUploadAction.emit($event);
  }
}
