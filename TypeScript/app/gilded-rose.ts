export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;
  maxItemQuality: number;

  constructor(items = [] as Array<Item>) {
    this.items = items;
    this.maxItemQuality = 50;
  }

  updateQuality() {
    this.items.forEach((item) => {
      this.isDegradable(item.name)
        ? this.updateDegradableItem(item)
        : this.updateNonDegradables(item);
    });

    return this.items;
  }

  private updateDegradableItem(item: Item) {
    this.decreaseQualityForNormalItem(item);
    this.decreaseSellInOnlyForNormalItems(item);

    if (this.isItemExpired(item.sellIn)) {
      return;
    }

    this.decreaseQualityForNormalItem(item);
  }

  private isDegradable(itemName: string): boolean {
    const nonDegradables = [
      "Aged Brie",
      "Backstage passes to a TAFKAL80ETC concert",
    ];
    return !nonDegradables.includes(itemName);
  }

  private decreaseQualityForNormalItem(i: Item) {
    if (i.quality > 0) {
      if (i.name != "Sulfuras, Hand of Ragnaros") {
        i.quality = i.quality - 1;
      }
    }
  }

  private isItemExpired(sellIn: number) {
    return sellIn >= 0;
  }

  private increaseQuality(item: Item) {
    if (item.quality < this.maxItemQuality) {
      item.quality = item.quality + 1;
    }
  }

  private increaseQualityForBackstage(item: Item) {
    if (item.quality < this.maxItemQuality && item.sellIn < 11) {
      item.quality = item.quality + 1;
    }
    if (item.quality < this.maxItemQuality && item.sellIn < 6) {
      item.quality = item.quality + 1;
    }
  }

  private decreaseSellInOnlyForNormalItems(item: Item) {
    if (item.name != "Sulfuras, Hand of Ragnaros") {
      item.sellIn = item.sellIn - 1;
    }
  }

  private decreaseQualityToZero(item: Item) {
    item.quality = 0;
  }

  private updateNonDegradables(item: Item) {
    this.increaseQuality(item);
    if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
      this.increaseQualityForBackstage(item);
    }

    this.decreaseSellInOnlyForNormalItems(item);

    if (this.isItemExpired(item.sellIn)) {
      return;
    }

    if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
      this.decreaseQualityToZero(item);
      return;
    }

    this.increaseQuality(item);
  }
}
