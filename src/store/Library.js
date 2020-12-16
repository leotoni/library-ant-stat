import { action, observable } from 'mobx';

class Library {
  constructor() {
    this.loadData();
  }

  @observable _rawData = [];
  get rawData() {
    return this._rawData;
  }
  set rawData(data) {
    this._rawData = data;
  }

  @action async loadData() {
    let response = null;
    try {
      response = await fetch('/opendata/7705851331-stat_library/data-2016-11-10T00-00-00-structure-2016-09-12T00-00-00.json');
      response = await response.json();
      this.rawData = response;
    } catch (error) {
      console.log('error: ', error);
    }
  }

  @observable _regionLibraries = [];
  get regionLibraries() {
    return this._regionLibraries;
  }
  set regionLibraries(data) {
    this._regionLibraries = data;
  }

  get regions() {
    return this.rawData.map(({ kopuk, territory }) => ({ id: kopuk, territory })) || [];
  }

  regionData(id) {
    return this.rawData.find((e) => (e.kopuk === id));
  }

  libraryData(id) {
    return this.regionLibraries.data.find((e) => (e._id === id));
  }

  @action async loadRegionLibraries(region) {
    let response = null;
    try {
      let reg = region.replace('.', '');
      reg = reg.toLowerCase();
      reg = reg.trim();
      response = await fetch(`/stat_lib_prime/$?f={"data.source.address":{"$contain":"${reg}"}}`, {
        headers: {
          'X-API-KEY': 'e9db71b774b75820b80323d104f6040de61dac8e008824d8c4d51bb4fa544965',
        },
      });
      response = await response.json();
      this.regionLibraries = response;
    } catch (error) {
      console.log('error: ', error);
    }
  }
}

export default new Library();
