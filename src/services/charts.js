import Chart from 'chart.js/auto'

/**
 * Creates a stacked bar chart on the specified canvas element.
 *
 * @param {object} data - The chart data.
 * @param {string} canvasId - The ID of the canvas element.
 * @returns {Chart} The Chart.js chart instance.
 */
export function stackedBarChart(data, canvasId) {
  return new Chart(document.getElementById(canvasId).getContext('2d'), {
    type: 'bar',
    data: data
  })
}

/**
 * Generates chart data for the number of coupons for each coupon type.
 *
 * @param {object} couponTypes - An object containing coupon types and their associated coupons.
 * @returns {object} The chart data for Coupon Types and the number of coupons.
 */
export function getNumberOfCouponsChartData(couponTypes) {
  const couponTypesNames = Object.keys(couponTypes)
  return {
    labels: couponTypesNames,
    datasets: [
      {
        label: 'How many coupons each coupon type has?',
        data: couponTypesNames.reduce((couponAcc, couponType) => {
          // For each coupon type, count how many coupons it has and add to the data array
          couponAcc.push(couponTypes[couponType].length)
          return couponAcc
        }, [])
      }
    ]
  }
}

/**
 * Generates chart data for displaying coupon statistics.
 *
 * @param {object} stats - An object containing coupon statistics data.
 * @param {string} datasetLabel - The label for the dataset in the chart.
 * @returns {object} The chart data for coupon statistics.
 */
export function getCouponStatsChartData(stats, datasetLabel) {
  const statsLabels = Object.keys(stats)
  return {
    labels: statsLabels,
    datasets: [
      {
        label: datasetLabel,
        data: statsLabels.reduce((statsAcc, statName) => {
          statsAcc.push(stats[statName])
          return statsAcc
        }, [])
      }
    ]
  }
}

export function getCouponsStatsByRetailerChartData(statsByRetailer, couponType) {
  const retailerNames = Object.keys(statsByRetailer)
  const statTypes = ['count', 'minDiscount', 'maxDiscount', 'averageDiscount']
  const datasets = statTypes.map((statType) => {
    return {
      label: statType,
      data: retailerNames.reduce((statsAcc, retailer) => {
        statsAcc.push(statsByRetailer[retailer][couponType][statType])
        return statsAcc
      }, [])
    }
  })

  return {
    labels: retailerNames,
    datasets: datasets
  }
}
