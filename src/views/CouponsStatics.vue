<template>
  <div class="coupons-statics">
    <h2>How many coupons each coupon type has?</h2>
    <div class="card-container">
      <div v-for="(couponItems, couponName) in couponTypes">
        <strong class="title">{{ couponName }}</strong> <br />
        <span>{{ couponItems.length }}</span>
      </div>
    </div>

    <h2>
      Number of coupons with discount, the minimum discount, maximum discount, and average discount
      for percent-off coupons
    </h2>
    <div class="card-container">
      <div v-for="(stats, promoType) in discountStats">
        <strong class="title">{{ promoType }}</strong>
        <ul>
          <li v-for="(statValue, statName) in stats">
            <strong>{{ statName }}:</strong> {{ statValue }}
          </li>
        </ul>
      </div>
    </div>

    <div v-for="(promoTypes, retailer) in retailerStats">
      <h2>{{ retailer }}</h2>

      <div class="card-container">
        <div v-for="(stats, promoType) in promoTypes">
          <strong class="title">{{ promoType }}</strong>
          <ul>
            <li v-for="(statValue, statName) in stats">
              <strong>{{ statName }}:</strong> {{ statValue }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <hr />
    <h2>How many coupons each coupon type has?</h2>
    <canvas id="numberOfCoupons"></canvas>

    <h2>
      Number of coupons with discount, the minimum discount, maximum discount, and average discount
      for percent-off coupons
    </h2>
    <canvas id="statsPercentOff"></canvas>

    <h2>
      Number of coupons with discount, the minimum discount, maximum discount, and average discount
      for dollar-off coupons
    </h2>
    <canvas id="statsDollarOff"></canvas>

    <h2>Same values, but grouping by retailer dollar-off</h2>
    <canvas id="statsByRetailersDollarOff"></canvas>

    <h2>Same values, but grouping by retailer percent-off</h2>
    <canvas id="statsByRetailersPercentOff"></canvas>
  </div>
</template>

<script setup>
import { coupons } from '../json/coupons'
import { getDiscountStats, getEachCouponType, getRetailerStats } from '../services/coupons'
import { onMounted } from 'vue'
import {
  getCouponsStatsByRetailerChartData,
  getCouponStatsChartData,
  getNumberOfCouponsChartData,
  stackedBarChart
} from '../services/charts'

const couponTypes = getEachCouponType(coupons.coupons)
const discountStats = getDiscountStats(couponTypes)
const retailerStats = getRetailerStats(coupons.coupons)
onMounted(() => {
  // Number of coupons chart
  stackedBarChart(getNumberOfCouponsChartData(couponTypes), 'numberOfCoupons')

  // Percent off chart
  const percentOffChartLabel =
    'Number of coupons with discount, the minimum discount, maximum discount, and average discount for percent-off coupons'
  stackedBarChart(
    getCouponStatsChartData(discountStats['percent-off'], percentOffChartLabel),
    'statsPercentOff'
  )

  // Dollar off chart
  const dollarOffChartLabel =
    'Number of coupons with discount, the minimum discount, maximum discount, and average discount for dollar-off coupons'
  stackedBarChart(
    getCouponStatsChartData(discountStats['dollar-off'], dollarOffChartLabel),
    'statsDollarOff'
  )

  // Stats grouped by retailer
  stackedBarChart(
    getCouponsStatsByRetailerChartData(retailerStats, 'dollar-off'),
    'statsByRetailersDollarOff'
  )
  stackedBarChart(
    getCouponsStatsByRetailerChartData(retailerStats, 'percent-off'),
    'statsByRetailersPercentOff'
  )
})
</script>

<style lang="scss" scoped>
.coupons-statics {
  padding: 15px;
  display: flex;
  flex-direction: column;
  width: 70%;
  margin: auto;

  @media (max-width: 767px) {
    width: 100%;
  }

  p {
    margin-bottom: 5px;
    margin-top: 0;
  }

  .card-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    color: #e1e1e1;

    div {
      text-align: center;
      background-color: #34495e;
      padding: 35px;
      margin: 5px;
      width: 240px;

      @media (max-width: 767px) {
        width: 100%;
      }
    }

    .title {
      font-size: 23px;
    }

    ul {
      list-style: none;
      text-align: left;
      padding: 0;

      li {
        font-size: 14px;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
