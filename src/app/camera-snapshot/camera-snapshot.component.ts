import { Component, ElementRef, EventEmitter, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-camera-snapshot',
  templateUrl: './camera-snapshot.component.html',
  styleUrls: ['./camera-snapshot.component.scss']
})
export class CameraSnapshotComponent {
  @ViewChild('video') public video: ElementRef;
  @ViewChild('canvas') public canvas: ElementRef;
  @Output() imageCaptureAction = new EventEmitter();
  imageUrl: string;
  error: any;
  isCaptured: boolean;
  constraints = { width: 400, height: 400 };
  constructor(private renderer: Renderer2) {}
  async ngOnInit(): Promise<any> {
    await this.initCamera();
  }
  async initCamera(): Promise<any> {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: this.constraints });
        if (stream) {
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
          this.error = null;
        } else {
          this.error = 'You have no output video device';
        }
      } catch (e) {
        this.error = e;
      }
    }
  }
  capturePhoto(): void {
    this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0, this.constraints.width, this.constraints.height);
    this.imageUrl = this.canvas.nativeElement.toDataURL();
    this.isCaptured = true;
    const link = document.getElementById('link');
    link.setAttribute('download', 'MyImage.png');
    link.setAttribute('href', this.canvas.nativeElement.toDataURL("image/png").replace("image/png", "image/octet-stream"));
    link.click();
    const inputElement = document.createElement('INPUT');
    inputElement.setAttribute('type', 'file');
    inputElement.setAttribute('accept', 'image/*');
    inputElement.click();
    this.renderer.listen(inputElement, 'change', ($event) => {
      this.imageCaptureAction.emit($event);
    });
  }
  retakePhoto(): void {
    this.isCaptured = false;
    this.imageUrl = null;
  }
}
