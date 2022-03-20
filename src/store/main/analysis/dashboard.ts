import { IRootState } from "@/store/types";
import { Module } from "vuex";
import { IDashboard } from "./type";
import {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale
} from "@/service/main/analysis/dashboard";

const dashboardModal: Module<IDashboard, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    };
  },
  mutations: {
    changeCateGoryGoodsCount(state, list: any[]) {
      state.categoryGoodsCount = list;
    },
    changeCategoryGoodsSale(state, list: any[]) {
      state.categoryGoodsSale = list;
    },
    changeCategoryGoodsFavor(state, list: any[]) {
      state.categoryGoodsFavor = list;
    },
    changeAddressGoodsSale(state, list: any[]) {
      state.addressGoodsSale = list;
    }
  },
  actions: {
    async getDashboardDataAction({ commit }, payload) {
      const categoryGoodsCountResult = await getCategoryGoodsCount();
      commit("changeCateGoryGoodsCount", categoryGoodsCountResult.data);
      const categoryGoodsSaleResult = await getCategoryGoodsSale();
      commit("changeCategoryGoodsSale", categoryGoodsSaleResult.data);
      const categoryGoodsFavorResult = await getCategoryGoodsFavor();
      commit("changeCategoryGoodsFavor", categoryGoodsFavorResult.data);
      const addressGoodsSaleResult = await getAddressGoodsSale();
      commit("changeAddressGoodsSale", addressGoodsSaleResult.data);
    }
  }
};

export default dashboardModal;
