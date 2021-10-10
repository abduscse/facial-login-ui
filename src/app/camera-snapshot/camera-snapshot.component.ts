import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-camera-snapshot',
  templateUrl: './camera-snapshot.component.html',
  styleUrls: ['./camera-snapshot.component.scss']
})
export class CameraSnapshotComponent implements OnInit {
  @ViewChild('video') public video: ElementRef;
  @ViewChild('canvas') public canvas: ElementRef;
  @Output() imageCaptureAction = new EventEmitter();
  imageUrl: string;
  error: any;
  isCaptured: boolean;
  constraints = { width: 400, height: 400 };
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
    const imageElement: HTMLImageElement = new Image();
    imageElement.src = this.imageUrl;
    this.imageCaptureAction.emit(imageElement);
    this.isCaptured = true;
  }
  retakePhoto(): void {
    this.isCaptured = false;
    this.imageUrl = null;
  }
}
