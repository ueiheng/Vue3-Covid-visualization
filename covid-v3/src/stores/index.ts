import { defineStore } from 'pinia'
import { getApiList } from '../server'
import type {RootObject,Children,ChinaTotal,ChinaAdd,LocalCityNCOVDataList}from './type'
//defineStore 有两个参数，第一个参数为
export const useStore = defineStore({
  id: 'Store',
  state: () => ({
    list: <RootObject>{},
    item: <Children[]>[],
    chinaAdd:<ChinaAdd>{},
    ChinaTotal:<ChinaTotal>{},
    cityDetail:<LocalCityNCOVDataList[]>[],
  }),
  //相当于methods 可以做 同步 异步操作，可以提交state
  actions: {
    async getList() {
      const result = await getApiList()
      this.list = result;
      this.chinaAdd = this.list.diseaseh5Shelf.chinaAdd;
      this.ChinaTotal = this.list.diseaseh5Shelf.chinaTotal;
      this.cityDetail = this.list.localCityNCOVDataList.slice(0,10)
    }
  }
})
