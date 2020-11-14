class GTile {
  constructor(i, parentEl) {
    this.index = i;
    this.parentEl = parentEl;
    this.width = parentEl.width / parentEl.size;
    this.isEmpty = i !== parentEl.size ** 2 - 1 ? false : true;

    this.render();
  }

  _createTile() {
    const tile = document.createElement('div');
    tile.textContent = !this.isEmpty ? this.index + 1 : '';
    tile.classList.add('game-tile');
    tile.style.width = `${this.width}px`;
    tile.style.height = `${this.width}px`;
    tile.style.backgroundImage = !this.isEmpty
      ? `url(${this.parentEl.image})`
      : '';
    tile.style.backgroundSize = `${this.parentEl.width}px ${this.parentEl.width}px`;
    tile.style.backgroundPosition = `-${this._getPosition(this.index).left} -${
      this._getPosition(this.index).top
    }`;

    return tile;
  }

  _getPositionCoord(i) {
    return {
      x: i % this.parentEl.size,
      y: Math.floor(i / this.parentEl.size),
    };
  }

  _getPosition(i) {
    const { x, y } = this._getPositionCoord(i);

    return {
      left: `${x * this.width}px`,
      top: `${y * this.width}px`,
    };
  }

  setPosition(i) {
    const { left, top } = this._getPosition(i);

    this.tile.style.left = left;
    this.tile.style.top = top;
  }

  _setListener() {
    this.tile.addEventListener('click', this);
  }

  onClick(e) {
    console.log('i worked', e);
    console.log(this.index);
    const { tiles, size } = this.parentEl;
    console.log(tiles);
    const clickedElIndex = tiles.findIndex((tile) => tile.index === this.index);
    const emtyElIndex = tiles.findIndex((tile) => tile.isEmpty);
    console.log(clickedElIndex, emtyElIndex);

    if (
      clickedElIndex - 1 === emtyElIndex ||
      clickedElIndex + 1 === emtyElIndex ||
      clickedElIndex - size === emtyElIndex ||
      clickedElIndex + size === emtyElIndex
    ) {
      this.parentEl.swap(clickedElIndex, emtyElIndex);
    } else {
      return;
    }
  }

  handleEvent(e) {
    console.log(e);

    switch (e.type) {
      case 'click':
        this.onClick(e);
        break;
    }
  }

  render() {
    this.tile = this._createTile();
    this.setPosition(this.index);
    this._setListener();
    this.parentEl.field.append(this.tile);
  }
}

export default GTile;
