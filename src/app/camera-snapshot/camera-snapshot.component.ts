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
          setTimeout(() => {
            // captures face image and emit as data url
            this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0, this.constraints.width, this.constraints.height);
            this.imageUrl = this.canvas.nativeElement.toDataURL();
            this.imageCaptured.emit(this.imageUrl);
            this.isCaptured = true;
            //stop video
            stream.getVideoTracks()[0].stop();
            this.ref.detectChanges();
          }, 3000);
        } else {
          this.error = "You have no output video device";
        }
      } catch (e) {
        this.error = e;
      }
    }
  }
}
