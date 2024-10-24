import AbstractView from '../framework/view/abstract-view';

const createNoPointTemplate = () => '<p class="trip-events__msg">Loading...</p>';

class LoadingView extends AbstractView {
  get template() {
    return createNoPointTemplate();
  }
}

export default LoadingView;
