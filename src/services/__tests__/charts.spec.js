import { describe, expect, it } from 'vitest'
import {
  getCouponsStatsByRetailerChartData,
  getCouponStatsChartData,
  getNumberOfCouponsChartData
} from '../charts'
import {
  getDiscountStats,
  getEachCouponType,
  getRetailerStats
} from '../coupons'
import { coupons } from '../../json/coupons'

const couponTypes = getEachCouponType(coupons.coupons)
const discountStats = getDiscountStats(couponTypes)
const retailerStats = getRetailerStats(coupons.coupons)

describe('Charts', () => {
  it('Should return getNumberOfCouponsChartData correctly', async () => {
    const numberOfCouponsChartData = getNumberOfCouponsChartData(couponTypes)
    expect(numberOfCouponsChartData.labels[0]).toEqual('percent-off')
    expect(numberOfCouponsChartData.datasets[0].data[0]).toEqual(89)
    expect(numberOfCouponsChartData.datasets[0].data.length).toEqual(5)
  })

  it('Should return getCouponStatsChartData correctly', async () => {
    const couponStatsChartData = getCouponStatsChartData(discountStats['percent-off'], '')
    expect(couponStatsChartData.labels[0]).toEqual('count')
    expect(couponStatsChartData.datasets[0].data[0]).toEqual(89)
    expect(couponStatsChartData.datasets[0].data.length).toEqual(4)
  })

  it('Should return getCouponsStatsByRetailerChartData correctly', async () => {
    const couponsStatsByRetailerChartData = getCouponsStatsByRetailerChartData(
      retailerStats,
      'percent-off'
    )
    expect(couponsStatsByRetailerChartData.labels[0]).toEqual('macys')
    expect(couponsStatsByRetailerChartData.datasets[0].data[0]).toEqual(71)
    expect(couponsStatsByRetailerChartData.datasets[0].data.length).toEqual(3)
  })
})
