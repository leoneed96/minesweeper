export default class DragScrollClickFix {

    readonly DRAG_DELAY = 100; // This is the minimal delay to consider a click to be a drag, mostly usefull for touch devices
  
    timer: any;
    dragging: boolean = false;
  
    onDragScrollStart() {
      this.timer = setTimeout(() => this.onTimer(), this.DRAG_DELAY);
    }
  
    onTimer() {
      this.timer = null;
      this.dragging = true;
    }
  
    onDragScrollEnd() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      setTimeout(() => this.dragging = false);
    }
  
    onClickCapture(e: MouseEvent) {
      if (this.dragging) {
        this.dragging = false;
        e.preventDefault();
        e.stopPropagation();
      }
    }
  }