export class Item {
  name: string
  sellIn: number
  quality: number

  constructor(name, sellIn, quality) {
    this.name = name
    this.sellIn = sellIn
    this.quality = quality

  }
}

export class GildedRose {
  items: Array<Item>
  maxItemQuality: number

  constructor(items = [] as Array<Item>) {
    this.items = items
    this.maxItemQuality = 50
  }

  updateQuality() {
    this.items.forEach(item => {
      if (this.isDegradable(item.name)) {
        this.decreaseQualityForNormalItem(item)
      }
      else {
        if (item.quality < 50) {
          item.quality = item.quality + 1;

          if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
            if (item.sellIn < 11) {
              this.increaseQuality(item)
            }
            if (item.sellIn < 6) {
              this.increaseQuality(item)
            }
          }
        }
      }

      this.decreaseSellInOnlyForNormalItems(item)

      if (item.sellIn >= 0) {
        return
      }

      if (this.isDegradable(item.name)) {
        this.decreaseQualityForNormalItem(item)
        return
      }

      if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
        this.decreaseQualityToZero(item)
        return
      }

      this.increaseQuality(item)
    })

    return this.items
  }

  private decreaseQualityForNormalItem(i: Item) {
    if (i.quality > 0) {
      if (i.name != "Sulfuras, Hand of Ragnaros") {
        i.quality = i.quality - 1;
      }
    }
  }

  private isDegradable(itemName: string): boolean {
    const nonDegradables = [
      "Aged Brie",
      "Backstage passes to a TAFKAL80ETC concert",
    ]
    return !nonDegradables.includes(itemName);
  }

  private increaseQuality(item: Item) {
    if (item.quality < this.maxItemQuality) {
      item.quality = item.quality + 1;
    }
  }

  private decreaseSellInOnlyForNormalItems(item: Item) {
    if (item.name != "Sulfuras, Hand of Ragnaros") {
      item.sellIn = item.sellIn - 1
    }
  }

  private decreaseQualityToZero(item: Item) {
    item.quality = item.quality - item.quality
  }
}
