import { Component, Input, ElementRef, Renderer2 } from '@angular/core';

import { DomController, Events, Platform } from 'ionic-angular';

/**
 * Generated class for the SliderUpComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'slider-up',
  templateUrl: 'slider-up.html'
})
export class SliderUpComponent {

  @Input('options') options: any;

  handleHeight: number = 50;
  bounceBack: boolean = true;
  thresholdTop: number = 200;
  thresholdBottom: number = 200;


  constructor(public element: ElementRef,
    public renderer: Renderer2,
    public domCtrl: DomController,
    public platform: Platform,
    public events: Events) {
    events.subscribe('checkout:open', (value) => {
      this.handleNormalOpen(value);
      events.publish("UpdateCards");
    }); 
    events.subscribe('checkout:close', () => {
      this.renderer.setStyle(this.element.nativeElement, 'transition', '0.5s');
      this.renderer.setStyle(this.element.nativeElement, 'transform', 'translateY(60%)');
    });
  }

  ngAfterViewInit() {
    if (this.options.handleHeight) {
      this.handleHeight = this.options.handleHeight;
    }

    if (this.options.bounceBack) {
      this.bounceBack = this.options.bounceBack;
    }

    if (this.options.thresholdFromBottom) {
      this.thresholdBottom = this.options.thresholdFromBottom;
    }

    if (this.options.thresholdFromTop) {
      this.thresholdTop = this.options.thresholdFromTop;
    }

    this.renderer.setStyle(this.element.nativeElement, 'transform', 'translateY(60%)');


    let hammer = new window['Hammer'](this.element.nativeElement);
    hammer.get('pan').set({ direction: window['Hammer'].DIRECTION_VERTICAL });

    hammer.on('pan', (ev) => {
      this.handlePan(ev);
    });

  }

  handleNormalOpen(value) {
    this.domCtrl.write(() => {
      this.renderer.setStyle(this.element.nativeElement, 'transition', ' 0.5s');
      this.renderer.setStyle(this.element.nativeElement, "transform", `translateY(${value}%)`);
    });
  }

  handlePan(ev) {

    let newTop = ev.center.y;

    let bounceToBottom = false;
    let bounceToTop = false;

    if (this.bounceBack && ev.isFinal) {

      let topDiff = newTop - this.thresholdTop;
      let bottomDiff = (this.platform.height() - this.thresholdBottom) - newTop;

      topDiff >= bottomDiff ? bounceToBottom = true : bounceToTop = true;

    }

    if ((newTop < this.thresholdTop && ev.additionalEvent === "panup") || bounceToTop) {

      this.domCtrl.write(() => {
        this.renderer.setStyle(this.element.nativeElement, 'transition', ' 0.5s');
        this.renderer.setStyle(this.element.nativeElement, 'transform', 'translateY(60%)');
      });

    } else if (((this.platform.height() - newTop) < this.thresholdBottom && ev.additionalEvent === "pandown") || bounceToBottom) {

      this.domCtrl.write(() => {
        this.renderer.setStyle(this.element.nativeElement, 'transition', ' 0.5s');
        this.renderer.setStyle(this.element.nativeElement, 'transform', 'translateY(0%)');
      });

    } else {

      this.renderer.setStyle(this.element.nativeElement, 'transition', 'none');

      if (newTop > 0 && newTop < (this.platform.height() - this.handleHeight)) {

        if (ev.additionalEvent === "panup" || ev.additionalEvent === "pandown") {

          this.domCtrl.write(() => {
            this.renderer.setStyle(this.element.nativeElement, 'transform', 'translateY(newTop + px)');
          });
        }
      }
    }
  }
}