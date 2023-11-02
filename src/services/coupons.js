export function getEachCouponType(coupons) {
  // Initialize an object to store coupons by their promotion types
  const couponTypes = {}

  // Iterate through the coupons and group them by their promotion type
  coupons.forEach((coupon) => {
    if (coupon.promotion_type) {
      if (!couponTypes[coupon.promotion_type]) {
        couponTypes[coupon.promotion_type] = []
      }

      couponTypes[coupon.promotion_type].push(coupon)
    }
  })

  return couponTypes
}

export function calculateDiscountStats(coupon) {
  const discountValues = coupon.map((coupon) => coupon.value)
  const numCoupons = discountValues.length
  const avgDiscount = discountValues.reduce((acc, value) => acc + value, 0) / numCoupons

  return {
    count: numCoupons,
    minDiscount: numCoupons ? Math.min(...discountValues) : 0,
    maxDiscount: numCoupons ? Math.max(...discountValues) : 0,
    averageDiscount: numCoupons ? Math.round(avgDiscount) : 0
  }
}

export function getDiscountStats(couponTypes) {
  const statistics = {}
  for (const type in couponTypes) {
    statistics[type] = calculateDiscountStats(couponTypes[type])
  }

  return statistics
}

export function getCouponStatsByRetailer(coupons) {
  return coupons
    .filter((coupon) => coupon.value)
    .reduce((acc, coupon) => {
      if (!acc[coupon.webshop_id]) {
        acc[coupon.webshop_id] = {}
      }

      if (!acc[coupon.webshop_id][coupon.promotion_type]) {
        acc[coupon.webshop_id][coupon.promotion_type] = []
      }

      acc[coupon.webshop_id][coupon.promotion_type].push(coupon)
      return acc
    }, {})
}

export function getRetailerStats(coupons) {
  // Get coupon statistics grouped by retailer using the getCouponStatsByRetailer function
  const groupedStatsByRetailer = getCouponStatsByRetailer(coupons)
  const retailerStats = {}

  for (const retailerId in groupedStatsByRetailer) {
    // Initialize an object to store statistics for the current retailer
    retailerStats[retailerId] = {}

    // Iterate through each promotion type for the current retailer
    for (const promoType in groupedStatsByRetailer[retailerId]) {
      retailerStats[retailerId][promoType] = calculateDiscountStats(
        groupedStatsByRetailer[retailerId][promoType]
      )
    }
  }

  return retailerStats
}
