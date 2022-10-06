export const SLIDE_TAG = 'data-slide-index';

const HiddenSlideClassName = 'hidden-slide';
const CurSlideClassName = 'cur-slide';
const PrevSlideClassName = 'prev-slide';
const NextSlideClassName = 'next-slide';

class SlideScrollManager {
  container: HTMLDivElement;
  index: number;
  slides: NodeListOf<HTMLElement>;

  constructor(container: HTMLDivElement, initIndex: number = 0) {
    this.container = container;
    this.index = initIndex;
    this.slides = container.querySelectorAll(`[${SLIDE_TAG}]`);

    // init
    this.updateIndex(this.index);
  }

  updateIndex(index: number) {
    this.index = index;
    this.slides.forEach((slide, i) => {
      const classList = slide.classList;
      classList.remove(CurSlideClassName);
      classList.remove(PrevSlideClassName);
      classList.remove(NextSlideClassName);
      if (i === index) {
        classList.add(CurSlideClassName);
        classList.remove(HiddenSlideClassName);
      }
      if (i === index - 1) {
        classList.add(PrevSlideClassName);
        classList.remove(HiddenSlideClassName);
      }
      if (i === index + 1) {
        classList.add(NextSlideClassName);
        classList.remove(HiddenSlideClassName);
      }
    });
    return index;
  }

  getPrevIndex() {
    return Math.max(this.index - 1, 0);
  }
  getNextIndex() {
    return Math.min(this.index + 1, this.slides.length - 1);
  }
}

export default SlideScrollManager;