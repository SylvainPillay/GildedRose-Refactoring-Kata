import { expect } from 'chai';
import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('Once the sell by date has passed, Quality degrades twice as fast', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(8);
  })

  it('The Quality of an item is never negative', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  })

  describe('Aged Brie', () => {
    it('actually increases in Quality the older it gets', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 1, 1)]);
      const items = gildedRose.updateQuality()
      expect(items[0].quality).to.equal(2)
    })

    it('actually increases by 2 in Quality when sell by date is passed', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 0, 1)])
      const items = gildedRose.updateQuality()
      expect(items[0].quality).to.equal(3)
    })

    it('The Quality of an item is never more than 50', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 0, 50)])
      const items = gildedRose.updateQuality()
      expect(items[0].quality).to.equal(50)
    })

    it('when sell by date is passed should only increase by 1 because quality is never more than 50', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 0, 49)])
      const items = gildedRose.updateQuality()
      expect(items[0].quality).to.equal(50)
    })
  })

  describe('Sulfuras', () => {
    it('being a legendary item, never has to be sold or decreases in Quality', () => {
      const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 0, 5)])
      gildedRose.updateQuality()
      const items = gildedRose.updateQuality()
      expect(items[0].quality).to.equal(5)
    })
  })

  describe('Backstage passes', () => {
    [
      { sellIn: 10, expected: 3 },
      { sellIn: 6, expected: 3 },
    ]
      .forEach(item => {
        it('if concert is in 6 to 10 days quality should increase by 2', () => {
          const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', item.sellIn, 1)]);
          const items = gildedRose.updateQuality()
          expect(items[0].quality).to.equal(item.expected)
        })
      });

    [
      { sellIn: 1, expected: 4 },
      { sellIn: 5, expected: 4 },
    ]
      .forEach(item => {
        it('if concert is in 1 to 5 days quality should increase by 3', () => {
          const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', item.sellIn, 1)]);
          const items = gildedRose.updateQuality()
          expect(items[0].quality).to.equal(item.expected)
        })
      });

      [
        { sellIn: -1, expected: 0 },
        { sellIn: 0, expected: 0 },
      ]
        .forEach(item => {
          it('quality should drop to zero after the concert', () => {
            const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', item.sellIn, 1)]);
            const items = gildedRose.updateQuality()
            expect(items[0].quality).to.equal(item.expected)
          })
        })
  })
})
