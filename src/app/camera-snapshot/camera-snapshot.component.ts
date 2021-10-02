import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-camera-snapshot',
  templateUrl: './camera-snapshot.component.html',
  styleUrls: ['./camera-snapshot.component.scss']
})
export class CameraSnapshotComponent implements OnInit {
  @ViewChild("video") public video: ElementRef;
  @ViewChild("canvas") public canvas: ElementRef;
  @Output() imageCaptured = new EventEmitter();
  @Input() imageUrl: string;
  error: any;
  isCaptured: boolean;
  constraints = { width: 400, height: 400 };
  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit(): void { }

  async initCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: this.constraints });
        if (stream) {
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
          this.error = null;
          this.drawImageToCanvas(this.video.nativeElement);
          this.imageCaptured.emit(this.canvas.nativeElement.toDataURL("image/png"));
          this.isCaptured = true;
        } else {
          this.error = "You have no output video device";
        }
      } catch (e) {
        this.error = e;
      }
    }
  }

  drawImageToCanvas(image: any) {
    this.canvas.nativeElement.getContext("2d").drawImage(image, 0, 0, this.constraints.width, this.constraints.height);
  }
}
