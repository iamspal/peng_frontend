import { describe, expect, it } from 'vitest'
import { getDiscountStats, getEachCouponType, getRetailerStats } from '../coupons'
import { coupons } from '../../json/coupons'

describe('Coupons', () => {
  it('Get coupons by type', async () => {
    const couponsType = getEachCouponType(coupons)
    expect(Object.keys(couponsType)).toEqual(['percent-off', 'buy-one-get-one', 'dollar-off'])
  })

  it('Get discount stats', async () => {
    const couponsTypes = getEachCouponType(coupons.coupons)
    const discountStats = getDiscountStats(couponsTypes)
    expect(discountStats['buy-one-get-one'].count).toEqual(1)
    expect(discountStats['buy-one-get-one'].maxDiscount).toEqual(0)
    expect(discountStats['buy-one-get-one'].minDiscount).toEqual(0)
    expect(discountStats['buy-one-get-one'].averageDiscount).toEqual(0)

    expect(discountStats['dollar-off'].count).toEqual(2)
    expect(discountStats['dollar-off'].maxDiscount).toEqual(20)
    expect(discountStats['dollar-off'].minDiscount).toEqual(10)
    expect(discountStats['dollar-off'].averageDiscount).toEqual(15)
  })

  it('Get retailer stats', async () => {
    const retailerStats = getRetailerStats(coupons.coupons)
    expect(Object.keys(retailerStats)).toEqual(['macys'])
    expect(retailerStats['macys']['dollar-off'].count).toEqual(2)
    expect(retailerStats['macys']['dollar-off'].averageDiscount).toEqual(15)
  })
})
